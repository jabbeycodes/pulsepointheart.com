const DIFFERENTIATORS = [
  {
    title: 'More Time With Your Physician',
    text: 'Unhurried visits designed for meaningful conversation, not rushed transactions.',
  },
  {
    title: 'Preventive Heart Care',
    text: 'Risk, lifestyle, imaging, labs, and goals connected into one forward-looking plan.',
  },
  {
    title: 'Advanced Diagnostics',
    text: 'Integrated cardiovascular testing used intentionally to support earlier detection.',
  },
  {
    title: 'Rapid Access',
    text: 'A more responsive care experience for questions, follow-up, and timely decisions.',
  },
  {
    title: 'Physician-Led Care',
    text: 'Care directed by a board-certified cardiologist who knows the full picture.',
  },
  {
    title: 'Technology-Enabled Experience',
    text: 'Modern systems that support scheduling, communication, screening, and continuity.',
  },
]

export default function WhyPulsePoint() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-[84px]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[390px_1fr] lg:items-start">
          <div>
            <h2 className="font-display text-[1.95rem] font-bold leading-[1.15] text-charcoal sm:text-[2.45rem]">
              Modern cardiovascular care designed differently.
            </h2>
            <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
            <p className="mt-5 text-[.95rem] leading-[1.75] text-muted">
              PulsePoint brings a premium, relationship-based model to
              preventive cardiology: more access, more clarity, and a stronger
              focus on the years ahead.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {DIFFERENTIATORS.map((item, index) => (
              <article key={item.title} className="border-t border-[#DCE2EA] pt-4">
                <div className="mb-2 text-[.72rem] font-bold tracking-[2px] text-gold">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[1rem] font-bold leading-tight text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
