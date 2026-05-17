// Server-side Supabase clients.
// Two flavors:
//   1. createServerClient() - uses the anon key, respects RLS, can read user session from cookies.
//      Use in: Server Components, Server Actions, API routes that act AS the user.
//
//   2. createAdminClient() - uses the SERVICE_ROLE_KEY, bypasses RLS entirely.
//      Use ONLY in API routes / server code where you need elevated privileges
//      (e.g. inserting into a table that the public can't normally insert into).
//      NEVER ship this to the browser. NEVER expose it.

import { createServerClient as createSSRClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Used by server components / API routes that should respect RLS
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Setting cookies from a Server Component will throw; safe to ignore
            // if there's middleware refreshing the session.
          }
        },
      },
    }
  )
}

// Admin client - bypasses RLS. USE WITH EXTREME CARE. Server-only.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
