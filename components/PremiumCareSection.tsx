import Link from 'next/link'
import { ArrowLinkIcon, PremiumFeatureIcon } from '@/components/home/HomeIcons'
import { HOME_PREMIUM_FEATURES } from '@/lib/homepage-content'

export default function PremiumCareSection() {
  return (
    <section className="overflow-hidden bg-[#FAF8F5] lg:grid lg:grid-cols-2">
      <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
        <img
          src="/assets/personalized-care-couple.png"
          alt="Smiling healthy couple representing personalized and compassionate cardiovascular care at PulsePoint Clinic"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <div className="px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <h2 className="font-display text-[1.75rem] font-bold leading-tight text-wine sm:text-[2.15rem]">
          Personalized Care When You Want More
        </h2>
        <p className="mt-5 max-w-xl text-base leading-[1.75] text-charcoal/80">
          Our Premium &amp; Executive Cardiovascular Care program offers enhanced physician access,
          comprehensive preventive evaluations, and individualized wellness planning.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {HOME_PREMIUM_FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-wine/30 bg-white text-wine">
                <PremiumFeatureIcon name={feature.icon} />
              </div>
              <span className="text-[.88rem] font-semibold leading-snug text-charcoal">
                {feature.title}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/premium-cardiovascular-care"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-wine px-6 py-3 text-[.78rem] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-wine-light"
        >
          Learn More About Premium Care
          <ArrowLinkIcon className="text-white" />
        </Link>
      </div>
    </section>
  )
}
