import { createServerClient } from '@/lib/supabase/server'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body_md: string
  cover_image_url: string | null
  author: string | null
  tags: string[] | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getPublishedBlogPosts(limit = 20) {
  if (!hasSupabaseConfig()) {
    console.warn('Supabase public config is missing; returning no blog posts.')
    return []
  }

  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('blog_posts select failed:', error)
    return []
  }

  return (data ?? []) as BlogPost[]
}

export async function getAdminBlogPosts(limit = 100) {
  if (!hasSupabaseConfig()) {
    console.warn('Supabase public config is missing; returning no admin blog posts.')
    return []
  }

  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('admin blog_posts select failed:', error)
    return []
  }

  return (data ?? []) as BlogPost[]
}

export async function getPublishedBlogPost(slug: string) {
  if (!hasSupabaseConfig()) {
    console.warn(`Supabase public config is missing; blog post "${slug}" is unavailable.`)
    return null
  }

  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) {
    console.error('blog_posts single select failed:', error)
    return null
  }

  return data as BlogPost | null
}

export function formatPostDate(value: string | null) {
  if (!value) return 'Draft'

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function readingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))
  return `${minutes} min read`
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}
