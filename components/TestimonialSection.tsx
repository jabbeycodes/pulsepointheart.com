export default function TestimonialSection() {
  return (
    <section className="bg-[#FAF8F5] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto max-w-6xl">
        <div className="items-center gap-10 lg:grid lg:grid-cols-[1fr_320px]">
          {/* Left: quote */}
          <div className="relative">
            <div className="mb-2 text-[5rem] leading-none text-wine/15 font-serif sm:text-[6rem]">
              \u201C
            </div>
            <blockquote className="relative -mt-10 font-display text-[1.25rem] font-medium leading-[1.55] text-charcoal sm:text-[1.45rem] lg:-mt-12">
              Dr. Tibuakuu takes the time to truly listen and create a plan
              that helps me feel my best. I have total confidence in his care.
            </blockquote>
            <cite className="mt-5 block text-[.85rem] font-medium not-italic text-muted">
              \u2014 Actual Patient
            </cite>
          </div>

          {/* Right: patient image */}
          <div className="mt-8 lg:mt-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-card lg:aspect-[3/4]">
              <img
                src="/assets/testimonial-patient.jpg"
                alt="Happy patient couple"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
