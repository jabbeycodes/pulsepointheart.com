import { NextResponse } from 'next/server'
import { createAutomatedBlogDraft } from '@/lib/blog-automation'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET ?? process.env.BLOG_AUTOMATION_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()
    const result = await createAutomatedBlogDraft(supabase)

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
