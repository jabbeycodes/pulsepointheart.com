import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import AdminTable from '@/components/admin/AdminTable'
import { INTEREST_LEVEL_LABELS } from '@/lib/validation'

export const metadata: Metadata = { title: 'Membership Inquiries | PulsePoint Admin' }

export default async function AdminMembershipPage() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('membership_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="text-red-600">Failed to load: {error.message}</div>

  const rows = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone ?? '—',
    interest: INTEREST_LEVEL_LABELS[r.interest_level as keyof typeof INTEREST_LEVEL_LABELS] ?? r.interest_level,
    referral: r.hear_about_us ?? '—',
    notes: r.notes ?? '—',
    status: r.status,
    date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))

  return (
    <div>
      <h1 className="mb-2 font-display text-xl font-bold text-charcoal sm:text-2xl">Membership Inquiries</h1>
      <p className="mb-6 text-[.88rem] text-muted">{rows.length} total inquiries</p>
      <AdminTable
        rows={rows}
        table="membership_inquiries"
        columns={['name', 'email', 'phone', 'interest', 'referral', 'notes', 'status', 'date']}
        statusOptions={['new', 'contacted', 'enrolled', 'archived', 'spam']}
      />
    </div>
  )
}
