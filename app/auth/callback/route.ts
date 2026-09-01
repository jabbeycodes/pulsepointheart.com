// This route handles the magic link redirect from Supabase.
// When the user clicks the login link in their email, Supabase redirects
// them here with a code. We exchange it for a session and redirect to /admin.

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

function safeNext(next: string | null, fallback: string) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return fallback
  return next
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const fallback = type === 'recovery' ? '/admin/reset-password' : '/admin'
  const next = safeNext(searchParams.get('next'), fallback)

  if (code) {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If something went wrong, send back to login with an error
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`)
}
