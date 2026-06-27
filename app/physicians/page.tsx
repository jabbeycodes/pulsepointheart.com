import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { CLINIC, buildBreadcrumbJsonLd, buildPhysicianJsonLd } from '@/lib/seo'
import { buildPhysiciansHubMeta } from '@/lib/physician-seo'
import { PHYSICIANS, getPhysicianHighlights } from '@/lib/physicians'

export const metadata: Metadata = buildPhysiciansHubMeta()

export default function PhysiciansHubPage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Our Cardiologists', path: '/physicians' },
    ]),
    ...PHYSICIANS.map((physician) => buildPhysicianJsonLd(physician)),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-4 text-[.78rem] text-muted">
              <Link href="/" className="hover:text-wine">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-charcoal">Our Cardiologists Columbia, MO</span>
            </nav>
            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              PulsePoint Clinic · Columbia, Missouri
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem]">
              Board-certified cardiologists in Columbia, Missouri.
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-3xl text-[.98rem] leading-[1.75] text-muted">
              PulsePoint Clinic is led by Dr. Martin Tibuakuu, MD, MPH, FACC and Dr. James E.
              Fairlamb, MD, FACC — fellowship-trained, board-certified cardiologists practicing at{' '}
              {CLINIC.address.streetAddress}, {CLINIC.address.addressLocality},{' '}
              {CLINIC.address.addressRegion}. Search for either physician by name to view their
              current profile, credentials, and appointment options at PulsePoint.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
              >
                Book Appointment
              </Link>
              <Link
                href="/cardiologist-columbia-mo"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-wine px-5 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine/5"
              >
                Cardiologist Columbia, MO
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {PHYSICIANS.map((doctor) => (
              <article
                key={doctor.slug}
                className="overflow-hidden rounded-md bg-white shadow-card"
              >
                <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
                  <div className="bg-graybg">
                    <img
                      src={doctor.image}
                      alt={doctor.imageAlt}
                      className="h-full w-full object-cover object-top"
                      loading="eager"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-[1.35rem] font-bold leading-tight text-navy">
                      <Link href={`/physicians/${doctor.slug}`} className="hover:text-wine">
                        {doctor.name}
                      </Link>
                    </h2>
                    <p className="mt-1 text-[.88rem] font-semibold text-wine">{doctor.title}</p>
                    <p className="mt-3 text-[.86rem] leading-[1.65] text-muted">
                      {doctor.intro[0]}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {getPhysicianHighlights(doctor).map((item) => (
                        <li key={item} className="text-[.82rem] font-medium text-charcoal/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/physicians/${doctor.slug}`}
                      className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-4 py-2.5 text-[.82rem] font-semibold text-white transition-colors hover:bg-wine-light"
                    >
                      View {doctor.schemaName}&apos;s Profile
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[1.75rem] font-bold leading-tight sm:text-[2rem]">
              Schedule with a PulsePoint cardiologist in Columbia, MO
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.92rem] leading-[1.7] text-white/85">
              Call {CLINIC.phoneDisplay} or book online. {CLINIC.hoursDisplay}.{' '}
              {CLINIC.hoursNote}.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
            >
              Request an Appointment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
