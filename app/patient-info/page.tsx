import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Patient Info',
  description:
    'New patient guidance for appointments, forms, insurance, privacy, and preparing for a visit at PulsePoint Clinic.',
}

const VISIT_STEPS = [
  {
    title: 'Before your visit',
    text: 'Gather your medication list, prior cardiac testing, recent lab work, and the main questions you want answered.',
  },
  {
    title: 'At the clinic',
    text: 'Your visit focuses on history, risk factors, goals, and whether diagnostic testing or follow-up care is appropriate.',
  },
  {
    title: 'After your visit',
    text: 'You receive clear next steps so prevention, treatment, referrals, or follow-up testing are easier to act on.',
  },
]

const INFO_BLOCKS = [
  {
    title: 'Forms',
    text: 'New patient forms and consent materials will be provided before or during scheduling. Please do not email medical details unless our team has instructed you to use a secure channel.',
  },
  {
    title: 'Insurance & payment',
    text: 'Coverage can vary by service. Our team can discuss appointment type, membership inquiries, and payment expectations before your visit.',
  },
  {
    title: 'Patient portal',
    text: 'Portal access is intended for secure communication, results, and care follow-up when available. Contact the clinic if you need help getting connected.',
  },
  {
    title: 'Privacy',
    text: 'For your safety, public website forms should not include symptoms, diagnoses, or other sensitive medical details.',
  },
]

const FAQS = [
  {
    question: 'What should I bring?',
    answer:
      'Bring a current medication list, supplements, allergies, prior cardiology records, imaging reports, lab results, and your insurance card if applicable.',
  },
  {
    question: 'Can I request a second opinion?',
    answer:
      'Yes. PulsePoint can review prior results and help explain options, unanswered questions, and reasonable next steps.',
  },
  {
    question: 'Is every service membership-based?',
    answer:
      'Membership is available for patients who want a more personalized care relationship. The clinic can discuss the right care path when you reach out.',
  },
]

export default function PatientInfoPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Patient Info
            </div>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              Everything you need to feel prepared for heart care.
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              Whether you are scheduling a first visit, asking about membership,
              or preparing for diagnostic care, this page outlines what to
              expect and how to get ready.
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

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
              What to expect
            </h2>
            <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {VISIT_STEPS.map((step, index) => (
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
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[330px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                Practical details
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                If you are unsure what applies to your visit, call the clinic
                before sending private medical information through a public form.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {INFO_BLOCKS.map((block) => (
                <article key={block.title} className="border-t-2 border-gold pt-5">
                  <h3 className="text-[1rem] font-bold text-charcoal">{block.title}</h3>
                  <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
                    {block.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Frequently asked questions
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              <div className="mt-8 space-y-4">
                {FAQS.map((faq) => (
                  <article key={faq.question} className="rounded-md bg-white p-6 shadow-card">
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
            <aside className="h-fit rounded-md bg-navy p-6 text-white shadow-card">
              <h3 className="font-display text-[1.5rem] font-bold leading-tight">
                Need help choosing the right next step?
              </h3>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/75">
                Call the clinic and our team can help with appointment
                scheduling, membership questions, and visit preparation.
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
