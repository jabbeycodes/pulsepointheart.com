import Link from 'next/link'

const FOCUS_AREAS = [
  {
    title: 'Heart Disease Prevention',
    desc: 'Early risk identification and personalized prevention strategies.',
  },
  {
    title: 'Cardiometabolic Wellness',
    desc: 'Integrated management of blood pressure, cholesterol, and blood sugar.',
  },
  {
    title: 'Nutrition \u0026 Lifestyle',
    desc: 'Evidence-based dietary and habit changes for lasting heart health.',
  },
  {
    title: 'Exercise \u0026 Performance',
    desc: 'Safe, effective fitness plans tailored to your cardiovascular profile.',
  },
  {
    title: 'Stress \u0026 Sleep Health',
    desc: 'Addressing hidden risk factors that impact heart and mind.',
  },
  {
    title: 'Healthy Aging \u0026 Longevity',
    desc: 'Sustaining energy, independence, and quality of life for years to come.',
  },
]

export default function LongevitySection() {
  return (
    <section className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      {/* Full-width centered header */}
      <div className="mb-10 text-center lg:mb-14">
        <h2 className="mx-auto max-w-3xl font-display text-[2rem] font-bold leading-[1.15] sm:text-[2.6rem]">
          Prevention, Wellness, and Longevity
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-12 rounded bg-gold" />
        <p className="mx-auto mt-5 max-w-2xl text-[.98rem] leading-[1.75] text-white/76">
          We go beyond treating disease. We help you optimize your heart
          health, energy, and quality of life through a whole-person approach.
        </p>
        <Link
          href="/services/cardiometabolic-wellness"
          className="mx-auto mt-7 inline-flex min-h-[44px] items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-white"
        >
          Explore Wellness
        </Link>
      </div>

      {/* Full-width 3-column grid with descriptions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOCUS_AREAS.map((area) => (
          <div
            key={area.title}
            className="border-l-2 border-gold bg-white/5 px-5 py-4"
          >
            <p className="text-[.95rem] font-semibold leading-[1.45] text-white">
              {area.title}
            </p>
            <p className="mt-1.5 text-[.85rem] leading-[1.55] text-white/60">
              {area.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
