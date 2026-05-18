import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard | PulsePoint Admin' }

async function getCounts(supabase: Awaited<ReturnType<typeof createServerClient>>) {
  const [contacts, appointments, memberships, newsletters] = await Promise.all([
    supabase.from('contact_submissions').select('id, status', { count: 'exact' }),
    supabase.from('appointment_requests').select('id, status', { count: 'exact' }),
    supabase.from('membership_inquiries').select('id, status', { count: 'exact' }),
    supabase.from('newsletter_signups').select('id', { count: 'exact' }),
  ])
  return {
    contacts: { total: contacts.count ?? 0, newCount: contacts.data?.filter(r => r.status === 'new').length ?? 0 },
    appointments: { total: appointments.count ?? 0, newCount: appointments.data?.filter(r => r.status === 'new').length ?? 0 },
    memberships: { total: memberships.count ?? 0, newCount: memberships.data?.filter(r => r.status === 'new').length ?? 0 },
    newsletters: { total: newsletters.count ?? 0 },
  }
}

export default async function AdminDashboardPage() {
  const supabase = await createServerClient()
  const counts = await getCounts(supabase)

  const cards = [
    { label: 'Contact Messages', href: '/admin/contacts', total: counts.contacts.total, newCount: counts.contacts.newCount, color: 'bg-wine' },
    { label: 'Appointment Requests', href: '/admin/appointments', total: counts.appointments.total, newCount: counts.appointments.newCount, color: 'bg-navy' },
    { label: 'Membership Inquiries', href: '/admin/membership', total: counts.memberships.total, newCount: counts.memberships.newCount, color: 'bg-[#7A6020]' },
    { label: 'Newsletter Signups', href: '/admin/newsletter', total: counts.newsletters.total, newCount: 0, color: 'bg-[#2A6E3A]' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-charcoal">Dashboard</h1>
        <p className="mt-1 text-[.88rem] text-muted">Overview of all patient inquiries and submissions.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-lg bg-white p-5 shadow-card transition-shadow hover:shadow-cardHover"
          >
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md ${card.color}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-4 w-4">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-charcoal">{card.total}</div>
            <div className="text-[.82rem] text-muted">{card.label}</div>
            {card.newCount > 0 && (
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[.72rem] font-semibold text-red-700">
                {card.newCount} new
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-white p-5 shadow-card">
        <h2 className="mb-1 font-bold text-charcoal">Quick Actions</h2>
        <p className="mb-4 text-[.82rem] text-muted">Jump to a specific section to review and update submissions.</p>
        <div className="flex flex-wrap gap-2">
          {cards.map((card) => (
            <Link key={card.label} href={card.href}
              className="rounded-md border border-[#E2E8F0] px-3 py-1.5 text-[.82rem] font-medium text-charcoal hover:border-wine hover:text-wine transition-colors">
              {card.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
