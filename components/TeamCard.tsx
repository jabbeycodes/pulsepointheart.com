import Image from 'next/image'
import Link from 'next/link'

const CREDENTIALS = [
  'Board-Certified Cardiologist',
  'Johns Hopkins Trained',
  'Expert in Preventive \u0026 Interventional Cardiology',
  'Compassionate, Personalized Care',
  'Dedicated to Lifelong Heart Health',
]

export default function TeamCard() {
  return (
    <section
      id="about"
      className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]"
    >
      {/* Full-width centered header */}
      <div className="mb-10 text-center lg:mb-12">
        <div className="mb-2 text-center text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
          Our Physician
        </div>
        <h2 className="mx-auto max-w-2xl text-center font-display text-[1.7rem] font-bold leading-[1.2] text-charcoal sm:text-[2rem]">
          Meet Your Physician
        </h2>
        <div className="mx-auto my-3.5 h-[3px] w-12 rounded bg-wine" />
        <p className="mx-auto mt-3 max-w-xl text-center text-[.92rem] leading-[1.65] text-muted"
        >
          Led by board-certified cardiologist Dr. Martin Tibuakuu, MD, MPH,
          FACC, our practice is built on expertise, integrity, and a
          commitment to exceptional patient care.
        </p>
      </div>

      {/* Full-width card layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Left: Credentials list */}
        <div className="space-y-3">
          {CREDENTIALS.map((cred) => (
            <div
              key={cred}
              className="flex items-center gap-3 rounded bg-white px-5 py-4 shadow-card"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 flex-shrink-0 text-gold"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-[.9rem] font-medium text-charcoal">{cred}</span>
            </div>
          ))}
          <div className="pt-2 text-center lg:text-left">
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
            >
              About Dr. Tibuakuu
            </Link>
          </div>
        </div>

        {/* Right: Doctor card */}
        <div className="mx-auto max-w-[400px] overflow-hidden rounded bg-white shadow-card lg:mx-0">
          <div className="aspect-[4/3] overflow-hidden bg-[#dde4ee]">
            <Image
              src="/assets/care-team.jpg"
              alt="Martin Tibuakuu, MD, MPH, FACC - Cardiologist at PulsePoint Clinic"
              width={600}
              height={450}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="p-[22px]">
            <h3 className="mb-1 text-[1.05rem] font-bold leading-[1.3] text-charcoal">
              Martin Tibuakuu, MD, MPH, FACC
            </h3>
            <div className="mb-3 text-[.82rem] font-semibold text-wine">
              Cardiologist \u00b7 Preventive and Interventional Cardiology
            </div>
            <p className="mb-3.5 text-[.85rem] leading-[1.6] text-muted">
              Compassionate, personalized care dedicated to lifelong heart
              health.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-[.82rem] font-semibold text-wine"
            >
              View Full Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
