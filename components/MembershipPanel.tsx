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
      className="h-5 w-5 flex-shrink-0 text-gold"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

// BUILD-MARKER-20260525161430
export default function MembershipPanel() {
  return (
    <div id="membership" className="flex flex-col lg:flex-row">
      <div className="bg-wine px-5 py-10 sm:px-8 lg:flex-[0_0_340px] lg:p-[52px]">
        <h2 className="mb-3.5 font-display text-[1.6rem] leading-[1.25] text-white">
          A More Personalized Approach to Healthcare
        </h2>
        <p className="mb-5 text-[.9rem] leading-[1.7] text-white/85">
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

      <div className="grid grid-cols-1 gap-3.5 bg-navy-light px-5 py-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3.5 sm:px-8 lg:flex-1 lg:content-center lg:p-[52px]">
        {BENEFITS.map((benefit) => (
          <div key={benefit} className="flex items-center gap-3">
            <CheckIcon />
            <span className="text-[.88rem] text-white/90">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
