import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

export const metadata: Metadata = {
  title: 'Notice of Privacy Practices',
  description:
    'Privacy practices overview for PulsePoint Clinic patients, including patient rights, protected health information, and secure communication guidance.',
}

const RIGHTS = [
  'Request access to health information maintained by the clinic.',
  'Ask for corrections to information you believe is incomplete or incorrect.',
  'Request confidential communications or certain restrictions where permitted.',
  'Request an accounting of certain disclosures.',
  'Receive a copy of the clinic notice when available.',
]

const PRACTICES = [
  {
    title: 'How health information may be used',
    text: 'Health information may be used for treatment, payment, clinic operations, scheduling, care coordination, quality improvement, legal compliance, and other uses permitted or required by law.',
  },
  {
    title: 'When authorization may be required',
    text: 'Certain uses and disclosures may require written authorization. When authorization is required, you may generally revoke it in writing as allowed by law.',
  },
  {
    title: 'Website forms',
    text: 'Public website forms should not be used to submit protected health information. The clinic will use phone, in-person communication, patient portal tools, or other appropriate channels when medical details are needed.',
  },
  {
    title: 'Questions or concerns',
    text: 'Patients may contact PulsePoint Clinic with privacy questions or concerns. The clinic can provide additional details about privacy practices and patient rights.',
  },
]

export default function HipaaNoticePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Patient Privacy
            </div>
            <h1 className="font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem]">
              Notice of Privacy Practices
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-3xl text-[.98rem] leading-[1.75] text-muted">
              This page provides a plain-language overview of how health
              information may be used and protected in connection with
              PulsePoint Clinic care. Patients may request the clinic&apos;s
              current official notice and ask privacy questions directly.
            </p>
            <p className="mt-4 text-[.82rem] font-semibold text-charcoal">
              Last updated: May 19, 2026
            </p>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <aside className="h-fit rounded-md bg-navy p-6 text-white shadow-card">
              <h2 className="font-display text-[1.45rem] font-bold leading-tight">
                Patient rights may include:
              </h2>
              <ul className="mt-5 space-y-3">
                {RIGHTS.map((right) => (
                  <li key={right} className="flex items-start gap-2 text-[.86rem] leading-[1.55] text-white/75">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {right}
                  </li>
                ))}
              </ul>
            </aside>
            <div className="space-y-5">
              {PRACTICES.map((practice) => (
                <article key={practice.title} className="rounded-md bg-white p-6 shadow-card">
                  <h2 className="text-[1.05rem] font-bold text-charcoal">
                    {practice.title}
                  </h2>
                  <p className="mt-3 text-[.9rem] leading-[1.7] text-muted">
                    {practice.text}
                  </p>
                </article>
              ))}
              <article className="rounded-md border border-wine/20 bg-white p-6 shadow-card">
                <h2 className="text-[1.05rem] font-bold text-charcoal">
                  Contact for privacy questions
                </h2>
                <p className="mt-3 text-[.9rem] leading-[1.7] text-muted">
                  Contact PulsePoint Clinic at{' '}
                  <a href="tel:18557857337" className="font-semibold text-wine hover:underline">
                    (855) 785-7337
                  </a>{' '}
                  or{' '}
                  <a
                    href="mailto:info@pulsepointheart.com"
                    className="font-semibold text-wine hover:underline"
                  >
                    info@pulsepointheart.com
                  </a>
                  . Do not include sensitive medical details in email unless
                  directed by the clinic to use an appropriate secure method.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
                >
                  Contact the Clinic
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
