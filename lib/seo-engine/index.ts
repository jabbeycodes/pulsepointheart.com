/**
 * Autonomous SEO Engine — Main Orchestrator
 * Entry point for the PulsePoint SEO content engine
 */

import type { ContentStrategy, ArticleTopic, ArticleDraft } from '@/lib/seo-engine/types'
import {
  generateKeywordOpportunities,
  analyzeContentGaps,
  detectKeywordCannibalization,
  getSeasonalOpportunities,
  detectEmergingTopics,
} from '@/lib/seo-engine/research/keyword-intelligence'
import { generateArticleTopic, rankTopicsByImpact } from '@/lib/seo-engine/content/generator'
import { runQualityChecks } from '@/lib/seo-engine/content/quality-checker'
import {
  runPublishingPipeline,
  saveDraftToSupabase,
  getExistingSlugs,
} from '@/lib/seo-engine/publish/orchestrator'
import {
  fetchAllArticleMetrics,
  analyzePerformance,
  adjustStrategyBasedOnPerformance,
  generateMonthlyReport,
  runTechnicalAudit,
} from '@/lib/seo-engine/analytics/performance'

// ──────────────────────────────────────────────
// 1. CONFIGURATION
// ──────────────────────────────────────────────

export type EngineConfig = {
  /** Content phase strategy */
  strategy: ContentStrategy
  /** Weekly publishing cadence (default: 4) */
  weeklyCadence: number
  /** Minimum article word count */
  minWordCount: number
  /** Maximum article word count */
  maxWordCount: number
  /** Require physician review before publish */
  requirePhysicianReview: boolean
  /** Auto-publish after review (if true) */
  autoPublishAfterReview: boolean
  /** Geographic focus for keyword research */
  geoTargets: Array<'columbia' | 'central-missouri' | 'missouri' | 'national'>
  /** Enable competitor analysis */
  enableCompetitorAnalysis: boolean
  /** Enable performance feedback loop */
  enablePerformanceLoop: boolean
}

export const DEFAULT_CONFIG: EngineConfig = {
  strategy: {
    phase: 'local-dominance',
    primaryGeo: 'Columbia, MO',
    targetPillars: [
      'Preventive Cardiology',
      'Advanced Diagnostics',
      'Cardiometabolic Wellness',
      'Blood Pressure',
      'Cholesterol',
      'Diabetes and Heart Health',
      'Local SEO',
    ],
    weeklyCadence: 4,
    nextTopics: [],
    refreshQueue: [],
  },
  weeklyCadence: 4,
  minWordCount: 1200,
  maxWordCount: 2500,
  requirePhysicianReview: true,
  autoPublishAfterReview: false,
  geoTargets: ['columbia', 'central-missouri'],
  enableCompetitorAnalysis: true,
  enablePerformanceLoop: true,
}

// ──────────────────────────────────────────────
// 2. MAIN ENGINE
// ──────────────────────────────────────────────

export type EngineRunResult = {
  phase: string
  topicsGenerated: number
  draftsCreated: number
  draftsSaved: number
  qualityIssues: string[]
  strategyAdjustments: string[]
  errors: string[]
}

/**
 * Run the full autonomous SEO engine cycle.
 * This is the main entry point — designed to run daily via cron or scheduler.
 */
export async function runAutonomousSEOEngine(
  config: EngineConfig = DEFAULT_CONFIG
): Promise<EngineRunResult> {
  const result: EngineRunResult = {
    phase: 'idle',
    topicsGenerated: 0,
    draftsCreated: 0,
    draftsSaved: 0,
    qualityIssues: [],
    strategyAdjustments: [],
    errors: [],
  }

  try {
    console.log('[seo-engine] Starting autonomous SEO engine cycle...')

    // ── PHASE 1: RESEARCH ──
    result.phase = 'research'
    console.log('[seo-engine] Phase 1: Research & Intelligence')

    const existingSlugs = await getExistingSlugs()
    console.log(`[seo-engine] Found ${existingSlugs.length} existing articles`)

    // Generate keyword opportunities
    const allOpportunities: ReturnType<typeof generateKeywordOpportunities> = []
    for (const geo of config.geoTargets) {
      const opportunities = generateKeywordOpportunities(geo, 30)
      allOpportunities.push(...opportunities)
    }

    // Add seasonal opportunities
    const seasonal = getSeasonalOpportunities(new Date().getMonth() + 1)
    allOpportunities.push(...seasonal)

    // Add emerging topics
    const emerging = detectEmergingTopics()
    allOpportunities.push(...emerging.slice(0, 10))

    console.log(`[seo-engine] Generated ${allOpportunities.length} keyword opportunities`)

    // Check for cannibalization
    // (In production, load from actual existing content)
    // const cannibalization = detectKeywordCannibalization(existingArticles)

    // ── PHASE 2: TOPIC GENERATION ──
    result.phase = 'topic-generation'
    console.log('[seo-engine] Phase 2: Topic Generation')

    // Deduplicate keywords
    const uniqueKeywords = Array.from(new Set(allOpportunities.map((o) => o.keyword)))
    const topKeywords = uniqueKeywords.slice(0, config.weeklyCadence * 2)

    // Map keywords to topics
    const generatedTopics: ArticleTopic[] = []
    const pillarPool = [...config.strategy.targetPillars]

    for (let i = 0; i < topKeywords.length; i++) {
      const keyword = topKeywords[i]
      const pillar = pillarPool[i % pillarPool.length]
      const geo = config.geoTargets[i % config.geoTargets.length]

      const topic = generateArticleTopic(keyword, pillar, geo, 'general', 'autonomous-engine')
      generatedTopics.push(topic)
    }

    result.topicsGenerated = generatedTopics.length
    console.log(`[seo-engine] Generated ${generatedTopics.length} article topics`)

    // Rank by impact
    const rankedTopics = rankTopicsByImpact(generatedTopics)
    config.strategy.nextTopics = rankedTopics

    // ── PHASE 3: DRAFT CREATION ──
    result.phase = 'draft-creation'
    console.log('[seo-engine] Phase 3: Draft Creation & Quality Assurance')

    for (const topic of rankedTopics.slice(0, config.weeklyCadence)) {
      try {
        // Generate draft
        const { generateArticleDraft } = await import('@/lib/seo-engine/content/generator')
        const draft = generateArticleDraft(topic)

        // Run quality checks
        const qualityReport = runQualityChecks(draft)

        if (!qualityReport.passed) {
          result.qualityIssues.push(
            `${draft.slug}: ${qualityReport.checks.filter((c) => !c.passed).map((c) => c.name).join(', ')}`
          )
        }

        // Check word count requirements
        const wordCount = draft.bodyMd.split(/\s+/).filter(Boolean).length
        if (wordCount < config.minWordCount || wordCount > config.maxWordCount) {
          result.qualityIssues.push(
            `${draft.slug}: Word count ${wordCount} outside range ${config.minWordCount}-${config.maxWordCount}`
          )
        }

        // Save to Supabase (as unpublished, for physician review)
        const saveResult = await saveDraftToSupabase(draft, topic)
        if (saveResult.success) {
          result.draftsSaved++
          console.log(`[seo-engine] Saved draft: ${draft.slug} (ID: ${saveResult.draftId})`)
        } else {
          result.errors.push(`Failed to save ${draft.slug}: ${saveResult.error}`)
        }

        result.draftsCreated++
      } catch (err) {
        result.errors.push(`Draft creation failed for ${topic.title}: ${err instanceof Error ? err.message : 'Unknown'}`)
      }
    }

    // ── PHASE 4: PERFORMANCE ANALYSIS (if enabled) ──
    if (config.enablePerformanceLoop) {
      result.phase = 'performance-analysis'
      console.log('[seo-engine] Phase 4: Performance Analysis')

      try {
        const metrics = await fetchAllArticleMetrics(existingSlugs.slice(0, 20))
        const analysis = analyzePerformance(metrics)
        const { updatedStrategy, adjustments } = adjustStrategyBasedOnPerformance(config.strategy, analysis)

        config.strategy = updatedStrategy
        result.strategyAdjustments = adjustments.map((a) => a.action)

        console.log(`[seo-engine] ${adjustments.length} strategy adjustments generated`)
      } catch (err) {
        result.errors.push(`Performance analysis failed: ${err instanceof Error ? err.message : 'Unknown'}`)
      }
    }

    // ── PHASE 5: TECHNICAL AUDIT ──
    result.phase = 'technical-audit'
    console.log('[seo-engine] Phase 5: Technical SEO Audit')

    try {
      const technicalIssues = await runTechnicalAudit()
      const criticalIssues = technicalIssues.filter((i) => i.type === 'critical')
      if (criticalIssues.length > 0) {
        result.qualityIssues.push(`Technical: ${criticalIssues.length} critical issues found`)
      }
      console.log(`[seo-engine] ${technicalIssues.length} technical issues found (${criticalIssues.length} critical)`)
    } catch (err) {
      result.errors.push(`Technical audit failed: ${err instanceof Error ? err.message : 'Unknown'}`)
    }

    result.phase = 'complete'
    console.log('[seo-engine] Cycle complete')
    console.log(`[seo-engine] Summary: ${result.topicsGenerated} topics, ${result.draftsCreated} drafts, ${result.draftsSaved} saved`)

    return result
  } catch (err) {
    result.phase = 'failed'
    result.errors.push(`Engine cycle failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    console.error('[seo-engine] Engine cycle failed:', err)
    return result
  }
}

// ──────────────────────────────────────────────
// 3. SPECIALIZED RUN MODES
// ──────────────────────────────────────────────

/**
 * Research-only mode: generate keyword opportunities and content gaps
 * without creating drafts. Useful for strategy planning.
 */
export async function runResearchMode(
  config: EngineConfig = DEFAULT_CONFIG
): Promise<{
  opportunities: ReturnType<typeof generateKeywordOpportunities>
  gaps: Awaited<ReturnType<typeof analyzeContentGaps>>
  seasonal: ReturnType<typeof getSeasonalOpportunities>
}> {
  const opportunities: ReturnType<typeof generateKeywordOpportunities> = []
  for (const geo of config.geoTargets) {
    opportunities.push(...generateKeywordOpportunities(geo, 50))
  }

  const existingSlugs = await getExistingSlugs()
  const gaps = await analyzeContentGaps(
    existingSlugs,
    opportunities.slice(0, 20).map((o) => o.keyword)
  )

  const seasonal = getSeasonalOpportunities(new Date().getMonth() + 1)

  return { opportunities, gaps, seasonal }
}

/**
 * Refresh mode: analyze existing content and generate refresh recommendations.
 */
export async function runRefreshMode(): Promise<{
  refreshQueue: { slug: string; reason: string; priority: number }[]
  recommendations: string[]
}> {
  const existingSlugs = await getExistingSlugs()

  // In production, load actual article metadata with dates and rankings
  const mockArticles = existingSlugs.map((slug, i) => ({
    slug,
    title: slug.replace(/-/g, ' '),
    publishedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdated: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 1200 + Math.floor(Math.random() * 800),
    currentRanking: i < 5 ? 5 + i : 15 + i,
  }))

  const { analyzeContentForRefresh } = await import('@/lib/seo-engine/content/quality-checker')
  const refreshQueue = analyzeContentForRefresh(mockArticles)

  return {
    refreshQueue: refreshQueue.slice(0, 10),
    recommendations: refreshQueue.slice(0, 5).map(
      (r) => `[P${r.priority}] ${r.slug}: ${r.reason}`
    ),
  }
}

/**
 * Report mode: generate monthly performance report.
 */
export async function runReportMode(): Promise<string> {
  const existingSlugs = await getExistingSlugs()
  const metrics = await fetchAllArticleMetrics(existingSlugs.slice(0, 20))
  const analysis = analyzePerformance(metrics)
  const { updatedStrategy, adjustments } = adjustStrategyBasedOnPerformance(DEFAULT_CONFIG.strategy, analysis)
  const report = generateMonthlyReport(metrics, updatedStrategy, adjustments)

  return `
# PulsePoint SEO Monthly Report — ${report.month}

## Performance Summary
- **Total Articles**: ${report.totalArticles}
- **Organic Clicks**: ${report.totalClicks.toLocaleString()}
- **Impressions**: ${report.totalImpressions.toLocaleString()}
- **Average CTR**: ${report.avgCtr}%
- **Average Position**: ${report.avgPosition}
- **Page 1 Rankings**: ${report.newRankings}

## Key Wins
${report.keyWins.map((w) => `- ${w}`).join('\n')}

## Action Items
${report.actionItems.map((a) => `- ${a}`).join('\n')}

## Strategy Phase
Current phase: **${report.strategyPhase}**
`.trim()
}

// ──────────────────────────────────────────────
// 4. CLI ENTRY POINTS
// ──────────────────────────────────────────────

/** Run the full autonomous engine cycle */
export async function cliRun(): Promise<void> {
  const result = await runAutonomousSEOEngine()
  console.log(JSON.stringify(result, null, 2))
}

/** Run research mode and output opportunities */
export async function cliResearch(): Promise<void> {
  const result = await runResearchMode()
  console.log('=== KEYWORD OPPORTUNITIES ===')
  console.log(JSON.stringify(result.opportunities.slice(0, 20), null, 2))
  console.log('\n=== CONTENT GAPS ===')
  console.log(JSON.stringify(result.gaps.slice(0, 10), null, 2))
  console.log('\n=== SEASONAL OPPORTUNITIES ===')
  console.log(JSON.stringify(result.seasonal, null, 2))
}

/** Run refresh mode */
export async function cliRefresh(): Promise<void> {
  const result = await runRefreshMode()
  console.log('=== REFRESH QUEUE ===')
  console.log(JSON.stringify(result.refreshQueue, null, 2))
  console.log('\n=== RECOMMENDATIONS ===')
  result.recommendations.forEach((r) => console.log(r))
}

/** Run report mode */
export async function cliReport(): Promise<void> {
  const report = await runReportMode()
  console.log(report)
}
