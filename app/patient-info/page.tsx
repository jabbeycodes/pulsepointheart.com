import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'
import {
  PULSEPOINT_CLINIC_FAQS,
  type FaqBlock,
} from '@/lib/pulsepoint-clinic-faqs'

export const metadata: Metadata = {
  title: 'Patient Info',
  description:
    'PulsePoint Clinic FAQs covering insurance, Core Cardiology, membership programs, diagnostics, cardiometabolic care, and choosing the right care pathway in Columbia, MO.',
}

function FaqContent({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="mt-2 space-y-3 text-[.86rem] leading-[1.65] text-muted">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return <p key={index}>{block.text}</p>
        }

        return (
          <div key={index}>
            {block.intro ? <p className="mb-2">{block.intro}</p> : null}
            <ul className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default function PatientInfoPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-5xl">
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              Questions About Your Care? We&apos;re Here to Help.
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              Find answers about insurance, membership options, preventive care,
              diagnostics, and the PulsePoint experience.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
              >
                Contact the Clinic
              </Link>
            </div>
          </div>
        </section>

        <section id="faqs" className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                PulsePoint Clinic FAQs
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-8 space-y-4">
                {PULSEPOINT_CLINIC_FAQS.map((faq) => (
                  <article key={faq.question} className="rounded-md bg-white p-6 shadow-card">
                    <h3 className="text-[.98rem] font-bold text-charcoal">
                      {faq.question}
                    </h3>
                    <FaqContent blocks={faq.blocks} />
                  </article>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-md bg-navy p-6 text-white shadow-card">
              <h3 className="font-display text-[1.5rem] font-bold leading-tight">
                Need help choosing the right next step?
              </h3>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/75">
                Call the clinic and our team can help with appointment
                scheduling, visit preparation, and patient portal access.
              </p>
              <a
                href="tel:18557857337"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                (855) 785-7337
              </a>
            </aside>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
