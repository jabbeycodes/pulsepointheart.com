import GoldSquiggle from '@/components/home/GoldSquiggle'
import { DifferentiatorIcon } from '@/components/home/HomeIcons'
import { HOME_DIFFERENTIATORS } from '@/lib/homepage-content'

export default function WhyPulsePoint() {
  return (
    <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="font-display text-[1.85rem] font-bold leading-tight sm:text-[2.25rem]">
            Modern Cardiovascular Care Designed Differently
          </h2>
          <div className="mx-auto mt-4 flex justify-center">
            <GoldSquiggle className="h-3 w-24" />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {HOME_DIFFERENTIATORS.map((item, index) => (
            <article
              key={item.title}
              className={`text-center ${
                index < HOME_DIFFERENTIATORS.length - 1
                  ? 'xl:border-r xl:border-white/15 xl:pr-4'
                  : ''
              }`}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-gold">
                <DifferentiatorIcon name={item.icon} />
              </div>
              <h3 className="text-[.82rem] font-bold uppercase tracking-[.8px] text-white">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[200px] text-[.8rem] leading-[1.65] text-white/65">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
