import { NextResponse } from 'next/server'
import { autoPublishUnreviewedDrafts } from '@/lib/blog-automation'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET ?? process.env.BLOG_AUTOMATION_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const result = await autoPublishUnreviewedDrafts(supabase)

    return NextResponse.json({
      ok: true,
      ...result,
    })
  } catch (error) {
    console.error('Blog auto-publish failed:', error)
    return NextResponse.json(
      { error: 'Unable to auto-publish blog drafts' },
      { status: 500 }
    )
  }
}
