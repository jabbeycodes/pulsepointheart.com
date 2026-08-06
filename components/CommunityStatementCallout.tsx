import Link from 'next/link'
import {
  COMMUNITY_STATEMENT_BANNER_LINE,
  COMMUNITY_STATEMENT_PATH,
  PATIENT_COMMITMENTS,
} from '@/lib/community-statement'

/** Homepage reassurance block — sits below the hero, not inside it. */
export default function CommunityStatementCallout() {
  return (
    <section
      aria-labelledby="community-statement-heading"
      className="border-y border-[#E8EDF3] bg-graybg px-5 py-10 sm:px-8 sm:py-12 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
          Community update
        </p>
        <h2
          id="community-statement-heading"
          className="max-w-3xl font-display text-[1.65rem] font-bold leading-[1.2] text-navy sm:text-[2rem]"
        >
          PulsePoint Clinic remains open
        </h2>
        <div className="my-4 h-[3px] w-12 rounded bg-wine" />
        <p className="max-w-3xl text-[.95rem] leading-[1.7] text-charcoal/85">
          {COMMUNITY_STATEMENT_BANNER_LINE} Your care continues with the same
          physician-led focus — and we want mid-Missouri patients and referring
          providers to know exactly where we stand.
        </p>

        <ul className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
          {PATIENT_COMMITMENTS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[.86rem] leading-[1.55] text-charcoal/85"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={COMMUNITY_STATEMENT_PATH}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            Read Our Full Statement
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
          >
            Schedule an Appointment
          </Link>
        </div>
      </div>
    </section>
  )
}
