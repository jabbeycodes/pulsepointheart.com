import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { CONDITION_PAGES } from '@/lib/condition-pages'
import { PHYSICIANS } from '@/lib/physicians'
import { CLINIC, buildBreadcrumbJsonLd, buildFaqJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/cardiologist-columbia-mo',
  'Cardiologist in Columbia, MO | Board-Certified Heart Doctors',
  'Looking for a cardiologist in Columbia, Missouri? PulsePoint Clinic offers board-certified cardiologists, preventive care, diagnostics, and heart failure treatment. New patients welcome. (855) 785-7337.',
)

const WHY_PULSEPOINT = [
  {
    title: 'Board-certified cardiologists',
    text: 'Care led by fellowship-trained physicians with expertise in prevention, imaging, and complex cardiovascular disease.',
  },
  {
    title: 'Prevention-first philosophy',
    text: 'Early risk detection, advanced screening, and long-term planning — not just reactive disease treatment.',
  },
  {
    title: 'On-site diagnostics',
    text: 'Echocardiography, stress testing, rhythm monitoring, and vascular ultrasound with physician interpretation in Columbia.',
  },
  {
    title: 'Insurance-based core cardiology',
    text: 'Core Cardiology accepts major insurance for established and suspected heart conditions.',
  },
]

const SERVICES = [
  { href: '/services/preventive-cardiology', label: 'Core Cardiology' },
  { href: '/diagnostics', label: 'Heart Testing & Diagnostics' },
  { href: '/services/echocardiography', label: 'Echocardiography' },
  { href: '/services/stress-testing', label: 'Stress Testing' },
  { href: '/services/heart-rhythm-monitoring', label: 'Heart Rhythm Monitoring' },
  { href: '/premium-cardiovascular-care', label: 'Premium & Executive Care' },
]

const FAQS = [
  {
    question: 'Who is the cardiologist at PulsePoint in Columbia, MO?',
    answer:
      'PulsePoint Clinic is led by Dr. Martin Tibuakuu, MD, MPH, FACC, and Dr. James E. Fairlamb, MD, FACC — both board-certified cardiologists practicing in Columbia, Missouri at 1000 W Nifong Blvd.',
  },
  {
    question: 'Is PulsePoint accepting new cardiology patients?',
    answer:
      'Yes. PulsePoint is accepting new patients for cardiovascular consultation, follow-up care, diagnostics, and preventive cardiology in Columbia, MO and surrounding Central Missouri communities.',
  },
  {
    question: 'What conditions do PulsePoint cardiologists treat?',
    answer:
      'PulsePoint cardiologists evaluate and manage hypertension, coronary artery disease, heart failure, arrhythmias, chest pain, high cholesterol, palpitations, and complex cardiovascular conditions.',
  },
  {
    question: 'Does PulsePoint accept insurance?',
    answer:
      'Yes. Core Cardiology services are designed to work with major insurance plans. Contact the clinic at (855) 785-7337 to discuss your coverage and visit type.',
  },
  {
    question: 'Where is the PulsePoint cardiology clinic located?',
    answer:
      '1000 W Nifong Blvd, Building 2, Suite 120, Columbia, MO 65203. The clinic serves Columbia, Boone County, Jefferson City, Fulton, Moberly, and Central Missouri.',
  },
  {
    question: 'How do I schedule an appointment with a cardiologist in Columbia?',
    answer:
      'Call (855) 785-7337 or request an appointment online at pulsepointheart.com/book. The team will help match you with the right visit type.',
  },
]

export default function CardiologistColumbiaPage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Cardiologist Columbia MO', path: '/cardiologist-columbia-mo' },
    ]),
    buildFaqJsonLd(FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'Cardiologist in Columbia, MO',
      description:
        'Board-certified cardiologists at PulsePoint Clinic in Columbia, Missouri providing preventive cardiology, diagnostics, and comprehensive heart care.',
      url: 'https://pulsepointheart.com/cardiologist-columbia-mo',
      about: 'Cardiology',
      lastReviewed: '2026-05-30',
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
              PulsePoint Clinic · Columbia, Missouri
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.1] text-charcoal sm:text-[3rem] lg:text-[3.2rem]">
              Cardiologist in Columbia, MO
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-3xl text-[1rem] leading-[1.8] text-charcoal/85">
              PulsePoint Clinic is a physician-led cardiology practice in Columbia, Missouri. Board-certified
              cardiologists Dr. Martin Tibuakuu, MD, MPH, FACC and Dr. James E. Fairlamb, MD, FACC provide
              preventive cardiology, advanced heart diagnostics, and treatment for hypertension, heart failure,
              arrhythmias, coronary artery disease, and chest pain — serving Boone County and Central Missouri.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
              >
                Schedule with a Cardiologist
              </Link>
              <a
                href={`tel:${CLINIC.phoneHref}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                {CLINIC.phoneDisplay}
              </a>
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
              {WHY_PULSEPOINT.map((item) => (
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
              Meet our Columbia cardiologists
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

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.25rem]">
              Cardiology services in Columbia, MO
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-gold" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-[.88rem] font-semibold transition-colors hover:bg-white/10"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Heart conditions we treat
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONDITION_PAGES.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="rounded-md bg-white px-4 py-3 text-[.86rem] font-semibold text-charcoal shadow-card transition-transform hover:-translate-y-0.5"
                >
                  {condition.shortTitle}
                </Link>
              ))}
            </div>
            <Link
              href="/conditions"
              className="mt-6 inline-flex text-[.84rem] font-semibold text-wine hover:underline"
            >
              View all conditions →
            </Link>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Frequently asked questions
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 space-y-4">
              {FAQS.map((faq) => (
                <article key={faq.question} className="rounded-md bg-graybg p-6">
                  <h3 className="text-[.98rem] font-bold text-charcoal">{faq.question}</h3>
                  <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-wine px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
              Ready to see a cardiologist in Columbia?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.94rem] leading-[1.7] text-white/85">
              {CLINIC.address.streetAddress}, {CLINIC.address.addressLocality},{' '}
              {CLINIC.address.addressRegion} {CLINIC.address.postalCode} · {CLINIC.hoursDisplay}
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
