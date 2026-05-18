import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import AdminTable from '@/components/admin/AdminTable'
import { CONTACT_REASON_LABELS } from '@/lib/validation'

export const metadata: Metadata = { title: 'Contact Messages | PulsePoint Admin' }

export default async function AdminContactsPage() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-600">Failed to load contacts: {error.message}</div>
  }

  const rows = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone ?? '—',
    reason: CONTACT_REASON_LABELS[r.reason as keyof typeof CONTACT_REASON_LABELS] ?? r.reason,
    message: r.message ?? '—',
    status: r.status,
    date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-charcoal">Contact Messages</h1>
      <p className="mb-6 text-[.88rem] text-muted">{rows.length} total submissions</p>
      <AdminTable
        rows={rows}
        table="contact_submissions"
        columns={['name', 'email', 'phone', 'reason', 'message', 'status', 'date']}
        statusOptions={['new', 'contacted', 'converted', 'archived', 'spam']}
      />
    </div>
  )
}
