import Link from 'next/link'
import GoldSquiggle from '@/components/home/GoldSquiggle'
import { ArrowLinkIcon, ServicePathwayIcon } from '@/components/home/HomeIcons'
import { HOME_SERVICE_CARDS } from '@/lib/homepage-content'

export default function HomeServiceCards() {
  return (
    <section className="bg-graybg px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <h2 className="font-display text-[1.85rem] font-bold leading-tight text-navy sm:text-[2.35rem]">
            Comprehensive Cardiovascular Care Under One Roof
          </h2>
          <div className="mx-auto mt-4 flex justify-center">
            <GoldSquiggle className="h-3 w-24" />
          </div>
          <p className="mt-5 text-base leading-[1.75] text-charcoal/75 sm:text-[1.02rem]">
            PulsePoint combines prevention, diagnostics, wellness, and specialty cardiovascular care
            into one integrated patient-centered platform.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {HOME_SERVICE_CARDS.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-4">
                <ServicePathwayIcon name={card.icon} />
              </div>
              <h3 className="text-[1rem] font-bold leading-tight text-navy">{card.title}</h3>
              <p className="mt-3 flex-1 text-[.86rem] leading-[1.65] text-charcoal/75">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[1.4px] text-wine"
              >
                Learn More
                <ArrowLinkIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
