import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Advanced Cardiovascular Diagnostics',
  description:
    'Advanced cardiovascular diagnostics in Columbia, MO including echocardiography, vascular ultrasound, stress testing, rhythm monitoring, preventive screening, and cardiac CT calcium scoring coordination.',
}

const DIAGNOSTICS = [
  {
    title: 'Echocardiography',
    image: '/assets/diagnostics/echocardiography.png',
    text: 'Ultrasound imaging of the heart to evaluate structure, pumping function, valves, and signs of pressure or fluid changes.',
    uses: ['Heart muscle function', 'Valve evaluation', 'Shortness of breath or murmur workup'],
  },
  {
    title: 'Vascular Ultrasound',
    image: '/assets/diagnostics/vascular-ultrasound.png',
    text: 'Noninvasive ultrasound assessment of blood flow and vascular health in areas such as the legs, carotids, or other targeted vessels.',
    uses: ['Circulation concerns', 'Leg symptoms', 'Carotid or peripheral vascular risk'],
  },
  {
    title: 'Stress Testing',
    image: '/assets/diagnostics/stress-testing.png',
    text: 'Exercise-based or clinically guided testing that helps evaluate how the heart performs under physical demand.',
    uses: ['Chest discomfort evaluation', 'Exercise tolerance', 'Coronary risk assessment'],
  },
  {
    title: 'Heart Rhythm Monitoring',
    image: '/assets/diagnostics/heart-rhythm-monitoring.png',
    text: 'Wearable monitoring to capture rhythm changes over time when symptoms do not happen during a short office visit.',
    uses: ['Palpitations', 'Dizziness episodes', 'Atrial fibrillation screening'],
  },
  {
    title: 'Cardiac CT & Calcium Scoring',
    image: '/assets/diagnostics/cardiac-ct-calcium.png',
    text: 'Imaging that can help clarify coronary plaque burden and refine prevention decisions for selected patients.',
    uses: ['Calcium score review', 'Coronary risk refinement', 'Preventive medication decisions'],
  },
]

const ADVANTAGES = [
  'Preventive screening strategy',
  'Integrated diagnostics',
  'Physician interpretation',
  'Earlier risk detection',
  'Coordinated next steps',
  'Technology-enabled workflows',
]

export default function DiagnosticsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                Advanced Diagnostics
              </div>
              <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
                Advanced cardiovascular diagnostics for earlier detection.
              </h1>
              <div className="my-5 h-[3px] w-12 rounded bg-wine" />
              <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
                PulsePoint uses integrated diagnostics to identify structural,
                rhythm, vascular, and coronary risk signals earlier. Testing is
                paired with physician interpretation and a prevention-focused
                plan.
              </p>
            </div>
            <div className="rounded-md bg-navy p-6 text-white shadow-card">
              <h2 className="font-display text-[1.45rem] font-bold leading-tight">
                Not every patient needs every test.
              </h2>
              <p className="mt-3 text-[.86rem] leading-[1.65] text-white/75">
                Diagnostic recommendations are based on your history, risk
                factors, prior results, and goals for prevention, wellness, and
                long-term cardiovascular health.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[380px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Built to feel like an advanced cardiovascular institute.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
              <p className="mt-5 text-[.92rem] leading-[1.7] text-muted">
                Diagnostics are not presented as isolated procedures. They are
                part of a larger prevention and cardiovascular wellness model.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {ADVANTAGES.map((item) => (
                <div
                  key={item}
                  className="border-l-2 border-gold bg-graybg px-4 py-3 text-[.9rem] font-semibold text-charcoal"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl space-y-8">
            {DIAGNOSTICS.map((item, index) => (
              <article
                key={item.title}
                className="grid overflow-hidden rounded-md bg-white shadow-card lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <Image
                    src={item.image}
                    alt={`${item.title} at PulsePoint Clinic`}
                    width={1280}
                    height={960}
                    className="h-[260px] w-full object-cover sm:h-[340px] lg:h-full"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-2 text-[.68rem] font-bold uppercase tracking-[2px] text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className="font-display text-[1.75rem] font-bold leading-tight text-charcoal sm:text-[2.1rem]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[.92rem] leading-[1.7] text-muted">
                    {item.text}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {item.uses.map((use) => (
                      <li
                        key={use}
                        className="rounded-md border border-[#E5EAF0] px-3 py-2 text-[.78rem] font-semibold leading-[1.35] text-navy"
                      >
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                Results are only useful when they become a plan.
              </h2>
              <p className="mt-4 max-w-2xl text-[.95rem] leading-[1.75] text-muted">
                After testing, PulsePoint reviews what the results mean, how
                they affect your risk, and what should happen next, whether that
                is prevention, medication adjustment, follow-up imaging, or
                coordinated specialty care.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
            >
              Schedule Diagnostic Care
            </Link>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
