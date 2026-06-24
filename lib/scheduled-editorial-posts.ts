import type { BlogPost } from '@/lib/blog'
import { slugify } from '@/lib/blog'
import {
  EDITORIAL_TOPICS,
  buildEditorialPostBody,
  getEditorialPublishDate,
  PULSEPOINT_AUTHOR,
} from '@/lib/blog-automation'

import { buildRelatedConditionsMarkdown } from '@/lib/blog-condition-links'

/** Static editorial posts released on the 2x/week cadence (Tue + Fri). */
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
      tags: topic.tags,
      is_published: true,
      published_at: iso,
      created_at: iso,
      updated_at: iso,
    })
  }

  return posts
}
