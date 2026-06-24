import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

const OG_IMAGE = {
  url: '/assets/social-preview.png',
  width: 1200,
  height: 630,
  alt: 'PulsePoint Clinic',
  type: 'image/png' as const,
}

/** Per-page metadata with absolute title (avoids template doubling) and canonical URL. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  const url = absoluteUrl(path)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/social-preview.png'],
    },
  }
}
