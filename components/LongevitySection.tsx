import Link from 'next/link'

const FOCUS_AREAS = [
  'Heart health optimization',
  'Advanced heart screening',
  'Cardiometabolic wellness',
  'Early detection',
  'Integrated diagnostics',
  'Longevity-focused care',
]

export default function LongevitySection() {
  return (
    <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <h2 className="max-w-3xl font-display text-[2rem] font-bold leading-[1.15] sm:text-[2.6rem]">
            Focused on prevention, wellness, and longevity.
          </h2>
          <div className="mt-4 h-[3px] w-12 rounded bg-gold" />
          <p className="mt-5 max-w-2xl text-[.98rem] leading-[1.75] text-white/76">
            Premium cardiology should do more than respond to disease.
            PulsePoint helps patients understand risk earlier, protect long-term
            cardiovascular health, and make confident decisions about the next
            decade of life.
          </p>
          <Link
            href="/services/cardiometabolic-wellness"
            className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
          >
            Explore Cardiometabolic Wellness
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {FOCUS_AREAS.map((area) => (
            <div key={area} className="border-l-2 border-gold pl-4">
              <p className="text-[.92rem] font-semibold leading-[1.45] text-white">
                {area}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
