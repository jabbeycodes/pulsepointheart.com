import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import AppointmentRequestForm from '@/components/AppointmentRequestForm'
import BookingEarliestDateNotice from '@/components/BookingEarliestDateNotice'
import HealowScheduleLink from '@/components/HealowScheduleLink'
import GoogleAdsBookConversion from '@/components/GoogleAdsBookConversion'
import MetaLeadConversion from '@/components/MetaLeadConversion'
import ClinicPhoneNumbers from '@/components/ClinicPhoneNumbers'
import { CalendarCtaIcon } from '@/components/home/HomeIcons'
import { CLINIC } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'
import {
  earliestBookingNotice,
  getAvailableTimeframes,
  getTimeframeLabels,
  isOnlineBookingOpen,
} from '@/lib/booking'

export const metadata: Metadata = pageMeta(
  '/book',
  'Schedule a Cardiology Appointment | Columbia, MO',
  'Self-schedule a new or follow-up cardiology appointment at PulsePoint Clinic in Columbia, MO, or request a callback if you need help booking.',
)

export default function BookPage() {
  const availableTimeframes = getAvailableTimeframes()
  const timeframeLabels = getTimeframeLabels()
  const bookingOpen = isOnlineBookingOpen()

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
              Schedule your appointment online.
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              New and existing patients can book directly through Healow. Choose a
              visit type, pick an available time, and you are on the calendar —
              no callback wait.
            </p>
            <BookingEarliestDateNotice />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <HealowScheduleLink className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-wine px-6 py-3 text-[.82rem] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-wine-light">
                <CalendarCtaIcon />
                Schedule Online
              </HealowScheduleLink>
              <a
                href={`tel:${CLINIC.localPhoneHref}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border-[1.5px] border-gold bg-white px-6 py-3 text-[.82rem] font-bold uppercase tracking-[1px] text-gold transition-colors hover:bg-gold/10"
              >
                Call {CLINIC.localPhoneDisplay}
              </a>
            </div>
            <p className="mt-4 text-[.82rem] leading-[1.6] text-muted">
              Opens PulsePoint Clinic scheduling in Healow. Toll-free:{' '}
              <a href={`tel:${CLINIC.phoneHref}`} className="font-semibold text-wine hover:underline">
                {CLINIC.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </section>

        <section className="bg-graybg px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            <div className="rounded-md bg-white p-6 shadow-card">
              <div className="mb-4 h-[2px] w-10 rounded bg-gold" />
              <h2 className="text-[1rem] font-bold text-charcoal">New patients</h2>
              <p className="mt-2 text-[.84rem] leading-[1.6] text-muted">
                Create your Healow profile during booking, then choose a
                consultation or first-visit slot that fits your schedule.
              </p>
            </div>
            <div className="rounded-md bg-white p-6 shadow-card">
              <div className="mb-4 h-[2px] w-10 rounded bg-gold" />
              <h2 className="text-[1rem] font-bold text-charcoal">Existing patients</h2>
              <p className="mt-2 text-[.84rem] leading-[1.6] text-muted">
                Sign in with your Healow account to book follow-ups and ongoing
                care without calling the office.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-10 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-1 text-[.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
                Prefer to call?
              </p>
              <p className="text-[.95rem] leading-[1.7] text-white/85">
                <ClinicPhoneNumbers linkClassName="font-semibold text-gold hover:underline" />
                <br />
                {CLINIC.hoursDisplay}. {CLINIC.hoursNote}.
              </p>
            </div>
            <div className="max-w-xl rounded-md border-l-2 border-gold bg-white/5 p-5">
              <p className="text-[.86rem] leading-[1.65] text-white/80">
                For chest pain, severe shortness of breath, stroke-like symptoms,
                fainting, or any urgent medical concern, call 911 or seek
                emergency care.
              </p>
            </div>
          </div>
        </section>

        <section id="request" className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <div className="mb-1 text-[.72rem] font-semibold uppercase tracking-[1.8px] text-wine">
                Need help booking?
              </div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Request a callback.
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 max-w-2xl text-[.92rem] leading-[1.7] text-muted">
                If Healow is not working for you, or you want our team to help
                choose the right visit type, leave your contact information. Please
                do not include symptoms, diagnoses, test results, or other private
                medical details in this public form.
              </p>
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
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
