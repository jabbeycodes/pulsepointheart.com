import Link from 'next/link'

const CREDENTIALS = [
  'Board-Certified Cardiologist',
  'Johns Hopkins Trained',
  'Expert in Preventive & Interventional Cardiology',
  'Compassionate, Personalized Care',
  'Dedicated to Lifelong Heart Health',
]

export default function TeamCard() {
  return (
    <section
      id="about"
      className="overflow-hidden lg:grid lg:grid-cols-[1.15fr_0.85fr]"
    >
      {/* Physician intro: compact band so image and copy align cleanly */}
      <div className="relative bg-navy px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-[1fr_220px] sm:items-center lg:max-w-none lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px]">
          <div>
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              Our Physician
            </div>
            <h2 className="font-display text-[1.8rem] font-bold leading-[1.15] !text-white sm:text-[2.35rem]">
              Meet Our Physician
            </h2>
            <p className="mt-4 block max-w-lg text-[.94rem] leading-[1.7] text-white/85">
              Led by board-certified cardiologist Dr. Martin Tibuakuu, MD, MPH,
              FACC, our practice is built on expertise, integrity, and a
              commitment to exceptional patient care.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-[42px] items-center justify-center rounded-md border border-gold/70 px-5 py-2.5 text-[.78rem] font-bold uppercase tracking-[.8px] text-white transition-colors hover:bg-white/10"
            >
              About Dr. Tibuakuu
            </Link>
          </div>

          <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-md bg-white/8 sm:max-w-none">
            <img
              src="/assets/physician-headshot.png"
              alt="Martin Tibuakuu, MD, MPH, FACC - Cardiologist at PulsePoint Clinic"
              className="aspect-[3/4] h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* RIGHT: Credentials list on light background */}
      <div className="flex items-center bg-graybg px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-5">
            <h3 className="font-display text-[1.4rem] font-bold text-navy">
              Martin Tibuakuu, MD, MPH, FACC
            </h3>
            <p className="mt-1 text-[.88rem] font-semibold text-wine">
              Cardiologist - Preventive and Interventional Cardiology
            </p>
          </div>
          <h3 className="mb-6 font-display text-[1.4rem] font-bold text-navy">
            Credentials & Expertise
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

          <Link
            href="/about"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
          >
            About Dr. Tibuakuu
          </Link>
        </div>
      </div>
    </section>
  )
}
