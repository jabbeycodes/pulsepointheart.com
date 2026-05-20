import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Website privacy policy for PulsePoint Clinic.',
}

const SECTIONS = [
  {
    title: 'Information we collect',
    text: [
      'When you submit a form, we may collect your name, email address, phone number, reason for contacting us, appointment preferences, membership interest, and newsletter signup information.',
      'The website may also collect basic technical information such as browser type, device information, IP address, pages visited, and general usage activity through hosting, security, and analytics tools.',
    ],
  },
  {
    title: 'How we use information',
    text: [
      'We use submitted information to respond to inquiries, schedule or coordinate appointments, manage membership interest, send requested updates, improve the website, and protect the site from spam, abuse, or security issues.',
      'We do not sell personal information collected through this website.',
    ],
  },
  {
    title: 'Medical information and public forms',
    text: [
      'Public website forms are not intended for medical emergencies, diagnosis, treatment decisions, or detailed medical history. Please do not include symptoms, diagnoses, test results, medication lists, or other sensitive health details in public forms.',
      'If medical information is needed, the clinic will discuss it by phone, in person, or through an appropriate secure channel.',
    ],
  },
  {
    title: 'Service providers',
    text: [
      'PulsePoint Clinic may use trusted service providers for website hosting, form processing, database storage, scheduling, email notifications, security, and analytics. These providers are used to operate and protect the website and clinic workflows.',
    ],
  },
  {
    title: 'Retention and security',
    text: [
      'We keep submitted information only as long as reasonably needed for clinic operations, legal obligations, security, and recordkeeping. We use reasonable administrative, technical, and organizational safeguards, but no internet transmission is guaranteed to be completely secure.',
    ],
  },
  {
    title: 'Your choices',
    text: [
      'You may contact the clinic to request updates or corrections to information you submitted, ask questions about website privacy, or unsubscribe from nonessential communications.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Website Privacy
            </div>
            <h1 className="font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem]">
              Privacy Policy
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-3xl text-[.98rem] leading-[1.75] text-muted">
              This policy explains how PulsePoint Clinic collects and uses
              information submitted through this website. It is intended for
              website privacy only and should be reviewed periodically as clinic
              operations and tools evolve.
            </p>
            <p className="mt-4 text-[.82rem] font-semibold text-charcoal">
              Last updated: May 19, 2026
            </p>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-md bg-navy p-6 text-white shadow-card">
              <h2 className="font-display text-[1.45rem] font-bold leading-tight">
                Please do not submit medical details through public forms.
              </h2>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/75">
                For urgent symptoms, call 911. For clinic matters, call{' '}
                <a href="tel:18557857337" className="font-semibold text-gold">
                  (855) 785-7337
                </a>
                .
              </p>
              <Link
                href="/hipaa-notice"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Privacy Practices
              </Link>
            </aside>
            <div className="space-y-5">
              {SECTIONS.map((section) => (
                <article key={section.title} className="rounded-md bg-white p-6 shadow-card">
                  <h2 className="text-[1.05rem] font-bold text-charcoal">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.text.map((paragraph) => (
                      <p key={paragraph} className="text-[.9rem] leading-[1.7] text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
