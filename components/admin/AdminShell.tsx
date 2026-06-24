'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminLogo from '@/components/admin/AdminLogo'

export default function AdminShell({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-[#E8ECF0] bg-white px-5 shadow-navBar lg:hidden">
        <button
          type="button"
          aria-label="Open admin menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-charcoal hover:bg-graybg"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <AdminLogo size="md" />
      </header>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close admin menu"
          className="fixed inset-0 z-40 bg-navy/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div className="flex min-h-[calc(100vh-4rem)] lg:min-h-screen">
        <AdminSidebar
          email={email}
          mobileOpen={mobileOpen}
          onNavigate={() => setMobileOpen(false)}
          onClose={() => setMobileOpen(false)}
        />
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
