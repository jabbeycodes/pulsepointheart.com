// Services from build doc section 7
const SERVICES = [
  {
    name: 'Preventive Cardiology',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21s-8-4-8-10V5l8-3 8 3v6c0 6-8 10-8 10z" />
      </svg>
    ),
  },
  {
    name: 'Advanced Imaging',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: 'Vascular & Vein Care',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    name: 'Cardiometabolic Wellness',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" />
      </svg>
    ),
  },
  {
    name: 'Executive Health',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    name: 'Telemedicine & Remote',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]"
    >
      <div className="lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
        <div className="mb-7 lg:mb-0">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            What We Offer
          </div>
          <h2 className="font-display text-[1.7rem] font-bold leading-[1.2] text-charcoal sm:text-[2rem]">
            Comprehensive Cardiovascular &amp; Wellness Care
          </h2>
          <div className="my-3.5 h-[3px] w-12 rounded bg-wine" />
          <p className="mt-3 text-[.92rem] leading-[1.65] text-muted">
            From prevention to advanced treatment, we provide integrated care
            designed around your heart health and overall well-being.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {SERVICES.map((svc) => (
            <div
              key={svc.name}
              className="rounded bg-white px-3.5 py-5 text-center shadow-card transition-transform active:scale-[.98]"
            >
              <div className="mx-auto mb-2.5 h-9 w-9 text-wine">{svc.icon}</div>
              <h4 className="text-[.8rem] font-semibold leading-[1.3] text-charcoal">
                {svc.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
