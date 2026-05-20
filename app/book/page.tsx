import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import AppointmentRequestForm from '@/components/AppointmentRequestForm'

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Request a cardiology consultation or book your next appointment with PulsePoint Clinic in Columbia, MO.',
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

              <div className="overflow-hidden rounded shadow-card">
                <iframe
                  src="https://outlook.office.com/book/PulsePointHeartClinic@pulsepointheart.com/"
                  width="100%"
                  height="600"
                  scrolling="yes"
                  style={{ border: 0, minHeight: 600 }}
                  title="Book an appointment with PulsePoint Clinic"
                  allow="camera; microphone"
                />
              </div>
              <p className="mt-3 text-center text-[.78rem] text-muted">
                Having trouble?{' '}
                <a
                  href="https://outlook.office.com/book/PulsePointHeartClinic@pulsepointheart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-wine hover:underline"
                >
                  Open scheduling page directly →
                </a>
              </p>

              {/* Quick contact info */}
              <div className="mt-5 rounded bg-navy p-5 text-white">
                <p className="mb-1 text-[.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
                  Prefer to call?
                </p>
                <p className="text-[.88rem] text-white/80">
                  Our team is available by appointment. Call us at{' '}
                  <a href="tel:18557857337" className="font-semibold text-gold">
                    (855) 785-7337 / 1-855-PULSEDR
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:Mtibuakuu@pulsepointheart.com" className="font-semibold text-gold">
                    Mtibuakuu@pulsepointheart.com
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
