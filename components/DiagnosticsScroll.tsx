import Link from 'next/link'
import GoldSquiggle from '@/components/home/GoldSquiggle'
import { ArrowLinkIcon } from '@/components/home/HomeIcons'
import { HOME_DIAGNOSTIC_TILES } from '@/lib/homepage-content'

export default function DiagnosticsScroll() {
  return (
    <section id="diagnostics" className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[1.75rem] font-bold leading-tight text-navy sm:text-[2.15rem]">
            Physician-Led Diagnostic Excellence
          </h2>
          <div className="mx-auto mt-4 flex justify-center">
            <GoldSquiggle className="h-3 w-24" />
          </div>
          <p className="mt-5 text-base leading-[1.7] text-charcoal/75">
            Advanced cardiovascular imaging and testing interpreted by experienced cardiovascular
            specialists.
          </p>
          <Link
            href="/diagnostics"
            className="mt-5 inline-flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[1.4px] text-wine"
          >
            View All Diagnostic Services
            <ArrowLinkIcon />
          </Link>
        </div>

        <div className="-mx-5 mt-10 flex gap-3.5 overflow-x-auto pb-2 pl-5 pr-5 [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch] no-scrollbar sm:-mx-8 sm:pl-8 sm:pr-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:p-0">
          {HOME_DIAGNOSTIC_TILES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex-[0_0_170px] overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-card [scroll-snap-align:start] lg:flex-none"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#dde4ee]">
                <img
                  src={item.image}
                  alt={`${item.title} at PulsePoint Clinic`}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="px-3 py-3 text-center">
                <h3 className="text-[.78rem] font-bold uppercase tracking-[.6px] text-navy">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
