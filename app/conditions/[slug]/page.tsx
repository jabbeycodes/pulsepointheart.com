import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'
import JsonLd from '@/components/JsonLd'
import {
  CONDITION_PAGES,
  getConditionPage,
  getConditionSlugs,
} from '@/lib/condition-pages'
import { CLINIC, buildBreadcrumbJsonLd, buildFaqJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

type ConditionPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getConditionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ConditionPageProps): Promise<Metadata> {
  const { slug } = await params
  const condition = getConditionPage(slug)

  if (!condition) {
    return {}
  }

  return pageMeta(`/conditions/${condition.slug}`, condition.title, condition.description)
}

export default async function ConditionDetailPage({ params }: ConditionPageProps) {
  const { slug } = await params
  const condition = getConditionPage(slug)

  if (!condition) {
    notFound()
  }

  const relatedConditions = CONDITION_PAGES.filter((item) => item.slug !== condition.slug).slice(
    0,
    3,
  )

  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Conditions', path: '/conditions' },
      { name: condition.shortTitle, path: `/conditions/${condition.slug}` },
    ]),
    buildFaqJsonLd(condition.faqs),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: condition.title,
      description: condition.description,
      url: `https://pulsepointheart.com/conditions/${condition.slug}`,
      about: condition.shortTitle,
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
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-[.78rem] font-semibold uppercase tracking-[1.8px] text-wine"
            >
              <Link href="/conditions" className="hover:text-wine-light">
                Conditions
              </Link>
              <span className="mx-2 text-gold">/</span>
              <span className="text-charcoal/70">{condition.shortTitle}</span>
            </nav>

            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Core Cardiology · Columbia, MO
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              {condition.title}
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">{condition.heroText}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
              >
                Schedule Consultation
              </Link>
              <a
                href={`tel:${CLINIC.phoneHref}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Overview
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <p className="mt-6 max-w-3xl text-[.96rem] leading-[1.8] text-charcoal/80">
              {condition.overview}
            </p>
            <p className="mt-4 max-w-3xl text-[.9rem] leading-[1.75] text-muted">
              PulsePoint Clinic serves patients in Columbia, Boone County, Jefferson City, Fulton,
              Moberly, and communities across Central Missouri.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
                Common symptoms
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <ul className="mt-7 space-y-3">
                {condition.symptoms.map((symptom) => (
                  <li key={symptom} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                    <span className="text-[.88rem] font-medium leading-[1.55] text-charcoal">
                      {symptom}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
                When to see a cardiologist
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <ul className="mt-7 space-y-3">
                {condition.whenToSeeCardiologist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span className="text-[.88rem] font-medium leading-[1.55] text-charcoal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.25rem]">
              How PulsePoint treats {condition.shortTitle.toLowerCase()}
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-gold" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {condition.howWeTreat.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[.88rem] leading-[1.55]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={condition.relatedServicePath}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Core Cardiology Services
              </Link>
              {condition.relatedDiagnosticPath ? (
                <Link
                  href={condition.relatedDiagnosticPath}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
                >
                  Related Diagnostics
                </Link>
              ) : null}
              <Link
                href="/physicians/martin-tibuakuu"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Meet Our Cardiologists
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Frequently asked questions
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-8 space-y-4">
                {condition.faqs.map((faq) => (
                  <article key={faq.question} className="rounded-md bg-white p-6 shadow-card">
                    <h3 className="text-[.98rem] font-bold text-charcoal">{faq.question}</h3>
                    <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-md bg-wine p-6 text-white shadow-card">
              <h3 className="font-display text-[1.55rem] font-bold leading-tight">
                New patients welcome
              </h3>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/80">
                Board-certified cardiologists at PulsePoint Clinic in Columbia, MO. Call{' '}
                {CLINIC.phoneDisplay} or request an appointment online.
              </p>
              <Link
                href="/book"
                className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book Appointment
              </Link>
            </aside>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
              Related heart conditions
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {relatedConditions.map((related) => (
                <Link
                  key={related.slug}
                  href={`/conditions/${related.slug}`}
                  className="rounded-md bg-graybg p-5 transition-transform hover:-translate-y-0.5"
                >
                  <h3 className="text-[1rem] font-bold text-charcoal">{related.shortTitle}</h3>
                  <p className="mt-2 text-[.82rem] leading-[1.6] text-muted">{related.heroText}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="rounded-md border-l-4 border-gold bg-graybg px-5 py-4 sm:mx-8 lg:mx-12">
          <p className="mx-auto max-w-6xl text-[.82rem] leading-[1.65] text-muted">
            This page is for educational purposes and does not replace medical advice. If you have
            chest pain, severe shortness of breath, fainting, stroke symptoms, or another emergency,
            call 911.
          </p>
        </div>

        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
