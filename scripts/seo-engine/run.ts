// @ts-nocheck
/**
 * Autonomous SEO Engine — CLI Runner
 * Scheduled execution entry point (Node.js environment)
 */

import {
  runAutonomousSEOEngine,
  runResearchMode,
  runRefreshMode,
  runReportMode,
  DEFAULT_CONFIG,
} from '@/lib/seo-engine'

const command = typeof process !== 'undefined' ? process.argv[2] || 'run' : 'run'

async function main() {
  const startTime = Date.now()
  console.log(`[seo-engine-cli] Starting: ${command} at ${new Date().toISOString()}`)

  try {
    switch (command) {
      case 'run': {
        const result = await runAutonomousSEOEngine(DEFAULT_CONFIG)
        console.log('\n=== ENGINE RESULT ===')
        console.log(JSON.stringify(result, null, 2))
        break
      }

      case 'research': {
        const result = await runResearchMode(DEFAULT_CONFIG)
        console.log('\n=== KEYWORD OPPORTUNITIES ===')
        console.log(JSON.stringify(result.opportunities.slice(0, 20), null, 2))
        console.log('\n=== CONTENT GAPS ===')
        console.log(JSON.stringify(result.gaps.slice(0, 10), null, 2))
        console.log('\n=== SEASONAL ===')
        console.log(JSON.stringify(result.seasonal, null, 2))
        break
      }

      case 'refresh': {
        const result = await runRefreshMode()
        console.log('\n=== REFRESH QUEUE ===')
        console.log(JSON.stringify(result.refreshQueue, null, 2))
        console.log('\n=== RECOMMENDATIONS ===')
        result.recommendations.forEach((r) => console.log(r))
        break
      }

      case 'report': {
        const report = await runReportMode()
        console.log('\n=== MONTHLY REPORT ===')
        console.log(report)
        break
      }

      default:
        console.log(`
Usage: tsx scripts/seo-engine/run.ts <command>

Commands:
  run      — Full autonomous engine cycle (research → draft → quality → save)
  research — Generate keyword opportunities and content gaps only
  refresh  — Analyze existing content and recommend refreshes
  report   — Generate monthly performance report

Environment:
  NEXT_PUBLIC_SUPABASE_URL       — Required for saving drafts
  NEXT_PUBLIC_SUPABASE_ANON_KEY  — Required for saving drafts
  BLOG_AUTO_PUBLISH              — Set 'true' to auto-publish after physician review
        `.trim())
        process.exit(1)
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1)
    console.log(`\n[seo-engine-cli] Completed in ${duration}s`)
  } catch (err) {
    console.error('[seo-engine-cli] Fatal error:', err)
    process.exit(1)
  }
}

main()
