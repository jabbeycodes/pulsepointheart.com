import Link from 'next/link'
import GoldSquiggle from '@/components/home/GoldSquiggle'
import { ArrowLinkIcon, WellnessFeatureIcon } from '@/components/home/HomeIcons'
import { HOME_WELLNESS_FEATURES } from '@/lib/homepage-content'

export default function LongevitySection() {
  return (
    <section className="overflow-hidden bg-white lg:grid lg:grid-cols-2">
      <div className="relative min-h-[320px] lg:min-h-full">
        <img
          src="/assets/wellness-lifestyle.jpg"
          alt="Active couple jogging together as part of heart-healthy lifestyle and prevention"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="bg-[#FAFAF8] px-5 py-12 text-charcoal sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <p className="text-[.68rem] font-bold uppercase tracking-[2.5px] text-gold">Focused On</p>
        <h2 className="mt-2 font-display text-[1.8rem] font-bold leading-[1.15] text-navy sm:text-[2.2rem]">
          Prevention, Wellness, and Longevity
        </h2>
        <div className="mt-4">
          <GoldSquiggle className="h-3 w-24" />
        </div>
        <p className="mt-5 max-w-lg text-base leading-[1.75] text-charcoal/75">
          We go beyond treating disease — we help you optimize your heart health, energy, and quality
          of life through a whole-person approach.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {HOME_WELLNESS_FEATURES.map((area) => (
            <div key={area.title} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE3EA] bg-white text-charcoal/70">
                <WellnessFeatureIcon name={area.icon} />
              </div>
              <span className="text-[.72rem] font-semibold uppercase leading-snug tracking-[.4px] text-charcoal/80">
                {area.title}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/services/cardiometabolic-wellness"
          className="mt-8 inline-flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[1.4px] text-wine"
        >
          Explore Wellness Services
          <ArrowLinkIcon />
        </Link>
      </div>
    </section>
  )
}
