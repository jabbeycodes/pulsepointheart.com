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
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  reason: 'Reason',
  message: 'Message',
  status: 'Status',
  date: 'Date',
  timeframe: 'Timeframe',
  contact_via: 'Contact via',
  notes: 'Notes',
  interest: 'Interest level',
  referral: 'Referral',
}

function StatusSelect({
  row,
  statusOptions,
  updating,
  onUpdate,
}: {
  row: Row
  statusOptions: string[]
  updating: string | null
  onUpdate: (id: string, status: string) => void
}) {
  return (
    <select
      value={row.status}
      disabled={updating === row.id}
      onChange={(e) => onUpdate(row.id, e.target.value)}
      className={`min-h-[36px] cursor-pointer rounded-full border-0 px-3 py-1 text-[.78rem] font-semibold outline-none ${STATUS_COLORS[row.status] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {statusOptions.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )
}

function CellValue({ col, row }: { col: string; row: Row }) {
  if (col === 'email') {
    return (
      <a href={`mailto:${row[col]}`} className="break-all text-wine hover:underline">
        {row[col]}
      </a>
    )
  }

  if (col === 'phone') {
    return row[col] !== '—' ? (
      <a href={`tel:${row[col]?.replace(/\D/g, '')}`} className="text-wine hover:underline">
        {row[col]}
      </a>
    ) : (
      <span className="text-muted">—</span>
    )
  }

  if (col === 'message' || col === 'notes') {
    return row[col] === '—' ? (
      <span className="text-muted">—</span>
    ) : (
      <span className="whitespace-pre-wrap break-words text-charcoal">{row[col]}</span>
    )
  }

  if (col === 'name') {
    return <span className="font-semibold text-charcoal">{row[col]}</span>
  }

  return <span className="break-words text-charcoal">{row[col]}</span>
}

export default function AdminTable({ rows, table, columns, statusOptions }: Props) {
  const [data, setData] = useState<Row[]>(rows)
  const [updating, setUpdating] = useState<string | null>(null)
  const supabase = createClient()

  async function updateStatus(id: string, newStatus: string) {
    setUpdating(id)
    const { error } = await supabase.from(table).update({ status: newStatus }).eq('id', id)
    if (!error) {
      setData((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
    }
    setUpdating(null)
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-[#E2E8F0] p-8 text-center text-muted sm:p-12">
        No submissions yet.
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {data.map((row) => (
          <article key={row.id} className="rounded-lg border border-[#E8ECF0] bg-white p-4 shadow-card">
            <div className="mb-3 flex items-start justify-between gap-3 border-b border-[#F1F5F9] pb-3">
              <div>
                <div className="font-display text-[1.05rem] font-bold text-charcoal">{row.name}</div>
                <div className="mt-1 text-[.78rem] text-muted">{row.date}</div>
              </div>
              <StatusSelect
                row={row}
                statusOptions={statusOptions}
                updating={updating}
                onUpdate={updateStatus}
              />
            </div>
            <dl className="space-y-3">
              {columns
                .filter((col) => col !== 'name' && col !== 'status' && col !== 'date')
                .map((col) => (
                  <div key={col}>
                    <dt className="text-[.68rem] font-semibold uppercase tracking-[.8px] text-muted">
                      {COL_LABELS[col] ?? col}
                    </dt>
                    <dd className="mt-1 text-[.86rem] leading-relaxed">
                      <CellValue col={col} row={row} />
                    </dd>
                  </div>
                ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-lg bg-white shadow-card md:block">
        <table className="w-full min-w-[720px] text-[.82rem]">
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
                      <StatusSelect
                        row={row}
                        statusOptions={statusOptions}
                        updating={updating}
                        onUpdate={updateStatus}
                      />
                    ) : (
                      <CellValue col={col} row={row} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
