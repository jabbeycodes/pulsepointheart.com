'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')

    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email'), website: fd.get('website') || '' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-[.8rem] text-gold">
        ✓ You&apos;re subscribed. Thank you!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <p className="mb-2 text-[.75rem] uppercase tracking-[1.5px] font-semibold text-gold">
        Heart Health Updates
      </p>
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="flex-1 min-w-0 rounded border border-white/20 bg-white/10 px-3 py-2 text-[.82rem] text-white placeholder-white/40 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded bg-gold px-3 py-2 text-[.78rem] font-bold text-charcoal transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'submitting' ? '...' : 'Subscribe'}
        </button>
      </div>
      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p className="mt-1 text-[.75rem] text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
