import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Cardiology Services in Columbia, MO',
  description:
    'PulsePoint Clinic offers one cardiovascular platform with core cardiology, executive care, vascular care, cardiometabolic care, and advanced diagnostics in Columbia, MO.',
}

const SERVICE_PATHWAYS = [
  {
    marker: 'A',
    title: 'PulsePoint Core Cardiology',
    subtitle: 'Insurance-Based Cardiovascular Care',
    image: '/assets/services/core-cardiology-consult.png',
    href: '/services/preventive-cardiology',
    description:
      'Comprehensive evaluation and management of cardiovascular disease using evidence-based medicine and coordinated specialty care.',
    services: [
      'Hypertension Management',
      'Coronary Artery Disease',
      'Arrhythmia Evaluation',
      'Heart Failure Management',
      'Preventive Cardiology',
      'Chest Pain Evaluation',
      'Cardiac Risk Assessment',
      'Second Opinions & Consultations',
    ],
  },
  {
    marker: 'B',
    title: 'PulsePoint Premium & Executive Cardiovascular Care',
    subtitle: 'Membership-Based Personalized Care',
    image: '/assets/services/premium-executive-consult.png',
    href: '/membership',
    description:
      'A highly personalized experience focused on prevention, physician access, executive screening, wellness optimization, and long-term health planning.',
    services: [
      'Extended Appointments',
      'Same/Next-Day Access',
      'Comprehensive Annual Evaluation',
      'Executive Cardiovascular Screening',
      'Direct Physician Communication',
      'Personalized Wellness Planning',
      'Lifestyle Optimization',
      'Preventive Diagnostics',
    ],
  },
  {
    marker: 'C',
    title: 'PulsePoint Vein & Vascular Clinic',
    subtitle: 'Cash + Insurance Hybrid Care',
    image: '/assets/diagnostics/vascular-ultrasound.png',
    href: '/services/vascular-ultrasound',
    description:
      'Advanced evaluation and treatment of venous and vascular conditions using minimally invasive techniques and modern diagnostics.',
    services: [
      'Varicose Vein Treatment',
      'Venous Insufficiency Evaluation',
      'Venous Vein Treatment',
      'Peripheral Vascular Screening',
      'Vascular Ultrasound',
      'Leg Swelling Evaluation',
      'Vein Wellness Consultations',
    ],
  },
  {
    marker: 'D',
    title: 'PulsePoint Cardiometabolic & Weight Center',
    subtitle: 'Membership-Based Prevention & Optimization',
    image: '/assets/services/cardiometabolic-bowl.png',
    href: '/services/cardiometabolic-wellness',
    description:
      'A comprehensive program integrating obesity medicine, preventive cardiology, lifestyle medicine, and metabolic health optimization.',
    services: [
      'Weight Management',
      'GLP-1 Therapy',
      'Obesity Medicine',
      'Hypertension Optimization',
      'Diabetes Risk Reduction',
      'Lifestyle Coaching',
      'Nutrition Guidance',
      'Body Composition Analysis',
    ],
  },
  {
    marker: 'E',
    title: 'PulsePoint Imaging & Diagnostics',
    subtitle: 'Advanced Cardiovascular Diagnostics',
    image: '/assets/services/diagnostics-suite.png',
    href: '/diagnostics',
    description:
      'State-of-the-art cardiovascular imaging and diagnostic testing for early detection, accurate diagnosis, and personalized treatment.',
    services: [
      'Echocardiography',
      'Vascular Ultrasound',
      'Stress Testing',
      'Rhythm Monitoring',
      'Nuclear Cardiology',
      'Cardiac CT / Calcium Score',
      'Preventive Cardiovascular Screening',
    ],
  },
]

const MODEL_DIFFERENCES = [
  {
    title: 'Prevention-Focused Care',
    text: 'We prioritize early detection and long-term prevention in every care pathway.',
    icon: 'heart',
  },
  {
    title: 'Integrated Diagnostics',
    text: 'Advanced imaging and testing in one coordinated ecosystem of care.',
    icon: 'monitor',
  },
  {
    title: 'Physician Accessibility',
    text: 'Smaller patient panels and responsive access mean more timely, direct physician care.',
    icon: 'user',
  },
  {
    title: 'Technology-Enabled Experience',
    text: 'Modern digital tools, remote monitoring, and secure communication for convenience.',
    icon: 'phone',
  },
  {
    title: 'Coordinated Specialty Care',
    text: 'Multiple cardiovascular specialties working together for seamless, comprehensive care.',
    icon: 'network',
  },
  {
    title: 'Personalized Wellness',
    text: 'Care plans designed around your unique health goals, risks, and lifestyle.',
    icon: 'leaf',
  },
]

const CARE_STAGES = [
  { title: 'Prevention', text: 'Stop disease before it starts' },
  { title: 'Detection', text: 'Identify issues early with advanced screening' },
  { title: 'Diagnosis', text: 'Accurate evaluation and personalized insight' },
  { title: 'Treatment', text: 'Evidence-based care tailored to you' },
  { title: 'Optimization', text: 'Improve health, performance, and quality of life' },
  { title: 'Long-Term Wellness', text: 'Ongoing support for lifelong heart health' },
]

function Icon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const base = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.6',
    viewBox: '0 0 24 24',
  }

  switch (name) {
    case 'heart':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 11h3l2-4 3 7 2-3h2" />
        </svg>
      )
    case 'user':
      return (
        <svg {...base}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...base}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      )
    case 'network':
      return (
        <svg {...base}>
          <circle cx="6" cy="7" r="3" />
          <circle cx="18" cy="7" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="m8.4 9.2 2.2 5.1M15.6 9.2l-2.2 5.1M9 7h6" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...base}>
          <path d="M20 4c-7.2 0-13 5.8-13 13 0 1.7.3 3.1.9 4.1C9 20.4 20 14.4 20 4Z" />
          <path d="M7.9 21.1C6 17 7.5 12 12 9" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      )
    case 'search':
      return (
        <svg {...base}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...base}>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 16v-5M12 16V8M16 16v-9" />
        </svg>
      )
    case 'treatment':
      return (
        <svg {...base}>
          <path d="M12 21s7-4.4 7-11V5l-7-3-7 3v5c0 6.6 7 11 7 11Z" />
          <path d="M9 11h6M12 8v6" />
        </svg>
      )
    case 'run':
      return (
        <svg {...base}>
          <circle cx="13" cy="4" r="2" />
          <path d="M7 21v-4l3-3 2 2v5M16 21v-5l-4-4 1-4M6 12l4-4 3 1M15 9h4" />
        </svg>
      )
    default:
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
  }
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1fr] lg:items-center lg:gap-12">
            <div>
              <div className="mb-3 text-[.68rem] font-bold uppercase tracking-[2.5px] text-wine">
                Our Services
              </div>
              <h1 className="max-w-xl font-display text-[2.15rem] font-bold leading-[1.08] text-navy sm:text-[3rem] lg:text-[3.6rem]">
                Comprehensive Cardiovascular Care Designed Around You
              </h1>
              <p className="mt-5 max-w-xl text-[.96rem] leading-[1.75] text-charcoal/72 sm:text-[.98rem]">
                From prevention and wellness to advanced diagnostics and
                specialty cardiovascular care, PulsePoint delivers a modern,
                personalized approach to lifelong heart health.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/book"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-[.82rem] font-bold uppercase tracking-[.6px] text-white transition-colors hover:bg-wine-light"
                >
                  <Icon name="calendar" className="h-4 w-4" />
                  Schedule Consultation
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-gold bg-white px-5 py-3 text-[.82rem] font-bold uppercase tracking-[.6px] text-navy transition-colors hover:bg-gold/10"
                >
                  Explore Membership
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-sm bg-graybg shadow-card">
              <img
                src="/assets/hero.png"
                alt="PulsePoint Clinic physician speaking with a patient"
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#E8EDF3] bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-[1480px] text-center">
            <div className="mx-auto mb-3 flex w-36 items-center justify-center text-gold">
              <span className="h-px flex-1 bg-gold/50" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="mx-2 h-5 w-5"
                aria-hidden="true"
              >
                <path d="M3 12h4l2-5 4 10 2-5h6" />
              </svg>
              <span className="h-px flex-1 bg-gold/50" />
            </div>
            <h2 className="font-display text-[1.75rem] font-bold leading-tight text-navy sm:text-[2.2rem]">
              One Cardiovascular Platform.
              <br />
              Multiple Specialized Care Pathways.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[.9rem] leading-[1.65] text-charcoal/70">
              PulsePoint combines traditional cardiology, preventive care,
              advanced imaging, wellness optimization, and specialty vascular
              services into one integrated patient-centered ecosystem.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3 xl:gap-5">
              {SERVICE_PATHWAYS.map((service) => (
                <article
                  key={service.marker}
                  className="relative flex h-full flex-col rounded-sm border border-[#E5EAF0] bg-white p-4 text-left shadow-card transition-transform hover:-translate-y-1 hover:shadow-cardHover sm:p-5 lg:p-3 xl:p-4"
                >
                  <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-wine text-xs font-bold text-white ring-4 ring-white">
                    {service.marker}
                  </div>
                  <div className="mt-4 min-h-[178px] text-center lg:min-h-[190px] xl:min-h-[180px]">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-wine/20 text-wine">
                      <Icon name={service.marker === 'E' ? 'monitor' : service.marker === 'C' ? 'run' : 'heart'} />
                    </div>
                    <h3 className="font-display text-[1.05rem] font-bold leading-tight text-navy lg:text-[.98rem] xl:text-[1.08rem]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[.62rem] font-bold uppercase tracking-[1.2px] text-wine lg:text-[.56rem] xl:text-[.62rem]">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-sm bg-graybg">
                    <img
                      src={service.image}
                      alt={`${service.title} at PulsePoint Clinic`}
                      className="aspect-[4/3] w-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-[.82rem] leading-[1.6] text-charcoal/70 2xl:text-[.76rem] 2xl:leading-[1.55]">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {service.services.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[.78rem] leading-[1.4] text-charcoal 2xl:text-[.72rem] 2xl:leading-[1.35]">
                        <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[1.4px] text-wine"
                  >
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-12 text-white sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-9 text-center">
              <h2 className="font-display text-[1.75rem] font-bold sm:text-[2.25rem]">
                What Makes the PulsePoint Model Different
              </h2>
              <div className="mx-auto mt-3 flex w-28 items-center justify-center text-gold">
                <span className="h-px flex-1 bg-gold/50" />
                <span className="mx-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="h-px flex-1 bg-gold/50" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {MODEL_DIFFERENCES.map((item) => (
                <article key={item.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="text-[.94rem] font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[.76rem] leading-[1.55] text-white/68">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-display text-[1.55rem] font-bold text-navy sm:text-[2rem]">
              Designed Around Every Stage of Cardiovascular Health
            </h2>
            <div className="mt-9 grid gap-5 md:grid-cols-3 xl:grid-cols-6">
              {CARE_STAGES.map((stage, index) => (
                <article key={stage.title} className="relative text-center">
                  {index < CARE_STAGES.length - 1 ? (
                    <div className="absolute left-[calc(50%+2.2rem)] top-8 hidden h-px w-[calc(100%-4.4rem)] bg-gold/40 xl:block" />
                  ) : null}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#E4E9F0] bg-white text-wine shadow-sm">
                    <Icon
                      name={
                        ['heart', 'search', 'calendar', 'treatment', 'run', 'heart'][index]
                      }
                    />
                  </div>
                  <h3 className="mt-4 text-[.9rem] font-bold text-wine">
                    {stage.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[150px] text-[.74rem] leading-[1.45] text-charcoal/65">
                    {stage.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-wine px-5 py-10 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="sm:flex-1">
              <h2 className="font-display text-[1.7rem] font-bold leading-tight sm:text-[2rem]">
                Experience a More Personalized Approach to Heart Care
              </h2>
              <p className="mt-3 max-w-2xl text-[.9rem] leading-[1.65] text-white/75">
                Our membership-based care model creates more time, better
                access, and highly individualized cardiovascular care.
              </p>
            </div>
            <Link
              href="/membership"
              className="inline-flex min-h-[46px] w-full items-center justify-center rounded-md border border-gold/70 px-6 py-3 text-[.78rem] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Learn About Membership
            </Link>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
