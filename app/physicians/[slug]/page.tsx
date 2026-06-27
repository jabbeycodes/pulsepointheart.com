import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { pageMeta } from '@/lib/page-metadata'
import { CLINIC, buildBreadcrumbJsonLd, buildFaqJsonLd, buildPhysicianJsonLd } from '@/lib/seo'
import { buildPhysicianPageMeta, getPhysicianFaqs } from '@/lib/physician-seo'
import {
  PHYSICIANS,
  getPhysicianBySlug,
  getPhysicianSlugs,
} from '@/lib/physicians'

type PhysicianPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getPhysicianSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PhysicianPageProps): Promise<Metadata> {
  const { slug } = await params
  const physician = getPhysicianBySlug(slug)

  if (!physician) {
    return {}
  }

  return buildPhysicianPageMeta(physician)
}

function CredentialIcon({ name }: { name: string }) {
  const base = {
    className: 'h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.55',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'heart':
      return (
        <svg {...base}>
          <path d="M20.8 4.7a5.4 5.4 0 0 0-7.7 0L12 5.8l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 21.2l8.8-8.8a5.4 5.4 0 0 0 0-7.7Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...base}>
          <path d="M12 3 4 7v6c0 5 3.5 8 8 8s8-3 8-8V7l-8-4Z" />
        </svg>
      )
    case 'activity':
      return (
        <svg {...base}>
          <path d="M4 12h3l2-5 4 10 2-5h5" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...base}>
          <path d="M12 21c-4-3-7-7-7-11a7 7 0 0 1 14 0c0 4-3 8-7 11Z" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 11h3l2-4 3 7 2-3h2" />
        </svg>
      )
    case 'partnership':
      return (
        <svg {...base}>
          <path d="M8 12h8M9 16l-3-3a3 3 0 0 1 4.2-4.2L12 10.6l1.8-1.8A3 3 0 0 1 18 13l-3 3a4.2 4.2 0 0 1-6 0Z" />
        </svg>
      )
    case 'star':
      return (
        <svg {...base}>
          <path d="m12 3 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.2l5-.7L12 3Z" />
        </svg>
      )
    default:
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

export default async function PhysicianPage({ params }: PhysicianPageProps) {
  const { slug } = await params
  const physician = getPhysicianBySlug(slug)

  if (!physician) {
    notFound()
  }

  const otherPhysicians = PHYSICIANS.filter((item) => item.slug !== physician.slug)
  const faqs = getPhysicianFaqs(physician)
  const fullAddress = `${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}`
  const jsonLd = [
    buildPhysicianJsonLd(physician),
    buildFaqJsonLd(faqs),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Our Cardiologists', path: '/physicians' },
      { name: physician.name, path: `/physicians/${physician.slug}` },
    ]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-[.78rem] text-muted">
              <Link href="/" className="hover:text-wine">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/physicians" className="hover:text-wine">
                Our Cardiologists
              </Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-charcoal">{physician.schemaName}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="overflow-hidden rounded-sm bg-graybg p-4 shadow-card">
                <img
                  src={physician.image}
                  alt={physician.imageAlt}
                  className="w-full object-contain"
                  loading="eager"
                />
              </div>

              <div>
                <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                  Board-Certified Cardiologist · Columbia, MO
                </p>
                <h1 className="font-display text-[2rem] font-bold leading-[1.1] text-navy sm:text-[2.75rem]">
                  {physician.name}
                </h1>
                <p className="mt-2 text-[1rem] font-bold text-wine">
                  {physician.title} · PulsePoint Clinic, Columbia, MO
                </p>

                <p className="mt-6 text-[.98rem] leading-[1.8] text-charcoal/80">
                  {physician.name} is a board-certified cardiologist at{' '}
                  <Link href="/cardiologist-columbia-mo" className="font-semibold text-wine hover:underline">
                    PulsePoint Clinic in Columbia, Missouri
                  </Link>
                  , located at {fullAddress}. {physician.schemaName} serves patients throughout
                  Boone County and Central Missouri.
                </p>

                <div className="mt-6 space-y-4 text-[.96rem] leading-[1.8] text-charcoal/75">
                  {physician.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/book"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
                  >
                    Schedule a Consultation
                  </Link>
                  <a
                    href={`tel:${CLINIC.phoneHref}`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
                  >
                    {CLINIC.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-navy sm:text-[2.25rem]">
              Practice location in Columbia, MO
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-md border border-[#E5EAF0] bg-graybg p-5">
                <p className="text-[.72rem] font-semibold uppercase tracking-[1.5px] text-wine">
                  Current clinic
                </p>
                <p className="mt-2 text-[1rem] font-bold text-charcoal">{CLINIC.name}</p>
                <p className="mt-2 text-[.92rem] leading-[1.7] text-muted">{fullAddress}</p>
                <p className="mt-3 text-[.92rem] text-muted">
                  Phone:{' '}
                  <a href={`tel:${CLINIC.phoneHref}`} className="font-semibold text-wine">
                    {CLINIC.phoneDisplay}
                  </a>
                </p>
                <p className="mt-1 text-[.92rem] text-muted">
                  {CLINIC.hoursDisplay}. {CLINIC.hoursNote}.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/locations/columbia-mo"
                    className="text-[.84rem] font-semibold text-wine hover:underline"
                  >
                    Directions & location page →
                  </Link>
                  <Link
                    href="/book"
                    className="text-[.84rem] font-semibold text-wine hover:underline"
                  >
                    Book with {physician.schemaName} →
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-[1rem] font-bold text-charcoal">
                  Frequently asked questions about {physician.schemaName}
                </h3>
                <div className="mt-4 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="rounded-md bg-graybg p-4">
                      <h4 className="text-[.9rem] font-bold text-charcoal">{faq.question}</h4>
                      <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-navy sm:text-[2.25rem]">
              Physician Profile
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 space-y-4 text-[.94rem] leading-[1.8] text-charcoal/75">
              {physician.fullBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-navy sm:text-[2.25rem]">
              Credentials & Clinical Expertise
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {physician.credentials.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-md border border-[#E5EAF0] bg-graybg px-4 py-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-wine">
                    <CredentialIcon name={item.icon} />
                  </div>
                  <div className="text-[.8rem] font-bold leading-[1.35] text-charcoal/80">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {otherPhysicians.length > 0 ? (
          <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-navy sm:text-[2rem]">
                Meet Our Other Cardiologist
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {otherPhysicians.map((doctor) => (
                  <Link
                    key={doctor.slug}
                    href={`/physicians/${doctor.slug}`}
                    className="rounded-md bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="text-[1rem] font-bold text-navy">{doctor.name}</h3>
                    <p className="mt-2 text-[.84rem] leading-[1.6] text-muted">{doctor.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
              Ready to schedule with {physician.schemaName}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.94rem] leading-[1.7] text-white/80">
              PulsePoint Clinic is accepting new patients in Columbia, Missouri. Call{' '}
              {CLINIC.phoneDisplay} or request an appointment online.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book a Visit
              </Link>
              <Link
                href="/services/preventive-cardiology"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Explore Core Cardiology
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
