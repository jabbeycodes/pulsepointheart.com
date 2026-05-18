import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import AppointmentRequestForm from '@/components/AppointmentRequestForm'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Request a consultation or book your next appointment at PulsePoint Clinic.',
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-graybg px-5 py-10 sm:px-8 lg:px-12">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Appointments
          </div>
          <h1 className="font-display text-[2rem] font-bold leading-[1.18] text-charcoal sm:text-[2.5rem]">
            Schedule a Consultation
          </h1>
          <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
        </div>

        <div className="px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

            {/* ── New Patients ─────────────────────────────── */}
            <div>
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-wine/10 px-3 py-1 text-[.72rem] font-semibold uppercase tracking-[1.5px] text-wine">
                New Patients
              </div>
              <h2 className="mt-2 font-display text-[1.5rem] font-bold text-charcoal">
                Request a Consultation Call
              </h2>
              <p className="mb-6 mt-2 text-[.9rem] leading-[1.65] text-muted">
                New to PulsePoint? Fill out the form below and our team will
                reach out within one business day to introduce you to the
                practice, answer your questions, and schedule your first visit.
              </p>
              <AppointmentRequestForm />
            </div>

            {/* ── Existing Patients ─────────────────────────── */}
            <div>
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-navy/10 px-3 py-1 text-[.72rem] font-semibold uppercase tracking-[1.5px] text-navy">
                Existing Patients
              </div>
              <h2 className="mt-2 font-display text-[1.5rem] font-bold text-charcoal">
                Book Your Next Appointment
              </h2>
              <p className="mb-6 mt-2 text-[.9rem] leading-[1.65] text-muted">
                Already a PulsePoint patient or member? Use our online
                scheduling calendar to book your follow-up or wellness visit
                directly.
              </p>

              {/*
                ── MICROSOFT BOOKINGS PLACEHOLDER ──────────────────
                TODO: Replace this block with your Microsoft Bookings
                iframe embed once Dr. Tibuakuu sets up the account.

                Steps:
                1. Go to Microsoft Bookings (office.com → Bookings)
                2. Set up availability and services
                3. Settings → Booking page → Embed
                4. Copy the iframe src URL
                5. Replace the src below with your real URL

                Example:
                <iframe
                  src="https://outlook.office365.com/owa/calendar/YourBookingLink@pulsepointheart.com/bookings/"
                  width="100%"
                  height="600"
                  scrolling="yes"
                  style={{ border: 0 }}
                />
              */}
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded border-2 border-dashed border-[#E2E8F0] bg-graybg p-8 text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="h-10 w-10 text-muted/50">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <div>
                  <p className="font-semibold text-charcoal">Online Scheduling Coming Soon</p>
                  <p className="mt-1 text-[.85rem] text-muted">
                    In the meantime, please call us to book your appointment.
                  </p>
                </div>
                <a
                  href="tel:5734249000"
                  className="flex min-h-[44px] items-center gap-2 rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light"
                >
                  Call 573.424.9000
                </a>
              </div>

              {/* Quick contact info */}
              <div className="mt-5 rounded bg-navy p-5 text-white">
                <p className="mb-1 text-[.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
                  Prefer to call?
                </p>
                <p className="text-[.88rem] text-white/80">
                  Our team is available by appointment. Call us at{' '}
                  <a href="tel:5734249000" className="font-semibold text-gold">
                    573.424.9000
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:drtibiz@pulsepointheart.com" className="font-semibold text-gold">
                    drtibiz@pulsepointheart.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
