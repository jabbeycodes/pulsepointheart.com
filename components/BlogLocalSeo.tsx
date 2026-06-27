import Link from 'next/link'
import { CLINIC } from '@/lib/seo'
import { BLOG_LOCALITY_LONG, BLOG_SERVICE_AREAS } from '@/lib/blog-seo'

type Props = {
  variant?: 'index' | 'post'
}

export default function BlogLocalSeo({ variant = 'index' }: Props) {
  return (
    <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-[.72rem] font-semibold uppercase tracking-[1.8px] text-gold">
          {variant === 'post' ? 'Local heart care' : 'Columbia, Missouri'}
        </p>
        <h2 className="mt-2 font-display text-[1.65rem] font-bold leading-tight sm:text-[2rem]">
          {variant === 'post'
            ? 'Need a cardiologist in Columbia, MO?'
            : 'Heart health resources for Columbia & Central Missouri'}
        </h2>
        <p className="mt-4 max-w-3xl text-[.92rem] leading-[1.75] text-white/85">
          PulsePoint Clinic is a physician-led cardiology practice at{' '}
          {CLINIC.address.streetAddress}, {BLOG_LOCALITY_LONG}. We help patients
          in Boone County and surrounding communities with preventive cardiology,
          advanced heart screening, and ongoing cardiovascular care.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/cardiologist-columbia-mo"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-2.5 text-[.82rem] font-semibold text-white transition-colors hover:bg-wine-light"
          >
            Cardiologist Columbia, MO
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 px-5 py-2.5 text-[.82rem] font-semibold text-white transition-colors hover:border-gold hover:text-gold"
          >
            Book Appointment
          </Link>
          <Link
            href="/locations/columbia-mo"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 px-5 py-2.5 text-[.82rem] font-semibold text-white transition-colors hover:border-gold hover:text-gold"
          >
            Clinic Location
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-[.72rem] font-semibold uppercase tracking-[1.5px] text-gold">
            Areas we serve
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {BLOG_SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="rounded-full border border-white/20 px-3 py-1 text-[.78rem] text-white/90"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
