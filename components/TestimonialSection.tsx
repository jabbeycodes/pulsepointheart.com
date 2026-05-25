import Image from 'next/image'

export default function TestimonialSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto max-w-6xl">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:items-center lg:gap-10">
          {/* Left: quote */}
          <div className="relative">
            <div className="mb-4 text-[6rem] leading-none text-wine/10 font-serif">
              &ldquo;
            </div>
            <blockquote className="relative -mt-12 font-display text-[1.3rem] font-medium leading-[1.55] text-charcoal sm:text-[1.5rem]">
              Dr. Tibuakuu takes the time to truly listen and create a plan
              that helps me feel my best. I have total confidence in his care.
            </blockquote>
            <cite className="mt-5 block text-[.85rem] font-medium not-italic text-muted">
              &mdash; Actual Patient
            </cite>
          </div>

          {/* Right: patient image */}
          <div className="mt-8 hidden lg:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#dde4ee]">
              <Image
                src="/assets/care-team.jpg"
                alt="Happy patient"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
