import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Website terms of use for PulsePoint Clinic, including public form, informational content, scheduling, and emergency-use disclaimers.',
}

const TERMS = [
  {
    title: 'Website information is not medical advice',
    text: 'Content on this website is provided for general informational purposes. It does not create a physician-patient relationship, replace professional medical evaluation, or provide diagnosis or treatment advice.',
  },
  {
    title: 'Emergencies',
    text: 'This website and its forms are not monitored for emergencies. If you believe you may be experiencing a medical emergency, call 911 or go to the nearest emergency department.',
  },
  {
    title: 'Form submissions',
    text: 'Public forms are intended for administrative inquiries, appointment requests, membership interest, and general contact. Do not submit symptoms, diagnoses, test results, medication lists, or sensitive medical details through public website forms.',
  },
  {
    title: 'Scheduling and availability',
    text: 'Submitting a form does not guarantee an appointment, membership acceptance, clinical relationship, specific service, or response within a particular timeframe. Appointments are subject to clinic review and availability.',
  },
  {
    title: 'Third-party services',
    text: 'The website may link to or embed third-party services for scheduling, hosting, email, maps, or related operations. Those services may have their own terms and privacy practices.',
  },
  {
    title: 'Website changes',
    text: 'PulsePoint Clinic may update website content, services, links, forms, and these terms from time to time without prior notice.',
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Website Terms
            </div>
            <h1 className="font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem]">
              Terms of Use
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-3xl text-[.98rem] leading-[1.75] text-muted">
              These terms apply to use of the PulsePoint Clinic website. By
              using the site, you agree to use it only for lawful,
              non-emergency, informational and administrative purposes.
            </p>
            <p className="mt-4 text-[.82rem] font-semibold text-charcoal">
              Last updated: May 19, 2026
            </p>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              {TERMS.map((term) => (
                <article key={term.title} className="rounded-md bg-white p-6 shadow-card">
                  <h2 className="text-[1.05rem] font-bold text-charcoal">{term.title}</h2>
                  <p className="mt-3 text-[.9rem] leading-[1.7] text-muted">
                    {term.text}
                  </p>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-md bg-navy p-6 text-white shadow-card">
              <h2 className="font-display text-[1.45rem] font-bold leading-tight">
                Need clinic assistance?
              </h2>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/75">
                Call PulsePoint Clinic for appointment, membership, or website
                questions.
              </p>
              <a
                href="tel:18557857337"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                (855) 785-7337
              </a>
              <Link
                href="/privacy"
                className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
              >
                Privacy Policy
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
