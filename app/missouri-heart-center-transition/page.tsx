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
  '/missouri-heart-center-transition',
  'Former Missouri Heart Center Cardiologists in Columbia, MO | PulsePoint Clinic',
  'Dr. Martin Tibuakuu and Dr. James E. Fairlamb — former Missouri Heart Center cardiologists — now at PulsePoint Clinic, 1000 W Nifong Blvd, Columbia, MO. New patients welcome. (855) 785-7337.',
)

const CONTINUITY_POINTS = [
  {
    title: 'Same trusted cardiologists',
    text: 'Dr. Martin Tibuakuu, MD, MPH, FACC and Dr. James E. Fairlamb, MD, FACC continue providing cardiovascular care in Columbia, Missouri at PulsePoint Clinic.',
  },
  {
    title: 'Prevention-first cardiology',
    text: 'PulsePoint emphasizes preventive cardiology, advanced heart screening, diagnostics, and long-term cardiovascular planning.',
  },
  {
    title: 'Insurance-based Core Cardiology',
    text: 'Core Cardiology services accept major insurance for established and suspected heart conditions, in addition to membership-based premium care options.',
  },
  {
    title: 'New clinic location on Nifong Blvd',
    text: 'PulsePoint Clinic is located at 1000 W Nifong Blvd, Building 2, Suite 120, Columbia, MO 65203 — a dedicated outpatient cardiology setting.',
  },
]

const FAQS = [
  {
    question: 'Did Missouri Heart Center close in Columbia, MO?',
    answer:
      'Yes. Missouri Heart Center closed in May 2026 following changes in its relationship with Boone Health. Boone Health now operates its own cardiology clinic at the former Broadway location. PulsePoint Clinic is a separate, independent cardiology practice.',
  },
  {
    question: 'Where do Dr. Martin Tibuakuu and Dr. James Fairlamb practice now?',
    answer:
      'Both physicians now practice at PulsePoint Clinic at 1000 W Nifong Blvd, Building 2, Suite 120, Columbia, MO 65203. Call (573) 968-0800 or (855) 785-7337 to schedule.',
  },
  {
    question: 'Is PulsePoint Clinic accepting new cardiology patients?',
    answer:
      'Yes. PulsePoint is accepting new patients for cardiovascular consultation, preventive cardiology, diagnostics, and follow-up care throughout Columbia, Boone County, and Central Missouri.',
  },
  {
    question: 'Does PulsePoint accept insurance?',
    answer:
      'Yes. PulsePoint Core Cardiology is designed to work with major insurance plans for evaluation and management of cardiovascular conditions. Contact the clinic to discuss your specific coverage.',
  },
  {
    question: 'How do I schedule an appointment at PulsePoint Clinic?',
    answer:
      'Call (855) 785-7337, call the local office at (573) 968-0800, or request an appointment online at pulsepointheart.com/book.',
  },
  {
    question: 'What is the difference between PulsePoint and Boone Health cardiology?',
    answer:
      'Boone Health operates a hospital-affiliated cardiology clinic at 1605 E. Broadway. PulsePoint Clinic is an independent, physician-led cardiovascular practice on Nifong Blvd focused on prevention, diagnostics, and personalized outpatient heart care.',
  },
]

export default function MissouriHeartCenterTransitionPage() {
  const fullAddress = `${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}`

  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Missouri Heart Center Transition', path: '/missouri-heart-center-transition' },
    ]),
    buildFaqJsonLd(FAQS),
    buildSpeakableWebPageJsonLd({
      path: '/missouri-heart-center-transition',
      name: 'Former Missouri Heart Center Cardiologists in Columbia, MO',
      description:
        'Dr. Martin Tibuakuu and Dr. James E. Fairlamb now practice at PulsePoint Clinic in Columbia, Missouri.',
      cssSelectors: ['#transition-intro', '#transition-faqs', '.voice-answer'],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'Former Missouri Heart Center Cardiologists in Columbia, MO',
      description:
        'Information for patients seeking former Missouri Heart Center cardiologists Dr. Martin Tibuakuu and Dr. James E. Fairlamb at PulsePoint Clinic.',
      url: 'https://pulsepointheart.com/missouri-heart-center-transition',
      about: 'Cardiology',
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
              Patient guide · Columbia, Missouri
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.1] text-charcoal sm:text-[3rem] lg:text-[3.2rem]">
              Former Missouri Heart Center cardiologists in Columbia, MO
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p id="transition-intro" className="max-w-3xl text-[1rem] leading-[1.8] text-charcoal/85">
              If you are looking for cardiologists who previously practiced with Missouri Heart Center
              in Columbia, Dr. Martin Tibuakuu and Dr. James E. Fairlamb now provide cardiovascular
              care at PulsePoint Clinic — an independent practice at {fullAddress}. PulsePoint is
              accepting new patients for preventive cardiology, heart diagnostics, and comprehensive
              cardiovascular care.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
              >
                Schedule an Appointment
              </Link>
              <Link
                href="/cardiologist-columbia-mo"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                Cardiologist in Columbia, MO
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Continuity of care at PulsePoint Clinic
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CONTINUITY_POINTS.map((item) => (
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
              Meet our cardiologists
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

        <section id="transition-faqs" className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
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
              Schedule with PulsePoint Clinic
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.94rem] leading-[1.7] text-white/85">
              {fullAddress} · {CLINIC.localPhoneDisplay} · {CLINIC.phoneDisplay}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book Appointment
              </Link>
              <Link
                href="/locations/columbia-mo"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Directions & Map
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
