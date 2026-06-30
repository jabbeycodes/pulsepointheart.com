import { SITE_URL } from '@/lib/seo'

/** Priority URLs pinged after deploy or via the indexing script. */
export const GOOGLE_INDEXING_PRIORITY_URLS = [
  '/',
  '/physicians',
  '/physicians/martin-tibuakuu',
  '/physicians/james-fairlamb',
  '/cardiologist-columbia-mo',
  '/missouri-heart-center-transition',
  '/best-cardiologist-columbia-mo',
  '/heart-screening-columbia-mo',
  '/conditions/peripheral-artery-disease',
  '/conditions/diabetes-and-heart-disease',
  '/locations/columbia-mo',
  '/book',
  '/services/preventive-cardiology',
  '/conditions',
  '/blog',
] as const

export function getGoogleIndexingPriorityUrls() {
  return GOOGLE_INDEXING_PRIORITY_URLS.map((path) => `${SITE_URL}${path}`)
}
