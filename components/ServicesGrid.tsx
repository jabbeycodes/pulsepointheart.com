import Link from 'next/link'
import { SERVICE_PATHWAYS, servicePathwayHref } from '@/lib/service-pathways'

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]"
    >
      <div className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
        <div className="mb-7 lg:mb-0">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            What We Offer
          </div>
          <h2 className="font-display text-[1.7rem] font-bold leading-[1.2] text-charcoal sm:text-[2rem]">
            Comprehensive Cardiovascular Care
          </h2>
          <div className="my-3.5 h-[3px] w-12 rounded bg-wine" />
          <p className="mt-3 text-[.92rem] leading-[1.65] text-muted">
            From prevention to advanced treatment, we provide integrated care
            designed around your heart health and overall well-being.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          {SERVICE_PATHWAYS.map((pathway) => (
            <Link
              key={pathway.id}
              href={servicePathwayHref(pathway)}
              className="rounded bg-white px-5 py-5 shadow-card transition-transform hover:-translate-y-0.5 active:scale-[.98]"
            >
              <div className="mb-4 h-[2px] w-9 rounded bg-gold" />
              <h4 className="text-[.95rem] font-bold leading-[1.3] text-charcoal">
                {pathway.title}
              </h4>
              <p className="mt-2 text-[.8rem] leading-[1.55] text-muted">
                {pathway.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
