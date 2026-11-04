import { NextResponse } from 'next/server'
import { getPhysicianBySlug } from '@/lib/physicians'

type CvRouteProps = {
  params: Promise<{
    slug: string
  }>
}

/**
 * Pretty shareable CV link: /physicians/{slug}/cv → static PDF.
 * Keeps the profile URL clean while giving a memorable link to send people.
 */
export async function GET(_request: Request, { params }: CvRouteProps) {
  const { slug } = await params
  const physician = getPhysicianBySlug(slug)

  if (!physician?.cvPath) {
    return NextResponse.json({ error: 'Curriculum vitae not found for this physician.' }, { status: 404 })
  }

  return NextResponse.redirect(new URL(physician.cvPath, _request.url), 308)
}
