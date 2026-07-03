/**
 * Autonomous SEO Engine — Keyword Research & Competitor Intelligence
 * Generates keyword opportunities, analyzes competitors, finds content gaps
 */

import type {
  KeywordOpportunity,
  ContentGap,
  CompetitorPage,
  SearchIntent,
} from '@/lib/seo-engine/types'

// ──────────────────────────────────────────────
// 1. KEYWORD RESEARCH MODULE
// ──────────────────────────────────────────────

const LOCAL_KEYWORD_PATTERNS = {
  columbia: [
    'cardiologist {service} Columbia MO',
    '{condition} doctor Columbia Missouri',
    'heart {service} near me Columbia',
    '{condition} treatment Columbia MO',
    'best {specialty} Columbia Missouri',
    '{procedure} Columbia MO cardiology',
  ],
  'central-missouri': [
    'cardiologist Central Missouri',
    'heart doctor {city} Missouri',
    'cardiovascular care {region}',
    '{condition} specialist Missouri',
  ],
  missouri: [
    'best cardiologist Missouri',
    'preventive cardiology Missouri',
    'heart screening Missouri',
    'cardiovascular wellness Missouri',
  ],
  national: [
    '{condition} warning signs',
    'how to prevent {condition}',
    'what causes {condition}',
    '{condition} vs {condition}',
    'normal {metric} range',
  ],
}

const CONDITION_KEYWORDS = [
  'heart disease', 'heart attack', 'heart failure', 'atrial fibrillation',
  'hypertension', 'high blood pressure', 'high cholesterol', 'coronary artery disease',
  'stroke', 'peripheral artery disease', 'varicose veins', 'deep vein thrombosis',
  'diabetes', 'metabolic syndrome', 'obesity', 'sleep apnea',
]

const SERVICE_KEYWORDS = [
  'echocardiogram', 'stress test', 'cardiac CT', 'calcium scoring',
  'vascular ultrasound', 'heart rhythm monitoring', 'holter monitor',
  'preventive cardiology', 'executive physical', 'heart screening',
  'lipid management', 'weight loss', 'cardiometabolic',
]

const QUESTION_KEYWORDS = [
  'what is', 'how to', 'why does', 'when should', 'what causes',
  'signs of', 'symptoms of', 'difference between', 'best way to',
  'how much', 'how long', 'is it normal',
]

/**
 * Generate keyword opportunities from research patterns.
 * In production, this would integrate with APIs (DataForSEO, Ahrefs, SEMrush).
 */
export function generateKeywordOpportunities(
  geoTarget: 'columbia' | 'central-missouri' | 'missouri' | 'national' = 'columbia',
  limit: number = 50
): KeywordOpportunity[] {
  const opportunities: KeywordOpportunity[] = []
  const patterns = LOCAL_KEYWORD_PATTERNS[geoTarget]

  // Generate from condition + service combinations
  for (const condition of CONDITION_KEYWORDS) {
    for (const pattern of patterns.slice(0, 4)) {
      const keyword = pattern
        .replace('{condition}', condition)
        .replace('{service}', SERVICE_KEYWORDS[Math.floor(Math.random() * SERVICE_KEYWORDS.length)])
        .replace('{specialty}', 'cardiologist')
        .replace('{procedure}', SERVICE_KEYWORDS[Math.floor(Math.random() * SERVICE_KEYWORDS.length)])
        .replace('{city}', 'Columbia')
        .replace('{region}', 'Central Missouri')

      opportunities.push({
        keyword,
        volume: estimateSearchVolume(keyword, geoTarget),
        difficulty: estimateDifficulty(keyword, geoTarget),
        cpc: estimateCpc(keyword),
        intent: classifyIntent(keyword),
        currentRanking: null,
        competitors: [],
        opportunityScore: calculateOpportunityScore(keyword, geoTarget),
        source: 'ai-research',
        geoTarget,
      })
    }
  }

  // Generate question-based long-tail keywords
  for (const question of QUESTION_KEYWORDS) {
    for (const condition of CONDITION_KEYWORDS.slice(0, 8)) {
      const keyword = `${question} ${condition}`
      opportunities.push({
        keyword,
        volume: Math.floor(estimateSearchVolume(keyword, geoTarget) * 0.4), // Lower volume
        difficulty: Math.floor(estimateDifficulty(keyword, geoTarget) * 0.6), // Lower difficulty
        cpc: estimateCpc(keyword),
        intent: 'informational',
        currentRanking: null,
        competitors: [],
        opportunityScore: calculateOpportunityScore(keyword, geoTarget) + 15, // Boost for long-tail
        source: 'long-tail',
        geoTarget,
      })
    }
  }

  // Sort by opportunity score descending, return top N
  return opportunities
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, limit)
}

function estimateSearchVolume(keyword: string, geo: string): number {
  // Simulated volume estimation based on keyword characteristics
  // In production: DataForSEO / Ahrefs / GSC API
  const baseVolume = keyword.length < 30 ? 1200 : keyword.length < 50 ? 400 : 150
  const geoMultiplier = geo === 'columbia' ? 0.3 : geo === 'central-missouri' ? 0.5 : geo === 'missouri' ? 0.8 : 1.5
  const questionBoost = QUESTION_KEYWORDS.some(q => keyword.includes(q)) ? 0.7 : 1.0
  return Math.floor(baseVolume * geoMultiplier * questionBoost * (0.8 + Math.random() * 0.4))
}

function estimateDifficulty(keyword: string, geo: string): number {
  // Simulated difficulty score (0-100)
  const baseDifficulty = keyword.split(' ').length <= 3 ? 65 : keyword.split(' ').length <= 5 ? 45 : 25
  const geoModifier = geo === 'national' ? 15 : geo === 'missouri' ? -10 : geo === 'central-missouri' ? -20 : -30
  return Math.min(100, Math.max(0, baseDifficulty + geoModifier + Math.floor(Math.random() * 10 - 5)))
}

function estimateCpc(keyword: string): number | null {
  // Medical keywords have high CPC
  const hasMedical = /cardio|heart|doctor|specialist|clinic/i.test(keyword)
  return hasMedical ? parseFloat((2.5 + Math.random() * 8).toFixed(2)) : null
}

function classifyIntent(keyword: string): SearchIntent {
  if (/doctor|clinic|specialist|appointment|book|schedule|cost|price|near me/i.test(keyword)) return 'commercial'
  if (/buy|purchase|pay|insurance|consultation/i.test(keyword)) return 'transactional'
  if (/columbia|missouri|near|local|zip|65203/i.test(keyword)) return 'local'
  return 'informational'
}

function calculateOpportunityScore(keyword: string, geo: string): number {
  const volume = estimateSearchVolume(keyword, geo)
  const difficulty = estimateDifficulty(keyword, geo)
  const intentValue = classifyIntent(keyword) === 'local' ? 1.5 : classifyIntent(keyword) === 'commercial' ? 1.3 : 1.0
  const medicalBonus = /cardio|heart|preventive|screening|specialist/i.test(keyword) ? 20 : 0
  const localBonus = geo === 'columbia' ? 25 : geo === 'central-missouri' ? 15 : 0

  const score = (volume / 50) * (1 - difficulty / 100) * intentValue * 10 + medicalBonus + localBonus
  return Math.min(100, Math.round(score))
}

// ──────────────────────────────────────────────
// 2. COMPETITOR ANALYSIS MODULE
// ──────────────────────────────────────────────

/**
 * Simulate competitor analysis for a target keyword.
 * In production: scrape + analyze SERP results via ScrapingBee/SerpAPI.
 */
export async function analyzeCompetitors(keyword: string): Promise<CompetitorPage[]> {
  // Simulated competitor data
  const competitorTemplates = [
    {
      domain: 'universityhealth.org',
      basePath: '/heart-care/',
      avgWordCount: 1800,
      hasSchema: true,
      hasFaq: Math.random() > 0.5,
      backlinkRange: [200, 800],
    },
    {
      domain: 'muhealth.org',
      basePath: '/cardiology/',
      avgWordCount: 2200,
      hasSchema: true,
      hasFaq: Math.random() > 0.3,
      backlinkRange: [500, 2000],
    },
    {
      domain: 'mayoclinic.org',
      basePath: '/diseases-conditions/',
      avgWordCount: 3500,
      hasSchema: true,
      hasFaq: true,
      backlinkRange: [5000, 50000],
    },
    {
      domain: 'heart.org',
      basePath: '/en/health-topics/',
      avgWordCount: 1500,
      hasSchema: true,
      hasFaq: true,
      backlinkRange: [1000, 10000],
    },
    {
      domain: 'healthline.com',
      basePath: '/health/',
      avgWordCount: 2500,
      hasSchema: true,
      hasFaq: true,
      backlinkRange: [2000, 20000],
    },
  ]

  return competitorTemplates.map((template) => {
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)
    const wordCount = template.avgWordCount + Math.floor(Math.random() * 400 - 200)
    const headingCount = Math.floor(wordCount / 250)
    const backlinkEstimate = template.backlinkRange[0] + Math.floor(Math.random() * (template.backlinkRange[1] - template.backlinkRange[0]))

    return {
      url: `https://${template.domain}${template.basePath}${slug}`,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - ${template.domain.split('.')[0].charAt(0).toUpperCase() + template.domain.split('.')[0].slice(1)}`,
      wordCount: Math.max(800, wordCount),
      headingCount: Math.max(3, headingCount),
      hasSchema: template.hasSchema,
      hasFaq: template.hasFaq,
      publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      backlinkEstimate,
      contentGaps: generateContentGaps(template.domain, keyword),
    }
  })
}

function generateContentGaps(domain: string, keyword: string): string[] {
  const gaps: string[] = []
  if (!/local|Columbia|Missouri|Boone County/i.test(keyword)) {
    gaps.push('Local Columbia/Missouri context')
  }
  if (!/preventive|prevention/i.test(keyword)) {
    gaps.push('Preventive cardiology angle')
  }
  if (!/executive|premium/i.test(keyword)) {
    gaps.push('Executive/premium care perspective')
  }
  if (!/patient|experience|what to expect/i.test(keyword)) {
    gaps.push('Patient experience and what to expect')
  }
  if (!/insurance|cost|afford/i.test(keyword)) {
    gaps.push('Insurance and cost information')
  }
  return gaps
}

// ──────────────────────────────────────────────
// 3. CONTENT GAP ANALYSIS
// ──────────────────────────────────────────────

/**
 * Identify content gaps by comparing our existing coverage vs competitors.
 */
export async function analyzeContentGaps(
  existingSlugs: string[],
  targetKeywords: string[]
): Promise<ContentGap[]> {
  const gaps: ContentGap[] = []

  for (const keyword of targetKeywords) {
    const competitors = await analyzeCompetitors(keyword)
    const hasCoverage = existingSlugs.some(slug =>
      slug.toLowerCase().includes(keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    )

    const ourCoverage = hasCoverage
      ? (Math.random() > 0.7 ? 'outdated' : 'thin')
      : 'none'

    const allGaps = competitors.flatMap(c => c.contentGaps)
    const uniqueGaps = Array.from(new Set(allGaps))

    gaps.push({
      keyword,
      competingPages: competitors,
      ourCoverage,
      recommendedAction: ourCoverage === 'none' ? 'create-new' : 'refresh-existing',
      priority: calculateGapPriority(keyword, competitors, ourCoverage),
    })
  }

  return gaps.sort((a, b) => b.priority - a.priority)
}

function calculateGapPriority(
  keyword: string,
  competitors: CompetitorPage[],
  coverage: string
): number {
  const avgBacklinks = competitors.reduce((sum, c) => sum + c.backlinkEstimate, 0) / competitors.length
  const avgWordCount = competitors.reduce((sum, c) => sum + c.wordCount, 0) / competitors.length
  const hasWeakCompetitors = competitors.some(c => c.wordCount < 1500 && c.backlinkEstimate < 500)

  let score = 50
  score += avgBacklinks < 1000 ? 20 : 0 // Easier to compete
  score += avgWordCount < 2000 ? 15 : 0 // Content opportunity
  score += hasWeakCompetitors ? 15 : 0
  score += coverage === 'none' ? 10 : coverage === 'thin' ? 5 : 0
  score += /columbia|missouri|central missouri/i.test(keyword) ? 20 : 0 // Local priority

  return Math.min(100, score)
}

// ──────────────────────────────────────────────
// 4. TRENDING & SEASONAL KEYWORDS
// ──────────────────────────────────────────────

export function getSeasonalOpportunities(month: number): KeywordOpportunity[] {
  const seasonal: KeywordOpportunity[] = []

  // Heart Month (February)
  if (month === 2) {
    seasonal.push(
      createTrendOpportunity('heart health month Columbia MO', 'local-seo', 95),
      createTrendOpportunity('heart disease awareness month Missouri', 'local-seo', 90),
      createTrendOpportunity('free heart screening February Columbia', 'local-seo', 85),
    )
  }

  // New Year health resolutions (January)
  if (month === 1) {
    seasonal.push(
      createTrendOpportunity('heart healthy new year resolutions Columbia', 'trend', 92),
      createTrendOpportunity('preventive cardiology new year Missouri', 'trend', 85),
    )
  }

  // Summer activity (June-August)
  if (month >= 6 && month <= 8) {
    seasonal.push(
      createTrendOpportunity('exercise heart safety summer Columbia', 'trend', 80),
      createTrendOpportunity('heat and heart disease Missouri', 'trend', 85),
    )
  }

  // Holiday stress (November-December)
  if (month >= 11) {
    seasonal.push(
      createTrendOpportunity('holiday stress heart health Columbia', 'trend', 82),
      createTrendOpportunity('eating healthy holidays heart Missouri', 'trend', 78),
    )
  }

  return seasonal
}

function createTrendOpportunity(
  keyword: string,
  source: 'trend' | 'local-seo' | 'long-tail' | 'gap-analysis',
  opportunityScore: number
): KeywordOpportunity {
  return {
    keyword,
    volume: Math.floor(300 + Math.random() * 700),
    difficulty: Math.floor(25 + Math.random() * 35),
    cpc: parseFloat((3 + Math.random() * 5).toFixed(2)),
    intent: 'informational',
    currentRanking: null,
    competitors: [],
    opportunityScore,
    source,
    geoTarget: 'columbia',
    seasonality: source === 'trend' ? 'seasonal' : undefined,
  }
}

// ──────────────────────────────────────────────
// 5. EMERGING TOPIC DETECTION
// ──────────────────────────────────────────────

export function detectEmergingTopics(): KeywordOpportunity[] {
  const emerging = [
    'AI in cardiology diagnosis',
    'wearable heart monitors accuracy',
    'remote patient monitoring cardiology',
    'personalized heart health plans',
    'genetic testing heart disease risk',
    'inflammation and heart disease',
    'gut health heart connection',
    'sleep apnea cardiovascular risk',
    'microbiome heart health',
    'GLP-1 medications heart benefits',
  ]

  return emerging.map(topic => ({
    keyword: topic,
    volume: Math.floor(200 + Math.random() * 800),
    difficulty: Math.floor(20 + Math.random() * 40),
    cpc: parseFloat((2 + Math.random() * 4).toFixed(2)),
    intent: 'informational' as SearchIntent,
    currentRanking: null,
    competitors: [],
    opportunityScore: Math.floor(70 + Math.random() * 25),
    source: 'ai-research' as const,
    geoTarget: 'national' as const,
  }))
}

// ──────────────────────────────────────────────
// 6. KEYWORD CANNIBALIZATION DETECTION
// ──────────────────────────────────────────────

export function detectKeywordCannibalization(
  existingArticles: { slug: string; title: string; keywords: string[] }[]
): { keyword: string; competingSlugs: string[]; recommendation: string }[] {
  const keywordMap = new Map<string, string[]>()

  for (const article of existingArticles) {
    for (const kw of article.keywords) {
      const normalized = kw.toLowerCase().trim()
      const existing = keywordMap.get(normalized) || []
      existing.push(article.slug)
      keywordMap.set(normalized, existing)
    }
  }

  const cannibalization: { keyword: string; competingSlugs: string[]; recommendation: string }[] = []

  for (const [keyword, slugs] of keywordMap) {
    if (slugs.length > 1) {
      cannibalization.push({
        keyword,
        competingSlugs: slugs,
        recommendation: slugs.length > 2
          ? `Merge ${slugs.length} competing articles into one authoritative pillar page`
          : `Differentiate angle: make one article focus on "prevention" and the other on "treatment"`,
      })
    }
  }

  return cannibalization.sort((a, b) => b.competingSlugs.length - a.competingSlugs.length)
}
