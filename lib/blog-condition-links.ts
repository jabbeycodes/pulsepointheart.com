import { CONDITION_PAGES, getConditionPage } from '@/lib/condition-pages'

type ConditionLink = {
  href: string
  label: string
}

const TAG_KEYWORDS: Array<{ pattern: RegExp; slug: string }> = [
  { pattern: /hypertension|blood pressure/i, slug: 'hypertension' },
  { pattern: /heart failure|congestive/i, slug: 'heart-failure' },
  { pattern: /atrial fibrillation|afib|arrhythmia|rhythm/i, slug: 'atrial-fibrillation' },
  { pattern: /palpitation/i, slug: 'palpitations' },
  { pattern: /coronary|cad|angina|heart attack/i, slug: 'coronary-artery-disease' },
  { pattern: /chest pain/i, slug: 'chest-pain' },
  { pattern: /cholesterol|lipid/i, slug: 'high-cholesterol' },
  { pattern: /preventive|prevention|risk assessment|screening/i, slug: 'cardiac-risk-assessment' },
  { pattern: /valve|valvular|stenosis|regurgitation/i, slug: 'valvular-heart-disease' },
  { pattern: /diabetes|a1c|metabolic/i, slug: 'cardiac-risk-assessment' },
  { pattern: /stroke/i, slug: 'coronary-artery-disease' },
]

const PILLAR_SLUGS: Record<string, string[]> = {
  'Preventive Cardiology': ['cardiac-risk-assessment'],
  'Advanced Diagnostics': ['cardiac-risk-assessment'],
  'Cardiometabolic Wellness': ['cardiac-risk-assessment', 'high-cholesterol'],
  'Heart Rhythm Monitoring': ['atrial-fibrillation', 'palpitations'],
  'Causes of Heart Disease': ['coronary-artery-disease', 'cardiac-risk-assessment'],
  'Warning Signs': ['chest-pain', 'coronary-artery-disease'],
  'Blood Pressure': ['hypertension'],
  Cholesterol: ['high-cholesterol'],
  'Diabetes and Heart Health': ['cardiac-risk-assessment', 'high-cholesterol'],
  'Stroke Prevention': ['atrial-fibrillation', 'coronary-artery-disease'],
  'Heart Failure': ['heart-failure'],
  'Atrial Fibrillation': ['atrial-fibrillation'],
  'Lifestyle and Prevention': ['cardiac-risk-assessment'],
  'Women and Heart Disease': ['chest-pain', 'coronary-artery-disease'],
  'Exercise and Heart Health': ['cardiac-risk-assessment'],
  'Stress and Heart Health': ['hypertension', 'cardiac-risk-assessment'],
}

function slugToLink(slug: string): ConditionLink | null {
  const condition = getConditionPage(slug)
  if (!condition) return null
  return {
    href: `/conditions/${condition.slug}`,
    label: condition.shortTitle,
  }
}

function matchText(text: string, slugs: Set<string>) {
  for (const { pattern, slug } of TAG_KEYWORDS) {
    if (pattern.test(text)) {
      slugs.add(slug)
    }
  }
}

/** Resolve condition pages related to a blog post for internal linking. */
export function getRelatedConditionLinks(
  tags: string[] | null,
  title: string,
  pillar?: string,
  limit = 3,
): ConditionLink[] {
  const slugs = new Set<string>()

  if (pillar && PILLAR_SLUGS[pillar]) {
    for (const slug of PILLAR_SLUGS[pillar]) {
      slugs.add(slug)
    }
  }

  if (tags) {
    for (const tag of tags) {
      matchText(tag, slugs)
    }
  }

  matchText(title, slugs)

  const links: ConditionLink[] = []
  for (const slug of slugs) {
    const link = slugToLink(slug)
    if (link) links.push(link)
    if (links.length >= limit) break
  }

  if (links.length < limit) {
    for (const condition of CONDITION_PAGES) {
      if (links.some((link) => link.href.endsWith(condition.slug))) continue
      links.push({ href: `/conditions/${condition.slug}`, label: condition.shortTitle })
      if (links.length >= limit) break
    }
  }

  return links.slice(0, limit)
}

/** Markdown footer for editorial posts — embeds internal links in article body. */
export function buildRelatedConditionsMarkdown(
  tags: string[] | null,
  title: string,
  pillar?: string,
): string {
  const links = getRelatedConditionLinks(tags, title, pillar, 3)
  if (links.length === 0) return ''

  const list = links
    .map((link) => `- [${link.label}](https://pulsepointheart.com${link.href})`)
    .join('\n')

  return `## Related conditions we treat in Columbia, MO

${list}

Learn more about [cardiology services at PulsePoint Clinic](https://pulsepointheart.com/services/preventive-cardiology) or [schedule a consultation](https://pulsepointheart.com/book).`
}
