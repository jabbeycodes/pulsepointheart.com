'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  COMMUNITY_STATEMENT_BANNER_LINE,
  COMMUNITY_STATEMENT_DISMISS_KEY,
  COMMUNITY_STATEMENT_PATH,
} from '@/lib/community-statement'

/**
 * Site-wide reassurance bar. Dismissible via localStorage so returning visitors
 * are not nagged; the dedicated statement page remains the canonical source.
 */
export default function CommunityAnnouncementBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(COMMUNITY_STATEMENT_DISMISS_KEY) === '1') {
        setVisible(false)
        return
      }
    } catch {
      // Private mode / blocked storage — still show the bar.
    }
    setVisible(true)
  }, [])

  if (!visible || pathname === COMMUNITY_STATEMENT_PATH) {
    return null
  }

  function dismiss() {
    try {
      window.localStorage.setItem(COMMUNITY_STATEMENT_DISMISS_KEY, '1')
    } catch {
      // Ignore storage failures; hide for this session either way.
    }
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Clinic status announcement"
      className="border-b border-gold/30 bg-navy text-white"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-5 py-2.5 sm:items-center sm:gap-4 sm:px-8 lg:px-12">
        <p className="min-w-0 flex-1 text-[.78rem] leading-[1.45] text-white/90 sm:text-[.84rem]">
          <span className="font-semibold text-gold">We remain open. </span>
          {COMMUNITY_STATEMENT_BANNER_LINE}{' '}
          <Link
            href={COMMUNITY_STATEMENT_PATH}
            className="whitespace-nowrap font-semibold text-white underline decoration-gold/70 underline-offset-2 hover:decoration-gold"
          >
            Read our statement
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
