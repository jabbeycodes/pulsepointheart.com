import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'PulsePoint Core Cardiology | Heart Care in Columbia, MO',
  description:
    'Evidence-based, insurance-accepted cardiology care for chest pain, palpitations, shortness of breath, hypertension, arrhythmias, heart failure, coronary artery disease, and complex cardiovascular disease.',
  alternates: {
    canonical: absoluteUrl('/services/preventive-cardiology'),
  },
  openGraph: {
    title: 'PulsePoint Core Cardiology | Heart Care in Columbia, MO',
    description:
      'Evidence-based, insurance-accepted cardiology care for symptoms, diagnosis, and complex cardiovascular disease in Columbia, MO.',
    url: absoluteUrl('/services/preventive-cardiology'),
    images: [absoluteUrl('/assets/services/core-cardiology-consult.png')],
  },
}

const OFFICE_PHONE_DISPLAY = '(855) 785-7337'
const OFFICE_PHONE_TEL = 'tel:18557857337'

const SYMPTOMS = [
  { icon: 'chestPain', label: 'Chest Pain' },
  { icon: 'palpitations', label: 'Palpitations' },
  { icon: 'shortBreath', label: 'Shortness of Breath' },
  { icon: 'syncope', label: 'Syncope & Dizziness' },
  { icon: 'legSwelling', label: 'Leg Swelling' },
  { icon: 'fatigue', label: 'Fatigue' },
] as const

const CONDITIONS = [
  { icon: 'coronary', label: 'Coronary Artery Disease' },
  { icon: 'heartFailure', label: 'Congestive Heart Failure' },
  { icon: 'arrhythmia', label: 'Arrhythmias' },
  { icon: 'valve', label: 'Valvular Heart Disease' },
  { icon: 'hypertension', label: 'Hypertension' },
  { icon: 'complex', label: 'Complex Cardiovascular Disease' },
] as const

const PILLARS = [
  {
    icon: 'microscope',
    title: 'Evidence-Based Medicine',
    text: 'Guided by the latest research and clinical guidelines to deliver proven, effective care.',
  },
  {
    icon: 'monitor',
    title: 'Advanced Diagnostics',
    text: 'State-of-the-art technology for precise diagnosis and personalized treatment.',
  },
  {
    icon: 'patientHeart',
    title: 'Patient-Centered Care',
    text: 'We listen, we care, and we partner with you for better heart health outcomes.',
  },
  {
    icon: 'shieldHeart',
    title: 'Modern Cardiovascular Medicine',
    text: 'Comprehensive care for all aspects of heart health in one trusted practice.',
  },
] as const

function Icon({ name, className = 'h-7 w-7' }: { name: string; className?: string }) {
  const base = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
  }

  switch (name) {
    case 'calendar':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...base}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2.1Z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...base} strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )
    case 'heartOutline':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      )
    case 'chestPain':
      return (
        <svg {...base}>
          <path d="M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10Z" />
          <path d="m9 12 2 2 4-4M12 8v4" />
        </svg>
      )
    case 'palpitations':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          <path d="M6.5 12.5h2l1.2-2.4 1.8 4 1-1.6h2.5" />
        </svg>
      )
    case 'shortBreath':
      return (
        <svg {...base}>
          <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4" />
          <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      )
    case 'syncope':
      return (
        <svg {...base}>
          <circle cx="12" cy="9" r="4" />
          <path d="M8.5 14.5c.8 2.2 2.4 3.5 3.5 3.5s2.7-1.3 3.5-3.5" />
          <path d="M9 7.5c.6-.8 1.6-1.2 3-1.2" />
        </svg>
      )
    case 'legSwelling':
      return (
        <svg {...base}>
          <path d="M8 4v14M8 18h6" />
          <path d="M8 8h3M8 12h2" />
          <circle cx="15" cy="16" r="2.5" />
        </svg>
      )
    case 'fatigue':
      return (
        <svg {...base}>
          <rect x="2" y="7" width="18" height="10" rx="2" />
          <path d="M6 11h2M10 11h2M14 11h2" />
        </svg>
      )
    case 'coronary':
      return (
        <svg {...base}>
          <path d="M4 12c2-4 6-6 8-6s6 2 8 6" />
          <path d="M8 12h8M12 8v8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    case 'heartFailure':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      )
    case 'arrhythmia':
      return (
        <svg {...base}>
          <path d="M3 12h4l2-5 3 10 2-6 2 4 3-3h3" />
        </svg>
      )
    case 'valve':
      return (
        <svg {...base}>
          <path d="M12 21s-7-4.4-7-10V5l7-3 7 3v6c0 5.6-7 10-7 10Z" />
          <path d="M9 10h6M9 14h6" />
        </svg>
      )
    case 'hypertension':
      return (
        <svg {...base}>
          <rect x="4" y="8" width="16" height="10" rx="2" />
          <path d="M8 12h8M12 8v8" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      )
    case 'complex':
      return (
        <svg {...base}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="M12 9v6M9 12h6" />
        </svg>
      )
    case 'microscope':
      return (
        <svg {...base}>
          <path d="M6 18h12" />
          <path d="M8 18V9a4 4 0 0 1 8 0v9" />
          <path d="M10 6h4M12 4v2" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 11h3l2-4 3 7 2-3h2" />
        </svg>
      )
    case 'patientHeart':
      return (
        <svg {...base}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          <path d="M16.5 10.5c.8.8 1.5 2 1.5 3.5 0 1.2-.5 2.2-1.2 3" />
        </svg>
      )
    case 'shieldHeart':
      return (
        <svg {...base}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="M12 10.5c-1.2 1.2-2.5 2.4-2.5 4a2.5 2.5 0 0 0 5 0c0-1.6-1.3-2.8-2.5-4Z" />
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

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10">
      <span className="hidden h-px w-12 bg-gold/55 sm:block lg:w-20" />
      <h2 className="text-center text-[.72rem] font-bold uppercase tracking-[2.4px] text-wine sm:text-[.78rem]">
        {title}
      </h2>
      <span className="hidden h-px w-12 bg-gold/55 sm:block lg:w-20" />
    </div>
  )
}

function CardGrid({
  items,
}: {
  items: ReadonlyArray<{ icon: string; label: string }>
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
      {items.map((item) => (
        <article
          key={item.label}
          className="flex min-h-[132px] flex-col items-center justify-center rounded-md bg-white px-3 py-5 text-center shadow-card sm:min-h-[148px] sm:px-4 sm:py-6"
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center text-wine sm:h-12 sm:w-12">
            <Icon name={item.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-[.92rem] font-semibold leading-snug text-navy sm:text-[1rem]">
            {item.label}
          </h3>
        </article>
      ))}
    </div>
  )
}

export default function CoreCardiologyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
            <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-12 lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-16 xl:px-16">
              <p className="text-[.68rem] font-bold uppercase tracking-[2.6px] text-wine sm:text-[.72rem]">
                PulsePoint Core Cardiology
              </p>
              <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-gold px-3.5 py-1.5 sm:px-4">
                <Icon name="check" className="h-3.5 w-3.5 text-gold" />
                <span className="text-[.62rem] font-bold uppercase tracking-[1.8px] text-gold sm:text-[.65rem]">
                  Insurance Accepted
                </span>
              </div>
              <h1 className="mt-5 max-w-xl font-display text-[2.5rem] font-bold leading-[1.08] text-navy sm:text-[3.25rem] lg:text-[3.6rem] xl:text-[4rem]">
                Expert Heart Care for Symptoms, Diagnosis, and Complex Cardiac Disease
              </h1>
              <p className="mt-5 max-w-lg text-base leading-[1.75] text-charcoal/75 sm:text-[1.05rem]">
                Evidence-based, patient-centered cardiovascular care focused on you, your health,
                and your heart.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/book"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-wine px-6 py-3 text-[.72rem] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-wine-light sm:text-[.74rem]"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  Schedule Appointment
                </Link>
                <a
                  href={OFFICE_PHONE_TEL}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border-2 border-wine bg-white px-6 py-3 text-[.72rem] font-bold uppercase tracking-[1px] text-wine transition-colors hover:bg-wine/5 sm:text-[.74rem]"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Call Our Office
                </a>
              </div>
            </div>

            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[560px]">
              <Image
                src="/assets/services/core-cardiology-consult.png"
                alt="PulsePoint cardiologist consulting with a patient"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Desktop-only blend into the left text column — no fade on mobile/tablet */}
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-gradient-to-r from-white/95 via-white/35 to-transparent lg:block"
              />
            </div>
          </div>
        </section>

        {/* Symptoms */}
        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="Some Symptoms We Evaluate" />
            <CardGrid items={SYMPTOMS} />
          </div>
        </section>

        {/* Conditions */}
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="Conditions We Treat" />
            <CardGrid items={CONDITIONS} />
          </div>
        </section>

        {/* Value pillars */}
        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {PILLARS.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className={`px-2 text-center sm:px-4 lg:px-6 ${
                    index < PILLARS.length - 1
                      ? 'lg:border-r lg:border-white/15'
                      : ''
                  }`}
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-gold">
                    <Icon name={pillar.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-[.82rem] font-bold uppercase tracking-[1.2px] text-white sm:text-[.86rem]">
                    {pillar.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[220px] text-[.84rem] leading-[1.65] text-white/65 sm:text-[.88rem]">
                    {pillar.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative -mt-1 bg-wine px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-12 lg:pb-16 lg:pt-14">
          <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 rounded-t-[2rem] bg-wine sm:-top-8 sm:h-8 sm:rounded-t-[2.5rem]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center text-gold">
              <Icon name="heartOutline" className="h-6 w-6" />
            </div>
            <h2 className="font-display text-[1.85rem] font-bold leading-tight text-white sm:text-[2.35rem] lg:text-[2.5rem]">
              Your Heart. Our Expertise. Your Health.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-white/82 sm:text-[1.02rem]">
              Partner with PulsePoint Core Cardiology for exceptional heart care.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[.72rem] font-bold uppercase tracking-[1px] text-wine transition-colors hover:bg-graybg sm:text-[.74rem]"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Schedule Your Appointment Today
            </Link>
            <p className="mx-auto mt-6 max-w-lg text-[.78rem] leading-[1.6] text-white/70">
              Please do not use online scheduling for urgent medical concerns. If you are
              experiencing chest pain, severe shortness of breath, stroke symptoms, or another
              emergency, call 911.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
