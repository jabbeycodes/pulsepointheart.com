'use server'

import { revalidatePath } from 'next/cache'
import { createAutomatedBlogDraft, PHYSICIAN_VERIFIED_TAG } from '@/lib/blog-automation'
import { createServerClient } from '@/lib/supabase/server'

export async function generateBlogDraftAction() {
  const supabase = await createServerClient()
  await createAutomatedBlogDraft(supabase)
  revalidatePath('/admin/blog')
}

export async function publishBlogPostAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const supabase = await createServerClient()
  const now = new Date().toISOString()

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('tags')
    .eq('id', id)
    .maybeSingle()

  const tags = Array.from(
    new Set([...(existing?.tags ?? []), PHYSICIAN_VERIFIED_TAG]),
  )

  await supabase
    .from('blog_posts')
    .update({
      is_published: true,
      published_at: now,
      updated_at: now,
      tags,
    })
    .eq('id', id)

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function unpublishBlogPostAction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const supabase = await createServerClient()

  await supabase
    .from('blog_posts')
    .update({
      is_published: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}
