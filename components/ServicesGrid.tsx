const SERVICES = [
  {
    name: 'Preventive Cardiology',
    href: '/services/preventive-cardiology',
    desc: 'Risk assessment and long-term heart health optimization.',
  },
  {
    name: 'Advanced Imaging',
    href: '/services/echocardiography',
    desc: 'Echo, cardiac CT coordination, and imaging-guided prevention.',
  },
  {
    name: 'Vascular & Vein Care',
    href: '/services/vascular-ultrasound',
    desc: 'Noninvasive vascular evaluation and blood-flow assessment.',
  },
  {
    name: 'Cardiometabolic Wellness',
    href: '/services/cardiometabolic-wellness',
    desc: 'Integrated care for metabolic risk, blood pressure, and cholesterol.',
  },
  {
    name: 'Executive Health',
    href: '/services/executive-health',
    desc: 'Efficient preventive cardiovascular insight for busy patients.',
  },
  {
    name: 'Telemedicine & Remote',
    href: '/services#telemedicine',
    desc: 'Convenient results review, planning, and care coordination.',
  },
]

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]"
    >
      {/* Full-width centered header */}
      <div className="mb-10 lg:mb-12">
        <div className="mb-2 text-center text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
          What We Offer
        </div>
        <h2 className="mx-auto max-w-2xl text-center font-display text-[1.7rem] font-bold leading-[1.2] text-charcoal sm:text-[2rem]">
          Comprehensive Cardiovascular &amp; Wellness Care
        </h2>
        <div className="mx-auto my-3.5 h-[3px] w-12 rounded bg-wine" />
        <p className="mx-auto mt-3 max-w-xl text-center text-[.92rem] leading-[1.65] text-muted">
          From prevention to advanced treatment, we provide integrated care
          designed around your heart health and overall well-being.
        </p>
      </div>

      {/* Full-width 3-column card grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((svc) => (
          <a
            key={svc.name}
            href={svc.href}
            className="rounded bg-white px-5 py-5 shadow-card transition-transform hover:-translate-y-0.5 active:scale-[.98]"
          >
            <div className="mb-4 h-[2px] w-9 rounded bg-gold" />
            <h4 className="text-[.95rem] font-bold leading-[1.3] text-charcoal">
              {svc.name}
            </h4>
            <p className="mt-2 text-[.8rem] leading-[1.55] text-muted">
              {svc.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
