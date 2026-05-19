import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Preventive cardiology, advanced imaging, vascular care, cardiometabolic wellness, executive health, and remote follow-up.',
}

const SERVICES = [
  {
    title: 'Preventive Cardiology',
    summary:
      'Risk assessment, blood pressure guidance, cholesterol management, lifestyle planning, and longitudinal heart health strategy.',
    details: ['Family history review', 'ASCVD risk evaluation', 'Personalized prevention plan'],
  },
  {
    title: 'Advanced Imaging',
    summary:
      'Thoughtful use of echocardiography, vascular ultrasound, cardiac CT, and calcium scoring to clarify risk and guide next steps.',
    details: ['Echo interpretation', 'Calcium scoring guidance', 'Imaging-based care planning'],
  },
  {
    title: 'Vascular & Vein Care',
    summary:
      'Evaluation of circulation concerns, leg symptoms, vascular risk, and ultrasound findings with clear treatment recommendations.',
    details: ['Vascular ultrasound', 'Peripheral circulation review', 'Vein and arterial concerns'],
  },
  {
    title: 'Cardiometabolic Wellness',
    summary:
      'Integrated care for cardiovascular risk linked to weight, insulin resistance, blood pressure, cholesterol, and inflammation.',
    details: ['Metabolic risk review', 'Medication optimization', 'Lifestyle and nutrition goals'],
  },
  {
    title: 'Executive Health',
    summary:
      'A high-touch cardiovascular evaluation for busy professionals who want a precise understanding of their heart health.',
    details: ['Comprehensive review', 'Efficient scheduling', 'Written action plan'],
  },
  {
    title: 'Telemedicine & Remote Care',
    summary:
      'Convenient follow-up for results review, prevention planning, medication questions, and ongoing care coordination.',
    details: ['Virtual follow-ups', 'Remote results review', 'Care coordination'],
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Understand your risk',
    text: 'We start with your history, goals, existing test results, medications, and lifestyle context.',
  },
  {
    step: '02',
    title: 'Choose the right diagnostics',
    text: 'Testing is selected intentionally, with an explanation of what it can clarify and how it may change the plan.',
  },
  {
    step: '03',
    title: 'Build a practical plan',
    text: 'You leave with clear next steps for prevention, treatment, monitoring, or follow-up care.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Services
            </div>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] sm:text-[3rem] lg:text-[3.3rem]">
              Comprehensive heart care with a prevention-first lens.
            </h1>
            <p className="mt-5 max-w-2xl text-[.98rem] leading-[1.75] text-white/78">
              PulsePoint Clinic brings together preventive cardiology, advanced
              diagnostics, vascular evaluation, and cardiometabolic wellness so
              your care plan reflects the full cardiovascular picture.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
              >
                Book an Appointment
              </Link>
              <Link
                href="/diagnostics"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
              >
                View Diagnostics
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Clinical services
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((service) => (
                <article key={service.title} className="rounded-md bg-white p-6 shadow-card">
                  <h3 className="text-[1.05rem] font-bold text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[.88rem] leading-[1.65] text-muted">
                    {service.summary}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-[.82rem] leading-[1.45] text-charcoal"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[340px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                A clearer path from concern to plan.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                The goal is not more testing for its own sake. The goal is to
                choose the right information, explain what it means, and turn it
                into a prevention or treatment strategy.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {PROCESS.map((item) => (
                <article key={item.step} className="border-t-2 border-gold pt-5">
                  <div className="text-[.78rem] font-bold text-wine">{item.step}</div>
                  <h3 className="mt-2 text-[.98rem] font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[.84rem] leading-[1.62] text-muted">
                    {item.text}
                  </p>
                </article>
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
