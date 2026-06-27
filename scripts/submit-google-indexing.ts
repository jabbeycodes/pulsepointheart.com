import {
  isGoogleIndexingConfigured,
  submitPriorityUrlsToGoogle,
} from '../lib/google-indexing'

async function main() {
  if (!isGoogleIndexingConfigured()) {
    console.error(
      'Missing credentials. Set GOOGLE_INDEXING_CREDENTIALS or add .credentials/google-indexing.json',
    )
    process.exit(1)
  }

  const result = await submitPriorityUrlsToGoogle()
  console.log(`Using service account: ${result.serviceAccount}`)

  for (const item of result.results) {
    if (item.ok) {
      console.log(`✓ ${item.url}`)
    } else {
      console.error(`✗ ${item.url} (${item.status})`, item.body)
    }
  }

  console.log(`\nDone: ${result.submitted} submitted, ${result.failed} failed (${result.total} total)`)
  if (result.failed > 0) process.exit(1)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
