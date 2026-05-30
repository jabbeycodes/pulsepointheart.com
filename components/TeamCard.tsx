import Link from 'next/link'

// Physician roster for the homepage. Kept as data so adding/removing a
// doctor only changes this array, not the layout below.
const PHYSICIANS = [
  {
    name: 'Martin Tibuakuu, MD, MPH, FACC',
    title: 'Founder & Cardiologist',
    image: '/assets/physician-headshot.png',
    imageAlt:
      'Martin Tibuakuu, MD, MPH, FACC - Cardiologist at PulsePoint Clinic',
    highlights: [
      'Board-Certified Cardiologist',
      'Johns Hopkins Trained',
      'Expert in Preventive Cardiology',
      'Multimodality Cardiac Imaging',
    ],
  },
  {
    name: 'James E. Fairlamb, MD, FACC',
    title: 'Cardiologist',
    image: '/assets/physician-fairlamb.png',
    imageAlt: 'James E. Fairlamb, MD, FACC - Cardiologist at PulsePoint Clinic',
    highlights: [
      'Board-Certified Cardiologist',
      'Washington University Trained',
      'Expert in Preventive Cardiology & Lipids',
      "Missouri's Best Cardiologist (2024-2026)",
    ],
  },
]

export default function TeamCard() {
  return (
    <section id="about" className="bg-navy px-5 py-14 text-white sm:px-8 sm:py-18 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-[1.8rem] font-bold leading-[1.15] !text-white sm:text-[2.35rem]">
            Meet Our Physicians
          </h2>
          <p className="mt-4 text-[.94rem] leading-[1.7] text-white/85">
            Board-certified, fellowship-trained cardiologists united by a
            commitment to prevention, precision, and exceptional patient care.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {PHYSICIANS.map((doctor) => (
            <article
              key={doctor.name}
              className="flex flex-col overflow-hidden rounded-lg bg-white text-charcoal shadow-card"
            >
              <div className="bg-graybg">
                <img
                  src={doctor.image}
                  alt={doctor.imageAlt}
                  className="aspect-[4/5] h-auto w-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.3rem] font-bold leading-tight text-navy">
                  {doctor.name}
                </h3>
                <p className="mt-1 text-[.88rem] font-semibold text-wine">
                  {doctor.title}
                </p>

                <div className="mt-5 space-y-3">
                  {doctor.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-wine text-wine">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="h-3 w-3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-[.9rem] font-medium leading-snug text-charcoal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/about#physicians"
                  className="mt-7 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine transition-colors hover:bg-wine hover:text-white"
                >
                  View Full Profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
