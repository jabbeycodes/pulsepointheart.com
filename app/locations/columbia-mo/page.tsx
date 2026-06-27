import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { CLINIC, absoluteUrl, buildBreadcrumbJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/locations/columbia-mo',
  'Cardiologist in Columbia, MO | PulsePoint Clinic Location',
  'PulsePoint Clinic — board-certified cardiologists at 1000 W Nifong Blvd, Columbia, MO 65203. Serving Boone County and Central Missouri. Call (855) 785-7337.',
)

const AREAS_SERVED = [
  {
    name: 'Columbia & Boone County',
    text: 'Our primary clinic is on Nifong Blvd in Columbia, convenient for patients across Boone County.',
  },
  {
    name: 'Jefferson City',
    text: 'Many patients travel from Jefferson City and Cole County for preventive cardiology and advanced heart diagnostics.',
  },
  {
    name: 'Ashland',
    text: 'Accessible for southern Boone County communities including Ashland.',
  },
  {
    name: 'Fulton',
    text: 'Serving Callaway County and Fulton-area patients seeking physician-led cardiovascular care.',
  },
  {
    name: 'Moberly',
    text: 'Patients from Randolph County and north Central Missouri are welcome at our Columbia clinic.',
  },
  {
    name: 'Central Missouri',
    text: 'PulsePoint provides cardiology consultation, diagnostics, and long-term heart care throughout Mid-Missouri.',
  },
]

const DIRECTIONS = [
  'From I-70: Take exit 126 toward Columbia. Head south on US-63, then west on W Nifong Blvd.',
  'From downtown Columbia: Take W Broadway west to Nifong Blvd; clinic is in Building 2, Suite 120.',
  'Parking is available on-site at the Nifong Blvd medical office building.',
]

const MAP_EMBED =
  'https://www.google.com/maps?q=1000+W+Nifong+Blvd,+Bldg+2,+Suite+120,+Columbia,+MO+65203&output=embed'

const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=1000+W+Nifong+Blvd,+Bldg+2,+Suite+120,+Columbia,+MO+65203'

export default function ColumbiaLocationPage() {
  const fullAddress = `${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}`

  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations/columbia-mo' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      '@id': `${absoluteUrl('/locations/columbia-mo')}#location`,
      name: CLINIC.name,
      url: absoluteUrl('/locations/columbia-mo'),
      telephone: CLINIC.phoneHref,
      email: CLINIC.email,
      image: absoluteUrl('/assets/social-preview.png'),
      address: {
        '@type': 'PostalAddress',
        ...CLINIC.address,
      },
      geo: {
        '@type': 'GeoCoordinates',
        ...CLINIC.geo,
      },
      hasMap: DIRECTIONS_URL,
      areaServed: CLINIC.areaServed.map((name) => ({ '@type': 'Place', name })),
      openingHours: CLINIC.openingHours,
      medicalSpecialty: 'Cardiology',
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
              Columbia, Missouri
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              Cardiologist in Columbia, MO
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              PulsePoint Clinic is a physician-led cardiovascular practice located at{' '}
              {fullAddress}. Board-certified cardiologists Dr. Martin Tibuakuu and Dr. James
              Fairlamb provide preventive cardiology, diagnostics, and comprehensive heart care for
              patients across Central Missouri.
            </p>
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
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Clinic address & contact
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-8 space-y-5 text-[.92rem] leading-[1.7] text-charcoal/85">
                <div>
                  <p className="font-bold text-charcoal">Address</p>
                  <address className="mt-1 not-italic text-muted">
                    {CLINIC.address.streetAddress}
                    <br />
                    {CLINIC.address.addressLocality}, {CLINIC.address.addressRegion}{' '}
                    {CLINIC.address.postalCode}
                  </address>
                </div>
                <div>
                  <p className="font-bold text-charcoal">Phone</p>
                  <a href={`tel:${CLINIC.phoneHref}`} className="mt-1 block text-wine hover:underline">
                    {CLINIC.phoneDisplay} · {CLINIC.vanityPhone}
                  </a>
                </div>
                <div>
                  <p className="font-bold text-charcoal">Email</p>
                  <a href={`mailto:${CLINIC.email}`} className="mt-1 block text-wine hover:underline">
                    {CLINIC.email}
                  </a>
                </div>
                <div>
                  <p className="font-bold text-charcoal">Hours</p>
                  <p className="mt-1 text-muted">
                    {CLINIC.hoursDisplay}
                    <br />
                    {CLINIC.hoursNote}
                  </p>
                </div>
              </div>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
              >
                Get Directions in Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-md shadow-card">
              <iframe
                title="PulsePoint Clinic — Columbia, MO location map"
                src={MAP_EMBED}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Driving directions
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <ul className="mt-8 space-y-4">
              {DIRECTIONS.map((step) => (
                <li key={step} className="flex items-start gap-3 text-[.9rem] leading-[1.65] text-charcoal/85">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              Areas we serve
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <p className="mt-6 max-w-3xl text-[.94rem] leading-[1.75] text-muted">
              PulsePoint Clinic is based in Columbia and welcomes patients from communities across
              Central Missouri who need a cardiologist, heart testing, or long-term cardiovascular
              care.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AREAS_SERVED.map((area) => (
                <article key={area.name} className="rounded-md bg-white p-5 shadow-card">
                  <h3 className="text-[1rem] font-bold text-charcoal">{area.name}</h3>
                  <p className="mt-2 text-[.84rem] leading-[1.6] text-muted">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight sm:text-[2.25rem]">
              Services at our Columbia clinic
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-gold" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: '/services/preventive-cardiology', label: 'Core Cardiology' },
                { href: '/cardiologist-columbia-mo', label: 'Cardiologist Columbia, MO' },
                { href: '/conditions', label: 'Heart Conditions' },
                { href: '/diagnostics', label: 'Heart Testing & Diagnostics' },
                { href: '/services/echocardiography', label: 'Echocardiography' },
                { href: '/physicians/martin-tibuakuu', label: 'Our Cardiologists' },
                { href: '/patient-info', label: 'Patient FAQs' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-[.88rem] font-semibold transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
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
