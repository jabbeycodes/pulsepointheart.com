#!/usr/bin/env node
/**
 * Import Dr. Martin Tibuakuu's U.S. News articles into blog seed data (+ Supabase).
 * Run: node scripts/import-usnews-blog.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const SEED_PATH = path.join(ROOT, 'lib', 'usnews-blog-posts.ts')

const ARTICLE_URLS = [
  'https://health.usnews.com/health-news/patient-advice/articles/2016-09-22/electronic-cigarettes-are-they-safer-than-traditional-cigarettes',
  'https://health.usnews.com/health-news/patient-advice/articles/2016-08-24/know-your-a1c-what-this-blood-test-can-tell-you-about-your-risk-for-diabetes-and-cardiovascular-disease',
]

const HEADINGS_BY_SLUG = {
  'electronic-cigarettes-are-they-safer-than-traditional-cigarettes': [
    'What Are E-Cigs?',
    'How Do E-Cigs Work?',
    'Are E-Cigs Safer Than Traditional Cigarettes?',
    'Are E-Cigs Effective for Quitting Smoking?',
    'What Is the Chance That My Child Will Use E-Cigs?',
    'It Seems There Are Risks With E-Cig Use. How Are They Regulated?',
    'I Was Thinking of Quitting With E-Cigs. What Should I Do Now?',
  ],
  'know-your-a1c-what-this-blood-test-can-tell-you-about-your-risk-for-diabetes-and-cardiovascular-disease':
    [
      'Type 2 Diabetes: Who Is at Risk?',
      'What Is Prediabetes?',
      'What Is the A1C Blood Test?',
      'How Does an A1C Test Differ From a Blood Glucose Level?',
      'How Do We Diagnose Diabetes and Prediabetes?',
      'What Are the A1C Criteria for Diabetes and Prediabetes Diagnosis?',
      'What Is the Target A1C Level?',
      'What Are the Benefits of Lowering A1C?',
      'Who Should Get an A1C Test?',
      'What Are the Limitations to A1C Testing for Diabetes?',
      'What Can You Do to Protect Yourself From Diabetes?',
    ],
}

function slugFromUrl(url) {
  return url.replace(/\/$/, '').split('/').pop()
}

function parseJsonObjectAt(html, start) {
  let depth = 0
  let inStr = false
  let esc = false
  let end = start

  for (let i = start; i < html.length; i++) {
    const c = html[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') {
      inStr = true
      continue
    }
    if (c === '{') depth++
    if (c === '}') {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }

  return JSON.parse(html.slice(start, end))
}

function extractNewsArticleFromHtml(html) {
  const typeMarker = '"@type":"NewsArticle"'
  const typeIdx = html.indexOf(typeMarker)
  if (typeIdx === -1) return null

  const bodyKeyIdx = html.lastIndexOf('"articleBody":', typeIdx)
  if (bodyKeyIdx === -1) return null

  let start = bodyKeyIdx
  let depth = 0
  for (let i = bodyKeyIdx; i >= 0; i--) {
    const c = html[i]
    if (c === '}') depth++
    else if (c === '{') {
      depth--
      if (depth === -1) {
        start = i
        break
      }
    }
  }

  try {
    const data = parseJsonObjectAt(html, start)
    if (data['@type'] === 'NewsArticle' && data.articleBody) return data
  } catch {
    /* fall through */
  }

  return null
}

async function fetchArticle(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: 'text/html',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const html = await res.text()

  const embedded = extractNewsArticleFromHtml(html)
  if (embedded) return embedded

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  for (const [, raw] of blocks) {
    try {
      const data = JSON.parse(raw)
      const items = Array.isArray(data) ? data : [data]
      for (const item of items) {
        if (item['@type'] === 'NewsArticle' && item.articleBody) return item
      }
    } catch {
      /* try next block */
    }
  }

  throw new Error(`No NewsArticle data at ${url}`)
}

function bodyToMarkdown(body, slug) {
  let text = body.replaceAll('[See:', '\n\n[See:')
  const headings = HEADINGS_BY_SLUG[slug] ?? []
  for (const heading of [...headings].sort((a, b) => b.length - a.length)) {
    text = text.replaceAll(heading, `\n\n## ${heading}\n\n`)
  }

  text = text.replaceAll('•', '\n- ')
  text = text.replace(
    /A1C\s+Percentage\s+Normal\s+Below 5\.7%\s+Prediabetes\s+5\.7%–6\.4%\s+Diabetes\s+6\.5% or greater/,
    '| A1C | Percentage |\n| --- | --- |\n| Normal | Below 5.7% |\n| Prediabetes | 5.7%–6.4% |\n| Diabetes | 6.5% or greater |',
  )
  text = text
    .replace('A cartridge, which holds', '\n- A cartridge, which holds')
    .replace('A heating device that vaporizes', '\n- A heating device that vaporizes')
    .replace('A power source (usually a battery)', '\n- A power source (usually a battery)')

  const chunks = text.trim().split(/\n\n+/)
  const paragraphs = []

  for (const chunk of chunks) {
    const trimmed = chunk.trim()
    if (!trimmed) continue
    if (
      trimmed.startsWith('## ') ||
      trimmed.startsWith('| ') ||
      trimmed.startsWith('- ') ||
      trimmed.startsWith('[See:')
    ) {
      paragraphs.push(trimmed)
      continue
    }
    const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    let buf = []
    for (const sentence of sentences) {
      const s = sentence.trim()
      if (!s) continue
      buf.push(s)
      if (buf.join(' ').length > 420) {
        paragraphs.push(buf.join(' '))
        buf = []
      }
    }
    if (buf.length) paragraphs.push(buf.join(' '))
  }

  return paragraphs.join('\n\n')
}

function buildPost(article, sourceUrl) {
  const slug = slugFromUrl(sourceUrl)
  const published = (article.datePublished || '').slice(0, 10)
  const cover = article.image?.url ?? null
  const authorNames = (article.author || [])
    .map((a) => a.name?.trim())
    .filter(Boolean)
    .join(', ')

  const bodyMd =
    bodyToMarkdown(article.articleBody, slug) +
    `\n\n---\n\n*Originally published on [U.S. News & World Report](${sourceUrl})${
      authorNames ? ` by ${authorNames}` : ''
    }. Republished on PulsePoint Journal for patient education.*`

  const tags = new Set(['preventive cardiology', 'patient education', 'us-news'])
  for (const kw of article.keywords || []) {
    const normalized = String(kw).trim().toLowerCase()
    if (
      ['diabetes', 'prediabetes', 'heart health', 'heart disease', 'vaping', 'smoking and tobacco'].includes(
        normalized,
      )
    ) {
      tags.add(normalized.replace(/\s+/g, '-'))
    }
  }

  return {
    slug,
    title: article.headline.trim(),
    excerpt: (article.description || '').slice(0, 400),
    body_md: bodyMd,
    cover_image_url: cover,
    author: 'Martin Tibuakuu, MD, MPH, FACC',
    tags: [...tags].sort(),
    is_published: true,
    published_at: `${published}T12:00:00.000Z`,
    source_url: sourceUrl,
  }
}

function escapeTemplateLiteral(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function writeSeedTs(posts) {
  const entries = posts
    .map(
      (p) => `  {
    slug: '${p.slug}',
    title: ${JSON.stringify(p.title)},
    excerpt: ${JSON.stringify(p.excerpt)},
    body_md: \`${escapeTemplateLiteral(p.body_md)}\`,
    cover_image_url: ${JSON.stringify(p.cover_image_url)},
    author: ${JSON.stringify(p.author)},
    tags: ${JSON.stringify(p.tags)},
    is_published: true,
    published_at: '${p.published_at}',
    source_url: ${JSON.stringify(p.source_url)},
  }`,
    )
    .join(',\n')

  const content = `export type UsNewsBlogPost = {
  slug: string
  title: string
  excerpt: string
  body_md: string
  cover_image_url: string | null
  author: string
  tags: string[]
  is_published: boolean
  published_at: string
  source_url: string
}

// Dr. Martin Tibuakuu's U.S. News patient-advice articles.
// Generated by scripts/import-usnews-blog.mjs — re-run to refresh from source.
export const USNEWS_BLOG_POSTS: UsNewsBlogPost[] = [
${entries},
]
`

  fs.writeFileSync(SEED_PATH, content, 'utf8')
  console.log(`Wrote ${path.relative(ROOT, SEED_PATH)}`)
}

async function upsertSupabase(posts) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.log('Skipping Supabase upsert (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set).')
    return
  }

  for (const post of posts) {
    const { source_url: _source, ...payload } = post
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/blog_posts?on_conflict=slug`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Supabase upsert failed for ${post.slug}: ${res.status} ${text}`)
    }
    console.log(`  [ok] upserted ${post.slug}`)
  }
}

async function main() {
  const posts = []
  for (const url of ARTICLE_URLS) {
    console.log(`Fetching ${slugFromUrl(url)}...`)
    const article = await fetchArticle(url)
    posts.push(buildPost(article, url))
  }
  writeSeedTs(posts)
  await upsertSupabase(posts)
  console.log(`\nDone: ${posts.length} articles prepared.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
