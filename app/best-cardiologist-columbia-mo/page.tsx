import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { PHYSICIANS } from '@/lib/physicians'
import { CLINIC, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSpeakableWebPageJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/best-cardiologist-columbia-mo',
  'Best Cardiologist in Columbia, MO | PulsePoint Clinic',
  'Looking for the best cardiologist in Columbia, Missouri? PulsePoint Clinic is led by board-certified cardiologists including Missouri\'s Best Cardiologist award-winner Dr. James E. Fairlamb, MD, FACC. (855) 785-7337.',
)

const HIGHLIGHTS = [
  {
    title: 'Award-winning expertise',
    text: 'Dr. James E. Fairlamb, MD, FACC has been recognized as Missouri\'s Best Cardiologist in 2024, 2025, and 2026.',
  },
  {
    title: 'Prevention-first cardiology',
    text: 'Dr. Martin Tibuakuu, MD, MPH, FACC brings Johns Hopkins-trained preventive cardiology and advanced imaging expertise.',
  },
  {
    title: 'Physician-led, patient-centered',
    text: 'Longer visits, clear explanations, and proactive planning — not just reactive disease treatment.',
  },
  {
    title: 'On-site diagnostics',
    text: 'Echocardiography, stress testing, rhythm monitoring, and vascular ultrasound with cardiologist interpretation in Columbia.',
  },
]

const FAQS = [
  {
    question: 'Who is the best cardiologist in Columbia, MO?',
    answer:
      'Many patients seek a cardiologist with deep experience, strong preventive focus, and accessible care. Dr. James E. Fairlamb, MD, FACC has been named Missouri\'s Best Cardiologist in 2024, 2025, and 2026. Dr. Martin Tibuakuu, MD, MPH, FACC specializes in preventive cardiology and advanced cardiac imaging. Both practice at PulsePoint Clinic.',
  },
  {
    question: 'What makes a great cardiologist?',
    answer:
      'Patients often value board certification, experience with complex cardiovascular disease, clear communication, preventive expertise, and timely access. PulsePoint emphasizes prevention, diagnostics, and long-term cardiovascular planning.',
  },
  {
    question: 'Is PulsePoint accepting new patients?',
    answer:
      'Yes. PulsePoint Clinic is accepting new patients in Columbia, MO for preventive cardiology, diagnostics, heart failure, hypertension, AFib, and comprehensive cardiovascular care.',
  },
  {
    question: 'Where is PulsePoint Clinic located?',
    answer:
      `PulsePoint Clinic is at ${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}. Call ${CLINIC.phoneDisplay}.`,
  },
]

export default function BestCardiologistColumbiaPage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Best Cardiologist Columbia MO', path: '/best-cardiologist-columbia-mo' },
    ]),
    buildFaqJsonLd(FAQS),
    buildSpeakableWebPageJsonLd({
      path: '/best-cardiologist-columbia-mo',
      name: 'Best Cardiologist in Columbia, MO',
      description:
        'Board-certified cardiologists at PulsePoint Clinic in Columbia, Missouri including award-winning Dr. James E. Fairlamb.',
      cssSelectors: ['#best-cardiologist-intro', '#best-cardiologist-faqs', '.voice-answer'],
    }),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Columbia, Missouri
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.1] text-charcoal sm:text-[3rem] lg:text-[3.2rem]">
              Best cardiologist in Columbia, MO
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p id="best-cardiologist-intro" className="max-w-3xl text-[1rem] leading-[1.8] text-charcoal/85">
              Choosing a cardiologist is personal — experience, communication, and access all matter.
              PulsePoint Clinic is led by board-certified cardiologists Dr. James E. Fairlamb, MD, FACC
              and Dr. Martin Tibuakuu, MD, MPH, FACC, offering preventive cardiology, advanced diagnostics,
              and comprehensive heart care in Columbia, Missouri.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/physicians"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                Meet Our Cardiologists
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Why patients choose PulsePoint cardiologists
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <article key={item.title} className="rounded-md bg-white p-6 shadow-card">
                  <h3 className="text-[1rem] font-bold text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Our Columbia cardiologists
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {PHYSICIANS.map((doctor) => (
                <article
                  key={doctor.slug}
                  className="flex flex-col overflow-hidden rounded-md bg-graybg shadow-card sm:flex-row"
                >
                  <div className="sm:w-44 md:w-52">
                    <img
                      src={doctor.image}
                      alt={doctor.imageAlt}
                      className="h-full min-h-[200px] w-full object-cover object-top sm:min-h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-[1.2rem] font-bold text-navy">{doctor.name}</h3>
                    <p className="mt-1 text-[.86rem] font-semibold text-wine">{doctor.title}</p>
                    <p className="mt-3 flex-1 text-[.86rem] leading-[1.65] text-muted">
                      {doctor.intro[0]}
                    </p>
                    <Link
                      href={`/physicians/${doctor.slug}`}
                      className="mt-4 inline-flex min-h-[40px] items-center text-[.82rem] font-semibold text-wine hover:underline"
                    >
                      View full profile →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="best-cardiologist-faqs" className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Frequently asked questions
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 space-y-4">
              {FAQS.map((faq) => (
                <article key={faq.question} className="rounded-md bg-white p-6 shadow-card">
                  <h3 className="text-[.98rem] font-bold text-charcoal">{faq.question}</h3>
                  <p className="voice-answer mt-2 text-[.86rem] leading-[1.65] text-muted">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-wine px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
              Schedule with a Columbia cardiologist
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.94rem] leading-[1.7] text-white/85">
              New patients welcome · {CLINIC.phoneDisplay}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book Appointment
              </Link>
              <Link
                href="/cardiologist-columbia-mo"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Cardiologist Columbia, MO
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
