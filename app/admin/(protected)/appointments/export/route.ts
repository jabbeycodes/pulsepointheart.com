import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { APPOINTMENT_REASON_LABELS, TIMEFRAME_LABELS } from '@/lib/validation'

export const dynamic = 'force-dynamic'

const EXPORT_BATCH_SIZE = 1000
const CSV_HEADERS = [
  'Name',
  'Email',
  'Phone',
  'Reason for visit',
  'Preferred timeframe',
  'Preferred contact',
  'Notes',
  'Status',
  'Source',
  'Submitted at',
  'Last updated',
]

function csvCell(value: unknown) {
  let text = value == null ? '' : String(value)

  // Prevent spreadsheet applications from interpreting contact data as formulas.
  if (/^[=+\-@]/.test(text)) text = `'${text}`

  return `"${text.replaceAll('"', '""')}"`
}

export async function GET() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const records: Array<Record<string, string | null>> = []

  // Supabase caps a response at 1,000 rows by default. Fetch in batches so
  // "Export all" never silently omits older requests as the archive grows.
  while (true) {
    const from = records.length
    const { data, error } = await supabase
      .from('appointment_requests')
      .select(
        'id,name,email,phone,reason_for_visit,preferred_timeframe,preferred_contact,notes,status,source,created_at,updated_at',
      )
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .range(from, from + EXPORT_BATCH_SIZE - 1)

    if (error) {
      console.error('Appointment request export failed:', error)
      return NextResponse.json({ error: 'Unable to export appointment requests.' }, { status: 500 })
    }

    records.push(...(data ?? []))
    if (!data || data.length < EXPORT_BATCH_SIZE) break
  }

  const rows = records.map((row) => [
    row.name,
    row.email,
    row.phone,
    APPOINTMENT_REASON_LABELS[
      row.reason_for_visit as keyof typeof APPOINTMENT_REASON_LABELS
    ] ?? row.reason_for_visit,
    TIMEFRAME_LABELS[
      row.preferred_timeframe as keyof typeof TIMEFRAME_LABELS
    ] ?? row.preferred_timeframe,
    row.preferred_contact,
    row.notes,
    row.status,
    row.source,
    row.created_at,
    row.updated_at,
  ])

  const csv = [
    CSV_HEADERS.map(csvCell).join(','),
    ...rows.map((row) => row.map(csvCell).join(',')),
  ].join('\r\n')
  const date = new Date().toISOString().slice(0, 10)

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition': `attachment; filename="pulsepoint-appointment-requests-${date}.csv"`,
      'Content-Type': 'text/csv; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
