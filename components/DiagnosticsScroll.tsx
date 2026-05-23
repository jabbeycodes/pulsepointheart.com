import Image from 'next/image'
import Link from 'next/link'

// Diagnostics from build doc section 9
const DIAGNOSTICS = [
  {
    key: 'echocardiography',
    href: '/services/echocardiography',
    title: 'Echocardiography',
    desc: "Detailed imaging of the heart's structure and function.",
    alt: 'Echocardiography exam in a modern cardiovascular care setting',
  },
  {
    key: 'vascular-ultrasound',
    href: '/services/vascular-ultrasound',
    title: 'Vascular Ultrasound',
    desc: 'Assessment of blood flow and vascular health.',
    alt: 'Vascular ultrasound exam in a modern cardiovascular care setting',
  },
  {
    key: 'stress-testing',
    href: '/services/stress-testing',
    title: 'Stress Testing',
    desc: 'Evaluating heart performance during physical stress.',
    alt: 'Cardiac stress testing in a modern cardiovascular care setting',
  },
  {
    key: 'heart-rhythm-monitoring',
    href: '/services/heart-rhythm-monitoring',
    title: 'Heart Rhythm Monitoring',
    desc: 'Continuous monitoring for arrhythmia detection.',
    alt: 'Heart rhythm monitor placement in a modern cardiovascular care setting',
  },
  {
    key: 'cardiac-ct-calcium',
    href: '/services/cardiac-ct-calcium-scoring',
    title: 'Cardiac CT & Calcium',
    desc: 'Advanced screening for coronary artery disease.',
    alt: 'Cardiac CT and calcium screening in a modern cardiovascular care setting',
  },
]

export default function DiagnosticsScroll() {
  return (
    <section
      id="diagnostics"
      className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]"
    >
      <div className="lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-14">
        <div className="mb-6 lg:mb-0">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Technology
          </div>
          <h2 className="font-display text-[1.7rem] font-bold leading-[1.2] text-charcoal sm:text-[2rem]">
            Advanced Diagnostics. Earlier Detection. Better Outcomes.
          </h2>
          <div className="my-3.5 h-[3px] w-12 rounded bg-wine" />
          <p className="mt-3 text-[.92rem] leading-[1.65] text-muted">
            We combine cutting-edge technology with expert interpretation to
            detect heart disease early and treat it effectively.
          </p>
          <div className="mt-5 hidden lg:block">
            <Link
              href="/diagnostics"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
            >
              Explore Diagnostics
            </Link>
          </div>
        </div>

        {/* Horizontal scroll on mobile, 5-col grid on desktop */}
        <div className="-mx-5 flex gap-3.5 overflow-x-auto pb-2 pl-5 pr-5 [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch] no-scrollbar sm:-mx-8 sm:pl-8 sm:pr-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:p-0">
          {DIAGNOSTICS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex-[0_0_200px] overflow-hidden rounded bg-white shadow-card [scroll-snap-align:start] lg:flex-none"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#dde4ee]">
                <Image
                  src={`/assets/diagnostics/${item.key}.png`}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h4 className="mx-3 mb-1 mt-2.5 text-[.82rem] font-bold text-wine">
                {item.title}
              </h4>
              <p className="px-3 pb-3.5 text-[.75rem] leading-[1.5] text-muted">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile-only CTA below scroll */}
        <div className="mt-6 lg:hidden">
          <Link
            href="/diagnostics"
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
          >
            Explore Diagnostics
          </Link>
        </div>
      </div>
    </section>
  )
}
