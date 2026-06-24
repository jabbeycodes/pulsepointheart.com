import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Newsletter Signups | PulsePoint Admin' }

export default async function AdminNewsletterPage() {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('newsletter_signups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="text-red-600">Failed to load: {error.message}</div>

  const rows = data ?? []

  return (
    <div>
      <h1 className="mb-2 font-display text-xl font-bold text-charcoal sm:text-2xl">
        Newsletter Signups
      </h1>
      <p className="mb-6 text-[.88rem] text-muted">{rows.length} subscribers</p>

      {rows.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-[#E2E8F0] p-8 text-center text-muted">
          No signups yet.
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {rows.map((row) => (
              <article
                key={row.id}
                className="rounded-lg border border-[#E8ECF0] bg-white p-4 shadow-card"
              >
                <div className="font-semibold text-charcoal">{row.name ?? '—'}</div>
                <a
                  href={`mailto:${row.email}`}
                  className="mt-1 block break-all text-[.88rem] text-wine hover:underline"
                >
                  {row.email}
                </a>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[.72rem] font-semibold ${
                      row.subscribed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {row.subscribed ? 'Active' : 'Unsubscribed'}
                  </span>
                  <span className="text-[.78rem] text-muted">
                    {new Date(row.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-lg bg-white shadow-card md:block">
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
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-graybg/50">
                    <td className="px-4 py-3 font-semibold text-charcoal">{row.name ?? '—'}</td>
                    <td className="px-4 py-3 font-medium text-charcoal">{row.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[.72rem] font-semibold ${
                          row.subscribed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {row.subscribed ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(row.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
