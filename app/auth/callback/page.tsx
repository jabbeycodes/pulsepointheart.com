'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

function safeNext(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null
  return value
}

function hashParams() {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.hash.replace(/^#/, ''))
}

export default function AuthCallbackPage() {
  const [message, setMessage] = useState('Finishing sign-in…')

  useEffect(() => {
    const supabase = createClient()
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const type = url.searchParams.get('type') ?? hashParams().get('type')
    const next =
      safeNext(url.searchParams.get('next')) ??
      (type === 'recovery' ? '/admin/reset-password' : '/admin')

    let finished = false
    const go = (path: string) => {
      if (finished) return
      finished = true
      window.location.replace(path)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        go('/admin/reset-password')
      }
    })

    async function run() {
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          setMessage('This link expired. Request a new one from the login page.')
          go('/admin/login?error=auth_failed')
          return
        }
        go(type === 'recovery' ? '/admin/reset-password' : next)
        return
      }

      // Dashboard recovery emails put tokens in the hash. The old server
      // route never saw them and dumped people on /admin/login.
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        go(type === 'recovery' ? '/admin/reset-password' : next)
        return
      }

      window.setTimeout(async () => {
        const again = await supabase.auth.getSession()
        if (again.data.session) {
          go(type === 'recovery' ? '/admin/reset-password' : next)
          return
        }
        go('/admin/login?error=auth_failed')
      }, 1200)
    }

    void run()
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5">
      <p className="text-center text-[.9rem] text-white/70">{message}</p>
    </div>
  )
}
