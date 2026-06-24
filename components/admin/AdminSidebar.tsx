'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import AdminLogo from '@/components/admin/AdminLogo'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/contacts', label: 'Contact Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { href: '/admin/appointments', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { href: '/admin/membership', label: 'Membership', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { href: '/admin/blog', label: 'Blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2zM14 4v6h6M8 13h8M8 17h5' },
]

type AdminSidebarProps = {
  email: string
  mobileOpen?: boolean
  onNavigate?: () => void
  onClose?: () => void
}

export default function AdminSidebar({
  email,
  mobileOpen = false,
  onNavigate,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[min(100vw-2.5rem,17.5rem)] flex-shrink-0 flex-col border-r border-[#E8ECF0] bg-white shadow-xl transition-transform duration-200 lg:static lg:z-auto lg:w-56 lg:translate-x-0 lg:shadow-none ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="relative border-b border-[#E8ECF0] px-4 pb-4 pt-5">
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-md text-charcoal hover:bg-graybg lg:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="pr-10 lg:pr-0">
          <AdminLogo size="md" onClick={onNavigate} />
        </div>
        <p className="mt-2 truncate text-[.7rem] text-muted">{email}</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active =
            pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`mb-1 flex min-h-[44px] items-center gap-2.5 rounded-md px-3 py-2.5 text-[.82rem] font-medium transition-colors ${
                active ? 'bg-wine text-white' : 'text-charcoal hover:bg-graybg'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 flex-shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[#E8ECF0] p-3">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="mb-1 flex min-h-[44px] items-center gap-2 rounded-md px-3 py-2 text-[.78rem] text-muted hover:bg-graybg"
        >
          ↗ View live site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-[44px] w-full items-center gap-2 rounded-md px-3 py-2 text-[.78rem] text-muted hover:bg-red-50 hover:text-red-600"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
