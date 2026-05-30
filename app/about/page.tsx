import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

export const metadata: Metadata = {
  title: 'About PulsePoint Clinic | Physician-Led Cardiovascular Care',
  description:
    'Learn how PulsePoint Clinic delivers physician-led cardiovascular care focused on prevention, personalization, advanced diagnostics, and lifelong heart health.',
}

const PHILOSOPHY_CARDS = [
  {
    icon: 'heart',
    title: 'Prevention First',
    text: 'We focus on early detection and proactive strategies to prevent disease and protect your long-term health.',
  },
  {
    icon: 'person',
    title: 'Personalized Care',
    text: 'Every patient receives individualized attention, customized treatment, and wellness planning.',
  },
  {
    icon: 'monitor',
    title: 'Advanced Diagnostics',
    text: 'State-of-the-art imaging and testing for earlier detection, precise diagnosis, and proactive care.',
  },
  {
    icon: 'partnership',
    title: 'Lifelong Partnership',
    text: 'Exceptional outcomes are built through long-term relationships, trust, and continuous support.',
  },
]

// Physician profiles are data-driven so new doctors can be added without
// touching layout. `intro` paragraphs are always visible; `fullBio` lives
// inside an expandable block to keep each card compact and balanced.
const PHYSICIANS = [
  {
    name: 'Dr. Martin Tibuakuu, MD, MPH, FACC',
    title: 'Founder & Cardiologist',
    image: '/assets/physician-headshot.png',
    imageAlt: 'Dr. Martin Tibuakuu, founder and cardiologist at PulsePoint Clinic',
    intro: [
      'Dr. Martin Tibuakuu is a board-certified cardiologist, epidemiologist, and preventive cardiovascular specialist dedicated to transforming the way heart disease is prevented and treated.',
      "Born and raised in northern Ghana, Dr. Tibuakuu's passion for cardiovascular medicine was shaped by personal tragedy and firsthand exposure to profound healthcare disparities. That experience became the driving force behind his lifelong commitment to heart disease prevention, early detection, and expanding access to high-quality cardiovascular care.",
    ],
    fullBio: [
      'At the age of 12, he lost his mother to undiagnosed hypertension - a preventable condition made more devastating by the severe lack of access to healthcare in his rural community.',
      'Dr. Tibuakuu received advanced training in both medicine and public health, developing a unique perspective that bridges clinical cardiology with population health and disease prevention. He completed a postdoctoral research fellowship at the internationally renowned Johns Hopkins Ciccarone Center for the Prevention of Heart Disease, where he trained under world-leading experts in preventive cardiology and cardiovascular epidemiology.',
      'His research has focused extensively on cardiovascular prevention, cardiometabolic disease, and healthcare disparities, contributing to numerous peer-reviewed scientific publications and national presentations aimed at improving cardiovascular outcomes across diverse populations.',
      'He subsequently completed fellowship training in cardiovascular disease at the world-renowned Johns Hopkins Hospital, where he received advanced training in non-invasive cardiology, cardiac imaging, preventive cardiology, and complex cardiovascular care.',
      'Dr. Tibuakuu is a Fellow of the American College of Cardiology and brings a modern, prevention-focused philosophy to patient care - combining evidence-based medicine, advanced diagnostics, lifestyle optimization, and personalized treatment strategies.',
      'Through PulsePoint, his vision is to build a next-generation cardiovascular platform that delivers world-class heart care with an emphasis on prevention, early detection, innovation, and compassionate patient-centered care.',
    ],
    credentials: [
      { icon: 'shield', label: 'Board Certified' },
      { icon: 'heart', label: 'Expertise in Preventive Cardiology' },
      { icon: 'monitor', label: 'Published Researcher in Cardiovascular Prevention' },
      { icon: 'partnership', label: 'Advocate for Health Equity & Access to High-Quality Cardiovascular Care' },
      { icon: 'leaf', label: 'Expertise in Cardiometabolic Health' },
      { icon: 'monitor', label: 'Expertise in Multimodality Cardiac Imaging' },
    ],
  },
  {
    name: 'Dr. James E. Fairlamb, MD, FACC',
    title: 'Cardiologist',
    image: '/assets/physician-fairlamb.png',
    imageAlt: 'Dr. James E. Fairlamb, cardiologist at PulsePoint Clinic',
    intro: [
      "Dr. James E. Fairlamb is a board-certified cardiologist with decades of experience delivering comprehensive, patient-centered cardiovascular care across Missouri and surrounding communities. Known for his clinical excellence, compassionate bedside manner, and deep commitment to his patients, he has become one of the region's most respected and trusted cardiologists.",
      "Dr. Fairlamb is a Fellow of the American College of Cardiology and has been voted Best Cardiologist in Missouri by Missouri's Best Magazine in 2024, 2025, and 2026.",
    ],
    fullBio: [
      'Originally trained at the University of the Witwatersrand Medical School, Dr. Fairlamb built an extensive medical foundation spanning internal medicine, critical care, emergency medicine, and cardiovascular disease across South Africa, Canada, and the United States.',
      'He completed advanced fellowship training in cardiovascular medicine and cardiovascular imaging at Washington University School of Medicine and Barnes-Jewish Hospital, developing specialized expertise in echocardiography, cardiac CT, cardiac MRI, nuclear cardiology, lipid management, and preventive cardiovascular care.',
      'Throughout his career, Dr. Fairlamb has served patients across both urban and rural communities, earning a reputation for clinical precision, accessibility, and individualized care. His broad clinical background includes leadership experience in critical care medicine, cardiovascular imaging, inpatient cardiology, and preventive cardiology, allowing him to bring a uniquely comprehensive perspective to heart health and complex cardiovascular disease management.',
      'His clinical interests include preventive cardiology, cholesterol management, coronary artery disease, heart failure, advanced cardiac imaging, and complex cardiovascular diagnostics. He has also contributed to cardiovascular imaging research and national scientific presentations focused on advanced cardiac MRI and non-invasive imaging techniques.',
      'At PulsePoint, Dr. Fairlamb brings a thoughtful, relationship-driven approach to cardiovascular medicine - combining decades of experience with modern, evidence-based heart care focused on prevention, precision, and compassionate patient outcomes.',
    ],
    credentials: [
      { icon: 'shield', label: 'Board-Certified Cardiologist with Decades of Clinical Experience' },
      { icon: 'heart', label: 'Renowned Expert in Preventive Cardiology' },
      { icon: 'activity', label: 'Renowned Expert in Lipid Management' },
      { icon: 'leaf', label: 'Expertise in Cardiometabolic Management' },
      { icon: 'monitor', label: 'Extensive Background in Complex Cardiac Disease Management' },
      { icon: 'partnership', label: 'Nationally Recognized for Patient-Centered Cardiovascular Care' },
      { icon: 'star', label: "Three-Time Recipient of Missouri's Best Cardiologist Award (2024, 2025, 2026)" },
    ],
  },
]

const DIFFERENTIATORS = [
  {
    icon: 'monitor',
    title: 'Modern Cardiovascular Care',
    text: 'A technology-driven approach combining advanced diagnostics, digital health tools, and evidence-based cardiovascular medicine.',
  },
  {
    icon: 'network',
    title: 'Multiple Care Pathways',
    text: 'Insurance-based cardiology, preventive wellness, executive cardiovascular care, vascular medicine, and imaging services designed for different patient preferences and health goals.',
  },
  {
    icon: 'monitor',
    title: 'Advanced Imaging & Diagnostics',
    text: 'State-of-the-art cardiovascular imaging and testing for earlier detection, precise diagnosis, and coordinated treatment planning.',
  },
  {
    icon: 'phone',
    title: 'Technology-Enabled Care',
    text: 'Telemedicine, remote monitoring, digital communication, and modern workflows designed for convenience and connected care.',
  },
  {
    icon: 'network',
    title: 'Integrated Specialty Services',
    text: 'Cardiology, vascular care, cardiometabolic health, diagnostics, and wellness services working together within one comprehensive ecosystem.',
  },
  {
    icon: 'leaf',
    title: 'Personalized Long-Term Heart Health',
    text: "Care plans tailored to each patient's cardiovascular risks, lifestyle, performance goals, and long-term wellness needs.",
  },
]

const ECOSYSTEM = [
  { marker: 'A', icon: 'heart', title: 'PulsePoint Core Cardiology', text: 'Compatible with Insurance' },
  { marker: 'B', icon: 'person', title: 'PulsePoint Premium & Executive Cardiovascular Care', text: 'Membership Based' },
  { marker: 'C', icon: 'vein', title: 'PulsePoint Vein & Vascular Clinic', text: 'Insurance and Self-Pay Options Available' },
  { marker: 'D', icon: 'leaf', title: 'PulsePoint Cardiometabolic & Weight Center', text: 'Membership Based' },
  { marker: 'E', icon: 'monitor', title: 'PulsePoint Imaging & Diagnostics', text: 'Physician-Led Diagnostics Excellence' },
]

const HEART_HEALTH = [
  { icon: 'activity', title: 'Exercise & Performance' },
  { icon: 'apple', title: 'Nutrition & Lifestyle' },
  { icon: 'moon', title: 'Stress & Sleep Management' },
  { icon: 'clock', title: 'Healthy Aging & Longevity' },
]

function Icon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const base = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.55',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'heart':
      return (
        <svg {...base}>
          <path d="M20.8 4.7a5.4 5.4 0 0 0-7.7 0L12 5.8l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7L12 21.2l8.8-8.8a5.4 5.4 0 0 0 0-7.7Z" />
        </svg>
      )
    case 'person':
      return (
        <svg {...base}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 11h3l2-4 3 7 2-3h2" />
        </svg>
      )
    case 'partnership':
      return (
        <svg {...base}>
          <path d="M8 12h8M9 16l-3-3a3 3 0 0 1 4.2-4.2L12 10.6l1.8-1.8A3 3 0 0 1 18 13l-3 3a4.2 4.2 0 0 1-6 0Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...base}>
          <path d="M12 21s7-4.4 7-11V5l-7-3-7 3v5c0 6.6 7 11 7 11Z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      )
    case 'building':
      return (
        <svg {...base}>
          <path d="M4 21V5l8-3 8 3v16M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01M10 21v-4h4v4" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
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
          <path d="m8.3 9.3 2.4 5.1M15.7 9.3l-2.4 5.1M9 7h6" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...base}>
          <path d="M20 4c-7.2 0-13 5.8-13 13 0 1.7.3 3.1.9 4.1C9 20.4 20 14.4 20 4Z" />
          <path d="M7.9 21.1C6 17 7.5 12 12 9" />
        </svg>
      )
    case 'vein':
      return (
        <svg {...base}>
          <path d="M12 3v18M8 7c2 1.4 6 1.4 8 0M8 12c2 1.4 6 1.4 8 0M8 17c2 1.4 6 1.4 8 0" />
        </svg>
      )
    case 'activity':
      return (
        <svg {...base}>
          <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
        </svg>
      )
    case 'apple':
      return (
        <svg {...base}>
          <path d="M12 20c3.8 0 6-3.3 6-6.5 0-2.5-1.6-4.5-3.8-4.5-1 0-1.7.4-2.2.9-.5-.5-1.2-.9-2.2-.9C7.6 9 6 11 6 13.5 6 16.7 8.2 20 12 20Z" />
          <path d="M12 9c0-2.2 1.3-4 3.2-4" />
        </svg>
      )
    case 'moon':
      return (
        <svg {...base}>
          <path d="M21 13a8 8 0 1 1-9.9-9.8 6.5 6.5 0 0 0 9.9 9.8Z" />
        </svg>
      )
    case 'star':
      return (
        <svg {...base}>
          <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 18.56l-5.91 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z" />
        </svg>
      )
    default:
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
  }
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`mb-3 text-[.68rem] font-bold uppercase tracking-[2.8px] ${light ? 'text-gold' : 'text-wine'}`}>
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="animate-fadeUp">
              <SectionLabel>About PulsePoint</SectionLabel>
              <h1 className="max-w-3xl font-display text-[2.55rem] font-bold leading-[1.05] text-navy sm:text-[3.4rem] lg:text-[4rem]">
                Redefining Cardiovascular Care Through Prevention,
                Personalization, and Innovation.
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.8] text-charcoal/75 sm:text-[1.06rem]">
                PulsePoint Clinic was created to deliver a more modern,
                personally connected, and proactive approach to heart health -
                combining advanced diagnostics, preventive care, physician
                accessibility, and long-term wellness under one integrated
                platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-md bg-wine px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wine-light"
                >
                  Book a Visit
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-md border border-gold bg-white px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold/10"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="relative animate-fadeUp overflow-hidden rounded-sm bg-graybg shadow-card [animation-delay:.12s]">
              <img
                src="/assets/about-hero-care-collage.png"
                alt="PulsePoint Clinic care team speaking with patients"
                className="aspect-[4/3] h-full w-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute bottom-0 right-0 h-28 w-40 rounded-tl-full bg-navy/95 sm:h-32 sm:w-52" />
              <div className="absolute bottom-0 right-0 h-20 w-32 rounded-tl-full bg-wine/95 sm:h-24 sm:w-40" />
              <div className="absolute bottom-0 right-0 h-10 w-24 rounded-tl-full bg-gold/95 sm:h-12 sm:w-28" />
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.86fr_1fr] lg:items-center">
            <div className="overflow-hidden rounded-sm bg-white p-4 shadow-card">
              <img
                src="/assets/about-story-lobby.png"
                alt="PulsePoint Clinic reception and waiting area"
                className="max-h-[520px] w-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="font-display text-[2rem] font-bold leading-tight text-navy sm:text-[2.6rem]">
                Why PulsePoint Was Created
              </h2>
              <div className="mt-6 space-y-4 text-[.98rem] leading-[1.8] text-charcoal/75">
                <p>
                  Modern healthcare is often rushed, fragmented, and reactive.
                  Patients deserve more time, better access, and a proactive
                  plan for their heart health.
                </p>
                <p>
                  PulsePoint was founded on a different belief: cardiovascular
                  care should be personalized, preventive, technologically
                  advanced, and built around meaningful physician relationships.
                </p>
                <p className="font-semibold text-charcoal">
                  We created PulsePoint to deliver the exceptional heart care
                  experience you and your family deserve.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-8 flex items-center justify-center gap-5 text-center">
              <span className="hidden h-px w-24 bg-gold/45 sm:block" />
              <div className="text-[1rem] font-bold uppercase tracking-[2px] text-navy sm:text-[1.18rem]">
                Our Philosophy
              </div>
              <span className="hidden h-px w-24 bg-gold/45 sm:block" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {PHILOSOPHY_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="group text-center"
                >
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-wine/25 bg-white text-wine transition-colors group-hover:border-wine group-hover:text-wine-light">
                    <Icon name={card.icon} className="h-10 w-10" />
                  </div>
                  <h3 className="text-[.9rem] font-extrabold uppercase tracking-[.6px] text-navy">
                    {card.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[210px] text-[.86rem] font-medium leading-[1.55] text-charcoal/78">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="physicians" className="bg-graybg px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 text-center">
              <SectionLabel>Our Physicians</SectionLabel>
              <h2 className="font-display text-[2rem] font-bold leading-tight text-navy sm:text-[2.65rem]">
                Meet the Cardiologists Behind PulsePoint
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[.98rem] leading-[1.8] text-charcoal/75">
                Board-certified, fellowship-trained, and deeply committed to
                prevention-focused, patient-centered cardiovascular care.
              </p>
            </div>

            <div className="space-y-12 lg:space-y-16">
              {PHYSICIANS.map((doctor, index) => {
                // Alternate the image side on desktop for visual rhythm.
                const imageRight = index % 2 === 1
                return (
                  <div
                    key={doctor.name}
                    className="grid gap-10 lg:grid-cols-[0.86fr_1fr] lg:items-center"
                  >
                    <div
                      className={`overflow-hidden rounded-sm bg-white p-4 shadow-card ${
                        imageRight ? 'lg:order-2' : ''
                      }`}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.imageAlt}
                        className="max-h-[620px] w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className={imageRight ? 'lg:order-1' : ''}>
                      <h3 className="font-display text-[1.7rem] font-bold leading-tight text-navy sm:text-[2.2rem]">
                        {doctor.name}
                      </h3>
                      <div className="mt-2 text-[1rem] font-bold text-wine">
                        {doctor.title}
                      </div>
                      <div className="mt-6 space-y-4 text-[.96rem] leading-[1.8] text-charcoal/75">
                        {doctor.intro.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        <details className="group rounded-md border border-[#E5EAF0] bg-white p-4 shadow-sm">
                          <summary className="cursor-pointer list-none text-[.82rem] font-bold uppercase tracking-[1px] text-wine transition-colors hover:text-wine-light">
                            <span className="inline-flex items-center gap-2">
                              Read Full Physician Profile
                              <span className="text-gold transition-transform group-open:rotate-45">
                                +
                              </span>
                            </span>
                          </summary>
                          <div className="mt-4 space-y-4 text-[.92rem] leading-[1.75] text-charcoal/75">
                            {doctor.fullBio.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        </details>
                      </div>
                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {doctor.credentials.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center gap-3 rounded-md border border-[#E5EAF0] bg-white px-4 py-3 shadow-sm"
                          >
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/60 text-wine">
                              <Icon name={item.icon} className="h-5 w-5" />
                            </div>
                            <div className="text-[.78rem] font-bold leading-[1.35] text-charcoal/80">
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              <h2 className="font-display text-[2rem] font-bold sm:text-[2.6rem]">
                What Makes the PulsePoint Model Different
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {DIFFERENTIATORS.map((item) => (
                <article key={item.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="text-[.92rem] font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[.75rem] leading-[1.55] text-white/72">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1240px] text-center">
            <SectionLabel>The PulsePoint Ecosystem</SectionLabel>
            <h2 className="font-display text-[2rem] font-bold text-navy sm:text-[2.55rem]">
              One Cardiovascular Platform.
              <br />
              Multiple Specialized Care Pathways.
            </h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-5">
              {ECOSYSTEM.map((item, index) => (
                <div key={item.title} className="relative">
                  {index < ECOSYSTEM.length - 1 ? (
                    <div className="absolute left-[calc(50%+2.4rem)] top-8 hidden h-px w-[calc(100%-4.8rem)] bg-gold/50 lg:block" />
                  ) : null}
                  <div
                    className={`absolute -top-3 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-xs font-bold text-white ring-4 ring-white ${
                      item.marker === 'B' || item.marker === 'D'
                        ? 'bg-navy'
                        : 'bg-wine'
                    }`}
                  >
                    {item.marker}
                  </div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#E4E9F0] bg-white text-wine shadow-sm">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="mx-auto mt-4 max-w-[190px] font-display text-[.98rem] font-bold leading-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[175px] text-[.68rem] font-semibold leading-[1.35] text-wine/85">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="overflow-hidden rounded-sm bg-white shadow-card">
              <img
                src="/assets/wellness-lifestyle.jpg"
                alt="Active adults exercising for lifelong heart health"
                className="aspect-[4/3] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div>
              <SectionLabel>Focused On</SectionLabel>
              <h2 className="font-display text-[2rem] font-bold text-navy sm:text-[2.6rem]">
                Lifelong Heart Health
              </h2>
              <p className="mt-5 max-w-2xl text-[.98rem] leading-[1.8] text-charcoal/75">
                We believe true heart health is about more than medicine - it
                is about helping you live a longer, healthier, more active life.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {HEART_HEALTH.map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-wine shadow-sm">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <span className="text-[.88rem] font-bold text-charcoal">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FAF8F5] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <blockquote className="font-display text-[1.35rem] font-medium leading-[1.55] text-charcoal sm:text-[1.65rem]">
              Exceptional cardiovascular care begins with listening, education,
              prevention, and personalized treatment planning.
            </blockquote>
          </div>
        </section>

        <section className="bg-wine px-5 py-10 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="sm:flex-1">
              <h2 className="font-display text-[1.65rem] font-bold leading-tight !text-white sm:text-[2rem]">
                Your Heart Health Deserves Exceptional Care.
              </h2>
              <p className="mt-3 max-w-2xl text-[.9rem] font-medium leading-[1.65] text-white/90">
                Experience a more personalized approach to cardiovascular
                prevention, diagnosis, and lifelong care.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex min-h-[46px] w-full items-center justify-center rounded-md bg-gold px-6 py-3 text-[.78rem] font-bold uppercase tracking-[1px] text-navy transition-colors hover:bg-gold/90 sm:w-auto"
            >
              Schedule Your Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
