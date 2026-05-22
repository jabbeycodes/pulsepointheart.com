import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Newsletter Signups | PulsePoint Admin' }

export default async function AdminNewsletterPage() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('newsletter_signups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="text-red-600">Failed to load: {error.message}</div>

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-charcoal">Newsletter Signups</h1>
      <p className="mb-6 text-[.88rem] text-muted">{data?.length ?? 0} subscribers</p>

      <div className="overflow-hidden rounded-lg bg-white shadow-card">
        <table className="w-full text-[.85rem]">
          <thead className="border-b border-[#E2E8F0] bg-graybg text-left text-[.72rem] font-semibold uppercase tracking-[1px] text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {(data ?? []).map((row) => (
              <tr key={row.id} className="hover:bg-graybg/50">
                <td className="px-4 py-3 font-semibold text-charcoal">{row.name ?? '—'}</td>
                <td className="px-4 py-3 font-medium text-charcoal">{row.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[.72rem] font-semibold ${
                    row.subscribed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {row.subscribed ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">No signups yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
