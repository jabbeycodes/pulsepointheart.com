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
    label: 'Same/Next-Day Availability',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: 'Comprehensive Screening',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Personalized Care',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function Hero() {
  return (
    <section className="bg-white px-5 pb-12 pt-8 lg:grid lg:min-h-[600px] lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14 lg:px-12 lg:py-12">
      <div className="lg:order-1">
        <h1 className="mb-5 animate-fadeUp max-w-[760px] font-display text-[2.35rem] font-bold leading-[1.08] text-navy [animation-delay:.05s] sm:text-[3.05rem] lg:text-[3.95rem]">
          State-of-the-Art Heart Care Built Around{' '}
          <em className="not-italic text-wine">You.</em>
        </h1>
        <p className="mb-8 max-w-[660px] animate-fadeUp text-[1.08rem] font-medium leading-[1.75] text-charcoal [animation-delay:.15s] sm:text-[1.14rem]">
          Personalized cardiovascular care focused on prevention, advanced
          cardiac care, physician accessibility, and long-term health.
        </p>

        <div className="mb-8 flex animate-fadeUp flex-col gap-2.5 [animation-delay:.25s] sm:flex-row">
          <Link
            href="/book"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-wine px-6 py-3 text-[.94rem] font-semibold text-white transition-colors hover:bg-wine-light sm:w-auto"
          >
            Book a Visit
          </Link>
          <Link
            href="/services"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-gold bg-white px-6 py-3 text-[.94rem] font-semibold text-navy transition-colors hover:bg-gold/10 sm:w-auto"
          >
            Explore Services
          </Link>
        </div>

        <div className="grid max-w-[620px] animate-fadeUp grid-cols-2 gap-x-3 gap-y-6 border-t border-[#EEF1F5] pb-2 pt-5 [animation-delay:.35s] sm:grid-cols-4 lg:pb-0">
          {TRUST_INDICATORS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <span className="h-11 w-11 text-wine sm:h-12 sm:w-12">{item.icon}</span>
              <span className="text-[.78rem] font-bold leading-[1.25] text-navy">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-7 mt-10 aspect-[4/3] animate-fadeUp overflow-hidden rounded bg-graybg shadow-card sm:mt-12 lg:order-2 lg:mb-0 lg:mt-0 lg:aspect-auto lg:h-[500px]">
        <img
          src="/assets/hero.png"
          alt="PulsePoint Clinic physician consulting with a patient"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </div>
    </section>
  )
}
