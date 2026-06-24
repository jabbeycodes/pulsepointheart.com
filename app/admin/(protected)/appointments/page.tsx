import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import AdminTable from '@/components/admin/AdminTable'
import { APPOINTMENT_REASON_LABELS, TIMEFRAME_LABELS } from '@/lib/validation'

export const metadata: Metadata = { title: 'Appointment Requests | PulsePoint Admin' }

export default async function AdminAppointmentsPage() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('appointment_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="text-red-600">Failed to load: {error.message}</div>

  const rows = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    reason: APPOINTMENT_REASON_LABELS[r.reason_for_visit as keyof typeof APPOINTMENT_REASON_LABELS] ?? r.reason_for_visit,
    timeframe: TIMEFRAME_LABELS[r.preferred_timeframe as keyof typeof TIMEFRAME_LABELS] ?? r.preferred_timeframe,
    contact_via: r.preferred_contact,
    notes: r.notes ?? '—',
    status: r.status,
    date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }))

  return (
    <div>
      <h1 className="mb-2 font-display text-xl font-bold text-charcoal sm:text-2xl">Appointment Requests</h1>
      <p className="mb-6 text-[.88rem] text-muted">{rows.length} total requests</p>
      <AdminTable
        rows={rows}
        table="appointment_requests"
        columns={['name', 'email', 'phone', 'reason', 'timeframe', 'contact_via', 'notes', 'status', 'date']}
        statusOptions={['new', 'contacted', 'scheduled', 'completed', 'cancelled', 'spam']}
      />
    </div>
  )
}
