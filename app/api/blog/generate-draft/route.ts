import { NextResponse } from 'next/server'
import type { BlogDraftSlot } from '@/lib/blog-automation'
import { createAutomatedBlogDraft } from '@/lib/blog-automation'
import { createAdminClient } from '@/lib/supabase/server'

function parseSlot(value: string | null): BlogDraftSlot | undefined {
  if (value === '0') return 0
  if (value === '1') return 1
  return undefined
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET ?? process.env.BLOG_AUTOMATION_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const slot = parseSlot(url.searchParams.get('slot'))
    const supabase = createAdminClient()
    const result = await createAutomatedBlogDraft(supabase, new Date(), { slot })

    return NextResponse.json({
      ok: true,
      ...result,
    })
  } catch (error) {
    console.error('Automated blog draft failed:', error)
    return NextResponse.json(
      { error: 'Unable to create blog draft' },
      { status: 500 }
    )
  }
}
