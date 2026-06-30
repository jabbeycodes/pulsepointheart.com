import {
  DIRECTORY_TARGETS,
  PHYSICIAN_LISTINGS,
  PRACTICE_ORG,
  STALE_PRACTICE_LOCATION,
  getPhysicianListing,
  type DirectoryTarget,
  type PhysicianListingProfile,
} from '@/lib/directory-listings'

export type OutreachDraft = {
  id: string
  directoryId: string
  directoryName: string
  physicianSlug?: PhysicianListingProfile['slug']
  subject: string
  text: string
  html: string
  /** Recommended delivery channel */
  delivery: 'email' | 'ticket' | 'portal' | 'internal'
  deliveryUrl?: string
  to?: string
  notes: string
}

function practiceFactsBlock() {
  return [
    `Practice name (DBA): ${PRACTICE_ORG.dba}`,
    `Legal entity: ${PRACTICE_ORG.legalName}`,
    `Organization NPI: ${PRACTICE_ORG.orgNpi}`,
    `Current practice address: ${PRACTICE_ORG.fullAddress}`,
    `Local phone: ${PRACTICE_ORG.localPhone}`,
    `Toll-free phone: ${PRACTICE_ORG.tollFreePhone}`,
    `Fax: ${PRACTICE_ORG.fax}`,
    `Email: ${PRACTICE_ORG.email}`,
    `Website: ${PRACTICE_ORG.website}`,
    `Accepting new patients: Yes`,
    `Specialty: Cardiovascular Disease (Cardiology)`,
  ].join('\n')
}

function physicianFactsBlock(physician: PhysicianListingProfile) {
  return [
    `Provider name: ${physician.fullName}`,
    `NPI: ${physician.npi}`,
    `Missouri license: ${physician.moLicense}`,
    `Specialty: ${physician.specialty}`,
    `Profile URL: ${physician.profileUrl}`,
  ].join('\n')
}

function textToHtml(text: string) {
  return text
    .split('\n\n')
    .map((paragraph) => {
      const lines = paragraph.split('\n')
      if (lines.every((line) => line.startsWith('- '))) {
        return `<ul>${lines.map((line) => `<li>${escapeHtml(line.slice(2))}</li>`).join('')}</ul>`
      }
      return `<p style="margin:0 0 14px;color:#334155;font-size:14px;line-height:1.65;">${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`
    })
    .join('')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function wrapOutreachHtml(title: string, bodyHtml: string) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f7fa;padding:28px;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5eaf0;border-radius:8px;overflow:hidden;">
        <div style="background:#0e2a47;padding:22px 24px;">
          <div style="color:#c8a96a;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">PulsePoint Clinic</div>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;line-height:1.3;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:22px 24px;">${bodyHtml}</div>
      </div>
    </div>
  `
}

export function buildNppesPhysicianDraft(physician: PhysicianListingProfile): OutreachDraft {
  const text = [
    `NPPES profile update request — ${physician.fullName}`,
    '',
    'Please update the practice location information in NPPES for the provider below.',
    '',
    physicianFactsBlock(physician),
    '',
    'REMOVE or replace stale location:',
    `- ${STALE_PRACTICE_LOCATION.name}`,
    `- ${STALE_PRACTICE_LOCATION.address}`,
    `- ${STALE_PRACTICE_LOCATION.phone}`,
    '',
    'ADD current primary practice location:',
    practiceFactsBlock(),
    '',
    'Authorized official / practice contact:',
    `Dr. Martin Tibuakuu, President — ${PRACTICE_ORG.email} — ${PRACTICE_ORG.tollFreePhone}`,
    '',
    'Proof of current practice:',
    physician.profileUrl,
    PRACTICE_ORG.website,
    `${PRACTICE_ORG.website}/locations/columbia-mo`,
    '',
    'Note: Missouri Heart Center closed May 2026. This provider now practices exclusively at PulsePoint Clinic.',
  ].join('\n')

  return {
    id: `nppes-${physician.slug}`,
    directoryId: 'nppes',
    directoryName: 'NPPES (CMS)',
    physicianSlug: physician.slug,
    subject: `NPPES Update Request — ${physician.fullName} — PulsePoint Clinic`,
    text,
    html: wrapOutreachHtml(`NPPES update — ${physician.fullName}`, textToHtml(text)),
    delivery: 'portal',
    deliveryUrl: 'https://nppes.cms.hhs.gov/',
    notes: 'Each physician (or authorized delegate) logs into NPPES and updates practice location. This is the highest-impact fix.',
  }
}

export function buildWebMdTicketDraft(physician: PhysicianListingProfile): OutreachDraft {
  const listing = physician.staleListings.find((item) => item.platform === 'WebMD')
  const text = [
    'Directory Profile & Reviews for WebMD/Vitals — Profile correction request',
    '',
    physicianFactsBlock(physician),
    '',
    'Current listing URL:',
    listing?.url ?? '(see doctor.webmd.com profile)',
    '',
    'Requested changes:',
    `1. Update primary practice address to: ${PRACTICE_ORG.fullAddress}`,
    `2. Update practice phone to: ${PRACTICE_ORG.localPhone} (local) and ${PRACTICE_ORG.tollFreePhone} (toll-free)`,
    `3. Update practice name to: ${PRACTICE_ORG.dba} (${PRACTICE_ORG.legalName})`,
    `4. Remove or mark inactive the former location: ${STALE_PRACTICE_LOCATION.address}`,
    '5. Set accepting new patients: Yes',
    '',
    'Proof of current practice location and phone:',
    PRACTICE_ORG.website,
    physician.profileUrl,
    `${PRACTICE_ORG.website}/locations/columbia-mo`,
    '',
    'Context:',
    'Provider transitioned from Missouri Heart Center (closed May 2026) to PulsePoint Clinic, an independent cardiology practice.',
    '',
    `Submitted by: ${physician.fullName}`,
    `Contact email: ${PRACTICE_ORG.email}`,
    `Contact phone: ${PRACTICE_ORG.tollFreePhone}`,
  ].join('\n')

  return {
    id: `webmd-${physician.slug}`,
    directoryId: 'webmd-vitals',
    directoryName: 'WebMD / Vitals',
    physicianSlug: physician.slug,
    subject: `WebMD/Vitals Directory Correction — ${physician.fullName} — NPI ${physician.npi}`,
    text,
    html: wrapOutreachHtml(`WebMD/Vitals correction — ${physician.fullName}`, textToHtml(text)),
    delivery: 'ticket',
    deliveryUrl: 'https://customercare.webmd.com/hc/en-us/requests/new',
    notes:
      'WebMD requires each doctor to submit separately. Select "Directory Profile & Reviews for WebMD/Vitals" on the form.',
  }
}

export function buildHealthgradesClaimDraft(physician: PhysicianListingProfile): OutreachDraft {
  const text = [
    `Healthgrades profile update — ${physician.fullName}`,
    '',
    'We are requesting correction of directory information for the provider below.',
    '',
    physicianFactsBlock(physician),
    '',
    'Correct practice information:',
    practiceFactsBlock(),
    '',
    'Please remove or replace outdated Missouri Heart Center location:',
    `- ${STALE_PRACTICE_LOCATION.address}`,
    `- ${STALE_PRACTICE_LOCATION.phone}`,
    '',
    'Claim / update steps:',
    `1. Claim profile at https://update-v2.healthgrades.com/landing/claim using NPI ${physician.npi}`,
    '2. Update practice location, phone, photo, insurance, and conditions treated',
    `3. Link to practice website: ${PRACTICE_ORG.website}`,
    '',
    'If assistance is needed from Healthgrades support, please update the public profile to reflect the Nifong Blvd location.',
    '',
    `Practice contact: ${PRACTICE_ORG.email} | ${PRACTICE_ORG.tollFreePhone}`,
  ].join('\n')

  return {
    id: `healthgrades-${physician.slug}`,
    directoryId: 'healthgrades',
    directoryName: 'Healthgrades',
    physicianSlug: physician.slug,
    subject: `Healthgrades Profile Update — ${physician.fullName} — NPI ${physician.npi}`,
    text,
    html: wrapOutreachHtml(`Healthgrades update — ${physician.fullName}`, textToHtml(text)),
    delivery: 'portal',
    deliveryUrl: `https://update-v2.healthgrades.com/landing/claim?npi=${physician.npi}`,
    notes: 'Primary action is claiming via Healthgrades Pro. Use help center contact form if claim fails.',
  }
}

export function buildUsNewsDraft(physician: PhysicianListingProfile): OutreachDraft {
  const text = [
    `U.S. News Doctors profile update — ${physician.fullName}`,
    '',
    physicianFactsBlock(physician),
    '',
    'Current listing shows stale address:',
    STALE_PRACTICE_LOCATION.address,
    '',
    'Please update to:',
    practiceFactsBlock(),
    '',
    `Practice website: ${PRACTICE_ORG.website}`,
    `Physician profile: ${physician.profileUrl}`,
    '',
    `Contact: ${PRACTICE_ORG.email} | ${PRACTICE_ORG.tollFreePhone}`,
  ].join('\n')

  return {
    id: `usnews-${physician.slug}`,
    directoryId: 'usnews',
    directoryName: 'U.S. News Doctors',
    physicianSlug: physician.slug,
    subject: `U.S. News Doctors Profile Update — ${physician.fullName}`,
    text,
    html: wrapOutreachHtml(`U.S. News update — ${physician.fullName}`, textToHtml(text)),
    delivery: 'portal',
    deliveryUrl: 'https://health.usnews.com/doctors',
    notes: 'Claim provider profile on U.S. News and update practice location.',
  }
}

export function buildPhysicianActionEmail(physician: PhysicianListingProfile): OutreachDraft {
  const text = [
    `Action required: Update your online directory listings — ${physician.fullName}`,
    '',
    `Hi Dr. ${physician.lastName},`,
    '',
    'Your online profiles still list your former Missouri Heart Center / Broadway address. Updating them protects patients and improves search visibility for PulsePoint Clinic.',
    '',
    'Your current information (use everywhere):',
    practiceFactsBlock(),
    '',
    'Step 1 — NPPES (do this first):',
    'https://nppes.cms.hhs.gov/',
    `Update practice location to Nifong Blvd. NPI: ${physician.npi}`,
    '',
    'Step 2 — Claim Healthgrades:',
    `https://update-v2.healthgrades.com/landing/claim?npi=${physician.npi}`,
    '',
    'Step 3 — Submit WebMD/Vitals correction (must be submitted by you):',
    'https://customercare.webmd.com/hc/en-us/requests/new',
    'Select: Directory Profile & Reviews for WebMD/Vitals',
    '',
    'Step 4 — Update Doximity practice location:',
    'https://www.doximity.com/',
    '',
    'Stale listings to correct:',
    ...physician.staleListings.map(
      (item) => `- ${item.platform}: ${item.url}`,
    ),
    '',
    'PulsePoint marketing can assist with drafts — final submissions for WebMD must come from you directly.',
    '',
    `Questions: ${PRACTICE_ORG.email}`,
  ].join('\n')

  return {
    id: `physician-action-${physician.slug}`,
    directoryId: 'internal',
    directoryName: 'Physician action checklist',
    physicianSlug: physician.slug,
    subject: `Action required: Update directory listings for PulsePoint Clinic`,
    text,
    html: wrapOutreachHtml(`Directory update checklist — Dr. ${physician.lastName}`, textToHtml(text)),
    delivery: 'internal',
    notes: 'Send to physician office email for signature and portal submissions.',
  }
}

export function buildInternalSummaryDraft(): OutreachDraft {
  const text = [
    'PulsePoint Clinic — Directory listing correction campaign',
    '',
    'Goal: Fix stale Missouri Heart Center / 1605 E Broadway listings across major physician directories.',
    '',
    'Practice facts (canonical):',
    practiceFactsBlock(),
    '',
    'Priority order:',
    '1. NPPES updates for both physicians (cascades to many aggregators)',
    '2. Google Business Profile for PulsePoint Clinic',
    '3. Healthgrades claim (both physicians)',
    '4. WebMD/Vitals tickets (each physician submits separately)',
    '5. U.S. News, Doximity, Zocdoc',
    '6. Boone Health — request removal/update of Fairlamb provider page if no longer employed',
    '',
    'Physicians:',
    ...PHYSICIAN_LISTINGS.map(
      (p) => `- ${p.fullName} | NPI ${p.npi} | ${p.profileUrl}`,
    ),
    '',
    'Directories:',
    ...DIRECTORY_TARGETS.map(
      (d) => `- ${d.name}: ${d.updateMethod}${d.portalUrl ? ` — ${d.portalUrl}` : ''}`,
    ),
    '',
    'Run outreach tooling:',
    'npm run outreach:directory -- --dry-run',
    'npm run outreach:directory -- --send-internal',
    'npm run outreach:directory -- --send --to physician@email.com --draft webmd-martin-tibuakuu',
    '',
    `Generated for ${PRACTICE_ORG.email}`,
  ].join('\n')

  return {
    id: 'internal-summary',
    directoryId: 'internal',
    directoryName: 'Internal campaign summary',
    subject: 'PulsePoint Directory Listing Correction Campaign — Action Plan',
    text,
    html: wrapOutreachHtml('Directory listing correction campaign', textToHtml(text)),
    delivery: 'internal',
    to: PRACTICE_ORG.email,
    notes: 'Overview email for practice leadership.',
  }
}

export function buildBooneHealthCorrectionDraft(physician: PhysicianListingProfile): OutreachDraft {
  if (physician.slug !== 'james-fairlamb') {
    throw new Error('Boone Health correction draft is only applicable to Dr. Fairlamb')
  }

  const text = [
    'Provider directory correction request — Boone Health website',
    '',
    'To whom it may concern,',
    '',
    `Dr. James E. Fairlamb, MD, FACC (NPI ${physician.npi}) is no longer practicing with Boone Health / Missouri Heart Center.`,
    '',
    'Please update or remove the following provider page:',
    'https://boone.health/providers/fairlamb-james-e-md/',
    '',
    'Dr. Fairlamb now practices at:',
    practiceFactsBlock(),
    '',
    `Website: ${physician.profileUrl}`,
    '',
    'Thank you for helping patients find accurate information during the cardiology transition in Columbia, MO.',
    '',
    `Contact: ${PRACTICE_ORG.email}`,
    PRACTICE_ORG.tollFreePhone,
  ].join('\n')

  return {
    id: 'boone-health-fairlamb',
    directoryId: 'boone-health',
    directoryName: 'Boone Health Provider Directory',
    physicianSlug: physician.slug,
    subject: 'Provider Directory Correction — Dr. James E. Fairlamb — No Longer at Boone Health',
    text,
    html: wrapOutreachHtml('Boone Health directory correction', textToHtml(text)),
    delivery: 'email',
    to: 'bhmgcardiology@boone.health',
    notes: 'Also try Boone Health web contact form if no response in 10 business days.',
  }
}

export function buildAllOutreachDrafts(): OutreachDraft[] {
  const drafts: OutreachDraft[] = [buildInternalSummaryDraft()]

  for (const physician of PHYSICIAN_LISTINGS) {
    drafts.push(
      buildNppesPhysicianDraft(physician),
      buildHealthgradesClaimDraft(physician),
      buildWebMdTicketDraft(physician),
      buildUsNewsDraft(physician),
      buildPhysicianActionEmail(physician),
    )
  }

  drafts.push(buildBooneHealthCorrectionDraft(getPhysicianListing('james-fairlamb')!))

  return drafts
}

export function getOutreachDraft(id: string) {
  return buildAllOutreachDrafts().find((draft) => draft.id === id)
}

export function formatDirectoryTargetSummary(target: DirectoryTarget) {
  return `${target.name} (${target.updateMethod})${target.portalUrl ? ` — ${target.portalUrl}` : ''}`
}
