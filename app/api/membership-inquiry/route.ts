import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { INTEREST_LEVEL_LABELS, membershipInquirySchema } from '@/lib/validation'
import { sendFormNotification } from '@/lib/email'

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
      { error: 'Something went wrong. Please call us at (855) 785-7337.' },
      { status: 500 }
    )
  }

  try {
    await sendFormNotification({
      subject: `New PulsePoint membership inquiry: ${INTEREST_LEVEL_LABELS[interest_level]}`,
      heading: 'New membership inquiry',
      intro: 'A new membership inquiry was saved in the PulsePoint admin dashboard.',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone || null },
        { label: 'Interest level', value: INTEREST_LEVEL_LABELS[interest_level] },
        { label: 'Heard about PulsePoint', value: hear_about_us || null },
      ],
    })
  } catch (notificationError) {
    console.error('membership inquiry notification failed:', notificationError)
  }

  return NextResponse.json({ ok: true })
}
