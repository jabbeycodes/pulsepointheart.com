'use client'

import { useState } from 'react'
import FormPrivacyNotice from './FormPrivacyNotice'
import {
  APPOINTMENT_REASON_LABELS,
  APPOINTMENT_REASONS,
} from '@/lib/validation'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Props = {
  availableTimeframes: readonly string[]
  timeframeLabels: Record<string, string>
  showEarliestDateNotice?: boolean
  earliestDateNotice?: string
}

export default function AppointmentRequestForm({
  availableTimeframes,
  timeframeLabels,
  showEarliestDateNotice = false,
  earliestDateNotice,
}: Props) {
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
      phone: fd.get('phone'),
      preferred_contact: fd.get('preferred_contact'),
      preferred_timeframe: fd.get('preferred_timeframe'),
      reason_for_visit: fd.get('reason_for_visit'),
      notes: fd.get('notes') || '',
      website: fd.get('website') || '',
    }

    try {
      const res = await fetch('/api/appointment-request', {
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
        <h3 className="mb-2 font-display text-xl font-bold text-charcoal">Request received.</h3>
        <p className="text-[.92rem] leading-[1.65] text-muted">
          A member of our team will contact you within one business day to confirm your consultation.
          For urgent matters, call us at{' '}
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

      {showEarliestDateNotice && earliestDateNotice && (
        <div className="rounded-md border-l-2 border-wine bg-wine/5 p-3">
          <p className="text-[.84rem] leading-[1.6] text-charcoal">{earliestDateNotice}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Full Name <span className="text-wine">*</span></label>
          <input name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone <span className="text-wine">*</span></label>
          <input name="phone" type="tel" required minLength={7} maxLength={25} autoComplete="tel" className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Email <span className="text-wine">*</span></label>
        <input name="email" type="email" required maxLength={120} autoComplete="email" className={inputCls} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Reason for visit <span className="text-wine">*</span></label>
          <select name="reason_for_visit" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select...</option>
            {APPOINTMENT_REASONS.map(r => (
              <option key={r} value={r}>{APPOINTMENT_REASON_LABELS[r]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Preferred timeframe <span className="text-wine">*</span></label>
          <select name="preferred_timeframe" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select...</option>
            {availableTimeframes.map((t) => (
              <option key={t} value={t}>{timeframeLabels[t] ?? t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Best way to reach you <span className="text-wine">*</span></label>
        <select name="preferred_contact" required defaultValue="phone" className={inputCls}>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="either">Either is fine</option>
        </select>
      </div>

      <div>
        <label className={labelCls}>Anything else? (optional)</label>
        <textarea
          name="notes"
          rows={3}
          maxLength={500}
          placeholder="Best time to call, specific questions about the practice, etc. Please leave out medical details."
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
        {status === 'submitting' ? 'Sending...' : 'Request Consultation →'}
      </button>
    </form>
  )
}
