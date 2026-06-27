import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-metadata'
import type { PhysicianProfile } from '@/lib/physicians'
import { CLINIC } from '@/lib/seo'

export type PhysicianFaq = {
  question: string
  answer: string
}

export function buildPhysiciansHubMeta(): Metadata {
  return pageMeta(
    '/physicians',
    'Our Cardiologists in Columbia, MO | PulsePoint Clinic',
    'Meet Dr. Martin Tibuakuu, MD, MPH, FACC and Dr. James E. Fairlamb, MD, FACC — board-certified cardiologists at PulsePoint Clinic in Columbia, Missouri.',
  )
}

export function buildPhysicianPageMeta(physician: PhysicianProfile): Metadata {
  const title = `${physician.name} | Cardiologist Columbia, MO`
  const description = `${physician.name} is a board-certified cardiologist at PulsePoint Clinic in Columbia, Missouri. Schedule an appointment at ${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}. Call ${CLINIC.phoneDisplay}.`

  return {
    ...pageMeta(`/physicians/${physician.slug}`, title, description),
    keywords: physician.searchKeywords,
  }
}

export function getPhysicianFaqs(physician: PhysicianProfile): PhysicianFaq[] {
  const location = `${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}`

  return [
    {
      question: `Where does ${physician.schemaName} practice in Columbia, MO?`,
      answer: `${physician.name} practices at PulsePoint Clinic, ${location}. PulsePoint is a physician-led cardiology practice serving Columbia, Boone County, and Central Missouri.`,
    },
    {
      question: `How do I schedule an appointment with ${physician.schemaName}?`,
      answer: `Call PulsePoint Clinic at ${CLINIC.phoneDisplay} or request an appointment online at pulsepointheart.com/book. New and existing patients can schedule cardiovascular consultations, preventive cardiology visits, and follow-up care with ${physician.schemaName}.`,
    },
    {
      question: `Is ${physician.schemaName} accepting new patients in Columbia, Missouri?`,
      answer: `Yes. ${physician.name} is accepting new patients at PulsePoint Clinic in Columbia, MO for preventive cardiology, advanced heart screening, diagnostic cardiology, and ongoing cardiovascular care.`,
    },
    {
      question: `What type of cardiologist is ${physician.schemaName}?`,
      answer: `${physician.name} is a board-certified cardiologist (${physician.honorificSuffix}) and ${physician.title.toLowerCase()} at PulsePoint Clinic. ${physician.intro[0]}`,
    },
    ...physician.faqs,
  ]
}
