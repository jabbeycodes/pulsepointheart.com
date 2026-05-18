import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { membershipInquirySchema } from '@/lib/validation'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let payload: unknown
  try { payload = await request.json() }
  catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }

  const result = membershipInquirySchema.safeParse(payload)
  if (!result.success) {
    return NextResponse.json({ error: 'Please check your form and try again.' }, { status: 400 })
  }

  const { name, email, phone, interest_level, hear_about_us, notes, website } = result.data

  if (website && website.length > 0) return NextResponse.json({ ok: true })

  const supabase = await createServerClient()
  const { error } = await supabase.from('membership_inquiries').insert({
    name, email,
    phone: phone || null,
    interest_level,
    hear_about_us: hear_about_us || null,
    notes: notes || null,
  })

  if (error) {
    console.error('membership_inquiries insert failed:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please call us at 573.424.9000.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
