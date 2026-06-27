import type { BlogPost } from '@/lib/blog'
import { slugify } from '@/lib/blog'
import {
  EDITORIAL_TOPICS,
  PHYSICIAN_VERIFIED_TAG,
  buildEditorialPostBody,
  getEditorialPublishDate,
  PULSEPOINT_AUTHOR,
} from '@/lib/blog-automation'
import { blogLocalTags } from '@/lib/blog-seo'

import { buildRelatedConditionsMarkdown } from '@/lib/blog-condition-links'

/** Physician-verified editorial posts released on the 4x/week cadence (Mon, Tue, Thu, Fri). */
export function getScheduledEditorialPosts(now = new Date()): BlogPost[] {
  const posts: BlogPost[] = []

  for (let index = 0; index < 500; index += 1) {
    const publishedAt = getEditorialPublishDate(index)
    if (publishedAt > now) break

    const topic = EDITORIAL_TOPICS[index % EDITORIAL_TOPICS.length]
    const slug = `${slugify(topic.title)}-${publishedAt.toISOString().slice(0, 10)}`
    const iso = publishedAt.toISOString()

    posts.push({
      id: `editorial-${slug}-${index}`,
      slug,
      title: topic.title,
      excerpt: topic.excerpt,
      body_md: `${buildEditorialPostBody(topic)}\n\n${buildRelatedConditionsMarkdown(topic.tags, topic.title, topic.pillar)}`.trim(),
      cover_image_url: null,
      author: PULSEPOINT_AUTHOR,
      tags: [...topic.tags, ...blogLocalTags(), PHYSICIAN_VERIFIED_TAG, 'pulsepoint-journal'],
      is_published: true,
      published_at: iso,
      created_at: iso,
      updated_at: iso,
    })
  }

  return posts
}
