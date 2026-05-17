import Image from 'next/image'
import Link from 'next/link'

export default function TeamCard() {
  return (
    <section
      id="about"
      className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]"
    >
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
        <div className="mb-6 lg:mb-0">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Our Physician
          </div>
          <h2 className="font-display text-[1.7rem] font-bold leading-[1.2] text-charcoal sm:text-[2rem]">
            Meet Your Care Team
          </h2>
          <div className="my-3.5 h-[3px] w-12 rounded bg-wine" />
          <p className="mt-3 text-[.92rem] leading-[1.65] text-muted">
            Board-certified cardiologist providing precision concierge care,
            advanced diagnostics, and direct physician access.
          </p>
          <div className="mt-5 hidden lg:block">
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
            >
              Learn More About Dr. Tibuakuu &rarr;
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-[480px] overflow-hidden rounded bg-white shadow-card lg:mx-0">
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
              Cardiologist &middot; Concierge Cardiology
            </div>
            <p className="mb-3.5 text-[.85rem] leading-[1.6] text-muted">
              State-of-the-art heart care built around you. Precision care.
              Stronger hearts. Better lives.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-[.82rem] font-semibold text-wine"
            >
              View Full Profile &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-5 lg:hidden">
          <Link
            href="/about"
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-wine bg-white px-5 py-[11.5px] text-[.85rem] font-semibold text-wine"
          >
            Learn More About Dr. Tibuakuu &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
