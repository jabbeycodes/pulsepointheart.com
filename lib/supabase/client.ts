// Browser-side Supabase client.
// Use this in client components ("use client") for things like:
// - Public form submissions
// - Reading public data
//
// Uses the anon key (safe to expose to the browser).
// RLS policies on the database are what actually protect the data.

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
