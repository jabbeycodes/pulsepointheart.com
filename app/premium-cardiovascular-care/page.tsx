import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/premium-cardiovascular-care',
  'Premium & Executive Cardiovascular Care | Columbia, MO',
  'PulsePoint Premium & Executive Cardiovascular Care offers membership-based preventive cardiology, enhanced access, executive screening, wellness planning, and personalized heart health support.',
)

// Clinic contact used by the final CTA. Kept here so a single edit updates
// both the page copy and the tel: link.
const OFFICE_PHONE_DISPLAY = '(855) 785-7337'
const OFFICE_PHONE_TEL = 'tel:18557857337'

const FIT_POINTS = [
  'Busy professionals and executives',
  'Individuals seeking preventive heart care',
  'Patients with family history of heart disease',
  'Patients with hypertension, cholesterol disorders, diabetes, obesity, or metabolic syndrome',
  'Individuals seeking a long-term physician partnership',
  'Patients wanting enhanced physician accessibility and continuity',
  'Patients interested in lifestyle optimization and longevity-focused care',
]

const MEMBERSHIP_BENEFITS = [
  {
    icon: 'clock',
    title: 'Extended Appointments',
    text: 'Longer visits for deeper conversations, thorough evaluations, and personalized care.',
  },
  {
    icon: 'bolt',
    title: 'Same-Day or Next-Day Access',
    text: 'Priority scheduling for urgent concerns and faster access to your care team.',
  },
  {
    icon: 'chat',
    title: 'Direct Physician Communication',
    text: 'Enhanced access to your physician for important questions, concerns, and follow-up guidance.',
  },
  {
    icon: 'clipboard',
    title: 'Comprehensive Annual Cardiovascular Evaluation',
    text: 'In-depth yearly assessment of heart health, risk factors, lifestyle, and long-term prevention strategy.',
  },
  {
    icon: 'shield',
    title: 'Executive Cardiovascular Screening',
    text: 'Advanced screening tailored to your individual risk profile and personal health goals.',
  },
  {
    icon: 'leaf',
    title: 'Personalized Wellness & Lifestyle Planning',
    text: 'Guidance on nutrition, exercise, weight optimization, sleep, stress management, and metabolic health.',
  },
  {
    icon: 'run',
    title: 'Lifestyle Optimization',
    text: 'Goal-oriented strategies to improve energy, performance, and long-term cardiovascular health.',
  },
  {
    icon: 'search',
    title: 'Preventive Diagnostics',
    text: 'Access to preventive testing and diagnostics based on your risk assessment and physician recommendations.',
  },
]

const PRICING = [
  {
    tier: 'Individual Membership',
    leadIn: 'Starting at',
    price: '$299',
    cadence: '/month',
    icon: 'person',
    text: 'Enhanced access, preventive cardiovascular care services, and longitudinal wellness-focused management.',
  },
  {
    tier: 'Couple Membership',
    leadIn: 'Starting at',
    price: '$499',
    cadence: '/month',
    icon: 'couple',
    text: 'All the benefits of individual membership for you and your spouse/partner.',
  },
  {
    tier: 'Family & Corporate Plans',
    leadIn: '',
    price: 'Custom Pricing',
    cadence: '',
    icon: 'group',
    text: 'Custom pricing available for families, organizations, and corporate wellness programs.',
  },
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
    case 'clock':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...base}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      )
    case 'chat':
      return (
        <svg {...base}>
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
          <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg {...base}>
          <rect x="6" y="4" width="12" height="17" rx="2" />
          <path d="M9 4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4" />
          <path d="M12 11.5c-1.4-1.7-3.6-.3-2.4 1.4.5.7 1.4 1.4 2.4 2.1 1-.7 1.9-1.4 2.4-2.1 1.2-1.7-1-3.1-2.4-1.4Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...base}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...base}>
          <path d="M20 4c-7.2 0-13 5.8-13 13 0 1.7.3 3.1.9 4.1C9 20.4 20 14.4 20 4Z" />
          <path d="M7.9 21.1C6 17 7.5 12 12 9" />
        </svg>
      )
    case 'run':
      return (
        <svg {...base}>
          <circle cx="13" cy="4" r="2" />
          <path d="M7 21v-4l3-3 2 2v5M16 21v-5l-4-4 1-4M6 12l4-4 3 1M15 9h4" />
        </svg>
      )
    case 'search':
      return (
        <svg {...base}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      )
    case 'person':
      return (
        <svg {...base}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      )
    case 'couple':
      return (
        <svg {...base}>
          <circle cx="8" cy="8" r="3.2" />
          <circle cx="16" cy="8" r="3.2" />
          <path d="M2.5 21c0-3.6 2.5-6.2 5.5-6.2 1.4 0 2.7.6 3.6 1.5M21.5 21c0-3.6-2.5-6.2-5.5-6.2-1.4 0-2.7.6-3.6 1.5" />
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
    case 'users':
      return (
        <svg {...base}>
          <circle cx="9" cy="8" r="3.4" />
          <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
          <path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M18 13.6c2.6.6 4.5 2.9 4.5 5.6" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...base}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M11 12h2" />
        </svg>
      )
    case 'info':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5M12 8h.01" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...base}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2.1Z" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18M8 15h.01M12 15h.01M16 15h.01" />
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  // Centered heading with thin gold divider lines on both sides.
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

export default function PremiumCardiovascularCarePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F7F7F5]">
        {/* A. HERO */}
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fadeUp">
              <div className="mb-4 text-[.68rem] font-bold uppercase tracking-[2.6px] text-gold">
                PulsePoint Cardiology
              </div>
              <h1 className="font-display text-[2rem] font-bold leading-[1.08] text-navy sm:text-[2.6rem] lg:text-[3.1rem]">
                PulsePoint Premium &amp; Executive Cardiovascular Care
              </h1>
              <p className="mt-4 text-[1.05rem] font-semibold text-wine sm:text-[1.15rem]">
                Personalized. Preventive. Accessible.
              </p>
              <p className="mt-5 max-w-xl text-[1rem] leading-[1.8] text-charcoal/75 sm:text-[1.05rem]">
                Our membership-based program offers a higher level of
                cardiovascular care with enhanced access, advanced prevention
                strategies, and a long-term partnership focused on helping you
                live healthier and longer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  Request an Appointment
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gold bg-white px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold/10"
                >
                  View Membership Pricing
                </Link>
              </div>
            </div>

            <div className="animate-fadeUp overflow-hidden rounded-2xl bg-graybg shadow-card [animation-delay:.1s]">
              <img
                src="/assets/services/premium-hero-consult.png"
                alt="PulsePoint cardiologist speaking with patient in a premium cardiovascular care setting."
                className="aspect-[5/4] h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* B. WHO IS THIS FOR */}
        <section className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <div className="rounded-2xl border border-[#ECE7DF] bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <div className="grid gap-7 lg:grid-cols-[260px_1fr] lg:items-start">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-wine text-white">
                    <Icon name="users" className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-[1.3rem] font-bold leading-tight text-wine sm:text-[1.5rem]">
                    Who Is This Program Designed For?
                  </h2>
                </div>

                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {FIT_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="text-[.95rem] leading-[1.5] text-charcoal/85">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* C. MEMBERSHIP INCLUDES */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionHeading>Membership Includes</SectionHeading>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {MEMBERSHIP_BENEFITS.map((benefit) => (
                <article
                  key={benefit.title}
                  className="flex h-full flex-col rounded-2xl border border-[#E9EDF2] bg-white p-6 text-center shadow-card transition-shadow hover:shadow-cardHover"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-wine/20 bg-wine/5 text-wine">
                    <Icon name={benefit.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-[.98rem] font-bold leading-tight text-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-[.82rem] leading-[1.6] text-charcoal/70">
                    {benefit.text}
                  </p>
                </article>
              ))}
            </div>

            {/* Soft callout bar */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#ECE7DF] bg-[#FBF8F2] px-6 py-5 sm:px-8">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon name="shield" className="h-6 w-6" />
              </span>
              <p className="text-[.92rem] font-medium leading-[1.6] text-charcoal/80">
                Our approach is proactive, prevention-focused, and
                personalized&mdash;ensuring you receive the right care at the
                right time, every time.
              </p>
            </div>
          </div>
        </section>

        {/* D. MEMBERSHIP PRICING */}
        <section id="pricing" className="px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            <SectionHeading>Membership Pricing</SectionHeading>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PRICING.map((plan) => (
                <article
                  key={plan.tier}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E9EDF2] bg-white shadow-card"
                >
                  <div className="flex items-center justify-between gap-3 bg-wine px-6 py-4">
                    <h3 className="text-[.8rem] font-bold uppercase tracking-[1.2px] text-white">
                      {plan.tier}
                    </h3>
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                      <Icon name={plan.icon} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {plan.leadIn ? (
                      <div className="text-[.78rem] font-semibold uppercase tracking-[1.4px] text-muted">
                        {plan.leadIn}
                      </div>
                    ) : null}
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="font-display text-[2.4rem] font-bold leading-none text-navy sm:text-[2.7rem]">
                        {plan.price}
                      </span>
                      {plan.cadence ? (
                        <span className="text-[1rem] font-semibold text-muted">
                          {plan.cadence}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-4 text-[.9rem] leading-[1.65] text-charcoal/70">
                      {plan.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Pricing disclaimer */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E9EDF2] bg-white px-6 py-5">
              <span className="mt-0.5 flex-shrink-0 text-navy/60">
                <Icon name="info" className="h-5 w-5" />
              </span>
              <p className="text-[.82rem] leading-[1.65] text-muted">
                Membership pricing covers enhanced access, preventive
                cardiovascular care services, and longitudinal wellness-focused
                management. Diagnostic testing, imaging, procedures, laboratory
                services, medications, hospital-based services, and
                insurance-billed clinical services may be billed separately when
                applicable.
              </p>
            </div>
          </div>
        </section>

        {/* E. EXECUTIVE HEALTH PACKAGES + IMPORTANT INFORMATION */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* Executive Health Packages */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-[#ECE7DF] bg-[#FBF8F2] shadow-card">
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Icon name="briefcase" className="h-6 w-6" />
                  </span>
                  <h2 className="font-display text-[1.3rem] font-bold text-navy sm:text-[1.45rem]">
                    Executive Health Packages
                  </h2>
                </div>
                <p className="mt-5 text-[.94rem] leading-[1.7] text-charcoal/75">
                  Our Executive Cardiovascular Health Evaluations are highly
                  individualized and customized based on your goals, risk
                  profile, and desired level of testing and wellness assessment.
                </p>
                <p className="mt-4 text-[.94rem] leading-[1.7] text-charcoal/75">
                  These programs may include advanced cardiovascular imaging,
                  comprehensive metabolic evaluation, performance optimization,
                  preventive diagnostics, and same-day coordinated testing.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-gold px-6 py-4 text-center text-[.82rem] font-bold uppercase tracking-[1px] text-navy transition-opacity hover:opacity-90"
              >
                <Icon name="phone" className="h-4 w-4" />
                Please Contact Our Office for Pricing and Customization
              </Link>
            </article>

            {/* Important Information */}
            <article className="flex flex-col rounded-2xl border border-[#E9EDF2] bg-white p-7 shadow-card sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                  <Icon name="info" className="h-6 w-6" />
                </span>
                <h2 className="font-display text-[1.3rem] font-bold text-navy sm:text-[1.45rem]">
                  Important Information
                </h2>
              </div>
              <p className="mt-5 text-[.94rem] leading-[1.7] text-charcoal/75">
                PulsePoint Premium &amp; Executive Cardiovascular Care is
                designed to complement&mdash;not replace&mdash;traditional
                medical insurance.
              </p>
              <p className="mt-4 text-[.94rem] leading-[1.7] text-charcoal/75">
                Patients are encouraged to maintain active health insurance
                coverage for hospitalizations, specialist procedures, imaging,
                laboratory testing, medications, and other healthcare services
                outside the scope of membership services.
              </p>
            </article>
          </div>
        </section>

        {/* F. FINAL CTA / FOOTER PANEL */}
        <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex items-start gap-5">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold">
                <Icon name="heart" className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-[1.6rem] font-bold leading-tight sm:text-[2rem]">
                  A Different Kind of Cardiovascular Care
                </h2>
                <p className="mt-4 max-w-xl text-[.95rem] leading-[1.75] text-white/75">
                  At PulsePoint, we believe cardiovascular care should be
                  proactive rather than reactive&mdash;focused not only on
                  treating disease, but on helping patients live healthier,
                  longer, and more fulfilling lives.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[.06] p-7 ring-1 ring-white/10 sm:p-8">
              <h3 className="font-display text-[1.3rem] font-bold text-white sm:text-[1.5rem]">
                Ready to Learn More?
              </h3>
              <p className="mt-3 text-[.92rem] leading-[1.7] text-white/75">
                Schedule a consultation with our team to determine whether
                PulsePoint Premium &amp; Executive Cardiovascular Care is right
                for you.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={OFFICE_PHONE_TEL}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-[.85rem] font-bold text-navy transition-opacity hover:opacity-90"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Call the Office
                </a>
                <Link
                  href="/book"
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-[.85rem] font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  Request an Appointment
                </Link>
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
