'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Status = 'idle' | 'saving' | 'success' | 'error'

export default function AdminResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setStatus('error')
      setErrorMsg('Use at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setStatus('error')
      setErrorMsg('Passwords do not match.')
      return
    }

    setStatus('saving')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setStatus('error')
      setErrorMsg(
        error.message.includes('session')
          ? 'This reset link expired or was opened on the wrong device. Request a new one from the login page.'
          : error.message,
      )
      return
    }

    setStatus('success')
    window.setTimeout(() => {
      window.location.href = '/admin'
    }, 800)
  }

  if (status === 'success') {
    return (
      <p className="text-[.92rem] leading-[1.65] text-muted">
        Password updated. Opening the dashboard…
      </p>
    )
  }

  const inputCls =
    'w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="new-password" className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          Confirm password
        </label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={8}
          className={inputCls}
        />
      </div>

      {status === 'error' && errorMsg ? (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-[.82rem] text-red-700">
          {errorMsg}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light disabled:opacity-60"
      >
        {status === 'saving' ? 'Saving...' : 'Update password'}
      </button>

      <p className="text-center text-[.82rem] text-muted">
        <Link href="/admin/login" className="font-semibold text-wine hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  )
}
