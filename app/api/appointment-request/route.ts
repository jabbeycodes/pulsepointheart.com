import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { appointmentRequestSchema } from '@/lib/validation'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let payload: unknown
  try { payload = await request.json() }
  catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }

  const result = appointmentRequestSchema.safeParse(payload)
  if (!result.success) {
    return NextResponse.json({ error: 'Please check your form and try again.' }, { status: 400 })
  }

  const { name, email, phone, preferred_contact, preferred_timeframe, reason_for_visit, notes, website } = result.data

  // Honeypot
  if (website && website.length > 0) return NextResponse.json({ ok: true })

  const supabase = await createServerClient()
  const { error } = await supabase.from('appointment_requests').insert({
    name, email, phone,
    preferred_contact,
    preferred_timeframe,
    reason_for_visit,
    notes: notes || null,
    source: 'website',
  })

  if (error) {
    console.error('appointment_requests insert failed:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please call us at (855) 785-7337.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
