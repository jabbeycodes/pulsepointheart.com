import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Advanced Cardiovascular Diagnostics | PulsePoint Cardiology',
  description:
    'State-of-the-art cardiovascular diagnostics in Columbia, MO with board-certified cardiologist interpretation. Comprehensive ECG, echocardiogram, stress testing, vascular ultrasound, and cardiac monitoring services.',
}

// Diagnostics scheduling is intentionally phone-only. Reuses the established
// site-wide clinic number so contact details stay consistent everywhere.
const DIAGNOSTICS_PHONE_DISPLAY = '(855) 785-7337'
const DIAGNOSTICS_PHONE_TEL = 'tel:18557857337'

const WHY_CHOOSE = [
  {
    icon: 'shield',
    title: 'Board-Certified Interpretation',
    text: 'Every study reviewed by experienced cardiovascular specialists.',
  },
  {
    icon: 'monitor',
    title: 'State-of-the-Art Equipment',
    text: 'Hospital-quality diagnostic testing in a comfortable outpatient environment.',
  },
  {
    icon: 'calendar',
    title: 'Fast Scheduling',
    text: 'Same-week availability whenever possible.',
  },
  {
    icon: 'clock',
    title: 'Rapid Results',
    text: 'Most studies interpreted within 24-72 hours.',
  },
  {
    icon: 'user',
    title: 'Patient-Centered Experience',
    text: 'Minimal wait times and clear communication.',
  },
  {
    icon: 'network',
    title: 'Integrated Care',
    text: 'Diagnostics connected directly to prevention and treatment planning.',
  },
]

const SERVICES = [
  {
    icon: 'activity',
    title: 'ECG',
    image: '/assets/diagnostics/ecg.png',
    text: 'A quick, painless test that evaluates your heart rhythm and electrical activity.',
  },
  {
    icon: 'heart',
    title: 'Echocardiogram (TTE)',
    image: '/assets/diagnostics/echocardiogram-tte.png',
    text: 'Ultrasound imaging of the heart to assess structure and function.',
  },
  {
    icon: 'heartPulse',
    title: 'Stress Echocardiogram',
    image: '/assets/diagnostics/stress-echocardiogram.png',
    text: 'Evaluates heart function at rest and under stress to detect issues.',
  },
  {
    icon: 'run',
    title: 'Exercise Stress ECG',
    image: '/assets/diagnostics/exercise-stress-ecg.png',
    text: 'Monitors your heart rhythm and response to exercise.',
  },
  {
    icon: 'waves',
    title: 'Carotid Ultrasound',
    image: '/assets/diagnostics/carotid-ultrasound.png',
    text: 'Assesses carotid arteries to evaluate stroke risk.',
  },
  {
    icon: 'scan',
    title: 'Abdominal Aortic Ultrasound',
    image: '/assets/diagnostics/abdominal-aortic-ultrasound.png',
    text: 'Screens for abdominal aortic aneurysm (AAA).',
  },
  {
    icon: 'pulse',
    title: 'Peripheral Arterial Doppler Study',
    image: '/assets/diagnostics/peripheral-arterial-doppler.png',
    text: 'Evaluates blood flow in the legs to detect peripheral arterial disease (PAD).',
  },
  {
    icon: 'droplet',
    title: 'Venous Insufficiency Ultrasound',
    image: '/assets/diagnostics/venous-insufficiency-ultrasound.png',
    text: 'Assesses venous reflux and circulation in the legs.',
  },
  {
    icon: 'patch',
    title: 'Holter Monitor (24-48 Hour)',
    image: '/assets/diagnostics/holter-monitor.png',
    text: 'Continuous monitoring to detect arrhythmias and irregular rhythms.',
  },
  {
    icon: 'watch',
    title: 'Extended Cardiac Event Monitoring',
    image: '/assets/diagnostics/extended-cardiac-event-monitoring.png',
    text: 'Wearable monitoring for longer periods to capture intermittent events.',
  },
]

const COMING_SOON = [
  {
    icon: 'scan',
    title: 'Advanced Cardiac CT',
    items: ['Coronary calcium scoring', 'Coronary CT angiography', 'Structural heart imaging'],
  },
  {
    icon: 'atom',
    title: 'Nuclear Cardiology',
    items: ['Nuclear stress testing', 'Myocardial perfusion imaging'],
  },
  {
    icon: 'cpu',
    title: 'AI-Powered Diagnostics',
    items: ['Advanced risk stratification', 'Imaging enhancement', 'Predictive cardiovascular insights'],
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
    case 'heartPulse':
      return (
        <svg {...base}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
          <path d="M6.5 12.5h2.3l1.2-2.4 1.8 4 1-1.6h2.7" />
        </svg>
      )
    case 'run':
      return (
        <svg {...base}>
          <circle cx="13" cy="4" r="2" />
          <path d="M7 21v-4l3-3 2 2v5M16 21v-5l-4-4 1-4M6 12l4-4 3 1M15 9h4" />
        </svg>
      )
    case 'waves':
      return (
        <svg {...base}>
          <path d="M4 15a8 8 0 0 1 8-8" />
          <path d="M4 19a12 12 0 0 1 12-12" />
          <circle cx="4.5" cy="19.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'scan':
      return (
        <svg {...base}>
          <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'pulse':
      return (
        <svg {...base}>
          <path d="M3 12h3l2-6 3 12 2-9 2 5 2-2h2" />
        </svg>
      )
    case 'droplet':
      return (
        <svg {...base}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
        </svg>
      )
    case 'patch':
      return (
        <svg {...base}>
          <rect x="5" y="5" width="14" height="14" rx="4.5" />
          <path d="M8 12h2l1.4-2.6 1.6 5 1.2-2.4H16" />
        </svg>
      )
    case 'watch':
      return (
        <svg {...base}>
          <rect x="7" y="7" width="10" height="10" rx="3" />
          <path d="M9.5 7l.8-3h3.4l.8 3M9.5 17l.8 3h3.4l.8-3" />
          <path d="M12 10.5v2l1.4 1" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...base}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'monitor':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4M7 11h3l2-4 3 7 2-3h2" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18M8 15h.01M12 15h.01M16 15h.01" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'user':
      return (
        <svg {...base}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
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
    case 'atom':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9" ry="4" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
        </svg>
      )
    case 'cpu':
      return (
        <svg {...base}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
          <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
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

// Phone-first CTA used in the hero and final banner.
function PhoneCta({
  variant = 'wine',
}: {
  variant?: 'wine' | 'gold'
}) {
  const styles =
    variant === 'gold'
      ? 'bg-gold text-navy hover:opacity-90'
      : 'bg-wine text-white hover:bg-wine-light'
  return (
    <a
      href={DIAGNOSTICS_PHONE_TEL}
      className={`inline-flex min-h-[56px] items-center gap-3 rounded-lg px-6 py-3 transition-colors ${styles}`}
    >
      <Icon name="phone" className="h-5 w-5 flex-shrink-0" />
      <span className="text-left leading-tight">
        <span className="block text-[.66rem] font-bold uppercase tracking-[1.6px] opacity-90">
          Call to Schedule a Test
        </span>
        <span className="block text-[1.05rem] font-bold">
          {DIAGNOSTICS_PHONE_DISPLAY}
        </span>
      </span>
    </a>
  )
}

export default function DiagnosticsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* HERO */}
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fadeUp">
              <div className="mb-4 text-[.68rem] font-bold uppercase tracking-[2.6px] text-gold">
                PulsePoint Imaging &amp; Diagnostics
              </div>
              <h1 className="font-display text-[2.1rem] font-bold leading-[1.08] sm:text-[2.7rem] lg:text-[3.1rem]">
                <span className="text-navy">
                  Advanced Cardiovascular Diagnostics.
                </span>{' '}
                <span className="text-wine">
                  Physician-Led Diagnostic Excellence.
                </span>
              </h1>
              <div className="my-6 flex w-32 items-center text-gold">
                <span className="h-px flex-1 bg-gold/50" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mx-2 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M3 12h4l2-5 4 10 2-5h6" />
                </svg>
                <span className="h-px flex-1 bg-gold/50" />
              </div>
              <p className="max-w-xl text-[1rem] leading-[1.8] text-charcoal/75 sm:text-[1.05rem]">
                State-of-the-art cardiovascular testing performed by experienced
                professionals and interpreted by board-certified cardiologists.
              </p>
              <div className="mt-8">
                <PhoneCta variant="wine" />
              </div>
            </div>

            <div className="animate-fadeUp overflow-hidden rounded-2xl bg-graybg shadow-card [animation-delay:.1s]">
              <img
                src="/assets/diagnostics/diagnostics-hero.png"
                alt="PulsePoint Clinic cardiovascular diagnostic suite with a Samsung echocardiography ultrasound machine and exam chair in a bright outpatient setting."
                className="aspect-[5/4] h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* WHY CHOOSE - navy band */}
        <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              <h2 className="font-display text-[1.6rem] font-bold sm:text-[2rem]">
                Why Choose PulsePoint Diagnostics?
              </h2>
              <div className="mx-auto mt-3 flex w-28 items-center justify-center text-gold">
                <span className="h-px flex-1 bg-gold/50" />
                <span className="mx-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="h-px flex-1 bg-gold/50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {WHY_CHOOSE.map((item) => (
                <article key={item.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon name={item.icon} />
                  </div>
                  <h3 className="text-[.95rem] font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[.84rem] leading-[1.6] text-white/70 sm:text-[.8rem]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DIAGNOSTIC SERVICES GRID */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              <h2 className="font-display text-[1.6rem] font-bold text-navy sm:text-[2rem]">
                Our Diagnostic Services
              </h2>
              <div className="mx-auto mt-3 flex w-28 items-center justify-center text-gold">
                <span className="h-px flex-1 bg-gold/50" />
                <span className="mx-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="h-px flex-1 bg-gold/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {SERVICES.map((service) => (
                <article
                  key={service.title}
                  className="flex h-full flex-col rounded-xl border border-[#E5EAF0] bg-white p-4 shadow-card transition-shadow hover:shadow-cardHover"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-wine/8 text-wine">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="text-[.95rem] font-bold leading-tight text-navy">
                    {service.title}
                  </h3>
                  <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded-lg bg-graybg">
                    <img
                      src={service.image}
                      alt={`${service.title} diagnostic test at PulsePoint Clinic`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 flex-1 text-[.88rem] leading-[1.6] text-charcoal/72 sm:text-[.83rem]">
                    {service.text}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-[.82rem] text-muted">
              Contact us for more information about our diagnostic services.
            </p>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="bg-graybg px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[300px_1fr] lg:items-start">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-tight text-navy sm:text-[2rem]">
                Coming Soon
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-gold" />
              <p className="mt-5 max-w-sm text-[.92rem] leading-[1.7] text-charcoal/70">
                We continue to invest in advanced technology to bring you even
                more diagnostic capabilities.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-[#DCE3EC]">
              {COMING_SOON.map((group) => (
                <div key={group.title} className="sm:px-6 sm:first:pl-0">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-white text-navy">
                    <Icon name={group.icon} />
                  </div>
                  <h3 className="font-display text-[1.1rem] font-bold text-navy">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[.86rem] leading-[1.5] text-charcoal/72"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-18">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-7 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-start gap-5">
              <span className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold sm:flex">
                <Icon name="heart" className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-[1.7rem] font-bold leading-tight sm:text-[2.1rem]">
                  Know Your Heart. Protect Your Future.
                </h2>
                <p className="mt-3 text-[.95rem] leading-[1.7] text-white/75">
                  Call to schedule your diagnostic test today.
                </p>
              </div>
            </div>
            <PhoneCta variant="gold" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
