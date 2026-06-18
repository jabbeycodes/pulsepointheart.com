import Link from 'next/link'
import GoldSquiggle from '@/components/home/GoldSquiggle'
import { ECOSYSTEM_ACCENTS, ServicePathwayIcon } from '@/components/home/HomeIcons'
import { HOME_ECOSYSTEM } from '@/lib/homepage-content'

export default function HomeEcosystem() {
  return (
    <section className="border-y border-[#E8EDF3] bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-[1.75rem] font-bold leading-tight text-navy sm:text-[2.15rem]">
          The PulsePoint Ecosystem
        </h2>
        <div className="mx-auto mt-4 flex justify-center">
          <GoldSquiggle className="h-3 w-24" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.7] text-charcoal/75">
          One integrated cardiovascular platform connecting prevention, diagnostics, specialty care,
          and long-term wellness.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-2">
          {HOME_ECOSYSTEM.map((step, index) => {
            const accent = ECOSYSTEM_ACCENTS[step.icon] ?? ECOSYSTEM_ACCENTS.heart
            return (
              <div key={step.label} className="flex flex-col items-center gap-6 lg:flex-row lg:gap-2">
                <Link href={step.href} className="group flex max-w-[180px] flex-col items-center text-center">
                  <div
                    className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ring-4 ${accent.ring} ${accent.bg}`}
                  >
                    <ServicePathwayIcon name={step.icon} className="h-7 w-7" />
                  </div>
                  <span className="text-[.82rem] font-bold leading-snug text-navy group-hover:text-wine">
                    {step.label}
                  </span>
                  <span className="mt-1 text-[.74rem] leading-snug text-charcoal/65">
                    {step.description}
                  </span>
                </Link>
                {index < HOME_ECOSYSTEM.length - 1 ? (
                  <span aria-hidden="true" className="hidden text-[#CBD5E1] lg:inline-flex lg:px-1 lg:pt-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
