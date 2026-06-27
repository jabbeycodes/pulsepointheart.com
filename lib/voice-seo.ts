import { CLINIC, SITE_URL } from '@/lib/seo'

/** Natural-language Q&A phrased the way people speak to Siri, Alexa, and Google Assistant. */
export type VoiceAnswer = {
  /** Spoken-style question (also used in FAQ schema). */
  question: string
  /** Direct answer — keep the first sentence short for voice readout. */
  answer: string
  /** Optional grouping for on-page sections. */
  category?: 'location' | 'appointments' | 'physicians' | 'services'
}

const fullAddress = `${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}`

/** Site-wide voice queries — highest volume for local cardiology searches. */
export const VOICE_QUICK_ANSWERS: VoiceAnswer[] = [
  {
    category: 'location',
    question: 'What is the phone number for PulsePoint cardiologist in Columbia Missouri?',
    answer: `Call PulsePoint Clinic at ${CLINIC.phoneDisplay}. That is the main line for cardiology appointments and clinic questions in Columbia, Missouri.`,
  },
  {
    category: 'location',
    question: 'Where is the PulsePoint cardiologist office in Columbia MO?',
    answer: `PulsePoint Clinic is at ${fullAddress}. The clinic is on West Nifong Boulevard in Columbia, Missouri, serving Boone County and Central Missouri.`,
  },
  {
    category: 'location',
    question: 'What are PulsePoint Clinic hours in Columbia?',
    answer: `PulsePoint is open ${CLINIC.hoursDisplay}, ${CLINIC.hoursNote.toLowerCase()}. Cardiology visits are scheduled by appointment.`,
  },
  {
    category: 'location',
    question: 'Is there a cardiologist near me in Columbia Missouri?',
    answer: `Yes. PulsePoint Clinic has board-certified cardiologists at ${fullAddress}. The clinic serves Columbia, Boone County, Jefferson City, Fulton, Moberly, and surrounding Central Missouri communities.`,
  },
  {
    category: 'physicians',
    question: 'Who is the cardiologist at PulsePoint in Columbia MO?',
    answer:
      'PulsePoint is led by Dr. Martin Tibuakuu, MD, MPH, FACC, and Dr. James E. Fairlamb, MD, FACC. Both are board-certified cardiologists practicing in Columbia, Missouri.',
  },
  {
    category: 'physicians',
    question: 'Who is Dr. Martin Tibuakuu cardiologist in Columbia Missouri?',
    answer:
      'Dr. Martin Tibuakuu, MD, MPH, FACC, is a board-certified cardiologist at PulsePoint Clinic in Columbia, Missouri. He provides preventive cardiology, advanced heart screening, and comprehensive cardiovascular care.',
  },
  {
    category: 'physicians',
    question: 'Who is Dr. James Fairlamb cardiologist in Columbia Missouri?',
    answer:
      'Dr. James E. Fairlamb, MD, FACC, is a board-certified cardiologist at PulsePoint Clinic in Columbia, Missouri. He specializes in preventive cardiology and personalized heart health planning.',
  },
  {
    category: 'appointments',
    question: 'Is PulsePoint accepting new cardiology patients?',
    answer:
      'Yes. PulsePoint is accepting new patients for cardiovascular consultation, follow-up care, diagnostics, and preventive cardiology in Columbia, Missouri.',
  },
  {
    category: 'appointments',
    question: 'How do I book an appointment with a cardiologist in Columbia MO?',
    answer: `Call ${CLINIC.phoneDisplay} or visit ${SITE_URL}/book to schedule online. The team will help you choose the right visit type.`,
  },
  {
    category: 'services',
    question: 'Does PulsePoint cardiologist accept insurance?',
    answer:
      'Yes. Core Cardiology at PulsePoint accepts major insurance for established and suspected heart conditions. Call the clinic to confirm coverage for your specific plan.',
  },
  {
    category: 'services',
    question: 'What heart conditions does PulsePoint cardiologist treat?',
    answer:
      'PulsePoint cardiologists treat hypertension, coronary artery disease, heart failure, arrhythmias, chest pain, high cholesterol, palpitations, and other cardiovascular conditions.',
  },
  {
    category: 'services',
    question: 'What heart tests does PulsePoint offer in Columbia?',
    answer:
      'PulsePoint offers echocardiograms, stress testing, heart rhythm monitoring, vascular ultrasound, and other cardiovascular diagnostics with physician interpretation on site in Columbia.',
  },
]

/** Location-page subset — "near me" and directions intent. */
export const VOICE_LOCATION_ANSWERS = VOICE_QUICK_ANSWERS.filter(
  (item) => item.category === 'location' || item.category === 'appointments',
)

/** Homepage hero subset — top questions without overwhelming the page. */
export const VOICE_HOME_ANSWERS = VOICE_QUICK_ANSWERS.filter((item) =>
  ['location', 'physicians', 'appointments'].includes(item.category ?? ''),
).slice(0, 6)

/** CSS selectors marked up in VoiceQuickAnswers for Google Speakable. */
export const VOICE_SPEAKABLE_SELECTORS = [
  '#voice-quick-answers',
  '.voice-answer',
] as const

export function voiceAnswersToFaqSchema(answers: VoiceAnswer[]) {
  return answers.map((item) => ({
    question: item.question,
    answer: item.answer,
  }))
}
