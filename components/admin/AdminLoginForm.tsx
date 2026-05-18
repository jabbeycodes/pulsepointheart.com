'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function AdminLoginForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    })

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
      return
    }

    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="rounded border border-gold/30 bg-gold/5 p-4 text-[.88rem] text-charcoal">
        <strong className="block text-wine">Check your email.</strong>
        We sent a login link to <strong>{email}</strong>. Click it to access the admin dashboard.
        The link expires in 1 hour.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
        />
      </div>

      {status === 'error' && errorMsg && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-[.82rem] text-red-700">{errorMsg}</div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending link...' : 'Send login link →'}
      </button>

      <p className="text-center text-[.75rem] text-muted">
        No password needed — we email you a secure link.
      </p>
    </form>
  )
}
