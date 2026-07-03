'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CLINIC } from '@/lib/seo'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const CTA_BUTTON_CLASS =
  'min-h-[44px] items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light'

function PaymentIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="sticky top-0 z-[100] flex h-16 items-center justify-between bg-white px-5 shadow-navBar lg:h-[72px] lg:px-12">
        <Link
          href="/"
          aria-label="PulsePoint Clinic home"
          className="flex items-center"
        >
          <img
            src="/assets/logo.png"
            alt="PulsePoint Clinic"
            className="h-12 w-auto lg:h-14"
          />
        </Link>

        <ul className="hidden gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-charcoal transition-colors hover:text-wine"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={CLINIC.healowPayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex ${CTA_BUTTON_CLASS}`}
          >
            <PaymentIcon />
            Pay a Bill
          </a>
          <a
            href={CLINIC.patientPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex ${CTA_BUTTON_CLASS}`}
          >
            <UserIcon />
            Patient Portal
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md lg:hidden"
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
          <div className="mt-4 flex gap-3">
            <a
              href={CLINIC.healowPayUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className={`flex flex-1 ${CTA_BUTTON_CLASS}`}
            >
              <PaymentIcon />
              Pay a Bill
            </a>
            <a
              href={CLINIC.patientPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className={`flex flex-1 ${CTA_BUTTON_CLASS}`}
            >
              <UserIcon />
              Patient Portal
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
