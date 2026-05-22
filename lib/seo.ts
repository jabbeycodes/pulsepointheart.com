export const SITE_URL = 'https://pulsepointheart.com'

export const CLINIC = {
  name: 'PulsePoint Clinic',
  legalName: 'PulsePoint Clinic',
  url: SITE_URL,
  phoneDisplay: '(855) 785-7337',
  phoneHref: '+18557857337',
  vanityPhone: '1-855-PULSEDR',
  email: 'Mtibuakuu@pulsepointheart.com',
  address: {
    streetAddress: '1000 W Nifong Blvd, BLD 2 Suite 120',
    addressLocality: 'Columbia',
    addressRegion: 'MO',
    postalCode: '65203',
    addressCountry: 'US',
  },
  geo: {
    latitude: 38.9108,
    longitude: -92.352,
  },
  areaServed: ['Columbia, MO', 'Boone County, MO', 'Mid-Missouri'],
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

export const PUBLIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
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
  { path: '/book', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/patient-info', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.65, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/hipaa-notice', priority: 0.3, changeFrequency: 'yearly' as const },
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
    telephone: CLINIC.phoneHref,
    email: CLINIC.email,
    medicalSpecialty: 'Cardiovascular',
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-16:00',
    description:
      'PulsePoint Clinic is a physician-led cardiovascular care platform in Columbia, Missouri focused on prevention, advanced diagnostics, cardiometabolic wellness, and personalized heart health planning.',
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CLINIC.phoneHref,
      contactType: 'appointments and clinic inquiries',
      areaServed: 'US',
      availableLanguage: 'English',
    },
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
