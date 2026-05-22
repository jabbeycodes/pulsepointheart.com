import type { SupabaseClient } from '@supabase/supabase-js'
import { XMLParser } from 'fast-xml-parser'
import { slugify } from '@/lib/blog'

type BlogTopic = {
  pillar: string
  title: string
  excerpt: string
  tags: string[]
  sections: Array<{
    heading: string
    paragraphs: string[]
  }>
}

type FeedSource = {
  name: string
  url: string
  defaultTags: string[]
}

type FeedItem = {
  sourceName: string
  title: string
  url: string
  publishedAt: string | null
  tags: string[]
  score: number
}

const FEED_SOURCES: FeedSource[] = [
  {
    name: 'American Heart Association Heart News',
    url: 'https://newsroom.heart.org/cats/heart_news.xml',
    defaultTags: ['preventive cardiology', 'cardiovascular wellness'],
  },
  {
    name: 'American Heart Association Scientific Statements',
    url: 'https://newsroom.heart.org/cats/scientific_statements_guidelines.xml',
    defaultTags: ['advanced diagnostics', 'physician-led care'],
  },
  {
    name: 'MedlinePlus Heart Diseases',
    url: 'https://medlineplus.gov/feeds/topics/heartdiseases.xml',
    defaultTags: ['heart health optimization', 'early detection'],
  },
]

const RELEVANCE_TERMS = [
  'heart',
  'cardiac',
  'cardio',
  'vascular',
  'blood pressure',
  'cholesterol',
  'prevention',
  'preventive',
  'screening',
  'diagnostic',
  'arrhythmia',
  'rhythm',
  'stroke',
  'diabetes',
  'metabolic',
  'obesity',
  'exercise',
  'longevity',
  'wellness',
]

const PULSEPOINT_AUTHOR = 'Martin Tibuakuu, MD, MPH'

export function getAutoPublishAfterHours() {
  const rawValue = process.env.BLOG_AUTO_PUBLISH_AFTER_HOURS
  const parsed = rawValue ? Number.parseInt(rawValue, 10) : 6

  if (!Number.isFinite(parsed) || parsed < 1) return 6
  return parsed
}

const TOPICS: BlogTopic[] = [
  {
    pillar: 'Preventive Cardiology',
    title: 'Why Preventive Cardiology Belongs at the Center of Long-Term Heart Health',
    excerpt:
      'A practical look at how prevention, early detection, and physician-led planning can change the trajectory of cardiovascular risk.',
    tags: ['preventive cardiology', 'heart health optimization', 'early detection'],
    sections: [
      {
        heading: 'Prevention changes the conversation',
        paragraphs: [
          'Traditional cardiology often begins after symptoms appear. Preventive cardiology starts earlier, looking for risk patterns before they become a crisis.',
          'That shift matters because many cardiovascular conditions develop quietly over years. Blood pressure, cholesterol, inflammation, blood sugar, family history, sleep, stress, and fitness all influence long-term cardiovascular risk.',
        ],
      },
      {
        heading: 'What a modern prevention visit considers',
        paragraphs: [
          'A thoughtful prevention plan usually looks beyond a single lab result or office reading. It combines history, lifestyle, cardiometabolic health, advanced screening when appropriate, and a clear follow-up plan.',
          'For many patients, the goal is not simply to treat disease. The goal is to preserve capacity, confidence, and independence for the decades ahead.',
        ],
      },
      {
        heading: 'How PulsePoint thinks about risk',
        paragraphs: [
          'PulsePoint Clinic is built around physician-led cardiovascular care, advanced diagnostics, and a more personal relationship with your care team.',
          'The right plan should feel specific to the patient in front of us, not copied from a generic checklist.',
        ],
      },
    ],
  },
  {
    pillar: 'Advanced Diagnostics',
    title: 'Advanced Heart Screening: When Better Information Leads to Better Decisions',
    excerpt:
      'Advanced diagnostics can help identify early cardiovascular risk and guide a more personalized care plan.',
    tags: ['advanced heart screening', 'integrated diagnostics', 'cardiovascular wellness'],
    sections: [
      {
        heading: 'The value of seeing earlier',
        paragraphs: [
          'Cardiovascular risk can be easy to underestimate when a patient feels well. Advanced screening helps add objective information to the conversation.',
          'Tests such as echocardiography, vascular ultrasound, rhythm monitoring, stress testing, and cardiac CT coordination can each answer different questions when used thoughtfully.',
        ],
      },
      {
        heading: 'Diagnostics should serve the plan',
        paragraphs: [
          'More testing is not automatically better. The strongest diagnostic approach begins with the clinical question: what are we trying to understand, prevent, or monitor?',
          'When testing is aligned with a patient’s risk profile and goals, it can support clearer decisions about treatment, exercise, medication, follow-up, and referral.',
        ],
      },
      {
        heading: 'A platform approach to heart health',
        paragraphs: [
          'PulsePoint’s model brings prevention, diagnostics, and physician accessibility into a more connected experience.',
          'That integration is especially valuable for people who want to understand their risk before symptoms force the issue.',
        ],
      },
    ],
  },
  {
    pillar: 'Cardiometabolic Wellness',
    title: 'The Heart-Metabolism Connection: Why Cardiometabolic Wellness Matters',
    excerpt:
      'Heart health is deeply connected to metabolism, weight, blood pressure, cholesterol, sleep, and lifestyle patterns.',
    tags: ['cardiometabolic wellness', 'preventive cardiology', 'longevity-focused care'],
    sections: [
      {
        heading: 'Your heart does not live in isolation',
        paragraphs: [
          'Blood sugar, weight, waist circumference, blood pressure, cholesterol, sleep quality, stress, and physical activity all affect cardiovascular health.',
          'Cardiometabolic wellness focuses on these connected systems instead of treating each number as a separate problem.',
        ],
      },
      {
        heading: 'Small changes can compound',
        paragraphs: [
          'Improving cardiovascular risk often comes from consistent, realistic changes: movement, nutrition, sleep, medication when appropriate, and regular follow-up.',
          'The best plan is one a patient can actually sustain, with enough structure to measure progress over time.',
        ],
      },
      {
        heading: 'Why physician-led guidance matters',
        paragraphs: [
          'A physician-led plan can connect lifestyle goals with medical risk, diagnostic findings, and treatment decisions.',
          'That is where personalized cardiovascular care becomes more than advice. It becomes a strategy.',
        ],
      },
    ],
  },
  {
    pillar: 'Executive Heart Health',
    title: 'Executive Heart Health: A Smarter Approach for Busy High-Performing Adults',
    excerpt:
      'For executives and busy professionals, heart health planning should be proactive, efficient, and built around long-term performance.',
    tags: ['executive health', 'physician accessibility', 'heart health optimization'],
    sections: [
      {
        heading: 'Busy schedules should not mean reactive care',
        paragraphs: [
          'Many high-performing adults delay care because they feel well or cannot afford fragmented appointments. Cardiovascular risk, however, can build silently.',
          'Executive heart health should focus on early detection, efficient coordination, and a clear plan that fits a demanding life.',
        ],
      },
      {
        heading: 'The right experience feels organized',
        paragraphs: [
          'A premium model should make it easier to understand risk, complete appropriate screening, and stay connected with a physician over time.',
          'That level of organization can reduce uncertainty and help patients make better decisions before problems become urgent.',
        ],
      },
      {
        heading: 'Long-term capacity is the goal',
        paragraphs: [
          'Heart health is not only about avoiding disease. It is about maintaining energy, resilience, mobility, and confidence.',
          'For many patients, the most valuable care is the care that helps preserve the future they are working so hard to build.',
        ],
      },
    ],
  },
  {
    pillar: 'Heart Rhythm Monitoring',
    title: 'Heart Rhythm Monitoring: What Palpitations and Irregular Beats Can Tell Us',
    excerpt:
      'Rhythm monitoring can help connect symptoms, wearable alerts, and objective heart rhythm data.',
    tags: ['heart rhythm monitoring', 'advanced diagnostics', 'physician-led care'],
    sections: [
      {
        heading: 'Irregular rhythms deserve context',
        paragraphs: [
          'Palpitations, skipped beats, racing heart episodes, and wearable alerts can be unsettling. Rhythm monitoring helps determine what is actually happening during those moments.',
          'The goal is to match symptoms with data, then decide whether reassurance, lifestyle changes, medication, or further evaluation is appropriate.',
        ],
      },
      {
        heading: 'Wearables are helpful, but not the full answer',
        paragraphs: [
          'Consumer devices can prompt important conversations, but they do not replace clinical evaluation.',
          'A physician can interpret rhythm findings in the context of medical history, risk factors, medications, and symptoms.',
        ],
      },
      {
        heading: 'A calmer path from concern to clarity',
        paragraphs: [
          'PulsePoint’s approach is designed to turn uncertainty into a plan. That means listening carefully, using diagnostics appropriately, and explaining what the findings mean.',
          'Patients should leave with more clarity, not more confusion.',
        ],
      },
    ],
  },
  {
    pillar: 'Longevity-Focused Care',
    title: 'Longevity-Focused Heart Care: Building a Cardiovascular Plan for the Decades Ahead',
    excerpt:
      'Longevity-focused care connects prevention, diagnostics, lifestyle, and physician partnership into a long-term cardiovascular strategy.',
    tags: ['longevity-focused care', 'cardiovascular wellness', 'membership-based care'],
    sections: [
      {
        heading: 'Longevity starts with risk awareness',
        paragraphs: [
          'A longer healthspan depends in part on protecting the cardiovascular system. That begins with understanding personal risk early enough to act.',
          'Family history, blood pressure, cholesterol, diabetes risk, sleep, stress, exercise capacity, and imaging findings can all shape the plan.',
        ],
      },
      {
        heading: 'A plan should evolve with you',
        paragraphs: [
          'Cardiovascular needs change over time. A prevention plan should be revisited as life, labs, imaging, medications, and goals change.',
          'Membership-based heart care can support that continuity by making the physician relationship more accessible and proactive.',
        ],
      },
      {
        heading: 'The future of heart care is personal',
        paragraphs: [
          'Premium cardiovascular care should feel calm, informed, and specific. It should give patients a clearer sense of what matters now and what to watch next.',
          'That is the long-term opportunity for PulsePoint: prevention, wellness, advanced diagnostics, and physician-led care working together.',
        ],
      },
    ],
  },
]

function getWeekIndex(date: Date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const diffDays = Math.floor((date.getTime() - start.getTime()) / 86400000)
  return Math.floor(diffDays / 7)
}

function buildClinicalQuestions(pillar: string) {
  const lower = pillar.toLowerCase()

  if (lower.includes('diagnostic')) {
    return [
      'What specific clinical question should this test answer?',
      'Does the result change prevention, medication, follow-up, or referral decisions?',
      'How should the result be explained in plain language so the patient can act on it?',
      'What should be repeated, watched, or coordinated over time?',
    ]
  }

  if (lower.includes('cardiometabolic')) {
    return [
      'How do blood pressure, cholesterol, blood sugar, weight, sleep, stress, and fitness interact for this patient?',
      'Which risk factor is most urgent to improve first?',
      'What lifestyle changes are realistic enough to sustain?',
      'When would medication, imaging, or closer follow-up meaningfully lower long-term risk?',
    ]
  }

  if (lower.includes('rhythm')) {
    return [
      'Are symptoms connected to a documented rhythm change?',
      'Are there triggers such as dehydration, sleep disruption, alcohol, stimulants, stress, or medication changes?',
      'Is the rhythm benign, something to monitor, or something that needs treatment?',
      'What symptoms would make the situation urgent rather than routine?',
    ]
  }

  if (lower.includes('executive')) {
    return [
      'What risk is being missed because the patient is busy, asymptomatic, or relying on fragmented care?',
      'How can evaluation be organized efficiently without becoming superficial?',
      'Which prevention steps protect long-term energy, performance, and independence?',
      'How should follow-up be structured so the plan actually happens?',
    ]
  }

  if (lower.includes('longevity')) {
    return [
      'What is the patient trying to preserve: energy, travel, work capacity, family time, athletic goals, or independence?',
      'Which cardiovascular risks are most likely to threaten that future?',
      'What should be measured now so change can be tracked over time?',
      'How should the plan evolve as labs, imaging, symptoms, and goals change?',
    ]
  }

  return [
    'What is this patient’s true cardiovascular risk, not just today’s snapshot?',
    'Which risk factors are silent but modifiable?',
    'Would earlier screening or closer follow-up change the plan?',
    'How can we make prevention specific, measurable, and sustainable?',
  ]
}

function buildActionSteps(tags: string[]) {
  const normalizedTags = tags.join(' ').toLowerCase()

  const steps = [
    'Know your numbers: blood pressure, cholesterol profile, blood sugar status, weight trend, and family history.',
    'Pay attention to change: new chest discomfort, shortness of breath, palpitations, exercise intolerance, swelling, dizziness, or fainting should be discussed with a clinician.',
    'Make prevention measurable: set clear goals for movement, nutrition, sleep, medication adherence, and follow-up rather than relying on vague motivation.',
  ]

  if (normalizedTags.includes('diagnostic') || normalizedTags.includes('screening')) {
    steps.push(
      'Use testing with purpose: echocardiography, vascular ultrasound, rhythm monitoring, stress testing, or CT coordination should answer a clear clinical question.'
    )
  }

  if (normalizedTags.includes('metabolic') || normalizedTags.includes('wellness')) {
    steps.push(
      'Connect heart and metabolism: blood pressure, insulin resistance, weight, sleep, and inflammation often need to be addressed together.'
    )
  }

  if (normalizedTags.includes('executive') || normalizedTags.includes('accessibility')) {
    steps.push(
      'Protect time without sacrificing depth: a well-organized cardiovascular plan should be efficient, personal, and clinically complete.'
    )
  }

  return steps
}

function buildList(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n')
}

function buildBody(topic: BlogTopic) {
  const sections = topic.sections
    .map((section) => {
      const body = section.paragraphs.join('\n\n')
      return `## ${section.heading}\n\n${body}`
    })
    .join('\n\n')

  return `From the cardiologist's perspective at PulsePoint Clinic, ${topic.title.toLowerCase()} is not just a clinical topic. It is part of a larger conversation about prevention, early detection, and helping people make better decisions before cardiovascular disease becomes disruptive.

This article is written for educational purposes for patients and families who want a clearer, calmer way to think about heart health. It is not meant to create alarm. It is meant to make the next conversation with your physician more informed.

## Key takeaways

${buildList([
    topic.excerpt,
    'Modern cardiovascular care works best when it combines medical judgment, thoughtful diagnostics, and a prevention plan that fits the person.',
    'Symptoms matter, but risk often begins before symptoms appear.',
    'The goal is not more testing for its own sake. The goal is better decisions.',
  ])}

${sections}

## What I look for as a cardiologist

When I think through this topic with a patient, I am usually trying to answer a few practical questions:

${buildList(buildClinicalQuestions(topic.pillar))}

Those questions help turn a broad heart-health topic into a personal plan. Two people can have the same headline risk factor and still need different next steps because their history, goals, symptoms, family history, lifestyle, and test results are different.

## How patients can use this information

${buildList(buildActionSteps(topic.tags))}

The most useful heart-health plan is specific enough to guide action but realistic enough to live with. Prevention should not feel like a lecture. It should feel like a clear strategy that helps you protect the life you are trying to build.

## The PulsePoint approach

PulsePoint Clinic is designed around premium personalized cardiovascular care: more time for the physician relationship, a prevention-first mindset, advanced diagnostics when they are appropriate, and follow-up that keeps the plan moving.

That model is especially important in cardiovascular medicine because many of the highest-value decisions happen before a crisis. The earlier we understand risk, the more options we often have to improve it.

## When to seek urgent care

Educational information should never delay emergency evaluation. Chest pressure, severe shortness of breath, fainting, new neurologic symptoms such as facial droop or arm weakness, sudden severe weakness, or symptoms that feel alarming should be treated as urgent.

## Important note

This article is educational and does not replace medical advice, diagnosis, or treatment. If you have chest pain, severe shortness of breath, fainting, stroke symptoms, or another emergency concern, call 911 or seek emergency care.`
}

function textFromValue(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (Array.isArray(value)) return textFromValue(value[0])
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return textFromValue(record['#text'] ?? record._text ?? record.href ?? record['@_href'])
  }
  return ''
}

function normalizeItems(parsed: unknown): Array<Record<string, unknown>> {
  const record = parsed as Record<string, unknown>
  const rssChannel = (record.rss as Record<string, unknown> | undefined)?.channel as
    | Record<string, unknown>
    | undefined
  const rssItems = rssChannel?.item
  const atomFeed = record.feed as Record<string, unknown> | undefined
  const atomItems = atomFeed?.entry
  const rawItems = rssItems ?? atomItems ?? []

  return (Array.isArray(rawItems) ? rawItems : [rawItems]).filter(
    (item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object'
  )
}

function getItemUrl(item: Record<string, unknown>) {
  const link = item.link

  if (Array.isArray(link)) {
    const alternate = link.find(
      (entry) =>
        typeof entry === 'object' &&
        entry &&
        ((entry as Record<string, unknown>)['@_rel'] === 'alternate' ||
          !(entry as Record<string, unknown>)['@_rel'])
    )
    return textFromValue(alternate)
  }

  return textFromValue(link ?? item.guid ?? item.id)
}

function scoreTitle(title: string) {
  const normalized = title.toLowerCase()
  return RELEVANCE_TERMS.reduce((score, term) => {
    return normalized.includes(term) ? score + 1 : score
  }, 0)
}

async function fetchFeedItems(source: FeedSource): Promise<FeedItem[]> {
  try {
    const response = await fetch(source.url, {
      headers: {
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml',
        'user-agent': 'PulsePointHeart.com editorial automation',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []

    const xml = await response.text()
    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    })
    const parsed = parser.parse(xml)

    return normalizeItems(parsed)
      .map((item) => {
        const title = textFromValue(item.title).replace(/\s+/g, ' ').trim()
        const url = getItemUrl(item)
        const publishedAt = textFromValue(item.pubDate ?? item.published ?? item.updated)
        const score = scoreTitle(title)

        return {
          sourceName: source.name,
          title,
          url,
          publishedAt: publishedAt || null,
          tags: source.defaultTags,
          score,
        }
      })
      .filter((item) => item.title.length > 8 && item.url.length > 8 && item.score > 0)
  } catch (error) {
    console.error(`RSS fetch failed for ${source.name}:`, error)
    return []
  }
}

async function findBestFeedItem() {
  const batches = await Promise.all(FEED_SOURCES.map(fetchFeedItems))
  const items = batches.flat()

  return items
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return Date.parse(b.publishedAt ?? '0') - Date.parse(a.publishedAt ?? '0')
    })
    .at(0)
}

function buildFeedInspiredBody(item: FeedItem) {
  const tags = Array.from(new Set(item.tags))

  return `From the cardiologist's perspective at PulsePoint Clinic, cardiovascular news is most useful when it helps patients ask better questions about their own prevention, screening, and long-term wellness.

This educational article was inspired by a recent item from ${item.sourceName}: "${item.title}." The original source is linked below for clinical review and context. The purpose here is not to summarize or copy that article. The purpose is to translate the broader topic into a practical, patient-centered PulsePoint perspective.

## Why this matters now

Cardiovascular health is often shaped years before a diagnosis appears. Blood pressure, cholesterol, blood sugar, sleep, stress, exercise capacity, family history, inflammation, weight, vascular health, and rhythm symptoms can all move quietly in the background.

That is why timely cardiovascular topics deserve more than a quick headline reaction. The better question is: what should this make us look for earlier, explain more clearly, or monitor more thoughtfully?

## PulsePoint perspective

Premium cardiovascular care should help patients move from scattered health headlines to a clear personal plan. That plan may include blood pressure review, cholesterol and cardiometabolic risk assessment, family history, lifestyle patterns, appropriate diagnostic testing, and physician-led follow-up.

The strongest version of preventive cardiology is not fear-based. It is calm, organized, and specific. It helps patients understand their risk early enough to make meaningful decisions.

## What I would want patients to understand

${buildList([
    'A headline is not a diagnosis. It is a starting point for a better clinical conversation.',
    'Risk is personal. Age, family history, blood pressure, cholesterol, diabetes risk, kidney health, smoking history, pregnancy history, sleep, fitness, and symptoms can all change the meaning of the same topic.',
    'Prevention works best when it is measured. Patients should know what is being tracked, why it matters, and when the plan will be reassessed.',
    'Advanced diagnostics can be powerful, but only when they answer a clear question and connect back to a care plan.',
  ])}

## Clinical questions this topic raises

${buildList([
    'Could this topic change how patients think about early detection?',
    'Does it connect to preventive cardiology, cardiometabolic wellness, rhythm monitoring, vascular screening, or advanced diagnostics?',
    'Who might benefit from a more detailed cardiovascular risk review?',
    'What would a patient need to understand before discussing this with a physician?',
    'How can this be explained in a way that is clear, calm, and medically responsible?',
  ])}

## Practical next steps for patients

${buildList(buildActionSteps(tags))}

## How this fits the PulsePoint model

PulsePoint is building a modern cardiovascular and wellness platform, not a traditional reactive clinic experience. That means the work is not limited to treating disease after it appears. It includes prevention, physician accessibility, integrated diagnostics, cardiometabolic wellness, and long-term heart-health optimization.

From the cardiologist's perspective, the value is in connecting the dots. A patient may come in with a wearable alert, a family history concern, rising blood pressure, abnormal cholesterol, reduced exercise tolerance, or a desire to be proactive. The goal is to bring those signals into one coherent plan.

## Editorial review note

This draft was generated through PulsePoint's educational topic-monitoring workflow and should be reviewed for final clinical nuance, local service alignment, and any needed updates before publication.

## Source for review

${item.sourceName}: ${item.url}

## Important note

This draft was generated from RSS topic monitoring for editorial review. It is educational and does not replace medical advice, diagnosis, or treatment. If you have chest pain, severe shortness of breath, fainting, stroke symptoms, or another emergency concern, call 911 or seek emergency care.`
}

async function createFeedInspiredDraft(supabase: SupabaseClient, now: Date) {
  const item = await findBestFeedItem()
  if (!item) return null

  const title = `PulsePoint Perspective: ${item.title}`.slice(0, 190)
  const baseSlug = datedSlug(title, now)
  const createdAt = now.toISOString()

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug, title')
    .eq('slug', baseSlug)
    .maybeSingle()

  if (existing) {
    return {
      created: false,
      post: existing,
      message: 'An RSS-inspired draft for this topic already exists.',
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: baseSlug,
      title,
      excerpt:
        'A detailed educational PulsePoint perspective inspired by a recent cardiovascular source, prepared for clinical review before publication.',
      body_md: buildFeedInspiredBody(item),
      author: PULSEPOINT_AUTHOR,
      tags: Array.from(new Set(['rss-inspired', ...item.tags])),
      is_published: false,
      created_at: createdAt,
      updated_at: createdAt,
    })
    .select('id, slug, title')
    .single()

  if (error) {
    throw error
  }

  return {
    created: true,
    post: data,
    message: `Created an RSS-inspired draft from ${item.sourceName}.`,
  }
}

function datedSlug(title: string, date: Date) {
  const stamp = date.toISOString().slice(0, 10)
  return `${slugify(title)}-${stamp}`.slice(0, 120)
}

export async function createAutomatedBlogDraft(
  supabase: SupabaseClient,
  now = new Date()
) {
  const feedDraft = await createFeedInspiredDraft(supabase, now)
  if (feedDraft) return feedDraft

  const topic = TOPICS[getWeekIndex(now) % TOPICS.length]
  const baseSlug = datedSlug(topic.title, now)
  const createdAt = now.toISOString()

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug, title')
    .eq('slug', baseSlug)
    .maybeSingle()

  if (existing) {
    return {
      created: false,
      post: existing,
      message: 'A draft for this scheduled topic already exists.',
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: baseSlug,
      title: topic.title,
      excerpt: topic.excerpt,
      body_md: buildBody(topic),
      author: PULSEPOINT_AUTHOR,
      tags: topic.tags,
      is_published: false,
      created_at: createdAt,
      updated_at: createdAt,
    })
    .select('id, slug, title')
    .single()

  if (error) {
    throw error
  }

  return {
    created: true,
    post: data,
    message: `Created a new ${topic.pillar} draft.`,
  }
}

export async function autoPublishUnreviewedDrafts(
  supabase: SupabaseClient,
  now = new Date(),
  hours = getAutoPublishAfterHours()
) {
  const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString()
  const publishedAt = now.toISOString()

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      is_published: true,
      published_at: publishedAt,
      updated_at: publishedAt,
    })
    .eq('is_published', false)
    .lte('created_at', cutoff)
    .select('id, slug, title')

  if (error) {
    throw error
  }

  return {
    published: data?.length ?? 0,
    posts: data ?? [],
    message:
      data && data.length > 0
        ? `Auto-published ${data.length} unreviewed draft${data.length === 1 ? '' : 's'}.`
        : `No drafts older than ${hours} hours were ready to auto-publish.`,
  }
}
