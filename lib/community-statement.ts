/** Shared copy + routing for the community statement surface. */

export const COMMUNITY_STATEMENT_PATH = '/community-statement'

export const COMMUNITY_STATEMENT_DISMISS_KEY = 'pp-community-statement-dismissed-v1'

export const COMMUNITY_STATEMENT_DATE = 'August 6, 2026'

export const COMMUNITY_STATEMENT_TITLE =
  'Statement to Our Patients and the Mid-Missouri Community'

/** One-line fact used in the site-wide bar — calm, factual, non-alarmist. */
export const COMMUNITY_STATEMENT_BANNER_LINE =
  'PulsePoint Clinic remains open and continues to provide comprehensive cardiovascular care.'

export const PATIENT_COMMITMENTS = [
  'Your appointments at PulsePoint Clinic will continue as scheduled.',
  'We remain committed to providing timely access to comprehensive cardiovascular care.',
  'We will continue working closely with your primary care provider and other healthcare professionals to coordinate your care.',
  'If you have questions about your appointments, treatment, medical records, or ongoing care, our team is here to help.',
] as const

/** External press links shown on the community statement page (link out — do not republish). */
export const COMMUNITY_PRESS_COVERAGE = [
  {
    outlet: 'ComoBuz',
    title: 'A mentor, a protégé and now a fight to practice cardiology in Columbia',
    href: 'https://www.comobuz.com/government/a-mentor-a-prot-g-and-now-a-fight-to-practice-cardiology-in-columbia/article_75a6e2a3-663b-4881-80ce-3d989f92edf4.html',
    summary:
      'An independent look at why Drs. James Fairlamb and Martin Tibuakuu chose to stay and keep serving mid-Missouri patients.',
  },
] as const
