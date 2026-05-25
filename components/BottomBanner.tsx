import Image from 'next/image'
import Link from 'next/link'

export default function BottomBanner() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="relative z-10 flex flex-col items-center px-5 py-10 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-12 lg:px-12">
        {/* Icon */}
        <div className="mb-4 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-gold sm:mb-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-6 w-6 text-gold"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>

        <div className="text-center sm:flex-1 sm:text-left">
          <h2 className="mb-2 font-display text-[1.5rem] leading-[1.25] text-white sm:text-[1.6rem] lg:text-[1.7rem]">
            Your Heart Deserves Exceptional Care.
          </h2>
          <p className="text-[.88rem] text-white/75">
            Let&apos;s build your personalized plan for a healthier tomorrow.
          </p>
        </div>

        <Link
          href="/book"
          className="mt-4 flex min-h-[48px] w-full flex-shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 text-[.9rem] font-bold text-charcoal transition-opacity hover:opacity-90 sm:mt-0 sm:w-auto"
        >
          Book a Visit
        </Link>
      </div>

      {/* ECG/heartbeat line decoration on right */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 opacity-20 lg:block">
        <svg
          viewBox="0 0 400 80"
          fill="none"
          stroke="#c59d5f"
          strokeWidth="1.5"
          className="h-16 w-[300px]"
        >
          <path d="M0 40 L60 40 L70 20 L80 60 L90 10 L100 70 L110 40 L200 40 L210 25 L220 55 L230 15 L240 65 L250 40 L400 40" />
        </svg>
      </div>
    </section>
  )
}
