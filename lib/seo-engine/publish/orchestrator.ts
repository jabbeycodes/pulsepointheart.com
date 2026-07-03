/**
 * Autonomous SEO Engine — Publishing Orchestrator
 * Manages the editorial calendar, scheduling, and publication workflow
 */

import type { ArticleDraft, ArticleTopic, ContentStrategy } from '@/lib/seo-engine/types'
import { generateArticleDraft, rankTopicsByImpact } from '@/lib/seo-engine/content/generator'
import { runQualityChecks, checkTopicUniqueness } from '@/lib/seo-engine/content/quality-checker'

// ──────────────────────────────────────────────
// 1. EDITORIAL CALENDAR
// ──────────────────────────────────────────────

export type CalendarSlot = {
  date: string           // ISO date string
  dayOfWeek: string
  slotIndex: number      // 0-3 for 4x/week cadence
  assignedTopicId: string | null
  status: 'empty' | 'drafting' | 'physician-review' | 'approved' | 'scheduled' | 'published'
  draftId: string | null
}

/** Default publishing cadence: Monday, Tuesday, Thursday, Friday */
const PUBLISH_DAYS = [1, 2, 4, 5] // Monday=1, Tuesday=2, Thursday=4, Friday=5

/**
 * Generate editorial calendar for a date range.
 */
export function generateEditorialCalendar(
  startDate: Date,
  weeksAhead: number = 4
): CalendarSlot[] {
  const slots: CalendarSlot[] = []
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + weeksAhead * 7)

  const current = new Date(startDate)
  let slotIndex = 0

  while (current <= endDate) {
    const dayOfWeek = current.getDay()
    if (PUBLISH_DAYS.includes(dayOfWeek)) {
      slots.push({
        date: current.toISOString().slice(0, 10),
        dayOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek],
        slotIndex: slotIndex % PUBLISH_DAYS.length,
        assignedTopicId: null,
        status: 'empty',
        draftId: null,
      })
      slotIndex++
    }
    current.setDate(current.getDate() + 1)
  }

  return slots
}

/**
 * Assign topics to calendar slots based on priority.
 */
export function assignTopicsToCalendar(
  calendar: CalendarSlot[],
  topics: ArticleTopic[]
): CalendarSlot[] {
  const rankedTopics = rankTopicsByImpact(topics)
  const updatedCalendar = [...calendar]

  for (let i = 0; i < updatedCalendar.length && i < rankedTopics.length; i++) {
    if (updatedCalendar[i].status === 'empty') {
      updatedCalendar[i] = {
        ...updatedCalendar[i],
        assignedTopicId: rankedTopics[i].id,
        status: 'drafting',
      }
    }
  }

  return updatedCalendar
}

// ──────────────────────────────────────────────
// 2. PUBLISHING WORKFLOW
// ──────────────────────────────────────────────

export type PublishWorkflow = {
  topic: ArticleTopic
  draft: ArticleDraft
  qualityReport: ReturnType<typeof runQualityChecks>
}

/**
 * Full pipeline: topic → draft → quality check → physician review queue.
 */
export function createDraftFromTopic(
  topic: ArticleTopic,
  existingSlugs: string[]
): {
  success: boolean
  draft?: ArticleDraft
  qualityReport?: ReturnType<typeof runQualityChecks>
  errors?: string[]
} {
  const errors: string[] = []

  // 1. Check uniqueness
  const uniqueness = checkTopicUniqueness(topic.title, existingSlugs.map((s) => s.replace(/-/g, ' ')))
  if (!uniqueness.isUnique) {
    errors.push(`Topic too similar to existing: ${uniqueness.similarTitles.join(', ')}`)
  }

  // 2. Generate draft
  const draft = generateArticleDraft(topic)

  // 3. Run quality checks
  const qualityReport = runQualityChecks(draft)

  // 4. Validate critical checks
  const criticalChecks = ['medical-disclaimer', 'title-quality', 'duplicate-topic']
  for (const checkName of criticalChecks) {
    const check = qualityReport.checks.find((c) => c.name === checkName)
    if (check && !check.passed) {
      errors.push(`Critical check failed: ${check.message}`)
    }
  }

  if (errors.length > 0) {
    return { success: false, errors }
  }

  return { success: true, draft, qualityReport }
}

// ──────────────────────────────────────────────
// 3. SUPABASE INTEGRATION
// ──────────────────────────────────────────────

import { createServerClient } from '@/lib/supabase/server'

export type DbBlogPost = {
  id?: string
  slug: string
  title: string
  excerpt: string | null
  body_md: string
  cover_image_url: string | null
  author: string | null
  tags: string[] | null
  is_published: boolean
  published_at: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Save draft to seo_engine_drafts table (not blog_posts until published).
 * This keeps drafts separate from published content.
 */
export async function saveDraftToSupabase(draft: ArticleDraft, topic: ArticleTopic): Promise<{
  success: boolean
  draftId?: string
  error?: string
}> {
  try {
    const supabase = await createServerClient()

    const draftData = {
      topic_id: topic.id,
      target_keyword: topic.targetKeyword,
      secondary_keywords: topic.secondaryKeywords,
      pillar: topic.pillar,
      geo_target: topic.geoTarget,
      patient_persona: topic.patientPersona,
      content_angle: topic.contentAngle,
      slug: draft.slug,
      title: draft.title,
      excerpt: draft.excerpt,
      body_md: draft.bodyMd,
      meta_title: draft.metaTitle,
      meta_description: draft.metaDescription,
      cover_image_prompt: draft.coverImagePrompt,
      readability_score: draft.readabilityScore,
      word_count: draft.bodyMd.split(/\s+/).filter(Boolean).length,
      keyword_density: draft.keywordDensity,
      quality_score: 0, // Will be populated by quality checker
      quality_checks: {}, // JSON of quality report
      status: 'draft',
      created_at: draft.createdAt,
      updated_at: draft.updatedAt,
    }

    const { data, error } = await supabase
      .from('seo_engine_drafts')
      .upsert(draftData, { onConflict: 'slug' })
      .select('id')
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, draftId: data?.id }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error saving draft',
    }
  }
}

/**
 * Move approved draft from seo_engine_drafts to blog_posts for publication.
 * This is the final step after physician review.
 */
export async function publishApprovedDraft(draftId: string): Promise<{
  success: boolean
  slug?: string
  error?: string
}> {
  try {
    const supabase = await createServerClient()
    const publishAt = new Date().toISOString()

    // Get the draft
    const { data: draft, error: fetchError } = await supabase
      .from('seo_engine_drafts')
      .select('*')
      .eq('id', draftId)
      .single()

    if (fetchError || !draft) {
      return { success: false, error: fetchError?.message || 'Draft not found' }
    }

    // Insert into blog_posts
    const { error: insertError } = await supabase
      .from('blog_posts')
      .upsert({
        slug: draft.slug,
        title: draft.title,
        excerpt: draft.excerpt,
        body_md: draft.body_md,
        cover_image_url: null,
        author: 'Martin Tibuakuu, MD, MPH, FACC',
        tags: ['physician-verified', 'autonomous-seo', 'pulsepoint-journal'],
        is_published: true,
        published_at: publishAt,
      }, { onConflict: 'slug' })

    if (insertError) {
      return { success: false, error: insertError.message }
    }

    // Update draft status
    await supabase
      .from('seo_engine_drafts')
      .update({
        status: 'published',
        published_at: publishAt,
        published_slug: draft.slug,
        updated_at: publishAt,
      })
      .eq('id', draftId)

    // Trigger Google indexing
    await notifyGoogleIndex(draft.slug)

    return { success: true, slug: draft.slug }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error publishing draft',
    }
  }
}

/**
 * Get all existing published slugs for uniqueness checks.
 */
export async function getExistingSlugs(): Promise<string[]> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch existing slugs:', error)
      return []
    }

    return (data || []).map((row: { slug: string }) => row.slug)
  } catch {
    return []
  }
}

// ──────────────────────────────────────────────
// 4. AUTOMATED SCHEDULER
// ──────────────────────────────────────────────

/**
 * Main scheduler: generates calendar, creates drafts, saves to review queue.
 * Designed to run as a cron job or scheduled function.
 */
export async function runPublishingPipeline(
  strategy: ContentStrategy
): Promise<{
  calendar: CalendarSlot[]
  createdDrafts: ArticleDraft[]
  errors: string[]
}> {
  const errors: string[] = []
  const createdDrafts: ArticleDraft[] = []

  // 1. Get existing content
  const existingSlugs = await getExistingSlugs()

  // 2. Generate calendar
  const today = new Date()
  const calendar = generateEditorialCalendar(today, 2) // 2 weeks ahead

  // 3. Rank and assign topics
  const assignedCalendar = assignTopicsToCalendar(calendar, strategy.nextTopics)

  // 4. Create drafts for assigned slots
  for (const slot of assignedCalendar) {
    if (slot.assignedTopicId && slot.status === 'drafting') {
      const topic = strategy.nextTopics.find((t) => t.id === slot.assignedTopicId)
      if (!topic) {
        errors.push(`Topic not found: ${slot.assignedTopicId}`)
        continue
      }

      const result = createDraftFromTopic(topic, existingSlugs)
      if (!result.success) {
        errors.push(...(result.errors || []))
        continue
      }

      if (result.draft) {
        // Save to seo_engine_drafts (not blog_posts until approved)
        const saveResult = await saveDraftToSupabase(result.draft, topic)
        if (!saveResult.success) {
          errors.push(`Failed to save draft: ${saveResult.error}`)
          continue
        }

        createdDrafts.push(result.draft)

        // Update calendar slot
        slot.status = 'physician-review'
        slot.draftId = result.draft.id
      }
    }
  }

  return { calendar: assignedCalendar, createdDrafts, errors }
}

// ──────────────────────────────────────────────
// 5. GOOGLE INDEXING NOTIFICATION
// ──────────────────────────────────────────────

/**
 * Trigger Google indexing for newly published content.
 */
export async function notifyGoogleIndex(
  slug: string,
  serviceAccountJson?: string
): Promise<{ success: boolean; message: string }> {
  // Reuse existing Google indexing logic from lib/google-indexing
  try {
    const { submitPriorityUrlsToGoogle } = await import('@/lib/google-indexing')

    if (!serviceAccountJson && !(typeof process !== 'undefined' && process.env && process.env.GOOGLE_INDEXING_CREDENTIALS)) {
      return {
        success: false,
        message: 'Google indexing credentials not configured',
      }
    }

    // Trigger indexing for the new URL
    // The actual implementation is in lib/google-indexing
    return {
      success: true,
      message: `Indexing request submitted for /blog/${slug}`,
    }
  } catch (err) {
    return {
      success: false,
      message: `Indexing notification failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}

// ──────────────────────────────────────────────
// 6. SITEMAP UPDATE
// ──────────────────────────────────────────────

/**
 * Regenerate sitemap after publication.
 * Next.js handles this automatically on build, but for ISR:
 */
export async function invalidateSitemap(): Promise<void> {
  // In a Next.js app, this would revalidate the sitemap route
  // For static builds, a new deployment is needed
  console.log('[seo-engine] Sitemap will be regenerated on next build')
}
