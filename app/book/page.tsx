import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import AppointmentRequestForm from '@/components/AppointmentRequestForm'
import BookingEarliestDateNotice from '@/components/BookingEarliestDateNotice'
import OutlookBookingEmbed from '@/components/OutlookBookingEmbed'
import GoogleAdsBookConversion from '@/components/GoogleAdsBookConversion'
import MetaLeadConversion from '@/components/MetaLeadConversion'
import ClinicPhoneNumbers from '@/components/ClinicPhoneNumbers'
import { CLINIC } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'
import {
  earliestBookingNotice,
  formatBookingDate,
  getAvailableTimeframes,
  getTimeframeLabels,
  isOnlineBookingOpen,
  EARLIEST_BOOKING_DATE,
} from '@/lib/booking'

export const metadata: Metadata = pageMeta(
  '/book',
  'Schedule a Cardiology Appointment | Columbia, MO',
  'Request a consultation or schedule a follow-up appointment with PulsePoint Clinic in Columbia, MO.',
)

const PATHWAYS = [
  {
    title: 'New Patient Consultation',
    text: 'Start here if you are new to PulsePoint and want to discuss preventive cardiology or cardiovascular care.',
    href: '#request',
  },
  {
    title: 'Existing Patient Scheduling',
    text: 'Already connected with PulsePoint? Use the scheduling calendar for follow-up visits and ongoing care.',
    href: '#existing',
  },
]

export default function BookPage() {
  const bookingOpen = isOnlineBookingOpen()
  const availableTimeframes = getAvailableTimeframes()
  const timeframeLabels = getTimeframeLabels()

  return (
    <>
      <GoogleAdsBookConversion />
      <MetaLeadConversion />
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Appointments
            </div>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              Choose the right next step for your heart care.
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              Whether you are seeking a first consultation or follow-up as an
              existing patient, our team will help route you to the right
              experience.
              {!bookingOpen && (
                <>
                  {' '}
                  The earliest appointments begin{' '}
                  {formatBookingDate(EARLIEST_BOOKING_DATE)}.
                </>
              )}
            </p>
            <BookingEarliestDateNotice />
          </div>
        </section>

        <section className="bg-graybg px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {PATHWAYS.map((pathway) => (
              <Link
                key={pathway.title}
                href={pathway.href}
                className="rounded-md bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <div className="mb-4 h-[2px] w-10 rounded bg-gold" />
                <h2 className="text-[1rem] font-bold text-charcoal">
                  {pathway.title}
                </h2>
                <p className="mt-2 text-[.84rem] leading-[1.6] text-muted">
                  {pathway.text}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="request" className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <div className="mb-1 text-[.72rem] font-semibold uppercase tracking-[1.8px] text-wine">
                New Patients
              </div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Request a consultation.
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 max-w-2xl text-[.92rem] leading-[1.7] text-muted">
                Share basic contact information and the type of care you are
                interested in. Please do not include symptoms, diagnoses, test
                results, or other private medical details in this public form.
              </p>
              <div className="mt-6 rounded-md border-l-2 border-gold bg-graybg p-5">
                <p className="text-[.86rem] leading-[1.65] text-muted">
                  For chest pain, severe shortness of breath, stroke-like
                  symptoms, fainting, or any urgent medical concern, call 911 or
                  seek emergency care.
                </p>
              </div>
            </div>
            <div className="rounded-md bg-graybg p-5 shadow-card sm:p-6">
              <AppointmentRequestForm
                availableTimeframes={availableTimeframes}
                timeframeLabels={timeframeLabels}
                showEarliestDateNotice={!bookingOpen}
                earliestDateNotice={earliestBookingNotice()}
              />
            </div>
          </div>
        </section>

        <section id="existing" className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <div className="mb-1 text-[.72rem] font-semibold uppercase tracking-[1.8px] text-navy">
                Existing Patients
              </div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                Book your next appointment.
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                {bookingOpen
                  ? 'Use the calendar for follow-up visits and ongoing care coordination.'
                  : `Online calendar booking opens ${formatBookingDate(EARLIEST_BOOKING_DATE)}. Until then, submit a request above or call our team.`}
              </p>
              <div className="mt-6 rounded-md bg-navy p-5 text-white">
                <p className="mb-1 text-[.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
                  Prefer to call?
                </p>
                <p className="text-[.88rem] leading-[1.65] text-white/80">
                  <ClinicPhoneNumbers linkClassName="font-semibold text-gold hover:underline" />
                  <br />
                  or email{' '}
                  <a href={`mailto:${CLINIC.email}`} className="font-semibold text-gold">
                    {CLINIC.email}
                  </a>
                  .
                </p>
                <p className="mt-3 text-[.84rem] leading-[1.6] text-white/70">
                  {CLINIC.hoursDisplay}. {CLINIC.hoursNote}.
                </p>
              </div>
            </div>
            <div>
              <OutlookBookingEmbed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
