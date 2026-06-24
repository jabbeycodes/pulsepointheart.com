import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'
import MembershipInquiryForm from '@/components/MembershipInquiryForm'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/membership',
  'Membership-Based Heart Care in Columbia, MO | PulsePoint Clinic',
  'Learn about PulsePoint Clinic\'s premium membership-based heart care in Columbia, MO with extended visits, physician accessibility, prevention planning, and coordinated cardiovascular wellness.',
)

const BENEFITS = [
  { title: 'Extended Appointments', desc: 'Unhurried visits designed around your needs — not a 10-minute slot.' },
  { title: 'Physician Accessibility', desc: 'A more responsive relationship with the cardiologist leading your care.' },
  { title: 'Same / Next-Day Visits', desc: 'Urgent concern? We see you quickly — not in six weeks.' },
  { title: 'Preventive Wellness Planning', desc: 'Proactive, personalized strategies to keep your heart healthy long-term.' },
  { title: 'Priority Scheduling', desc: 'Members are always prioritized for appointments and follow-ups.' },
  { title: 'Coordinated Specialty Care', desc: 'We coordinate with your other specialists so nothing falls through the cracks.' },
  { title: 'Comprehensive Annual Evaluations', desc: 'In-depth yearly assessments tracking your cardiovascular health over time.' },
  { title: 'Personalized Care Plans', desc: 'A written plan built specifically around your risk factors and goals.' },
]

const FIT_POINTS = [
  {
    title: 'A good fit if you want',
    items: [
      'Longer visits with time for questions',
      'A prevention plan that connects labs, imaging, and lifestyle',
      'A more accessible physician relationship',
      'Help coordinating records, testing, and follow-up',
    ],
  },
  {
    title: 'What membership is not',
    items: [
      'A replacement for emergency care',
      'A guarantee that every test or procedure is included',
      'A substitute for insurance when hospital care is needed',
      'A place to send urgent symptoms through public web forms',
    ],
  },
]

const COMPARISON = [
  {
    label: 'Visit experience',
    traditional: 'Short visits focused on immediate problems',
    membership: 'Longer conversations that connect prevention, symptoms, results, and goals',
  },
  {
    label: 'Access',
    traditional: 'Questions often wait for the next available appointment',
    membership: 'A more responsive relationship with the physician-led care team',
  },
  {
    label: 'Prevention',
    traditional: 'Risk factors may be addressed separately over time',
    membership: 'Blood pressure, cholesterol, imaging, metabolism, and lifestyle reviewed together',
  },
  {
    label: 'Follow-through',
    traditional: 'Patients may leave unsure what matters most',
    membership: 'Clear written priorities and follow-up rhythm',
  },
]

const CARE_RHYTHM = [
  {
    title: 'Establish your baseline',
    text: 'Review history, family risk, labs, medications, prior testing, lifestyle, and personal goals.',
  },
  {
    title: 'Clarify the right data',
    text: 'Use diagnostics thoughtfully when they can change the prevention plan or explain symptoms.',
  },
  {
    title: 'Build the plan',
    text: 'Translate findings into clear priorities for medication, lifestyle, monitoring, and follow-up.',
  },
  {
    title: 'Stay connected',
    text: 'Adjust the plan as new results, goals, or health changes emerge.',
  },
]

const FAQS = [
  {
    question: 'Does membership replace health insurance?',
    answer:
      'No. Membership is not insurance and does not replace coverage for hospital care, emergency care, outside testing, procedures, or services billed by other organizations.',
  },
  {
    question: 'Are diagnostics included automatically?',
    answer:
      'Testing recommendations are individualized. Some services may be billed separately or coordinated with outside facilities depending on the test, clinical need, and coverage.',
  },
  {
    question: 'Can I join if I already have a primary care doctor?',
    answer:
      'Yes. PulsePoint can complement primary care by focusing on cardiovascular prevention, diagnostics, risk planning, and specialty follow-up.',
  },
  {
    question: 'Is this for urgent symptoms?',
    answer:
      'No. Chest pain, severe shortness of breath, fainting, stroke symptoms, or emergency concerns should be handled through 911 or emergency care.',
  },
]

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-wine px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Membership-Based Care
          </div>
            <h1 className="max-w-4xl font-display text-[2.15rem] font-bold leading-[1.12] text-white sm:text-[3rem] lg:text-[3.35rem]">
            A more personalized approach to cardiovascular care.
          </h1>
          <p className="mt-5 max-w-2xl text-[.98rem] leading-[1.75] text-white/85">
            Membership creates room for longer visits, easier physician access,
            proactive prevention, and coordinated care that follows your
            cardiovascular health over time.
          </p>
        </div>

        {/* Benefits grid */}
        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-display text-[1.7rem] font-bold text-charcoal sm:text-[2rem]">
              What Membership Includes
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-12 rounded bg-wine lg:mx-0" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded bg-white p-5 shadow-card">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-wine/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="h-4 w-4 text-wine">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="mb-1 text-[.9rem] font-bold text-charcoal">{b.title}</h3>
                <p className="text-[.82rem] leading-[1.55] text-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                What Changes
              </div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Membership creates a different care experience.
              </h2>
              <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
            </div>
            <div className="overflow-hidden rounded-md bg-white shadow-card">
              <div className="grid border-b border-[#E5EAF0] bg-navy px-5 py-4 text-[.72rem] font-bold uppercase tracking-[1.4px] text-white sm:grid-cols-[1fr_1.2fr_1.2fr]">
                <div>Area</div>
                <div className="hidden sm:block">Traditional pattern</div>
                <div className="hidden sm:block text-gold">PulsePoint membership</div>
              </div>
              {COMPARISON.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-3 border-b border-[#EEF2F6] px-5 py-5 last:border-b-0 sm:grid-cols-[1fr_1.2fr_1.2fr]"
                >
                  <div className="text-[.88rem] font-bold text-charcoal">{row.label}</div>
                  <div>
                    <div className="mb-1 text-[.68rem] font-bold uppercase tracking-[1.2px] text-muted sm:hidden">
                      Traditional pattern
                    </div>
                    <p className="text-[.84rem] leading-[1.55] text-muted">{row.traditional}</p>
                  </div>
                  <div>
                    <div className="mb-1 text-[.68rem] font-bold uppercase tracking-[1.2px] text-wine sm:hidden">
                      PulsePoint membership
                    </div>
                    <p className="text-[.84rem] font-semibold leading-[1.55] text-charcoal">
                      {row.membership}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                Is membership right for you?
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                Membership is designed for patients who value access,
                continuity, and proactive prevention. The first conversation is
                meant to help decide whether that model fits your needs.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {FIT_POINTS.map((group) => (
                <article key={group.title} className="rounded-md bg-graybg p-6">
                  <h3 className="text-[1rem] font-bold text-charcoal">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[.86rem] leading-[1.55] text-muted"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                Care Rhythm
              </div>
              <h2 className="font-display text-[1.85rem] font-bold leading-tight sm:text-[2.3rem]">
                Designed for continuity, not one-off care.
              </h2>
              <p className="mt-5 text-[.94rem] leading-[1.75] text-white/75">
                Membership gives the relationship more room to mature over
                time. The aim is to create a cardiovascular plan that can be
                measured, refined, and followed.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {CARE_RHYTHM.map((item, index) => (
                <article key={item.title} className="border-t border-white/20 pt-5">
                  <div className="text-[.78rem] font-bold text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 text-[1rem] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[.84rem] leading-[1.65] text-white/68">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[1.7rem] font-bold text-charcoal sm:text-[2rem]">
              How membership works
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                { step: '01', title: 'Inquire', desc: 'Share your interest and our team will help answer initial questions.' },
                { step: '02', title: 'Consult', desc: 'Discuss whether PulsePoint is the right fit for your goals and care needs.' },
                { step: '03', title: 'Begin', desc: 'Start with a comprehensive evaluation and a personalized prevention plan.' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-wine text-lg font-bold text-wine">
                    {s.step}
                  </div>
                  <h3 className="mb-1 font-bold text-charcoal">{s.title}</h3>
                  <p className="text-[.85rem] leading-[1.6] text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                Membership questions.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                The first conversation is designed to answer practical
                questions before you decide whether membership is right for
                you.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
        </section>

        {/* Inquiry form */}
        <section id="inquire" className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-[1.7rem] font-bold text-charcoal sm:text-[2rem]">
              Interested in Membership?
            </h2>
            <div className="my-3 h-[3px] w-12 rounded bg-wine" />
            <p className="mb-8 text-[.92rem] leading-[1.65] text-muted">
              Tell us a little about yourself. There is no commitment — just a
              conversation to see if PulsePoint is the right fit.
            </p>
            <div className="rounded bg-white p-6 shadow-card lg:p-8">
              <MembershipInquiryForm />
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
