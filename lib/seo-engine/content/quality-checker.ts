/**
 * Autonomous SEO Engine — Quality Assurance
 * Medical-grade content validation before physician review
 */

import type { ArticleDraft, QualityReport } from '@/lib/seo-engine/types'

// ──────────────────────────────────────────────
// 1. QUALITY CHECKER
// ──────────────────────────────────────────────

export function runQualityChecks(draft: ArticleDraft): QualityReport {
  const checks = [
    checkDuplicateTopic(draft),
    checkTitleQuality(draft),
    checkExcerptQuality(draft),
    checkHeadingHierarchy(draft),
    checkMetaData(draft),
    checkKeywordDensity(draft),
    checkReadability(draft),
    checkInternalLinks(draft),
    checkExternalReferences(draft),
    checkFaqPresence(draft),
    checkCtaPresence(draft),
    checkMedicalDisclaimer(draft),
    checkWordCount(draft),
  ]

  const passed = checks.every((c) => c.passed)
  const duplicateTopics = checks.find((c) => c.name === 'duplicate-topic')?.message
    ? [draft.title]
    : []

  const keywordDensityIssues = checks
    .filter((c) => c.name === 'keyword-density' && !c.passed)
    .map((c) => c.message)

  const readabilityIssues = checks
    .filter((c) => c.name === 'readability' && !c.passed)
    .map((c) => c.message)

  const internalLinkIssues = checks
    .filter((c) => c.name === 'internal-links' && !c.passed)
    .map((c) => c.message)

  const factualFlags = checks
    .filter((c) => c.name === 'medical-disclaimer' && !c.passed)
    .map((c) => c.message)

  return {
    draftId: draft.id,
    passed,
    checks,
    duplicateTopics,
    keywordDensityIssues,
    readabilityIssues,
    internalLinkIssues,
    factualFlags,
  }
}

// ──────────────────────────────────────────────
// 2. INDIVIDUAL CHECKS
// ──────────────────────────────────────────────

function checkDuplicateTopic(draft: ArticleDraft): QualityReport['checks'][number] {
  // In production, query existing topics from database
  // For now, check if title is too similar to common templates
  const titleLower = draft.title.toLowerCase()
  const isDuplicate = /template|sample|draft placeholder|lorem ipsum/i.test(titleLower)

  return {
    name: 'duplicate-topic',
    passed: !isDuplicate,
    score: isDuplicate ? 0 : 100,
    message: isDuplicate
      ? 'Title appears to be a template or duplicate'
      : 'Title is unique',
  }
}

function checkTitleQuality(draft: ArticleDraft): QualityReport['checks'][number] {
  const title = draft.title
  const hasKeyword = draft.targetKeyword && title.toLowerCase().includes(draft.targetKeyword.toLowerCase())
  const properLength = title.length >= 30 && title.length <= 70
  const isDescriptive = !/^(article|post|blog|draft)/i.test(title)

  const score = (hasKeyword ? 40 : 0) + (properLength ? 30 : 0) + (isDescriptive ? 30 : 0)

  return {
    name: 'title-quality',
    passed: score >= 70,
    score,
    message: score >= 70
      ? `Title quality score: ${score}/100`
      : `Title needs improvement (score: ${score}). ${!hasKeyword ? 'Include target keyword. ' : ''}${!properLength ? 'Keep between 30-70 characters. ' : ''}${!isDescriptive ? 'Avoid generic prefixes.' : ''}`,
  }
}

function checkExcerptQuality(draft: ArticleDraft): QualityReport['checks'][number] {
  const excerpt = draft.excerpt || ''
  const hasKeyword = draft.targetKeyword && excerpt.toLowerCase().includes(draft.targetKeyword.toLowerCase())
  const properLength = excerpt.length >= 120 && excerpt.length <= 300
  const hasCta = /consultation|appointment|schedule|contact|book/i.test(excerpt)

  const score = (hasKeyword ? 30 : 0) + (properLength ? 30 : 0) + (hasCta ? 20 : 0) + 20 // Base score for having an excerpt

  return {
    name: 'excerpt-quality',
    passed: score >= 60,
    score,
    message: score >= 60
      ? `Excerpt quality score: ${score}/100`
      : `Excerpt needs improvement (score: ${score}). ${!hasKeyword ? 'Include target keyword. ' : ''}${!properLength ? 'Keep between 120-300 characters. ' : ''}${!hasCta ? 'Add a soft call-to-action.' : ''}`,
  }
}

function checkHeadingHierarchy(draft: ArticleDraft): QualityReport['checks'][number] {
  const body = draft.bodyMd
  const hasH1 = /^# /m.test(body)
  const hasH2 = /^## /m.test(body)
  const hasH3 = /^### /m.test(body)
  const h2Count = (body.match(/^## /gm) || []).length
  const h3Count = (body.match(/^### /gm) || []).length

  const score = (hasH1 ? 25 : 0) + (hasH2 && h2Count >= 3 ? 25 : 0) + (hasH3 && h3Count >= 2 ? 25 : 0) + 25

  return {
    name: 'heading-hierarchy',
    passed: hasH1 && hasH2 && h2Count >= 3,
    score,
    message: hasH1 && hasH2 && h2Count >= 3
      ? `Good heading structure (${h2Count} H2, ${h3Count} H3)`
      : `Improve heading structure. Need H1 + at least 3 H2 headings. Currently: ${h2Count} H2, ${h3Count} H3`,
  }
}

function checkMetaData(draft: ArticleDraft): QualityReport['checks'][number] {
  const metaTitle = draft.metaTitle || ''
  const metaDesc = draft.metaDescription || ''

  const titleGood = metaTitle.length >= 30 && metaTitle.length <= 70
  const descGood = metaDesc.length >= 120 && metaDesc.length <= 160
  const titleHasKeyword = draft.targetKeyword && metaTitle.toLowerCase().includes(draft.targetKeyword.toLowerCase())

  const score = (titleGood ? 30 : 0) + (descGood ? 30 : 0) + (titleHasKeyword ? 40 : 0)

  return {
    name: 'meta-data',
    passed: titleGood && descGood,
    score,
    message: titleGood && descGood
      ? 'Meta title and description properly formatted'
      : `Fix meta data. Title: ${metaTitle.length} chars ${titleGood ? 'OK' : '(need 30-70)'}. Description: ${metaDesc.length} chars ${descGood ? 'OK' : '(need 120-160)'}.`,
  }
}

function checkKeywordDensity(draft: ArticleDraft): QualityReport['checks'][number] {
  const densities = draft.keywordDensity || {}
  const issues: string[] = []
  let totalScore = 100

  for (const [keyword, density] of Object.entries(densities)) {
    if (density > 3.0) {
      issues.push(`"${keyword}" density too high (${density}%). Target: 1-2%`)
      totalScore -= 20
    } else if (density < 0.5 && keyword === draft.targetKeyword) {
      issues.push(`Target keyword "${keyword}" density too low (${density}%)`)
      totalScore -= 15
    }
  }

  return {
    name: 'keyword-density',
    passed: issues.length === 0,
    score: Math.max(0, totalScore),
    message: issues.length === 0
      ? 'Keyword density within optimal range'
      : issues.join('; '),
  }
}

function checkReadability(draft: ArticleDraft): QualityReport['checks'][number] {
  const score = draft.readabilityScore || 50
  // Medical content should be readable but not oversimplified
  const passed = score >= 30 && score <= 70

  return {
    name: 'readability',
    passed,
    score,
    message: passed
      ? `Readability score: ${score} (good for medical content)`
      : `Readability score ${score} is outside optimal range (30-70) for medical content`,
  }
}

function checkInternalLinks(draft: ArticleDraft): QualityReport['checks'][number] {
  const links = draft.internalLinks || []
  const hasMinLinks = links.length >= 3
  const hasServiceLinks = links.some((l) => /services|book|contact|cardiologist/i.test(l.url))
  const hasVariedAnchors = new Set(links.map((l) => l.anchor)).size >= 3

  const score = (hasMinLinks ? 30 : 0) + (hasServiceLinks ? 35 : 0) + (hasVariedAnchors ? 35 : 0)

  return {
    name: 'internal-links',
    passed: hasMinLinks && hasServiceLinks,
    score,
    message: hasMinLinks && hasServiceLinks
      ? `${links.length} internal links with good distribution`
      : `Add internal links. Need 3+ including service/CTA links. Currently: ${links.length}`,
  }
}

function checkExternalReferences(draft: ArticleDraft): QualityReport['checks'][number] {
  const refs = draft.externalReferences || []
  const hasAuthoritative = refs.some((r) =>
    /heart\.org|acc\.org|cdc\.gov|nih\.gov|mayoclinic\.org|harvard\.edu/.test(r.url)
  )
  const hasMinRefs = refs.length >= 2

  const score = (hasMinRefs ? 40 : refs.length > 0 ? 20 : 0) + (hasAuthoritative ? 60 : 0)

  return {
    name: 'external-references',
    passed: hasMinRefs && hasAuthoritative,
    score,
    message: hasMinRefs && hasAuthoritative
      ? 'Authoritative external references included'
      : `Add 2+ authoritative references (AHA, ACC, CDC, Mayo). Currently: ${refs.length}`,
  }
}

function checkFaqPresence(draft: ArticleDraft): QualityReport['checks'][number] {
  const faqs = draft.faqs || []
  const hasMinFaqs = faqs.length >= 2
  const faqQuality = faqs.every((f) => f.question.length >= 20 && f.answer.length >= 80)

  const score = (hasMinFaqs ? 50 : faqs.length > 0 ? 25 : 0) + (faqQuality ? 50 : 0)

  return {
    name: 'faq-presence',
    passed: hasMinFaqs && faqQuality,
    score,
    message: hasMinFaqs && faqQuality
      ? `${faqs.length} quality FAQs included`
      : `Add 2+ quality FAQs. Currently: ${faqs.length}`,
  }
}

function checkCtaPresence(draft: ArticleDraft): QualityReport['checks'][number] {
  const body = draft.bodyMd.toLowerCase()
  const hasCta = /schedule|appointment|consultation|book|contact|call|visit|learn more/i.test(body)
  const hasPhone = /\(\d{3}\)|1-855|855-|573-/.test(draft.bodyMd)
  const hasLocalContext = /columbia|missouri|boone county|nifong|pulsepoint/i.test(body)

  const score = (hasCta ? 40 : 0) + (hasPhone ? 30 : 0) + (hasLocalContext ? 30 : 0)

  return {
    name: 'cta-presence',
    passed: hasCta && hasLocalContext,
    score,
    message: hasCta && hasLocalContext
      ? 'Strong calls-to-action with local context'
      : `Strengthen CTAs. ${!hasCta ? 'Add scheduling CTA. ' : ''}${!hasPhone ? 'Include phone number. ' : ''}${!hasLocalContext ? 'Add Columbia/Missouri context.' : ''}`,
  }
}

function checkMedicalDisclaimer(draft: ArticleDraft): QualityReport['checks'][number] {
  const body = draft.bodyMd.toLowerCase()
  const hasDisclaimer = /not a substitute for medical advice|not medical advice|consult your physician|consult your doctor|this article is for educational/i.test(body)
  const hasPhysicianReviewed = draft.status === 'physician-review' || draft.status === 'approved' || draft.status === 'published'

  const score = (hasDisclaimer ? 60 : 0) + (hasPhysicianReviewed ? 40 : 0)

  return {
    name: 'medical-disclaimer',
    passed: hasDisclaimer,
    score,
    message: hasDisclaimer
      ? 'Medical disclaimer present'
      : 'CRITICAL: Add medical disclaimer. "This article is for educational purposes and is not a substitute for professional medical advice. Consult your physician."',
  }
}

function checkWordCount(draft: ArticleDraft): QualityReport['checks'][number] {
  const words = draft.bodyMd.split(/\s+/).filter(Boolean).length
  const targetMin = 1200
  const targetMax = 2500
  const passed = words >= targetMin && words <= targetMax

  return {
    name: 'word-count',
    passed,
    score: passed ? 100 : words < targetMin ? Math.floor((words / targetMin) * 100) : Math.floor((targetMax / words) * 100),
    message: passed
      ? `Word count: ${words} (optimal range: ${targetMin}-${targetMax})`
      : `Word count ${words} is outside optimal range (${targetMin}-${targetMax}). ${words < targetMin ? 'Expand content.' : 'Consider trimming.'}`,
  }
}

// ──────────────────────────────────────────────
// 3. DUPLICATION DETECTOR
// ──────────────────────────────────────────────

/**
 * Check if a proposed topic already exists in our content library.
 * Uses fuzzy matching on title similarity.
 */
export function checkTopicUniqueness(
  proposedTitle: string,
  existingTitles: string[]
): { isUnique: boolean; similarTitles: string[]; similarityScores: number[] } {
  const normalizedProposed = normalizeTitle(proposedTitle)
  const similarTitles: string[] = []
  const similarityScores: number[] = []

  for (const existing of existingTitles) {
    const score = calculateTitleSimilarity(normalizedProposed, normalizeTitle(existing))
    if (score >= 0.7) {
      similarTitles.push(existing)
      similarityScores.push(score)
    }
  }

  return {
    isUnique: similarTitles.length === 0,
    similarTitles,
    similarityScores,
  }
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(the|a|an)\s+/i, '')
}

function calculateTitleSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.split(' '))
  const wordsB = new Set(b.split(' '))
  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)))
  const union = new Set([...wordsA, ...wordsB])
  return union.size > 0 ? intersection.size / union.size : 0
}

// ──────────────────────────────────────────────
// 4. CONTENT REFRESHER
// ──────────────────────────────────────────────

/**
 * Analyze existing content and recommend refreshes.
 */
export function analyzeContentForRefresh(
  existingArticles: {
    slug: string
    title: string
    publishedAt: string
    lastUpdated: string
    wordCount: number
    currentRanking: number | null
  }[]
): { slug: string; reason: string; priority: number }[] {
  const refreshQueue: { slug: string; reason: string; priority: number }[] = []

  for (const article of existingArticles) {
    const daysSincePublished = Math.floor(
      (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    )
    const daysSinceUpdated = Math.floor(
      (Date.now() - new Date(article.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
    )

    // Flag for refresh if:
    // 1. Older than 12 months and not updated in 6 months
    // 2. Ranking dropped below position 20
    // 3. Thin content (< 1000 words)
    // 4. Seasonal content due for update

    if (daysSincePublished > 365 && daysSinceUpdated > 180) {
      refreshQueue.push({
        slug: article.slug,
        reason: `Content is ${Math.floor(daysSincePublished / 30)} months old and hasn't been updated in ${Math.floor(daysSinceUpdated / 30)} months`,
        priority: 70,
      })
    }

    if (article.currentRanking !== null && article.currentRanking > 20) {
      refreshQueue.push({
        slug: article.slug,
        reason: `Ranking dropped to position ${article.currentRanking}. Needs optimization to regain visibility`,
        priority: 85,
      })
    }

    if (article.wordCount < 1000) {
      refreshQueue.push({
        slug: article.slug,
        reason: `Thin content (${article.wordCount} words). Expand to compete with top-ranking articles`,
        priority: 60,
      })
    }
  }

  return refreshQueue.sort((a, b) => b.priority - a.priority)
}
