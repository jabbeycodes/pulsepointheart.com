'use client'

import { useState } from 'react'
import { CONTACT_REASONS } from '@/lib/validation'

// Maps the internal reason codes to user-friendly labels
const REASON_LABELS: Record<(typeof CONTACT_REASONS)[number], string> = {
  new_patient_inquiry: 'I want to become a patient',
  general_question: 'General question',
  media_or_partnership: 'Media / partnership',
  other: 'Other',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
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
      reason: fd.get('reason'),
      message: fd.get('message') || '',
      website: fd.get('website') || '', // honeypot
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      e.currentTarget.reset()
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-gold/40 bg-gold/5 p-6">
        <h3 className="mb-2 font-display text-xl font-bold text-charcoal">
          Thank you.
        </h3>
        <p className="text-[.92rem] leading-[1.65] text-muted">
          We received your message and will reach out within one business day.
          For urgent matters, please call us at{' '}
          <a href="tel:18557857337" className="font-semibold text-wine">
            (855) 785-7337
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* HIPAA-safety notice - per build doc section 15 */}
      <div className="rounded border border-wine/20 bg-wine/5 p-4 text-[.82rem] leading-[1.55] text-charcoal">
        <strong className="block font-semibold text-wine">
          A note about your privacy:
        </strong>
        Please do not share medical history, symptoms, or health details in
        this form. Our team will reach out to discuss those securely.
      </div>

      <div>
        <label className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          Full Name <span className="text-wine">*</span>
        </label>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className="w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
            Email <span className="text-wine">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            className="w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            maxLength={25}
            autoComplete="tel"
            className="w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          How can we help? <span className="text-wine">*</span>
        </label>
        <select
          name="reason"
          required
          defaultValue=""
          className="w-full rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
        >
          <option value="" disabled>
            Select a reason...
          </option>
          {CONTACT_REASONS.map((r) => (
            <option key={r} value={r}>
              {REASON_LABELS[r]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-[.82rem] font-semibold text-charcoal">
          Message (optional)
        </label>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="Anything else you'd like us to know — please leave out medical details."
          className="w-full resize-y rounded border border-[#E2E8F0] bg-white px-3 py-2.5 text-[.92rem] text-charcoal focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/20"
        />
      </div>

      {/* Honeypot - hidden from real users via CSS. Bots will fill it. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {status === 'error' && errorMsg && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-[.85rem] text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
