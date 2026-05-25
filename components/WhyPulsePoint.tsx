import Link from 'next/link'

const DIFFERENTIATORS = [
  {
    title: 'More Time With Your Physician',
    text: 'Longer visits focused on what matters most.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Preventive Heart Care',
    text: 'Identify risks early and prevent future disease.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Comprehensive Screening',
    text: 'State-of-the-art testing for earlier detection.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Rapid Access',
    text: 'Same/next-day appointments and direct communication.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: 'Physician-Led Care',
    text: 'Expert care coordinated around you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: 'Technology-Enabled Experience',
    text: 'Modern tools for better care and convenience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
]

export default function WhyPulsePoint() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto max-w-6xl">
        {/* Centered header */}
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="font-display text-[1.95rem] font-bold leading-[1.15] text-charcoal sm:text-[2.45rem]">
            Modern Cardiovascular Care
            <br />
            Designed Differently
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[.95rem] leading-[1.75] text-muted">
            We blend advanced medicine with a personalized approach that gives
            you more time, better access, and a proactive plan for your heart health.
          </p>
        </div>

        {/* 6-column icon grid on desktop */}
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {DIFFERENTIATORS.map((item) => (
            <article key={item.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wine/10 text-wine">
                {item.icon}
              </div>
              <h3 className="text-[.92rem] font-bold leading-tight text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-[.82rem] leading-[1.65] text-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
