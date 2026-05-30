import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

export const metadata: Metadata = {
  title: 'Cardiometabolic & Weight Loss Clinic | PulsePoint Cardiology',
  description:
    'Physician-led medical weight loss and cardiometabolic care at PulsePoint. One simple $299/month membership including GLP-1 management, InBody analysis, personalized treatment plans, and cardiovascular risk reduction.',
}

// Clinic contact, kept here so a single edit updates copy + tel: link.
const OFFICE_PHONE_DISPLAY = '(855) 785-7337'
const OFFICE_PHONE_TEL = 'tel:18557857337'

const FIT_POINTS = [
  'Want to lose weight safely and sustainably',
  'Have obesity or excess weight affecting your health',
  'Have high blood pressure or high cholesterol',
  'Have prediabetes or Type 2 diabetes',
  'Struggle with weight regain',
  'Are interested in GLP-1 medications such as Wegovy\u00ae or Zepbound\u00ae',
  'Have a family history of heart disease',
  'Want physician-guided support and accountability',
]

const DIFFERENTIATORS = [
  { icon: 'stethoscope', label: 'Physician-Led Care' },
  { icon: 'clipboard', label: 'Personalized Treatment Plans' },
  { icon: 'activity', label: 'Body Composition Tracking' },
  { icon: 'heart', label: 'Cardiovascular Risk Reduction' },
  { icon: 'leaf', label: 'Lifestyle Optimization' },
  { icon: 'pill', label: 'Medical Weight Management' },
  { icon: 'group', label: 'Long-Term Accountability' },
  { icon: 'chart', label: 'Sustainable Results' },
]

const MEMBERSHIP_INCLUDES = [
  {
    icon: 'clipboard',
    title: 'Comprehensive Initial Evaluation',
    text: 'A detailed assessment of your medical history, weight history, metabolic health, lifestyle habits, cardiovascular risk factors, and long-term goals.',
  },
  {
    icon: 'target',
    title: 'Personalized Treatment Plan',
    text: 'A customized roadmap designed around your unique needs and goals, including nutrition, exercise, behavioral strategies, and medical therapies when appropriate.',
  },
  {
    icon: 'calendar',
    title: 'Monthly Physician Visits',
    text: 'Regular follow-up appointments to review progress, adjust treatment plans, optimize medications, and provide ongoing accountability and support.',
  },
  {
    icon: 'activity',
    title: 'InBody Body Composition Analysis',
    text: 'At every visit, we track more than weight alone. We measure body fat percentage, muscle mass, visceral fat, hydration status, and weight trends.',
  },
  {
    icon: 'syringe',
    title: 'GLP-1 Medication Management',
    text: 'Expert evaluation and management of weight-loss medications including Wegovy\u00ae (Semaglutide), Zepbound\u00ae (Tirzepatide), and other evidence-based therapies. Medication costs are not included in membership fees.',
  },
  {
    icon: 'chat',
    title: 'Enhanced Physician Access',
    text: 'Direct communication for questions, medication concerns, treatment adjustments, and ongoing support between visits.',
  },
]

const PLAN_INCLUDES = [
  'Comprehensive initial physician evaluation',
  'Personalized treatment plan',
  'Monthly physician visits',
  'InBody body composition analysis',
  'GLP-1 medication management',
  'Nutrition and lifestyle coaching',
  'Exercise guidance',
  'Cardiometabolic risk optimization',
  'Blood pressure, cholesterol, and diabetes management',
  'Enhanced physician access',
  'Long-term accountability and support',
]

const NOT_INCLUDED = [
  'Prescription medications, including GLP-1 medications',
  'Laboratory testing',
  'Imaging studies',
  'Hospital services',
  'Specialist referrals',
  'Insurance-billed medical services',
]

function Icon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const base = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.6',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
  }

  switch (name) {
    case 'stethoscope':
      return (
        <svg {...base}>
          <path d="M6 3v5a4 4 0 0 0 8 0V3" />
          <path d="M4 3h2.5M11.5 3H14" />
          <path d="M10 16v0a4 4 0 0 0 8 0v-2.5" />
          <circle cx="18" cy="11" r="2" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg {...base}>
          <rect x="6" y="4" width="12" height="17" rx="2" />
          <path d="M9 4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      )
    case 'activity':
      return (
        <svg {...base}>
          <path d="M3 12h4l2.5-7 4 14 2.5-7H21" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...base}>
          <path d="M20 4c-7.2 0-13 5.8-13 13 0 1.7.3 3.1.9 4.1C9 20.4 20 14.4 20 4Z" />
          <path d="M7.9 21.1C6 17 7.5 12 12 9" />
        </svg>
      )
    case 'pill':
      return (
        <svg {...base}>
          <g transform="rotate(-45 12 12)">
            <rect x="3" y="9" width="18" height="6" rx="3" />
            <path d="M12 9v6" />
          </g>
        </svg>
      )
    case 'group':
      return (
        <svg {...base}>
          <circle cx="12" cy="7" r="3" />
          <circle cx="5" cy="10" r="2.4" />
          <circle cx="19" cy="10" r="2.4" />
          <path d="M7 20c0-2.8 2.2-5 5-5s5 2.2 5 5M1.5 19c0-2.1 1.6-3.8 3.5-3.8M22.5 19c0-2.1-1.6-3.8-3.5-3.8" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...base}>
          <path d="M4 19V5M4 19h16" />
          <path d="m7 15 3-3 3 2 4-5" />
          <path d="M17 8h2v2" />
        </svg>
      )
    case 'target':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18M8 15h.01M12 15h.01M16 15h.01" />
        </svg>
      )
    case 'syringe':
      return (
        <svg {...base}>
          <path d="M17 3l4 4" />
          <path d="M14.5 5.5l4 4" />
          <path d="M16.5 7.5 7 17l-4 4 4-1 9.5-9.5" />
          <path d="M9 12l3 3" />
        </svg>
      )
    case 'chat':
      return (
        <svg {...base}>
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
          <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
        </svg>
      )
    case 'users':
      return (
        <svg {...base}>
          <circle cx="9" cy="8" r="3.4" />
          <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
          <path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M18 13.6c2.6.6 4.5 2.9 4.5 5.6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...base}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'info':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...base}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2.1Z" />
        </svg>
      )
    default:
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

function CheckBadge({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-2xl items-center justify-center gap-4">
      <span className="hidden h-px flex-1 bg-gold/45 sm:block" />
      <h2 className="text-center font-display text-[1.45rem] font-bold leading-tight text-navy sm:text-[1.7rem]">
        {children}
      </h2>
      <span className="hidden h-px flex-1 bg-gold/45 sm:block" />
    </div>
  )
}

export default function CardiometabolicWeightLossPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F7F7F5]">
        {/* HERO */}
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fadeUp">
              <div className="mb-4 text-[.68rem] font-bold uppercase tracking-[2.6px] text-gold">
                PulsePoint Cardiology
              </div>
              <h1 className="font-display text-[2rem] font-bold leading-[1.08] text-navy sm:text-[2.6rem] lg:text-[3.1rem]">
                Cardiometabolic &amp; Weight Loss Clinic
              </h1>
              <p className="mt-4 text-[1.05rem] font-semibold text-wine sm:text-[1.15rem]">
                Lose Weight. Improve Metabolic Health. Reduce Cardiovascular
                Risk.
              </p>
              <div className="mt-5 max-w-xl space-y-4 text-[1rem] leading-[1.8] text-charcoal/75 sm:text-[1.02rem]">
                <p>
                  At PulsePoint, we believe successful weight loss is about more
                  than losing pounds&mdash;it is about improving your overall
                  health, reducing your risk of heart disease and diabetes, and
                  building sustainable habits that last a lifetime.
                </p>
                <p>
                  Our physician-led Cardiometabolic &amp; Weight Loss Clinic
                  combines medical expertise, advanced body composition
                  analysis, lifestyle optimization, and evidence-based therapies
                  to help you achieve meaningful and lasting results.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  Book a Consultation
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gold bg-white px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold/10"
                >
                  View Membership
                </Link>
              </div>
            </div>

            <div className="animate-fadeUp overflow-hidden rounded-2xl bg-graybg shadow-card [animation-delay:.1s]">
              <img
                src="/assets/services/cardiometabolic-hero-consult.png"
                alt="Physician discussing cardiometabolic and weight loss care with patient."
                className="aspect-[5/4] h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <div className="rounded-2xl border border-[#ECE7DF] bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <div className="grid gap-7 lg:grid-cols-[240px_1fr] lg:items-start">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-wine text-white">
                    <Icon name="users" className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-[1.3rem] font-bold leading-tight text-wine sm:text-[1.5rem]">
                    Who Is This Program Designed For?
                  </h2>
                </div>

                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {FIT_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">
                        <CheckBadge />
                      </span>
                      <span className="text-[.92rem] leading-[1.5] text-charcoal/85">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY PULSEPOINT IS DIFFERENT */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionHeading>Why PulsePoint Is Different</SectionHeading>
            <div className="mx-auto mt-5 max-w-3xl text-center">
              <p className="text-[1rem] leading-[1.75] text-charcoal/80">
                Most weight loss programs focus only on the scale.
              </p>
              <p className="mt-2 text-[1rem] font-semibold leading-[1.75] text-wine">
                We focus on improving the underlying drivers of metabolic
                disease while helping you achieve sustainable weight loss and
                better long-term health.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
              {DIFFERENTIATORS.map((item) => (
                <article key={item.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-wine/20 bg-wine/5 text-wine">
                    <Icon name={item.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-[.78rem] font-bold leading-tight text-navy">
                    {item.label}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MEMBERSHIP INCLUDES */}
        <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionHeading>Membership Includes</SectionHeading>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MEMBERSHIP_INCLUDES.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-2xl border border-[#E9EDF2] bg-white p-6 text-center shadow-card transition-shadow hover:shadow-cardHover"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-wine/20 bg-wine/5 text-wine">
                    <Icon name={item.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-[.98rem] font-bold leading-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[.84rem] leading-[1.6] text-charcoal/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SINGLE PRICING CARD */}
        <section id="pricing" className="px-5 py-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid overflow-hidden rounded-3xl border border-[#E9EDF2] bg-white shadow-card lg:grid-cols-[340px_1fr]">
              {/* Maroon label panel */}
              <div className="flex flex-col justify-center gap-5 bg-wine px-7 py-10 text-white sm:px-9">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold text-gold">
                  <Icon name="heart" className="h-8 w-8" />
                </span>
                <div className="text-[.74rem] font-bold uppercase tracking-[2.4px] text-gold">
                  Membership Pricing
                </div>
                <h2 className="font-display text-[1.5rem] font-bold leading-tight sm:text-[1.75rem]">
                  PulsePoint Cardiometabolic &amp; Weight Loss Membership
                </h2>
              </div>

              {/* Price + benefits */}
              <div className="p-7 sm:p-9 lg:p-10">
                <div className="flex flex-wrap items-end gap-x-2">
                  <span className="font-display text-[3rem] font-bold leading-none text-navy sm:text-[3.6rem]">
                    $299
                  </span>
                  <span className="pb-1 text-[1.1rem] font-semibold text-muted">
                    /month
                  </span>
                </div>
                <p className="mt-2 text-[.95rem] font-semibold uppercase tracking-[1px] text-wine">
                  One simple membership. Everything included.
                </p>

                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {PLAN_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">
                        <CheckBadge />
                      </span>
                      <span className="text-[.9rem] leading-[1.45] text-charcoal/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IMPORTANT INFORMATION */}
        <section className="px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionHeading>Important Information</SectionHeading>

            <div className="mt-10 grid gap-7 rounded-2xl border border-[#ECE7DF] bg-[#FBF8F2] p-7 shadow-card sm:p-8 lg:grid-cols-[auto_1fr_300px] lg:items-center">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon name="shield" className="h-7 w-7" />
              </span>

              <div>
                <h3 className="text-[.95rem] font-bold text-navy">
                  Membership fees do not include:
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {NOT_INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[.86rem] leading-[1.5] text-charcoal/75"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="border-t border-[#ECE7DF] pt-5 text-[.88rem] font-medium leading-[1.6] text-charcoal/80 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                Patients are encouraged to maintain active health insurance
                coverage.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex items-start gap-5">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold">
                <Icon name="heart" className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-[1.6rem] font-bold leading-tight sm:text-[2rem]">
                  A Different Kind of Weight Loss Program
                </h2>
                <p className="mt-4 max-w-xl text-[.95rem] leading-[1.75] text-white/75">
                  Our goal is not simply helping you lose weight. Our goal is
                  helping you improve metabolic health, reduce cardiovascular
                  risk, increase energy, and create sustainable habits that
                  support lifelong wellness.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[.06] p-7 ring-1 ring-white/10 sm:p-8">
              <h3 className="font-display text-[1.3rem] font-bold text-white sm:text-[1.5rem]">
                Ready to Get Started?
              </h3>
              <p className="mt-3 text-[.92rem] leading-[1.7] text-white/75">
                Schedule your Cardiometabolic &amp; Weight Loss Consultation
                today. Lose Weight. Improve Metabolic Health. Protect Your
                Future.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-wine px-5 py-3 text-[.85rem] font-bold text-white transition-colors hover:bg-wine-light"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  Book a Consultation
                </Link>
                <a
                  href={OFFICE_PHONE_TEL}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-[.85rem] font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Call the Office
                </a>
              </div>
              <p className="mt-4 text-center text-[.78rem] text-white/55 sm:text-left">
                Prefer to talk now? Call {OFFICE_PHONE_DISPLAY}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
