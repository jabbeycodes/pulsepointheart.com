import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { CONDITION_PAGES } from '@/lib/condition-pages'
import { buildBreadcrumbJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/conditions',
  'Heart Conditions We Treat | Columbia, MO Cardiologists',
  'PulsePoint cardiologists in Columbia, Missouri treat hypertension, heart failure, AFib, coronary artery disease, chest pain, high cholesterol, and more. Schedule: (855) 785-7337.',
)

export default function ConditionsIndexPage() {
  const jsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Conditions', path: '/conditions' },
  ])

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-5xl">
            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Core Cardiology · Columbia, MO
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              Heart Conditions We Treat in Columbia, Missouri
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              Board-certified cardiologists at PulsePoint Clinic provide evaluation and management
              for common and complex cardiovascular conditions — serving Columbia, Boone County, and
              patients throughout Central Missouri.
            </p>
            <div className="mt-7">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONDITION_PAGES.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="rounded-md bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5"
                >
                  <div className="mb-3 h-[2px] w-10 rounded bg-gold" />
                  <h2 className="text-[1.05rem] font-bold leading-tight text-charcoal">
                    {condition.shortTitle}
                  </h2>
                  <p className="mt-3 text-[.84rem] leading-[1.6] text-muted">{condition.heroText}</p>
                  <p className="mt-4 text-[.72rem] font-semibold uppercase tracking-[1.5px] text-wine">
                    Learn more
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.2rem]">
              Not sure which condition applies?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.94rem] leading-[1.7] text-white/80">
              Call (855) 785-7337 and our team will help you schedule the right type of cardiology
              visit.
            </p>
            <Link
              href="/services/preventive-cardiology"
              className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
            >
              Explore Core Cardiology
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
