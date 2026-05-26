export default function TestimonialSection() {
  return (
    <section className="bg-[#FAF8F5] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto max-w-6xl">
        <div className="items-center gap-10 lg:grid lg:grid-cols-[1fr_320px]">
          {/* Left: quote */}
          <div className="relative">
            <blockquote className="font-display text-[1.25rem] font-medium leading-[1.55] text-charcoal sm:text-[1.45rem]">
              Exceptional cardiovascular care begins with listening, education,
              prevention, and personalized treatment planning.
            </blockquote>
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
