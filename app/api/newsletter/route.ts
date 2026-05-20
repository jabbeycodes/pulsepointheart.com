// API route: POST /api/newsletter
// Captures email signups. Handles duplicate emails gracefully.

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { newsletterSchema } from '@/lib/validation'
import { sendFormNotification } from '@/lib/email'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const result = newsletterSchema.safeParse(payload)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Please enter a valid email.' },
      { status: 400 }
    )
  }

  const { email, website } = result.data
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const supabase = await createServerClient()
  const { error } = await supabase
    .from('newsletter_signups')
    .insert({ email, source: 'website' })

  // Postgres unique violation code = 23505. Treat as success (idempotent UX).
  if (error && error.code !== '23505') {
    console.error('newsletter_signups insert failed:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }

  if (!error) {
    try {
      await sendFormNotification({
        subject: 'New PulsePoint newsletter signup',
        heading: 'New newsletter signup',
        intro: 'A new newsletter signup was saved in the PulsePoint admin dashboard.',
        fields: [{ label: 'Email', value: email }],
      })
    } catch (notificationError) {
      console.error('newsletter notification failed:', notificationError)
    }
  }

  return NextResponse.json({ ok: true })
}
