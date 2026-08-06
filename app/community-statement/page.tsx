import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import JsonLd from '@/components/JsonLd'
import {
  COMMUNITY_STATEMENT_BANNER_LINE,
  COMMUNITY_STATEMENT_DATE,
  COMMUNITY_STATEMENT_PATH,
  COMMUNITY_STATEMENT_TITLE,
  PATIENT_COMMITMENTS,
} from '@/lib/community-statement'
import { CLINIC, buildBreadcrumbJsonLd } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  COMMUNITY_STATEMENT_PATH,
  'Statement to Our Patients | PulsePoint Clinic Remains Open',
  'PulsePoint Clinic remains open and continues to provide comprehensive cardiovascular care in mid-Missouri. Read our statement to patients and the community.',
)

const LETTER_PARAGRAPHS = [
  'At PulsePoint Clinic, our patients have always been—and always will be—our highest priority. Every decision we make is guided by a single purpose: providing exceptional, compassionate, and evidence-based cardiovascular care to the patients and families of central Missouri.',
  'Many of you have recently seen news reports regarding litigation involving Boone Health and PulsePoint Clinic. We understand that legal matters can create uncertainty, and we want to reassure our patients, referring providers, and the communities we serve of one important fact:',
  'At this time, there has been no court order preventing PulsePoint Clinic from caring for patients. We remain fully committed to serving our community while the legal process moves forward. As with any legal matter, we will respect the judicial process and address the issues through the courts rather than through the media.',
  'Our patients can continue scheduling appointments and receiving care with confidence as we remain fully focused on delivering the high-quality cardiovascular care our community deserves.',
  'Our focus remains exactly where it belongs—on our patients.',
  'Every day, we care for individuals living with heart disease, heart rhythm disorders, heart failure, valvular heart disease, vascular disease, high blood pressure, cholesterol disorders, and other cardiovascular conditions. These patients deserve timely access to experienced cardiovascular specialists, continuity of care, and treatment guided by the latest medical evidence. That commitment has never changed.',
  'PulsePoint Clinic was founded on the belief that patients deserve physician-led, patient-centered cardiovascular care delivered with clinical excellence, innovation, and compassion. We remain committed to working collaboratively with primary care providers, hospitals, specialists, and healthcare professionals throughout the region to ensure every patient receives the right care at the right time.',
  'Whenever our patients require hospitalization, cardiac procedures, surgery, or other specialized services, we will continue referring them to the physicians and healthcare facilities best suited to meet their individual medical needs.',
  'We are deeply grateful for the trust that so many patients have already placed in PulsePoint Clinic. We are equally thankful to the primary care physicians, advanced practice providers, nurses, healthcare professionals, and community members who have welcomed us and supported our mission.',
  'We recognize that recent changes in the delivery of cardiovascular care have created understandable questions for many patients. Our commitment is to make this transition as seamless as possible by remaining accessible, communicating openly, and ensuring that our patients continue to receive timely, high-quality cardiovascular care.',
  'From the day we opened our doors, our purpose has been to expand access to outstanding cardiovascular care, improve the patient experience, and ensure that individuals and families throughout mid-Missouri have timely access to the heart care they deserve. That mission continues to guide us every day.',
  'Medicine has always been about people—not lawsuits.',
  'Every patient who walks through our doors deserves our full attention, our best clinical judgment, and our unwavering commitment to their health. That commitment remains unchanged today, and it will continue to guide everything we do.',
  'We remain confident in our ability to continue serving our patients and are excited about the future of PulsePoint Clinic as we continue expanding access to high-quality cardiovascular care throughout mid-Missouri.',
  'Thank you for your trust, your confidence, and the privilege of allowing us to care for you and your families.',
] as const

export default function CommunityStatementPage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Community Statement', path: COMMUNITY_STATEMENT_PATH },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: COMMUNITY_STATEMENT_TITLE,
      description: COMMUNITY_STATEMENT_BANNER_LINE,
      url: `https://pulsepointheart.com${COMMUNITY_STATEMENT_PATH}`,
      datePublished: '2026-08-06',
      dateModified: '2026-08-06',
      publisher: { '@id': 'https://pulsepointheart.com/#clinic' },
      about: {
        '@type': 'MedicalClinic',
        name: CLINIC.name,
      },
    },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        {/* Key-fact band — the one message patients need first */}
        <section className="bg-navy px-5 py-8 text-white sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Clinic status
            </p>
            <p className="font-display text-[1.45rem] font-bold leading-[1.25] sm:text-[1.75rem]">
              {COMMUNITY_STATEMENT_BANNER_LINE}
            </p>
            <p className="mt-3 text-[.88rem] text-white/75">
              There has been no court order preventing PulsePoint Clinic from
              caring for patients.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <article className="mx-auto max-w-3xl">
            <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Official statement · {COMMUNITY_STATEMENT_DATE}
            </p>
            <h1 className="font-display text-[2.1rem] font-bold leading-[1.15] text-charcoal sm:text-[2.75rem]">
              {COMMUNITY_STATEMENT_TITLE}
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />

            <div className="space-y-5 text-[1rem] leading-[1.8] text-charcoal/90">
              {LETTER_PARAGRAPHS.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}

              <p className="rounded-md border-l-4 border-wine bg-graybg px-5 py-4 font-semibold text-navy">
                {COMMUNITY_STATEMENT_BANNER_LINE}
              </p>

              {LETTER_PARAGRAPHS.slice(2, 10).map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 rounded-md bg-graybg p-6 sm:p-8">
              <h2 className="font-display text-[1.35rem] font-bold text-navy sm:text-[1.5rem]">
                To our patients, we want you to know:
              </h2>
              <ul className="mt-5 space-y-3">
                {PATIENT_COMMITMENTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[.94rem] leading-[1.6] text-charcoal/90"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-5 text-[1rem] leading-[1.8] text-charcoal/90">
              {LETTER_PARAGRAPHS.slice(10).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className={
                    paragraph.startsWith('Medicine has always')
                      ? 'font-display text-[1.25rem] font-bold leading-[1.4] text-navy sm:text-[1.4rem]'
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-10 text-[1rem] leading-[1.8] text-charcoal/90">
              With gratitude,
              <br />
              <span className="mt-1 inline-block font-semibold text-navy">
                The PulsePoint Clinic Team
              </span>
            </p>

            <div className="mt-10 flex flex-col gap-3 border-t border-[#E8EDF3] pt-8 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
              >
                Schedule an Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                Contact the Clinic
              </Link>
              <a
                href={`tel:${CLINIC.localPhoneHref}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                Call {CLINIC.localPhoneDisplay}
              </a>
            </div>
          </article>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
