import type { PhysicianProfile } from '@/lib/physicians'
import { CONDITION_PAGES } from '@/lib/condition-pages'

export const SITE_URL = 'https://pulsepointheart.com'

export const CLINIC_SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61590350815271',
  tiktok: 'https://www.tiktok.com/@pulsepointheart',
  instagram: 'https://www.instagram.com/pulsepointheart?igsh=aGtrcHo3YTQ5Y2t0',
} as const

export const CLINIC = {
  name: 'PulsePoint Clinic',
  legalName: 'PulsePoint Clinic',
  url: SITE_URL,
  phoneDisplay: '(855) 785-7337',
  phoneHref: '+18557857337',
  vanityPhone: '1-855-PULSEDR',
  localPhoneDisplay: '(573) 968-0800',
  localPhoneHref: '+15739680800',
  email: 'info@pulsepointheart.com',
  hoursDisplay: 'Monday-Friday, 9:00 AM-5:00 PM',
  hoursNote: 'By appointment',
  openingHours: 'Mo-Fr 09:00-17:00',
  address: {
    streetAddress: '1000 W Nifong Blvd, Bldg 2, Suite 120',
    addressLocality: 'Columbia',
    addressRegion: 'MO',
    postalCode: '65203',
    addressCountry: 'US',
  },
  geo: {
    latitude: 38.9108,
    longitude: -92.352,
  },
  areaServed: [
    'Columbia, MO',
    'Boone County, MO',
    'Jefferson City, MO',
    'Ashland, MO',
    'Fulton, MO',
    'Moberly, MO',
    'Mid-Missouri',
    'Central Missouri',
  ],
  services: [
    'Preventive cardiology',
    'Cardiovascular diagnostics',
    'Echocardiography',
    'Vascular ultrasound',
    'Stress testing',
    'Heart rhythm monitoring',
    'Executive heart health',
    'Cardiometabolic wellness',
    'Cardiac CT and calcium scoring',
    'Membership-based cardiology care',
  ],
}

/** Plain-text both lines for form errors and short copy. */
export function clinicPhonesInlineText() {
  return `${CLINIC.localPhoneDisplay} (local) or ${CLINIC.phoneDisplay} (toll-free)`
}

const CONDITION_ROUTES = [
  { path: '/conditions', priority: 0.85, changeFrequency: 'monthly' as const },
  ...CONDITION_PAGES.map((condition) => ({
    path: `/conditions/${condition.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  })),
]

export const PUBLIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/physicians', priority: 0.92, changeFrequency: 'monthly' as const },
  { path: '/physicians/martin-tibuakuu', priority: 0.96, changeFrequency: 'weekly' as const },
  { path: '/physicians/james-fairlamb', priority: 0.96, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/services/preventive-cardiology', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/echocardiography', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/vascular-ultrasound', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/stress-testing', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/heart-rhythm-monitoring', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/executive-health', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/cardiometabolic-wellness', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services/cardiac-ct-calcium-scoring', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/diagnostics', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/membership', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/premium-cardiovascular-care', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/cardiometabolic-weight-loss', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/book', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/locations/columbia-mo', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/cardiologist-columbia-mo', priority: 0.95, changeFrequency: 'monthly' as const },
  { path: '/missouri-heart-center-transition', priority: 0.94, changeFrequency: 'monthly' as const },
  { path: '/best-cardiologist-columbia-mo', priority: 0.93, changeFrequency: 'monthly' as const },
  { path: '/heart-screening-columbia-mo', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/patient-info', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.75, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/hipaa-notice', priority: 0.3, changeFrequency: 'yearly' as const },
  ...CONDITION_ROUTES,
]

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

export function buildClinicJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': `${SITE_URL}/#clinic`,
    name: CLINIC.name,
    legalName: CLINIC.legalName,
    url: SITE_URL,
    image: absoluteUrl('/assets/social-preview.png'),
    logo: absoluteUrl('/assets/logo.png'),
    telephone: CLINIC.localPhoneHref,
    email: CLINIC.email,
    medicalSpecialty: 'Cardiovascular',
    priceRange: '$$',
    openingHours: CLINIC.openingHours,
    description:
      'PulsePoint Clinic is a physician-led cardiovascular care platform in Columbia, Missouri focused on prevention, advanced heart screening, and personalized heart health planning.',
    address: {
      '@type': 'PostalAddress',
      ...CLINIC.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...CLINIC.geo,
    },
    areaServed: CLINIC.areaServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
    sameAs: Object.values(CLINIC_SOCIAL),
    hasMap:
      'https://www.google.com/maps/dir/?api=1&destination=1000+W+Nifong+Blvd,+Bldg+2,+Suite+120,+Columbia,+MO+65203',
    employee: [
      { '@id': `${absoluteUrl('/physicians/martin-tibuakuu')}#physician` },
      { '@id': `${absoluteUrl('/physicians/james-fairlamb')}#physician` },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cardiology services',
      itemListElement: CLINIC.services.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name,
        },
      })),
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CLINIC.localPhoneHref,
        contactType: 'local office',
        areaServed: 'Columbia, MO',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        telephone: CLINIC.phoneHref,
        contactType: 'toll-free appointments and clinic inquiries',
        areaServed: 'US',
        availableLanguage: 'English',
      },
    ],
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: absoluteUrl('/book'),
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        name: 'Book a cardiology appointment',
      },
      {
        '@type': 'CommunicateAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `tel:${CLINIC.phoneHref}`,
        },
        name: 'Call PulsePoint Clinic',
      },
    ],
  }
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: CLINIC.name,
    publisher: {
      '@id': `${SITE_URL}/#clinic`,
    },
  }
}

type FaqSchemaItem = {
  question: string
  answer: string
}

export function buildFaqJsonLd(faqs: FaqSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

type SpeakableWebPageInput = {
  path: string
  name: string
  description?: string
  cssSelectors?: readonly string[]
}

/** Marks content assistants can read aloud (Google Assistant, voice search). */
export function buildSpeakableWebPageJsonLd({
  path,
  name,
  description,
  cssSelectors = ['.speakable'],
}: SpeakableWebPageInput) {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#clinic` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [...cssSelectors],
    },
  }
}

type BreadcrumbItem = {
  name: string
  path: string
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

type ConditionSchemaInput = {
  slug: string
  shortTitle: string
  title: string
  description: string
  overview: string
  symptoms: string[]
  howWeTreat: string[]
  faqs: { question: string; answer: string }[]
}

export function buildMedicalConditionJsonLd(condition: ConditionSchemaInput) {
  const url = absoluteUrl(`/conditions/${condition.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    '@id': `${url}#condition`,
    name: condition.shortTitle,
    description: condition.overview,
    url,
    associatedAnatomy: {
      '@type': 'AnatomicalStructure',
      name: 'Heart and cardiovascular system',
    },
    signOrSymptom: condition.symptoms.map((symptom) => ({
      '@type': 'MedicalSignOrSymptom',
      name: symptom,
    })),
    possibleTreatment: condition.howWeTreat.map((treatment) => ({
      '@type': 'MedicalTherapy',
      name: treatment,
    })),
    relevantSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Cardiology',
    },
  }
}

/** Breadcrumb, FAQ, MedicalCondition, and MedicalWebPage JSON-LD for condition detail pages. */
export function buildConditionPageJsonLd(condition: ConditionSchemaInput) {
  const url = absoluteUrl(`/conditions/${condition.slug}`)

  return [
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Conditions', path: '/conditions' },
      { name: condition.shortTitle, path: `/conditions/${condition.slug}` },
    ]),
    buildFaqJsonLd(condition.faqs),
    buildMedicalConditionJsonLd(condition),
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': `${url}#webpage`,
      name: condition.title,
      description: condition.description,
      url,
      mainEntity: { '@id': `${url}#condition` },
      about: { '@id': `${url}#condition` },
      lastReviewed: '2026-06-30',
      reviewedBy: {
        '@type': 'Physician',
        name: 'Martin Tibuakuu, MD, MPH, FACC',
      },
      publisher: { '@id': `${SITE_URL}/#clinic` },
    },
  ]
}

export function buildPhysicianJsonLd(physician: PhysicianProfile) {
  const path = `/physicians/${physician.slug}`
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'Person'],
    '@id': `${url}#physician`,
    name: physician.schemaName,
    alternateName: physician.searchKeywords.filter(
      (keyword) => keyword.toLowerCase() !== physician.schemaName.toLowerCase(),
    ),
    honorificPrefix: 'Dr.',
    honorificSuffix: physician.honorificSuffix,
    jobTitle: `${physician.title} · Cardiologist`,
    medicalSpecialty: 'Cardiology',
    image: absoluteUrl(physician.image),
    url,
    description: `${physician.name} is a board-certified cardiologist at PulsePoint Clinic in Columbia, Missouri. ${physician.intro[0]}`,
    worksFor: {
      '@type': 'MedicalClinic',
      '@id': `${SITE_URL}/#clinic`,
      name: CLINIC.name,
      url: SITE_URL,
      telephone: CLINIC.localPhoneHref,
      address: {
        '@type': 'PostalAddress',
        ...CLINIC.address,
      },
    },
    workLocation: {
      '@type': 'Place',
      name: CLINIC.name,
      address: {
        '@type': 'PostalAddress',
        ...CLINIC.address,
      },
    },
    memberOf: {
      '@type': 'Organization',
      name: 'American College of Cardiology',
    },
    knowsAbout: physician.credentials.map((item) => item.label),
    areaServed: CLINIC.areaServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
  }
}

type ArticleSchemaInput = {
  title: string
  description: string
  slug: string
  publishedAt: string | null
  author?: string | null
  tags?: string[] | null
}

function articleAuthorSchema(author?: string | null) {
  if (author?.includes('MD')) {
    return {
      '@type': 'Person',
      name: author,
      jobTitle: 'Cardiologist',
      worksFor: { '@id': `${SITE_URL}/#clinic` },
    }
  }

  return {
    '@type': 'Organization',
    name: author ?? CLINIC.name,
  }
}

export function buildArticleJsonLd(article: ArticleSchemaInput) {
  const url = absoluteUrl(`/blog/${article.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl('/assets/social-preview.png'),
    datePublished: article.publishedAt ?? undefined,
    author: articleAuthorSchema(article.author),
    publisher: {
      '@id': `${SITE_URL}/#clinic`,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#journal`,
      name: 'PulsePoint Journal',
      url: absoluteUrl('/blog'),
    },
    contentLocation: {
      '@type': 'Place',
      name: 'Columbia, Missouri',
      address: {
        '@type': 'PostalAddress',
        ...CLINIC.address,
      },
    },
    keywords: article.tags?.join(', '),
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Cardiology',
    },
  }
}
