import { CLINIC, SITE_URL } from '@/lib/seo'

export type PhysicianListingProfile = {
  slug: 'martin-tibuakuu' | 'james-fairlamb'
  firstName: string
  lastName: string
  fullName: string
  credentials: string
  npi: string
  moLicense: string
  specialty: string
  profileUrl: string
  staleListings: {
    platform: string
    url: string
    staleAddress: string
    stalePhone: string
  }[]
}

export const PRACTICE_ORG = {
  legalName: 'Pulsepoint Cardiovascular, PC',
  dba: 'PulsePoint Clinic',
  orgNpi: '1215866124',
  website: SITE_URL,
  profileUrl: `${SITE_URL}/about`,
  address: CLINIC.address,
  fullAddress: `${CLINIC.address.streetAddress}, ${CLINIC.address.addressLocality}, ${CLINIC.address.addressRegion} ${CLINIC.address.postalCode}`,
  localPhone: CLINIC.localPhoneDisplay,
  localPhoneHref: CLINIC.localPhoneHref,
  tollFreePhone: CLINIC.phoneDisplay,
  tollFreePhoneHref: CLINIC.phoneHref,
  email: CLINIC.email,
  fax: '(888) 894-4134',
  openingDate: 'July 1, 2026',
  acceptingNewPatients: true,
} as const

export const STALE_PRACTICE_LOCATION = {
  name: 'Missouri Heart Center',
  address: '1605 E Broadway, Suite 300, Columbia, MO 65201',
  phone: '(573) 256-7700',
} as const

export const PHYSICIAN_LISTINGS: PhysicianListingProfile[] = [
  {
    slug: 'martin-tibuakuu',
    firstName: 'Martin',
    lastName: 'Tibuakuu',
    fullName: 'Dr. Martin Tibuakuu, MD, MPH, FACC',
    credentials: 'MD, MPH, FACC',
    npi: '1952830085',
    moLicense: '2023033163',
    specialty: 'Cardiovascular Disease (Cardiology)',
    profileUrl: `${SITE_URL}/physicians/martin-tibuakuu`,
    staleListings: [
      {
        platform: 'WebMD',
        url: 'https://doctor.webmd.com/doctor/martin-tibuakuu-2b2a6d12-688c-44c8-96b6-333d2855c7ae-overview',
        staleAddress: STALE_PRACTICE_LOCATION.address,
        stalePhone: STALE_PRACTICE_LOCATION.phone,
      },
      {
        platform: 'Missouri Heart Center (defunct)',
        url: 'https://moheartcenter.com/providers/martin-tibuakuu/',
        staleAddress: STALE_PRACTICE_LOCATION.address,
        stalePhone: STALE_PRACTICE_LOCATION.phone,
      },
    ],
  },
  {
    slug: 'james-fairlamb',
    firstName: 'James',
    lastName: 'Fairlamb',
    fullName: 'Dr. James E. Fairlamb, MD, FACC',
    credentials: 'MD, FACC',
    npi: '1326029745',
    moLicense: '2003011622',
    specialty: 'Cardiovascular Disease (Cardiology)',
    profileUrl: `${SITE_URL}/physicians/james-fairlamb`,
    staleListings: [
      {
        platform: 'WebMD',
        url: 'https://doctor.webmd.com/doctor/james-fairlamb-e4f4136c-2b52-4381-805b-aae6dce8c3e7-overview',
        staleAddress: STALE_PRACTICE_LOCATION.address,
        stalePhone: STALE_PRACTICE_LOCATION.phone,
      },
      {
        platform: 'Boone Health',
        url: 'https://boone.health/providers/fairlamb-james-e-md/',
        staleAddress: STALE_PRACTICE_LOCATION.address,
        stalePhone: STALE_PRACTICE_LOCATION.phone,
      },
      {
        platform: 'Missouri Heart Center (defunct)',
        url: 'https://moheartcenter.com/providers/james-fairlamb/',
        staleAddress: STALE_PRACTICE_LOCATION.address,
        stalePhone: STALE_PRACTICE_LOCATION.phone,
      },
    ],
  },
]

export type DirectoryTarget = {
  id: string
  name: string
  /** How updates are submitted — most directories require portal claims, not cold email. */
  updateMethod: 'portal' | 'ticket' | 'email' | 'nppes'
  portalUrl?: string
  ticketUrl?: string
  supportEmail?: string
  notes: string
}

export const DIRECTORY_TARGETS: DirectoryTarget[] = [
  {
    id: 'nppes',
    name: 'NPPES (CMS National Plan & Provider Enumeration System)',
    updateMethod: 'nppes',
    portalUrl: 'https://nppes.cms.hhs.gov/',
    notes:
      'Source of truth for many aggregators. Each physician must update practice address and phone in NPPES. Organization NPI 1215866124 is already at Nifong.',
  },
  {
    id: 'healthgrades',
    name: 'Healthgrades',
    updateMethod: 'portal',
    portalUrl: 'https://update-v2.healthgrades.com/landing/claim',
    ticketUrl: 'https://helpcenter.healthgrades.com/',
    notes:
      'Claim profile with NPI via Healthgrades Pro. Updates sync to Medical News Today, Healthline FindCare, and Sharecare.',
  },
  {
    id: 'webmd-vitals',
    name: 'WebMD / Vitals Physician Directory',
    updateMethod: 'ticket',
    ticketUrl: 'https://customercare.webmd.com/hc/en-us/requests/new',
    notes:
      'Select "Directory Profile & Reviews for WebMD/Vitals". Request must be submitted separately by each physician.',
  },
  {
    id: 'usnews',
    name: 'U.S. News Doctors',
    updateMethod: 'portal',
    portalUrl: 'https://health.usnews.com/doctors',
    notes: 'Claim and update provider profile. Listings currently show stale Broadway address for both physicians.',
  },
  {
    id: 'doximity',
    name: 'Doximity',
    updateMethod: 'portal',
    portalUrl: 'https://www.doximity.com/',
    notes: 'Physician logs in directly to update practice location and affiliation.',
  },
  {
    id: 'zocdoc',
    name: 'Zocdoc',
    updateMethod: 'portal',
    portalUrl: 'https://www.zocdoc.com/join',
    notes: 'New practice onboarding — add PulsePoint Clinic as a new location.',
  },
  {
    id: 'medicare-care-compare',
    name: 'Medicare Care Compare',
    updateMethod: 'nppes',
    portalUrl: 'https://npiregistry.cms.hhs.gov/',
    notes: 'Updates after NPPES and PECOS enrollment reflect here (typically 2–4 weeks).',
  },
]

export function getPhysicianListing(slug: PhysicianListingProfile['slug']) {
  return PHYSICIAN_LISTINGS.find((profile) => profile.slug === slug)
}
