import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { CLINIC, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSpeakableWebPageJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/heart-screening-columbia-mo',
  'Heart Screening in Columbia, MO | PulsePoint Clinic',
  'Heart screening and cardiovascular risk assessment in Columbia, Missouri. Echocardiograms, stress testing, calcium scoring guidance, and preventive cardiology. (855) 785-7337.',
)

const SCREENING_OPTIONS = [
  {
    href: '/services/cardiac-ct-calcium-scoring',
    title: 'Coronary calcium scoring',
    text: 'CT calcium score guidance for selected patients when results would change prevention decisions.',
  },
  {
    href: '/services/echocardiography',
    title: 'Echocardiography',
    text: 'Ultrasound imaging of heart structure, pumping function, and valves.',
  },
  {
    href: '/services/stress-testing',
    title: 'Stress testing',
    text: 'Exercise or guided stress protocols when symptoms or risk warrant functional assessment.',
  },
  {
    href: '/services/heart-rhythm-monitoring',
    title: 'Heart rhythm monitoring',
    text: 'Holter and ambulatory monitoring for palpitations, dizziness, or AFib screening.',
  },
  {
    href: '/services/vascular-ultrasound',
    title: 'Vascular ultrasound',
    text: 'Noninvasive circulation assessment for leg symptoms and vascular risk.',
  },
  {
    href: '/conditions/cardiac-risk-assessment',
    title: 'Cardiac risk assessment',
    text: 'Comprehensive prevention planning before symptoms appear.',
  },
]

const FAQS = [
  {
    question: 'What is a heart screening?',
    answer:
      'Heart screening combines your history, risk factors, physical exam, and selected tests to estimate cardiovascular risk and detect early disease. The right screening depends on age, symptoms, family history, and overall risk — not everyone needs every test.',
  },
  {
    question: 'Who should get heart screening in Columbia, MO?',
    answer:
      'Adults with hypertension, high cholesterol, diabetes, smoking history, family history of early heart disease, or concerning symptoms benefit most. Many patients seek screening in their 40s or 50s, or earlier with strong family history.',
  },
  {
    question: 'Does PulsePoint offer coronary calcium scoring?',
    answer:
      'PulsePoint cardiologists provide guidance on cardiac CT calcium scoring when appropriate and help interpret results in the context of your full cardiovascular risk profile.',
  },
  {
    question: 'How do I schedule heart screening in Columbia?',
    answer:
      `Call ${CLINIC.phoneDisplay} or request an appointment at pulsepointheart.com/book. Your cardiologist will recommend screening based on your individual risk — not a one-size-fits-all panel.`,
  },
]

export default function HeartScreeningColumbiaPage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Heart Screening Columbia MO', path: '/heart-screening-columbia-mo' },
    ]),
    buildFaqJsonLd(FAQS),
    buildSpeakableWebPageJsonLd({
      path: '/heart-screening-columbia-mo',
      name: 'Heart Screening in Columbia, MO',
      description:
        'Physician-led heart screening and cardiovascular risk assessment at PulsePoint Clinic in Columbia, Missouri.',
      cssSelectors: ['#heart-screening-intro', '#heart-screening-faqs', '.voice-answer'],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'Heart Screening in Columbia, MO',
      description:
        'Heart screening, preventive cardiology, and cardiovascular diagnostics at PulsePoint Clinic in Columbia, Missouri.',
      url: 'https://pulsepointheart.com/heart-screening-columbia-mo',
      about: 'Cardiovascular screening',
      lastReviewed: '2026-06-30',
      reviewedBy: {
        '@type': 'Physician',
        name: 'Martin Tibuakuu, MD, MPH, FACC',
      },
      publisher: { '@id': 'https://pulsepointheart.com/#clinic' },
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Preventive cardiology · Columbia, MO
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.1] text-charcoal sm:text-[3rem] lg:text-[3.2rem]">
              Heart screening in Columbia, MO
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p id="heart-screening-intro" className="max-w-3xl text-[1rem] leading-[1.8] text-charcoal/85">
              Heart disease often develops before symptoms appear. PulsePoint Clinic offers
              physician-led heart screening and cardiovascular risk assessment in Columbia,
              Missouri — including echocardiography, stress testing, rhythm monitoring, vascular
              ultrasound, and coronary calcium score guidance when clinically appropriate.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
              >
                Schedule Screening Consultation
              </Link>
              <Link
                href="/diagnostics"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                View All Diagnostics
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Screening & diagnostic options
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <p className="mt-6 max-w-3xl text-[.94rem] leading-[1.75] text-muted">
              Your cardiologist recommends tests based on your history and goals — not every patient
              needs every study. PulsePoint emphasizes clarity: what a test shows, what it does not,
              and how results change your prevention plan.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SCREENING_OPTIONS.map((option) => (
                <Link
                  key={option.href}
                  href={option.href}
                  className="rounded-md bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
                >
                  <h3 className="text-[1rem] font-bold text-charcoal">{option.title}</h3>
                  <p className="mt-2 text-[.84rem] leading-[1.6] text-muted">{option.text}</p>
                  <p className="mt-4 text-[.72rem] font-semibold uppercase tracking-[1.5px] text-wine">
                    Learn more
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="heart-screening-faqs" className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Frequently asked questions
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 space-y-4">
              {FAQS.map((faq) => (
                <article key={faq.question} className="rounded-md bg-graybg p-6">
                  <h3 className="text-[.98rem] font-bold text-charcoal">{faq.question}</h3>
                  <p className="voice-answer mt-2 text-[.86rem] leading-[1.65] text-muted">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
              Ready for a heart screening plan?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.94rem] leading-[1.7] text-white/85">
              {CLINIC.address.streetAddress}, {CLINIC.address.addressLocality},{' '}
              {CLINIC.address.addressRegion} · {CLINIC.phoneDisplay}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book Appointment
              </Link>
              <Link
                href="/services/preventive-cardiology"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Preventive Cardiology
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
