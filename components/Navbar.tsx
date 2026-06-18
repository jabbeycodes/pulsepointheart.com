'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CLINIC } from '@/lib/seo'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/about#physicians', label: 'Physicians' },
  { href: '/patient-info', label: 'Patient Info' },
  { href: '/contact', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
]

const CTA_BUTTON_CLASS =
  'min-h-[44px] items-center justify-center gap-2 rounded-md bg-wine px-4 py-2.5 text-[.82rem] font-semibold text-white transition-colors hover:bg-wine-light sm:px-5 sm:text-sm'

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-[100] flex h-16 items-center justify-between bg-white px-5 shadow-navBar lg:h-[72px] lg:px-12">
        <Link href="/" aria-label="PulsePoint Clinic home" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="PulsePoint Clinic"
            className="h-12 w-auto lg:h-14"
          />
        </Link>

        <ul className="hidden gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[.78rem] font-semibold uppercase tracking-[.5px] text-charcoal transition-colors hover:text-wine xl:text-[.82rem] xl:tracking-[.6px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          <a
            href="tel:18557857337"
            className="hidden items-center gap-1.5 text-[.78rem] font-semibold text-navy hover:text-wine xl:inline-flex xl:text-[.82rem]"
          >
            <PhoneIcon />
            {CLINIC.phoneDisplay}
          </a>
          <Link href="/book" className={`inline-flex ${CTA_BUTTON_CLASS}`}>
            Schedule Consultation
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:18557857337"
            aria-label={`Call ${CLINIC.phoneDisplay}`}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-wine/10 text-wine"
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md"
          >
            <span
              className={`block h-0.5 w-[22px] rounded bg-charcoal transition-transform duration-200 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-[22px] rounded bg-charcoal transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-[22px] rounded bg-charcoal transition-transform duration-200 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-[99] bg-white px-5 pb-6 pt-4 shadow-[0_4px_14px_rgba(0,0,0,.08)] lg:hidden">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block border-b border-[#EEF1F5] py-[14px] text-[.95rem] font-medium text-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-3">
            <a
              href="tel:18557857337"
              onClick={close}
              className={`flex w-full ${CTA_BUTTON_CLASS}`}
            >
              <PhoneIcon />
              {CLINIC.phoneDisplay}
            </a>
            <Link href="/book" onClick={close} className={`flex w-full ${CTA_BUTTON_CLASS}`}>
              Schedule Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
