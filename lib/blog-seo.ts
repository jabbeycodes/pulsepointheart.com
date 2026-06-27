import type { Metadata } from 'next'
import { CLINIC, SITE_URL, absoluteUrl } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const BLOG_LOCALITY = 'Columbia, MO'
export const BLOG_LOCALITY_LONG = 'Columbia, Missouri'

export const BLOG_LOCAL_KEYWORDS = [
  'cardiologist Columbia MO',
  'cardiologist Columbia Missouri',
  'heart doctor Columbia MO',
  'preventive cardiology Columbia MO',
  'cardiology Columbia Missouri',
  'heart health Columbia MO',
  'Boone County cardiologist',
  'Central Missouri heart care',
] as const

export const BLOG_SERVICE_AREAS = [
  'Columbia, MO',
  'Boone County, MO',
  'Jefferson City, MO',
  'Ashland, MO',
  'Fulton, MO',
  'Moberly, MO',
  'Mid-Missouri',
  'Central Missouri',
] as const

export const BLOG_LOCAL_TAGS = [
  'columbia mo',
  'columbia missouri',
  'cardiologist columbia mo',
  'boone county',
] as const

export function blogLocalTags() {
  return [...BLOG_LOCAL_TAGS]
}

export function buildBlogIndexMeta(): Metadata {
  const title = `Heart Health Blog Columbia, MO | PulsePoint Journal`
  const description = `Physician-verified heart health articles from a cardiologist in Columbia, Missouri. Preventive cardiology, blood pressure, cholesterol, and cardiovascular wellness for Boone County and Central Missouri.`

  return {
    ...pageMeta('/blog', title, description),
    keywords: [...BLOG_LOCAL_KEYWORDS, 'heart health blog', 'preventive cardiology'],
  }
}

export function buildBlogPostMetaForSlug(
  slug: string,
  title: string,
  excerpt: string | null,
): Metadata {
  const localTitle =
    title.length > 52 ? `${title} | Columbia, MO` : `${title} | Columbia, MO Cardiology`

  const baseDescription =
    excerpt?.trim() ||
    'Physician-verified cardiovascular education from PulsePoint Clinic in Columbia, Missouri.'

  const description = baseDescription.toLowerCase().includes('columbia')
    ? baseDescription
    : `${baseDescription} From PulsePoint Clinic, a cardiologist serving ${BLOG_LOCALITY_LONG} and Boone County.`

  return {
    ...pageMeta(`/blog/${slug}`, localTitle, description),
    keywords: [...BLOG_LOCAL_KEYWORDS],
  }
}

export function buildBlogIndexJsonLd(posts: Array<{ title: string; slug: string; published_at: string | null }>) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#journal`,
      name: 'PulsePoint Journal',
      description: `Physician-verified heart health articles from PulsePoint Clinic in ${BLOG_LOCALITY_LONG}.`,
      url: absoluteUrl('/blog'),
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#clinic` },
      about: {
        '@type': 'MedicalSpecialty',
        name: 'Cardiology',
      },
      contentLocation: {
        '@type': 'Place',
        name: BLOG_LOCALITY_LONG,
        address: {
          '@type': 'PostalAddress',
          ...CLINIC.address,
        },
      },
      blogPost: posts.slice(0, 10).map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.published_at ?? undefined,
      })),
    },
  ]
}

export function buildBlogLocalIntroMarkdown() {
  return `## Heart care context for Columbia, Missouri

Patients across ${BLOG_LOCALITY_LONG}, Boone County, Jefferson City, Ashland, Fulton, Moberly, and Central Missouri often face the same cardiovascular questions: when to screen, which symptoms matter, and how to build a prevention plan that fits real life. This article is written for that community — with the same physician-led standards we use in clinic at PulsePoint on Nifong Boulevard.`
}

export function buildBlogLocalFooterMarkdown() {
  return `## Cardiology care in Columbia, MO

If this topic raises questions about your own heart health, PulsePoint Clinic offers physician-led cardiovascular care at **1000 W Nifong Blvd, Bldg 2, Suite 120, Columbia, MO 65203**.

- [Cardiologist in Columbia, MO](https://pulsepointheart.com/cardiologist-columbia-mo)
- [Columbia clinic location & directions](https://pulsepointheart.com/locations/columbia-mo)
- [Preventive cardiology services](https://pulsepointheart.com/services/preventive-cardiology)
- [Schedule an appointment](https://pulsepointheart.com/book) or call **${CLINIC.phoneDisplay}**

We serve patients throughout Boone County and Central Missouri with preventive cardiology, advanced diagnostics, and personalized follow-up.`
}
