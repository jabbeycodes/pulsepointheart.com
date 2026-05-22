import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'
import { SERVICE_PAGES, getServicePage } from '@/lib/service-pages'
import { absoluteUrl } from '@/lib/seo'

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServicePage(slug)

  if (!service) {
    return {}
  }

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: absoluteUrl(`/services/${service.slug}`),
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: absoluteUrl(`/services/${service.slug}`),
      images: service.image ? [absoluteUrl(service.image)] : [absoluteUrl('/assets/social-preview.png')],
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServicePage(slug)

  if (!service) {
    notFound()
  }

  const relatedServices = SERVICE_PAGES.filter((item) => item.slug !== service.slug).slice(0, 3)
  const isCardiometabolic = service.slug === 'cardiometabolic-wellness'
  const isExecutiveHealth = service.slug === 'executive-health'

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                {service.eyebrow}
              </div>
              <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
                {service.title}
              </h1>
              <div className="my-5 h-[3px] w-12 rounded bg-wine" />
              <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
                {service.heroText}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
                >
                  Request Appointment
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-md bg-graybg shadow-card">
              {service.image ? (
                <Image
                  src={service.image}
                  alt={`${service.shortTitle} at PulsePoint Clinic`}
                  width={1280}
                  height={960}
                  className="h-[300px] w-full object-cover sm:h-[420px]"
                  priority
                />
              ) : (
                <div className="flex min-h-[320px] flex-col justify-end bg-navy p-7 text-white">
                  <div className="text-[.72rem] font-bold uppercase tracking-[2px] text-gold">
                    PulsePoint Clinic
                  </div>
                  <p className="mt-3 font-display text-[1.65rem] font-bold leading-tight">
                    Premium personalized cardiovascular care.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                What this service helps clarify.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
            </div>
            <p className="text-[.98rem] leading-[1.75] text-muted lg:pt-1">
              {service.overview}
            </p>
          </div>
        </section>

        {isCardiometabolic ? (
          <>
            <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
                  <div>
                    <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                      Prevention + Metabolism
                    </div>
                    <h2 className="font-display text-[1.9rem] font-bold leading-tight text-charcoal sm:text-[2.35rem]">
                      The heart-metabolism connection is where prevention becomes more precise.
                    </h2>
                    <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Blood pressure',
                        text: 'Understanding patterns, targets, medication questions, and lifestyle drivers that influence long-term vascular risk.',
                      },
                      {
                        title: 'Cholesterol and plaque risk',
                        text: 'Connecting lipid results, family history, calcium scoring, and prevention choices into a clearer strategy.',
                      },
                      {
                        title: 'Blood sugar and insulin resistance',
                        text: 'Reviewing prediabetes, diabetes risk, weight trends, and metabolic health through a cardiovascular lens.',
                      },
                      {
                        title: 'Sleep, stress, and recovery',
                        text: 'Looking at daily patterns that can affect blood pressure, inflammation, rhythm symptoms, and overall wellness.',
                      },
                    ].map((item) => (
                      <article key={item.title} className="rounded-md bg-graybg p-5">
                        <div className="mb-3 h-[2px] w-10 rounded bg-gold" />
                        <h3 className="text-[1rem] font-bold text-charcoal">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
                          {item.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
              <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                    Long-Term Wellness Strategy
                  </div>
                  <h2 className="font-display text-[1.95rem] font-bold leading-tight sm:text-[2.45rem]">
                    Built for patients who want more than a one-number answer.
                  </h2>
                  <p className="mt-5 max-w-2xl text-[.95rem] leading-[1.75] text-white/78">
                    Cardiometabolic risk is rarely about one lab value. The
                    stronger approach is to understand the pattern, decide what
                    matters most, and build a plan that can be followed,
                    measured, and refined.
                  </p>
                </div>
                <div className="rounded-md border border-white/15 bg-white/8 p-6">
                  <h3 className="font-display text-[1.4rem] font-bold leading-tight">
                    A premium prevention plan may help clarify:
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {[
                      'Which risk factors deserve the most attention now',
                      'Whether advanced screening could change the plan',
                      'How medication, nutrition, movement, and follow-up fit together',
                      'What progress should be tracked over the next 3 to 12 months',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[.88rem] leading-[1.55] text-white/82">
                        <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </>
        ) : null}

        {isExecutiveHealth ? (
          <>
            <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
              <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
                <div>
                  <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                    Premium Baseline
                  </div>
                  <h2 className="font-display text-[1.9rem] font-bold leading-tight text-charcoal sm:text-[2.35rem]">
                    A cardiovascular snapshot built for people who cannot afford vague answers.
                  </h2>
                  <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
                  <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                    The goal is to turn risk factors, prior testing, lifestyle,
                    family history, and goals into one organized prevention
                    strategy.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: 'Risk profile',
                      text: 'Family history, blood pressure, cholesterol, glucose trends, sleep, stress, and exercise capacity reviewed together.',
                    },
                    {
                      title: 'Testing strategy',
                      text: 'Advanced diagnostics are selected when they can clarify risk or change the prevention plan.',
                    },
                    {
                      title: 'Physician access',
                      text: 'A more direct relationship helps questions get answered and results get translated into next steps.',
                    },
                    {
                      title: 'Written priorities',
                      text: 'The visit should produce a concise set of cardiovascular priorities, not a vague list of possibilities.',
                    },
                  ].map((item) => (
                    <article key={item.title} className="rounded-md bg-graybg p-5">
                      <div className="mb-3 h-[2px] w-10 rounded bg-gold" />
                      <h3 className="text-[1rem] font-bold text-charcoal">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
              <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-center">
                <div>
                  <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                    Designed For High-Demand Lives
                  </div>
                  <h2 className="font-display text-[1.95rem] font-bold leading-tight sm:text-[2.45rem]">
                    Efficient care should still feel thoughtful.
                  </h2>
                  <p className="mt-5 max-w-2xl text-[.95rem] leading-[1.75] text-white/78">
                    Executive cardiovascular care is not about rushing. It is
                    about respecting time while creating a deeper, more
                    organized view of risk, prevention, and follow-through.
                  </p>
                </div>
                <div className="rounded-md border border-white/15 bg-white/8 p-6">
                  <h3 className="font-display text-[1.4rem] font-bold leading-tight">
                    The experience is built to help patients:
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {[
                      'Establish a cardiovascular baseline before symptoms appear',
                      'Prioritize which numbers and findings matter most',
                      'Coordinate diagnostics without unnecessary noise',
                      'Leave with a clear plan for the next quarter and year',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[.88rem] leading-[1.55] text-white/82">
                        <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
              <div className="mx-auto max-w-6xl">
                <div className="mb-8 max-w-2xl">
                  <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                    What the plan may organize.
                  </h2>
                  <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    'Advanced heart screening',
                    'Cardiometabolic risk',
                    'Medication strategy',
                    'Exercise and recovery',
                    'Blood pressure targets',
                    'Cholesterol and plaque risk',
                    'Family history concerns',
                    'Follow-up cadence',
                  ].map((item) => (
                    <div key={item} className="flex min-h-[72px] items-center rounded-md bg-white px-4 py-3 shadow-card">
                      <span className="text-[.86rem] font-semibold leading-[1.45] text-charcoal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : null}

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
                Common reasons to schedule
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {service.reasons.map((reason) => (
                  <div key={reason} className="rounded-md border border-[#E5EAF0] bg-graybg px-4 py-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                      <span className="text-[.86rem] font-semibold leading-[1.45] text-charcoal">
                        {reason}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
                What care may include
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <div key={item} className="rounded-md bg-navy px-4 py-3 text-white">
                    <span className="text-[.84rem] font-semibold leading-[1.45]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              How the visit works
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {service.process.map((step, index) => (
                <article key={step.title} className="rounded-md bg-white p-6 shadow-card">
                  <div className="text-[.78rem] font-bold text-wine">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 text-[1rem] font-bold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Questions patients ask.
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-8 space-y-4">
                {service.faqs.map((faq) => (
                  <article key={faq.question} className="rounded-md bg-graybg p-6">
                    <h3 className="text-[.98rem] font-bold text-charcoal">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
                      {faq.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-md bg-wine p-6 text-white shadow-card">
              <h3 className="font-display text-[1.55rem] font-bold leading-tight">
                Ready to talk through your next step?
              </h3>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/80">
                Request an appointment and the clinic team will help determine
                the right visit type.
              </p>
              <Link
                href="/book"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book Appointment
              </Link>
            </aside>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
              Related services
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="rounded-md bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
                >
                  <div className="text-[.68rem] font-bold uppercase tracking-[2px] text-gold">
                    Service
                  </div>
                  <h3 className="mt-2 text-[1rem] font-bold text-charcoal">
                    {related.shortTitle}
                  </h3>
                  <p className="mt-2 text-[.82rem] leading-[1.6] text-muted">
                    {related.heroText}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
