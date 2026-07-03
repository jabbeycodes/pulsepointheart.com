/**
 * Autonomous SEO Engine — Analytics & Performance Tracking
 * Monitors article performance and feeds data back into content strategy
 */

import type { PerformanceMetric, ContentStrategy } from '@/lib/seo-engine/types'

// ──────────────────────────────────────────────
// 1. PERFORMANCE TRACKER
// ──────────────────────────────────────────────

/**
 * Simulated performance metrics.
 * In production: integrate with Google Search Console API, GA4 API.
 */
export async function fetchArticleMetrics(
  slug: string,
  days: number = 30
): Promise<PerformanceMetric | null> {
  // Simulated data — replace with actual API calls
  const baseImpressions = Math.floor(500 + Math.random() * 5000)
  const ctr = parseFloat((0.5 + Math.random() * 5).toFixed(2))
  const clicks = Math.floor(baseImpressions * (ctr / 100))

  return {
    articleId: slug,
    slug,
    date: new Date().toISOString().slice(0, 10),
    impressions: baseImpressions,
    clicks,
    ctr,
    averagePosition: parseFloat((5 + Math.random() * 25).toFixed(1)),
    timeOnPage: Math.floor(120 + Math.random() * 300),
    bounceRate: parseFloat((30 + Math.random() * 50).toFixed(1)),
    conversions: Math.floor(clicks * 0.05),
    indexed: true,
  }
}

/**
 * Fetch metrics for all articles.
 */
export async function fetchAllArticleMetrics(
  slugs: string[]
): Promise<PerformanceMetric[]> {
  const metrics: PerformanceMetric[] = []

  for (const slug of slugs) {
    const metric = await fetchArticleMetrics(slug)
    if (metric) metrics.push(metric)
  }

  return metrics.sort((a, b) => b.clicks - a.clicks)
}

// ──────────────────────────────────────────────
// 2. PERFORMANCE ANALYSIS
// ──────────────────────────────────────────────

export type PerformanceAnalysis = {
  topPerformers: PerformanceMetric[]
  underperformers: PerformanceMetric[]
  ctrOpportunities: PerformanceMetric[] // High impressions, low CTR
  rankingOpportunities: PerformanceMetric[] // Position 11-20 (page 2)
  contentDecay: PerformanceMetric[] // Declining over time
  recommendations: string[]
}

export function analyzePerformance(
  metrics: PerformanceMetric[]
): PerformanceAnalysis {
  const sortedByClicks = [...metrics].sort((a, b) => b.clicks - a.clicks)
  const topPerformers = sortedByClicks.slice(0, 5)
  const underperformers = sortedByClicks.slice(-5)

  // High impressions, low CTR = title/meta optimization opportunity
  const ctrOpportunities = metrics.filter(
    (m) => m.impressions > 1000 && m.ctr < 2
  )

  // Position 11-20 = page 2 opportunity (small push can get page 1)
  const rankingOpportunities = metrics.filter(
    (m) => m.averagePosition !== null && m.averagePosition >= 11 && m.averagePosition <= 20
  )

  // Content decay: articles with declining performance
  // (Would need historical data in production)
  const contentDecay = metrics.filter(
    (m) => m.averagePosition !== null && m.averagePosition > 30 && m.ctr < 1
  )

  const recommendations = generateRecommendations({
    topPerformers,
    ctrOpportunities,
    rankingOpportunities,
    contentDecay,
  })

  return {
    topPerformers,
    underperformers,
    ctrOpportunities,
    rankingOpportunities,
    contentDecay,
    recommendations,
  }
}

function generateRecommendations(analysis: {
  topPerformers: PerformanceMetric[]
  ctrOpportunities: PerformanceMetric[]
  rankingOpportunities: PerformanceMetric[]
  contentDecay: PerformanceMetric[]
}): string[] {
  const recommendations: string[] = []

  if (analysis.ctrOpportunities.length > 0) {
    recommendations.push(
      `Optimize ${analysis.ctrOpportunities.length} articles with high impressions but low CTR. Update titles and meta descriptions.`
    )
  }

  if (analysis.rankingOpportunities.length > 0) {
    recommendations.push(
      `Content expansion opportunity: ${analysis.rankingOpportunities.length} articles on page 2. Add depth and internal links to push to page 1.`
    )
  }

  if (analysis.contentDecay.length > 0) {
    recommendations.push(
      `Refresh ${analysis.contentDecay.length} decaying articles. Update statistics, add new sections, improve internal linking.`
    )
  }

  if (analysis.topPerformers.length > 0) {
    recommendations.push(
      `Create supporting content around top performers: ${analysis.topPerformers.map((m) => m.slug).join(', ')}`
    )
  }

  return recommendations
}

// ──────────────────────────────────────────────
// 3. SELF-IMPROVEMENT LOOP
// ──────────────────────────────────────────────

export type StrategyAdjustment = {
  reason: string
  action: string
  priority: number
  expectedImpact: string
}

/**
 * Analyze performance and adjust content strategy accordingly.
 */
export function adjustStrategyBasedOnPerformance(
  currentStrategy: ContentStrategy,
  analysis: PerformanceAnalysis
): { updatedStrategy: ContentStrategy; adjustments: StrategyAdjustment[] } {
  const adjustments: StrategyAdjustment[] = []
  const updatedStrategy = { ...currentStrategy }

  // 1. Double down on winning topics
  const topPillars = analysis.topPerformers
    .map((m) => extractPillarFromSlug(m.slug))
    .filter(Boolean) as string[]

  if (topPillars.length > 0) {
    adjustments.push({
      reason: `Top performing content in pillars: ${[...new Set(topPillars)].join(', ')}`,
      action: 'Increase topic generation in these pillars. Create related subtopics and FAQs.',
      priority: 90,
      expectedImpact: 'Capture more search volume in proven topic areas',
    })
  }

  // 2. Fix underperformers
  if (analysis.ctrOpportunities.length > 0) {
    adjustments.push({
      reason: `${analysis.ctrOpportunities.length} articles have high impressions but low CTR`,
      action: 'A/B test titles and meta descriptions. Make them more compelling with local context.',
      priority: 85,
      expectedImpact: 'Increase CTR by 20-50% without changing rankings',
    })
  }

  // 3. Push page-2 content to page-1
  if (analysis.rankingOpportunities.length > 0) {
    adjustments.push({
      reason: `${analysis.rankingOpportunities.length} articles ranking on page 2`,
      action: 'Expand content by 500+ words. Add FAQ schema. Strengthen internal linking from high-authority pages.',
      priority: 80,
      expectedImpact: 'Move 2-3 articles from page 2 to page 1',
    })
  }

  // 4. Refresh decaying content
  if (analysis.contentDecay.length > 0) {
    adjustments.push({
      reason: `${analysis.contentDecay.length} articles showing performance decay`,
      action: 'Full content refresh: update statistics, add new sections, optimize for current search intent.',
      priority: 75,
      expectedImpact: 'Restore rankings and regain lost traffic',
    })
  }

  // 5. Geographic expansion signals
  const hasStrongLocalPerformance = analysis.topPerformers.some((m) =>
    /columbia|missouri|boone/i.test(m.slug)
  )
  if (hasStrongLocalPerformance && currentStrategy.phase === 'local-dominance') {
    adjustments.push({
      reason: 'Strong local rankings achieved. Ready for expansion.',
      action: 'Begin targeting broader Missouri keywords. Add Jefferson City, Fulton, Moberly geo-modifiers.',
      priority: 70,
      expectedImpact: 'Expand addressable market by 40%',
    })

    // Auto-advance phase if criteria met
    if (analysis.topPerformers.length >= 3) {
      updatedStrategy.phase = 'regional-expansion'
    }
  }

  // 6. Seasonal adjustments
  const month = new Date().getMonth() + 1
  if (month === 2) {
    adjustments.push({
      reason: 'American Heart Month (February)',
      action: 'Generate heart-awareness content. Promote screening events. Increase posting frequency temporarily.',
      priority: 95,
      expectedImpact: 'Capture seasonal search volume spike',
    })
  }

  return { updatedStrategy, adjustments }
}

function extractPillarFromSlug(slug: string): string | null {
  const pillarMap: Record<string, string> = {
    'preventive-cardiology': 'Preventive Cardiology',
    'heart-attack': 'Warning Signs',
    'blood-pressure': 'Blood Pressure',
    hypertension: 'Blood Pressure',
    cholesterol: 'Cholesterol',
    diabetes: 'Diabetes and Heart Health',
    stroke: 'Stroke Prevention',
    'heart-failure': 'Heart Failure',
    'heart-rhythm': 'Heart Rhythm Monitoring',
    executive: 'Executive Heart Health',
    'cardio-metabolic': 'Cardiometabolic Wellness',
    'longevity-focused': 'Longevity-Focused Care',
    'women-heart': 'Women and Heart Disease',
    exercise: 'Exercise and Heart Health',
    stress: 'Stress and Heart Health',
    'vein-vascular': 'Vein and Vascular',
  }

  for (const [key, pillar] of Object.entries(pillarMap)) {
    if (slug.includes(key)) return pillar
  }
  return null
}

// ──────────────────────────────────────────────
// 4. MONTHLY REPORT GENERATOR
// ──────────────────────────────────────────────

export type MonthlyReport = {
  month: string
  totalArticles: number
  totalClicks: number
  totalImpressions: number
  avgCtr: number
  avgPosition: number
  topKeywords: string[]
  newRankings: number
  contentRefreshes: number
  strategyPhase: string
  keyWins: string[]
  actionItems: string[]
}

export function generateMonthlyReport(
  metrics: PerformanceMetric[],
  strategy: ContentStrategy,
  adjustments: StrategyAdjustment[]
): MonthlyReport {
  const totalClicks = metrics.reduce((sum, m) => sum + m.clicks, 0)
  const totalImpressions = metrics.reduce((sum, m) => sum + m.impressions, 0)
  const avgCtr = totalImpressions > 0 ? parseFloat(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0
  const avgPosition =
    metrics.filter((m) => m.averagePosition !== null).length > 0
      ? parseFloat(
          (
            metrics
              .filter((m) => m.averagePosition !== null)
              .reduce((sum, m) => sum + (m.averagePosition as number), 0) /
            metrics.filter((m) => m.averagePosition !== null).length
          ).toFixed(1)
        )
      : 0

  const now = new Date()
  const monthName = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  return {
    month: monthName,
    totalArticles: metrics.length,
    totalClicks,
    totalImpressions,
    avgCtr,
    avgPosition,
    topKeywords: metrics.slice(0, 5).map((m) => m.slug),
    newRankings: metrics.filter((m) => m.averagePosition !== null && m.averagePosition <= 10).length,
    contentRefreshes: adjustments.filter((a) => a.action.includes('refresh')).length,
    strategyPhase: strategy.phase,
    keyWins: [
      `${totalClicks} organic clicks generated`,
      `${metrics.filter((m) => m.averagePosition !== null && m.averagePosition <= 10).length} articles ranking on page 1`,
      `${metrics.filter((m) => m.indexed).length}/${metrics.length} articles indexed`,
    ],
    actionItems: adjustments.map((a) => `[P${a.priority}] ${a.action}`),
  }
}

// ──────────────────────────────────────────────
// 5. TECHNICAL SEO MONITORING
// ──────────────────────────────────────────────

export type TechnicalIssue = {
  type: 'critical' | 'warning' | 'opportunity'
  category: 'indexing' | 'performance' | 'mobile' | 'schema' | 'security'
  description: string
  affectedUrls: string[]
  recommendation: string
}

export async function runTechnicalAudit(): Promise<TechnicalIssue[]> {
  const issues: TechnicalIssue[] = []

  // Simulated checks — in production, use PageSpeed Insights, GSC, etc.
  issues.push({
    type: 'opportunity',
    category: 'schema',
    description: 'Add FAQ schema to blog posts with FAQ sections',
    affectedUrls: ['/blog/*'],
    recommendation: 'Implement FAQPage JSON-LD for all posts with 2+ FAQs',
  })

  issues.push({
    type: 'warning',
    category: 'performance',
    description: 'Consider implementing Core Web Vitals optimization',
    affectedUrls: ['/'],
    recommendation: 'Audit LCP, FID, CLS scores and optimize images/scripts',
  })

  issues.push({
    type: 'opportunity',
    category: 'indexing',
    description: 'Submit sitemap more frequently to Google',
    affectedUrls: ['/sitemap.xml'],
    recommendation: 'Automate sitemap submission after each publication',
  })

  return issues
}
