import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import {
  APPOINTMENT_REASON_LABELS,
  TIMEFRAME_LABELS,
  appointmentRequestSchema,
} from '@/lib/validation'
import { sendFormNotification } from '@/lib/email'
import { formatBookingDate, getTimeframeLabels, isAllowedTimeframe, EARLIEST_BOOKING_DATE } from '@/lib/booking'

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

  if (!isAllowedTimeframe(preferred_timeframe)) {
    return NextResponse.json(
      {
        error: `Appointments are available starting ${formatBookingDate(EARLIEST_BOOKING_DATE)}. Please choose a later timeframe.`,
      },
      { status: 400 },
    )
  }

  const timeframeLabel =
    getTimeframeLabels()[preferred_timeframe] ?? TIMEFRAME_LABELS[preferred_timeframe]

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

  try {
    await sendFormNotification({
      subject: `New PulsePoint appointment request: ${APPOINTMENT_REASON_LABELS[reason_for_visit]}`,
      heading: 'New appointment request',
      intro: 'A new appointment request was saved in the PulsePoint admin dashboard.',
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone },
        { label: 'Preferred contact', value: preferred_contact },
        { label: 'Preferred timeframe', value: timeframeLabel },
        { label: 'Reason for visit', value: APPOINTMENT_REASON_LABELS[reason_for_visit] },
      ],
    })
  } catch (notificationError) {
    console.error('appointment request notification failed:', notificationError)
  }

  return NextResponse.json({ ok: true })
}
