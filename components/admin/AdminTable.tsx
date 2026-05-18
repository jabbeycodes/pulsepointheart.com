'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Row = Record<string, string>

interface Props {
  rows: Row[]
  table: string
  columns: string[]
  statusOptions: string[]
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  converted: 'bg-green-100 text-green-700',
  enrolled: 'bg-green-100 text-green-700',
  scheduled: 'bg-green-100 text-green-700',
  completed: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-500',
  cancelled: 'bg-gray-100 text-gray-500',
  spam: 'bg-red-100 text-red-600',
}

const COL_LABELS: Record<string, string> = {
  name: 'Name', email: 'Email', phone: 'Phone', reason: 'Reason',
  message: 'Message', status: 'Status', date: 'Date', timeframe: 'Timeframe',
  contact_via: 'Contact via', notes: 'Notes', interest: 'Interest level',
  referral: 'Referral',
}

export default function AdminTable({ rows, table, columns, statusOptions }: Props) {
  const [data, setData] = useState<Row[]>(rows)
  const [updating, setUpdating] = useState<string | null>(null)
  const supabase = createClient()

  async function updateStatus(id: string, newStatus: string) {
    setUpdating(id)
    const { error } = await supabase.from(table).update({ status: newStatus }).eq('id', id)
    if (!error) {
      setData((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r))
    }
    setUpdating(null)
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-[#E2E8F0] p-12 text-center text-muted">
        No submissions yet.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-card">
      <table className="w-full text-[.82rem]">
        <thead className="border-b border-[#E2E8F0] bg-graybg text-left text-[.7rem] font-semibold uppercase tracking-[1px] text-muted">
          <tr>
            {columns.map((col) => (
              <th key={col} className="whitespace-nowrap px-4 py-3">
                {COL_LABELS[col] ?? col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F1F5F9]">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-graybg/40">
              {columns.map((col) => (
                <td key={col} className="px-4 py-3 align-top">
                  {col === 'status' ? (
                    <select
                      value={row.status}
                      disabled={updating === row.id}
                      onChange={(e) => updateStatus(row.id, e.target.value)}
                      className={`cursor-pointer rounded-full border-0 px-2 py-0.5 text-[.72rem] font-semibold outline-none ${STATUS_COLORS[row.status] ?? 'bg-gray-100 text-gray-600'}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  ) : col === 'email' ? (
                    <a href={`mailto:${row[col]}`} className="text-wine hover:underline">{row[col]}</a>
                  ) : col === 'phone' ? (
                    row[col] !== '—'
                      ? <a href={`tel:${row[col]?.replace(/\D/g, '')}`} className="text-wine hover:underline">{row[col]}</a>
                      : <span className="text-muted">—</span>
                  ) : col === 'message' || col === 'notes' ? (
                    <span className="block max-w-[200px] truncate text-muted" title={row[col]}>
                      {row[col] === '—' ? <span className="text-muted">—</span> : row[col]}
                    </span>
                  ) : col === 'name' ? (
                    <span className="font-semibold text-charcoal">{row[col]}</span>
                  ) : (
                    <span className="text-charcoal">{row[col]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
