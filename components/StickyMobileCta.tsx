'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// Slides up from bottom after the user scrolls past 500px. Hidden on lg+.
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Spacer so content isn't hidden behind sticky CTA on mobile */}
      <div className="h-[72px] lg:hidden" />

      <div
        className={`fixed inset-x-0 bottom-0 z-[90] bg-white px-5 pt-2.5 shadow-stickyCta transition-transform duration-300 lg:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
        }}
      >
        <Link
          href="/book"
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white"
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
          Book a Visit
        </Link>
      </div>
    </>
  )
}
