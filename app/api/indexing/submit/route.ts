import { NextResponse } from 'next/server'
import {
  isGoogleIndexingConfigured,
  submitPriorityUrlsToGoogle,
} from '@/lib/google-indexing'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET ?? process.env.BLOG_AUTOMATION_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isGoogleIndexingConfigured()) {
    return NextResponse.json(
      { error: 'GOOGLE_INDEXING_CREDENTIALS is not configured' },
      { status: 503 },
    )
  }

  try {
    const result = await submitPriorityUrlsToGoogle()

    return NextResponse.json({
      ok: result.failed === 0,
      message: `Submitted ${result.submitted}/${result.total} priority URLs to Google Indexing API.`,
      ...result,
    })
  } catch (error) {
    console.error('Google indexing submit failed:', error)
    return NextResponse.json(
      { error: 'Unable to submit URLs to Google Indexing API' },
      { status: 500 },
    )
  }
}
