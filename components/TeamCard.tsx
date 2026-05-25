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
      className="overflow-hidden lg:grid lg:grid-cols-2"
    >
      {/* LEFT: Dark navy panel with physician photo */}
      <div className="relative bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
        <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
          Our Physician
        </div>
        <h2 className="font-display text-[1.8rem] font-bold leading-[1.15] sm:text-[2.4rem]">
          Meet Your Physician
        </h2>
        <p className="mt-4 max-w-lg text-[.92rem] leading-[1.7] text-white/72">
          Led by board-certified cardiologist Dr. Martin Tibuakuu, MD, MPH,
          FACC, our practice is built on expertise, integrity, and a
          commitment to exceptional patient care.
        </p>

        <div className="mt-8 overflow-hidden rounded bg-white">
          <div className="aspect-[4/3] overflow-hidden bg-[#dde4ee]">
            <img
              src="/assets/dr-tibuakuu.jpg"
              alt="Martin Tibuakuu, MD, MPH, FACC - Cardiologist at PulsePoint Clinic"
              className="h-full w-full object-cover object-top"
              loading="eager"
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

      {/* RIGHT: Credentials list on light background */}
      <div className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
        <div className="mx-auto max-w-md">
          <h3 className="mb-6 font-display text-[1.4rem] font-bold text-navy">
            Credentials \u0026 Expertise
          </h3>
          <div className="space-y-4">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred}
                className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-wine text-wine">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="text-[.92rem] font-medium text-charcoal">{cred}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
            >
              About Dr. Tibuakuu
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
