// API route: POST /api/contact
// Receives contact form submissions, validates them, inserts into Supabase.
//
// Key safeguards:
// 1. Server-side Zod validation (never trust client)
// 2. Honeypot field rejection
// 3. Insert uses anon key + RLS policy (defense in depth)
// 4. Generic error messages to client (don't leak internals)

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { contactSchema } from '@/lib/validation'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }

  // Validate
  const result = contactSchema.safeParse(payload)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Please check your form and try again.' },
      { status: 400 }
    )
  }

  const { name, email, phone, reason, message, website } = result.data

  // Honeypot: if the hidden "website" field has any value, it's a bot.
  // We return success to confuse the bot but don't actually save.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // Insert via the standard (RLS-respecting) server client.
  // The RLS policy allows anonymous inserts on this table.
  const supabase = await createServerClient()
  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name,
      email,
      phone: phone || null,
      reason,
      message: message || null,
      source: 'website',
    })

  if (error) {
    // Log server-side but don't expose internals to client
    console.error('contact_submissions insert failed:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please call us at (855) 785-7337.' },
      { status: 500 }
    )
  }

  // TODO Phase 2: trigger email notification to Mtibuakuu@pulsepointheart.com
  // via Resend or a Supabase Edge Function.

  return NextResponse.json({ ok: true })
}
