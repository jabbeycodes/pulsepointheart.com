/**
 * Runs after `next build` on Vercel production deploys.
 * Never fails the build — indexing is best-effort.
 */
import {
  isGoogleIndexingConfigured,
  submitPriorityUrlsToGoogle,
} from '../lib/google-indexing'

async function main() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.log('[indexing] skipped (not a production deploy)')
    return
  }

  if (!isGoogleIndexingConfigured()) {
    console.log('[indexing] skipped (GOOGLE_INDEXING_CREDENTIALS not set)')
    return
  }

  try {
    const result = await submitPriorityUrlsToGoogle()
    console.log(
      `[indexing] postbuild: ${result.submitted}/${result.total} URLs submitted via ${result.serviceAccount}`,
    )
    if (result.failed > 0) {
      console.warn('[indexing] some URLs failed:', result.results.filter((r) => !r.ok))
    }
  } catch (error) {
    console.warn(
      '[indexing] postbuild skipped:',
      error instanceof Error ? error.message : error,
    )
  }
}

main()
