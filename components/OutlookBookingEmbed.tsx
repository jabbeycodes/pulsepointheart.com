import { CLINIC } from '@/lib/seo'
import {
  EARLIEST_BOOKING_DATE,
  OUTLOOK_BOOKING_URL,
  formatBookingDate,
  isOnlineBookingOpen,
} from '@/lib/booking'

export default function OutlookBookingEmbed() {
  const open = isOnlineBookingOpen()

  if (!open) {
    return (
      <div className="rounded-md border border-gold/30 bg-white p-6 shadow-card sm:p-8">
        <p className="text-[.72rem] font-semibold uppercase tracking-[1.8px] text-wine">
          Online scheduling
        </p>
        <h3 className="mt-2 font-display text-[1.35rem] font-bold text-charcoal">
          Appointments open {formatBookingDate(EARLIEST_BOOKING_DATE)}
        </h3>
        <p className="mt-3 text-[.9rem] leading-[1.7] text-muted">
          Our calendar is not yet accepting bookings before{' '}
          {formatBookingDate(EARLIEST_BOOKING_DATE)}. You can still submit a
          consultation request above, or call us and we will schedule you for
          the first available opening.
        </p>
        <p className="mt-4 text-[.88rem] leading-[1.65] text-muted">
          <a href={`tel:${CLINIC.phoneHref}`} className="font-semibold text-wine">
            {CLINIC.phoneDisplay}
          </a>{' '}
          ·{' '}
          <a href={`mailto:${CLINIC.email}`} className="font-semibold text-wine">
            {CLINIC.email}
          </a>
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-md bg-white shadow-card">
        <iframe
          src={OUTLOOK_BOOKING_URL}
          width="100%"
          height="620"
          scrolling="yes"
          style={{ border: 0, minHeight: 620 }}
          title="Book an appointment with PulsePoint Clinic"
          allow="camera; microphone"
        />
      </div>
      <p className="mt-3 text-center text-[.78rem] text-muted">
        Having trouble?{' '}
        <a
          href={OUTLOOK_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-wine hover:underline"
        >
          Open scheduling page directly
        </a>
      </p>
    </>
  )
}
