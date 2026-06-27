import { PREFERRED_TIMEFRAMES, TIMEFRAME_LABELS } from '@/lib/validation'

/** First day patients can book or be scheduled (local clinic timezone). */
export const EARLIEST_BOOKING_DATE =
  process.env.NEXT_PUBLIC_EARLIEST_BOOKING_DATE ?? '2026-07-06'

export const OUTLOOK_BOOKING_URL =
  'https://outlook.office.com/book/PulsePointHeartClinic@pulsepointheart.com/'

const CLINIC_TIMEZONE = 'America/Chicago'

function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Calendar date in clinic timezone (YYYY-MM-DD). */
export function clinicTodayIso(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function formatBookingDate(isoDate: string): string {
  return parseLocalDate(isoDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isOnlineBookingOpen(now = new Date()): boolean {
  return clinicTodayIso(now) >= EARLIEST_BOOKING_DATE
}

/** Timeframe options shown before the earliest booking date opens. */
export function getAvailableTimeframes(now = new Date()) {
  if (isOnlineBookingOpen(now)) return [...PREFERRED_TIMEFRAMES]
  return ['flexible'] as const
}

export function getTimeframeLabels(now = new Date()): Record<string, string> {
  if (isOnlineBookingOpen(now)) return { ...TIMEFRAME_LABELS }

  return {
    flexible: `On or after ${formatBookingDate(EARLIEST_BOOKING_DATE)}`,
  }
}

export function isAllowedTimeframe(
  timeframe: string,
  now = new Date(),
): boolean {
  return (getAvailableTimeframes(now) as readonly string[]).includes(timeframe)
}

export function earliestBookingNotice(): string {
  return `The earliest available appointments begin ${formatBookingDate(EARLIEST_BOOKING_DATE)}. Our team will contact you to confirm a date on or after that day.`
}
