'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/membership', label: 'Membership' },
  { href: '/diagnostics', label: 'Diagnostics' },
  { href: '/contact', label: 'Patient Info' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  // Tracks whether the mobile drawer is open
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
          {/* h-[42px] mobile, h-12 desktop matches the original site */}
          <Image
            src="/assets/logo.png"
            alt="PulsePoint Clinic"
            width={200}
            height={48}
            priority
            className="h-[42px] w-auto lg:h-12"
          />
        </Link>

        {/* Desktop nav links */}
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

        {/* Desktop Book CTA */}
        <Link
          href="/book"
          className="hidden min-h-[44px] items-center gap-2 rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light lg:inline-flex"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Book Appointment
        </Link>

        {/* Mobile hamburger */}
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

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-[99] bg-white px-5 pb-6 pt-4 shadow-[0_4px_14px_rgba(0,0,0,.08)] transition-transform duration-300 lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-[110%]'
        }`}
      >
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
        <Link
          href="/book"
          onClick={close}
          className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Book Appointment
        </Link>
      </div>
    </>
  )
}
