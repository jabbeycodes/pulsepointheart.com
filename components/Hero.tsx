import Image from 'next/image'
import Link from 'next/link'

// Trust indicators carried over from the live site
const TRUST_INDICATORS = [
  {
    label: 'Physician-Led Care',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: 'Same/Next-Day Visits',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: 'Advanced Diagnostics',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Personalized Plans',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function Hero() {
  return (
    <section className="bg-white px-5 pb-10 pt-8 lg:grid lg:min-h-[560px] lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12 lg:py-10">
      <div className="lg:order-1">
        <h1 className="mb-3.5 animate-fadeUp font-display text-[2rem] font-bold leading-[1.18] text-charcoal [animation-delay:.05s] sm:text-[2.5rem] lg:text-[3.2rem]">
          State-of-the-Art Heart Care Built Around{' '}
          <em className="not-italic text-wine">You.</em>
        </h1>
        <p className="mb-6 animate-fadeUp text-[.95rem] leading-[1.65] text-muted [animation-delay:.15s]">
          Concierge cardiology built around you. Precision care, advanced
          diagnostics, and direct physician access for stronger hearts and
          better lives.
        </p>

        <div className="mb-8 flex animate-fadeUp flex-col gap-2.5 [animation-delay:.25s] sm:flex-row">
          <Link
            href="/book"
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light sm:w-auto"
          >
            Schedule a Consultation &rarr;
          </Link>
          <Link
            href="/membership"
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-gold bg-white px-5 py-[11.5px] text-[.88rem] font-semibold text-charcoal transition-colors hover:bg-gold/10 sm:w-auto"
          >
            Explore Membership
          </Link>
        </div>

        <div className="grid animate-fadeUp grid-cols-2 gap-x-3 gap-y-[18px] border-t border-[#EEF1F5] pt-5 [animation-delay:.35s] sm:grid-cols-4">
          {TRUST_INDICATORS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span className="h-[26px] w-[26px] text-wine">{item.icon}</span>
              <span className="text-[.72rem] font-semibold leading-[1.3] text-charcoal">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-7 mt-0 aspect-[4/3] animate-fadeUp overflow-hidden rounded bg-graybg lg:order-2 lg:mb-0 lg:aspect-auto lg:h-[480px]">
        <Image
          src="/assets/hero.png"
          alt="PulsePoint Clinic physician consulting with a patient"
          width={900}
          height={680}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  )
}
