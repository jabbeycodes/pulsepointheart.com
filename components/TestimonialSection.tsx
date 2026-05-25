import Image from 'next/image'

export default function TestimonialSection() {
  return (
    <section className="bg-graybg px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote className="font-display text-[1.3rem] font-medium leading-[1.55] text-charcoal sm:text-[1.5rem]">
            “Dr. Tibuakuu takes the time to truly listen and create a plan
            that helps me feel my best. I have total confidence in his care.”
          </blockquote>
          <cite className="mt-4 block text-[.85rem] font-medium not-italic text-muted">
            — Actual Patient
          </cite>
        </div>
      </div>
    </section>
  )
}
