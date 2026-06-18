import Link from 'next/link'
import { CLINIC } from '@/lib/seo'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default function TestimonialSection() {
  return (
    <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl items-center gap-10 lg:grid lg:grid-cols-[1fr_320px]">
        <div className="relative">
          <span aria-hidden="true" className="font-display text-[4rem] leading-none text-gold/30">
            &ldquo;
          </span>
          <blockquote className="-mt-6 font-display text-[1.25rem] font-medium leading-[1.55] text-white sm:text-[1.45rem]">
            Exceptional cardiovascular care begins with listening, education, prevention, and
            personalized treatment planning.
          </blockquote>
          <p className="mt-6 text-[.88rem] font-semibold uppercase tracking-[1.5px] text-gold">
            Patient Testimonial — Placeholder
          </p>
        </div>

        <aside className="mt-8 rounded-lg border border-white/10 bg-white p-6 text-charcoal shadow-card lg:mt-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine/10 text-wine">
            <PhoneIcon />
          </div>
          <p className="mt-4 font-display text-[1.15rem] font-bold text-navy">
            Ready to take the next step?
          </p>
          <p className="mt-2 text-[.9rem] leading-relaxed text-charcoal/75">
            Speak with our team to schedule a consultation or ask about our cardiovascular services.
          </p>
          <a
            href="tel:18557857337"
            className="mt-4 block text-[1.05rem] font-bold text-wine hover:underline"
          >
            {CLINIC.phoneDisplay}
          </a>
          <Link
            href="/book"
            className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-md bg-wine px-5 py-3 text-[.88rem] font-semibold text-white transition-colors hover:bg-wine-light"
          >
            Schedule Consultation
          </Link>
        </aside>
      </div>
    </section>
  )
}
