import Link from 'next/link'

export default function CtaBanner() {
  return (
    <div
      id="book"
      className="flex flex-col items-center bg-navy px-5 py-10 text-center sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:text-left lg:px-12"
    >
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
      <div className="sm:flex-1">
        <h2 className="mb-2 font-display text-[1.5rem] leading-[1.25] text-white sm:text-[1.6rem] lg:text-[1.7rem]">
          Your Heart Deserves Exceptional Care.
        </h2>
        <p className="mb-5 text-[.88rem] text-white/75 sm:mb-0">
          Let&apos;s build your personalized plan for a healthier tomorrow.
        </p>
      </div>
      <Link
        href="/book"
        className="flex min-h-[48px] w-full flex-shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 text-[.9rem] font-bold text-charcoal transition-opacity hover:opacity-90 sm:w-auto"
      >
        Book a Visit
      </Link>
    </div>
  )
}
