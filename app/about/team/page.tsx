import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import { CLINIC, buildBreadcrumbJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'
import { TEAM_INTRO, TEAM_MEMBERS } from '@/lib/team'

export const metadata: Metadata = pageMeta(
  '/about/team',
  'Our Leadership Team | PulsePoint Clinic Columbia, MO',
  'Meet the physicians and leadership team behind PulsePoint Clinic in Columbia, Missouri — combining clinical excellence, operations expertise, and patient-centered cardiovascular care.',
)

export default function AboutTeamPage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Our Team', path: '/about/team' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: TEAM_INTRO.title,
      description: TEAM_INTRO.body,
      url: 'https://pulsepointheart.com/about/team',
      mainEntity: {
        '@type': 'MedicalClinic',
        name: CLINIC.name,
        url: CLINIC.url,
        employee: TEAM_MEMBERS.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.title,
          image: `https://pulsepointheart.com${member.image}`,
          ...(member.profileHref
            ? { url: `https://pulsepointheart.com${member.profileHref}` }
            : {}),
        })),
      },
    },
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
              <Link href="/about" className="hover:text-wine">
                About
              </Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-charcoal">Our Team</span>
            </nav>

            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              {TEAM_INTRO.eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem]">
              {TEAM_INTRO.title}
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-3xl text-[.98rem] leading-[1.75] text-muted">{TEAM_INTRO.body}</p>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => {
              const content = (
                <>
                  <div className="aspect-[4/5] overflow-hidden bg-[#dde4ee]">
                    <img
                      src={member.image}
                      alt={member.imageAlt}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-display text-[1.2rem] font-bold leading-tight text-navy">
                      {member.name}
                    </h2>
                    <p className="mt-2 text-[.84rem] font-semibold leading-[1.45] text-wine">
                      {member.title}
                    </p>
                    {member.profileHref ? (
                      <span className="mt-4 inline-flex text-[.78rem] font-bold uppercase tracking-[1px] text-gold">
                        View Physician Profile →
                      </span>
                    ) : null}
                  </div>
                </>
              )

              return member.profileHref ? (
                <Link
                  key={member.slug}
                  href={member.profileHref}
                  className="overflow-hidden rounded-md bg-white shadow-card transition-shadow hover:shadow-lg"
                >
                  {content}
                </Link>
              ) : (
                <article
                  key={member.slug}
                  className="overflow-hidden rounded-md bg-white shadow-card"
                >
                  {content}
                </article>
              )
            })}
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-[1.75rem] font-bold leading-tight sm:text-[2rem]">
              Ready to experience PulsePoint care?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[.92rem] leading-[1.7] text-white/85">
              Call {CLINIC.localPhoneDisplay} or request an appointment online. Our team is here to
              help you take the next step in your heart health.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Request an Appointment
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                About PulsePoint
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
