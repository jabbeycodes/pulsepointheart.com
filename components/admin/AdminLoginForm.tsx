'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Status = 'idle' | 'signing-in' | 'error'

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path strokeLinecap="round" d="M3 3l18 18" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.58 10.58a2 2 0 0 0 2.83 2.83M9.88 5.09A10.94 10.94 0 0 1 12 5c5.52 0 10 4.5 10 7s-1.02 2.73-2.62 4.24M6.1 6.1C4.3 7.41 3 9.2 3 12s4.48 7 9 7c1.01 0 1.98-.16 2.88-.45"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function AdminLoginForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('signing-in')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
      return
    }

    window.location.href = '/admin'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          Email address
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded border border-[#E2E8F0] bg-white py-2.5 pl-3 pr-11 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted transition-colors hover:text-charcoal"
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </div>

      {status === 'error' && errorMsg && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-[.82rem] text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'signing-in'}
        className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light disabled:opacity-60"
      >
        {status === 'signing-in' ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
