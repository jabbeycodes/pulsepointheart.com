/**
 * Autonomous SEO Engine — Shared Types
 * Medical-grade content pipeline for PulsePoint Clinic
 */

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'local'

export type KeywordOpportunity = {
  keyword: string
  volume: number          // Estimated monthly search volume
  difficulty: number      // 0-100 competitive difficulty score
  cpc: number | null      // Estimated cost-per-click
  intent: SearchIntent
  currentRanking: number | null  // If already ranking
  competitors: string[]   // URLs ranking for this keyword
  opportunityScore: number // 0-100 composite score
  source: 'ai-research' | 'trend' | 'gap-analysis' | 'long-tail' | 'local-seo'
  geoTarget: 'columbia' | 'central-missouri' | 'missouri' | 'national'
  seasonality?: string   // e.g., 'heart-month', 'new-year', 'back-to-school'
}

export type CompetitorPage = {
  url: string
  title: string
  wordCount: number
  headingCount: number
  hasSchema: boolean
  hasFaq: boolean
  publishedAt: string | null
  backlinkEstimate: number
  contentGaps: string[]   // Subtopics they DON'T cover
}

export type ContentGap = {
  keyword: string
  competingPages: CompetitorPage[]
  ourCoverage: 'none' | 'thin' | 'outdated' | 'competitive'
  recommendedAction: 'create-new' | 'refresh-existing' | 'merge-topics'
  priority: number         // 0-100
}

export type PillarCategory =
  | 'Preventive Cardiology'
  | 'Advanced Diagnostics'
  | 'Cardiometabolic Wellness'
  | 'Executive Heart Health'
  | 'Heart Rhythm Monitoring'
  | 'Longevity-Focused Care'
  | 'Causes of Heart Disease'
  | 'Warning Signs'
  | 'Blood Pressure'
  | 'Cholesterol'
  | 'Diabetes and Heart Health'
  | 'Stroke Prevention'
  | 'Heart Failure'
  | 'Women and Heart Disease'
  | 'Exercise and Heart Health'
  | 'Stress and Heart Health'
  | 'Vein and Vascular'
  | 'Local SEO'

export type ArticleTopic = {
  id: string
  pillar: PillarCategory
  title: string
  targetKeyword: string
  secondaryKeywords: string[]
  semanticEntities: string[]
  geoTarget: 'columbia' | 'central-missouri' | 'missouri' | 'national'
  intent: SearchIntent
  patientPersona: 'general' | 'executive' | 'women' | 'senior' | 'diabetic' | 'athlete'
  contentAngle: string     // Unique angle vs competitors
  competitorUrls: string[] // What we're competing against
  estimatedWordCount: number
  suggestedSections: string[]
  requiresPhysicianReview: boolean // Always true for medical content
  source: string
  createdAt: string
}

export type ArticleDraft = {
  id: string
  topicId: string
  targetKeyword: string
  status: 'draft' | 'physician-review' | 'approved' | 'published' | 'archived'
  slug: string
  title: string
  excerpt: string
  bodyMd: string
  coverImagePrompt: string
  metaTitle: string
  metaDescription: string
  schemaRecommendations: string[]
  internalLinks: { anchor: string; url: string }[]
  externalReferences: { title: string; url: string }[]
  faqs: { question: string; answer: string }[]
  socialSnippets: { platform: 'x' | 'linkedin' | 'facebook'; text: string }[]
  keywordDensity: Record<string, number>
  readabilityScore: number  // Flesch Reading Ease
  physicianNotes: string | null
  reviewedBy: string | null
  reviewedAt: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type QualityReport = {
  draftId: string
  passed: boolean
  checks: {
    name: string
    passed: boolean
    score: number
    message: string
  }[]
  duplicateTopics: string[]
  keywordDensityIssues: string[]
  readabilityIssues: string[]
  internalLinkIssues: string[]
  factualFlags: string[]
}

export type PerformanceMetric = {
  articleId: string
  slug: string
  date: string
  impressions: number
  clicks: number
  ctr: number
  averagePosition: number | null
  timeOnPage: number | null
  bounceRate: number | null
  conversions: number
  indexed: boolean
}

export type ContentStrategy = {
  phase: 'local-dominance' | 'regional-expansion' | 'national-authority'
  primaryGeo: string
  targetPillars: PillarCategory[]
  weeklyCadence: number
  nextTopics: ArticleTopic[]
  refreshQueue: { slug: string; reason: string; priority: number }[]
}

export type SeoAuditResult = {
  siteHealth: number       // 0-100
  criticalIssues: string[]
  warnings: string[]
  opportunities: string[]
  technicalScore: number
  contentScore: number
  authorityScore: number
}
