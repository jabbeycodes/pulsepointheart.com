import { SITE_URL } from '@/lib/seo'

/** Priority URLs pinged after deploy or via the indexing script. */
export const GOOGLE_INDEXING_PRIORITY_URLS = [
  '/',
  '/physicians',
  '/physicians/martin-tibuakuu',
  '/physicians/james-fairlamb',
  '/cardiologist-columbia-mo',
  '/locations/columbia-mo',
  '/book',
  '/services/preventive-cardiology',
  '/conditions',
  '/blog',
] as const

export function getGoogleIndexingPriorityUrls() {
  return GOOGLE_INDEXING_PRIORITY_URLS.map((path) => `${SITE_URL}${path}`)
}
