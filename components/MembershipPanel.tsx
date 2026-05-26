import Link from 'next/link'

// Benefits from build doc section 8
const BENEFITS = [
  'Extended Appointments',
  'Priority Scheduling',
  'Direct Physician Communication',
  'Coordinated Specialty Care',
  'Same/Next-Day Visits',
  'Annual Evaluations',
  'Preventive Wellness Planning',
  'Personalized Care Plans',
]

// Shared check icon
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 flex-shrink-0 text-wine"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

// BUILD-MARKER-20260525161430
export default function MembershipPanel() {
  return (
    <section id="membership" className="flex flex-col border-y border-[#E8EDF3] lg:flex-row">
      <div className="bg-wine px-5 py-10 sm:px-8 lg:flex-[0_0_430px] lg:p-[56px]">
        <h2 className="mb-3.5 font-display text-[1.6rem] font-bold leading-[1.25] !text-white">
          A More Personalized Approach to Healthcare
        </h2>
        <p className="mb-5 text-[.9rem] font-medium leading-[1.7] text-white/90">
          Our membership-based model allows us to maintain a smaller patient
          panel, so we can spend more time with you and focus on prevention,
          not paperwork.
        </p>
        <Link
          href="/membership"
          className="inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-md border-[1.5px] border-gold px-5 py-[11.5px] text-[.85rem] font-semibold text-gold transition-colors hover:bg-gold/10"
        >
          Learn About Membership
        </Link>
      </div>

      <div className="relative overflow-hidden bg-white px-5 py-8 sm:px-8 lg:flex-1 lg:p-[56px]">
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 text-wine/[0.04] lg:block">
          <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className="h-44 w-44">
            <path d="M60 105s42-25 42-64c0-17-12-28-27-28-8 0-14 4-15 8-1-4-7-8-15-8-15 0-27 11-27 28 0 39 42 64 42 64Z" />
            <path d="M24 61h20l7-19 15 40 8-21h22" />
          </svg>
        </div>
        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-5 lg:max-w-3xl">
          {BENEFITS.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <CheckIcon />
              <span className="text-[.9rem] font-semibold text-charcoal">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
