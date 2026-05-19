'use client'

import { useState } from 'react'
import FormPrivacyNotice from './FormPrivacyNotice'
import { INTEREST_LEVELS, INTEREST_LEVEL_LABELS } from '@/lib/validation'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function MembershipInquiryForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone') || '',
      interest_level: fd.get('interest_level'),
      hear_about_us: fd.get('hear_about_us') || '',
      notes: fd.get('notes') || '',
      website: fd.get('website') || '',
    }

    try {
      const res = await fetch('/api/membership-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return }
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again or call (855) 785-7337.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-gold/40 bg-gold/5 p-6">
        <h3 className="mb-2 font-display text-xl font-bold text-charcoal">Thank you for your interest.</h3>
        <p className="text-[.92rem] leading-[1.65] text-muted">
          We will reach out shortly to tell you more about the PulsePoint membership program.
          Questions? Call us at{' '}
          <a href="tel:18557857337" className="font-semibold text-wine">(855) 785-7337</a>.
        </p>
      </div>
    )
  }

  const inputCls = 'w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20'
  const labelCls = 'mb-1.5 block text-[.82rem] font-semibold text-charcoal'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormPrivacyNotice />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Full Name <span className="text-wine">*</span></label>
          <input name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email <span className="text-wine">*</span></label>
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Phone (optional)</label>
          <input name="phone" type="tel" maxLength={25} autoComplete="tel" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Where are you in the process? <span className="text-wine">*</span></label>
          <select name="interest_level" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select...</option>
            {INTEREST_LEVELS.map(l => (
              <option key={l} value={l}>{INTEREST_LEVEL_LABELS[l]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>How did you hear about us? (optional)</label>
        <input name="hear_about_us" type="text" maxLength={80} placeholder="Google, referral, social media..." className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Questions or comments (optional)</label>
        <textarea
          name="notes"
          rows={3}
          maxLength={500}
          placeholder="Any questions about the membership program, pricing, what's included, etc."
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && errorMsg && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-[.85rem] text-red-700">{errorMsg}</div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit Inquiry →'}
      </button>
    </form>
  )
}
