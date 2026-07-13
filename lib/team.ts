export type TeamMember = {
  slug: string
  name: string
  title: string
  image: string
  imageAlt: string
  /** Optional link to a dedicated physician bio page. */
  profileHref?: string
}

export const TEAM_INTRO = {
  eyebrow: 'Leadership',
  title: 'The Team Behind PulsePoint Clinic',
  body: 'PulsePoint Clinic is led by an experienced team of physicians and healthcare professionals committed to delivering accessible, patient-centered cardiovascular care. Together, our leadership team combines clinical excellence, operational expertise, and a shared commitment to building a better healthcare experience for patients throughout Mid-Missouri.',
} as const

/** Leadership roster for the About Team page — physicians first, then founding directors. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: 'martin-tibuakuu',
    name: 'Dr. Martin Tibuakuu, MD, MPH, FACC',
    title: 'Physician Founder & Chief Executive Officer',
    image: '/assets/physician-headshot.png',
    imageAlt: 'Dr. Martin Tibuakuu, Physician Founder and CEO of PulsePoint Clinic',
    profileHref: '/physicians/martin-tibuakuu',
  },
  {
    slug: 'james-fairlamb',
    name: 'Dr. James Fairlamb, MD, FACC',
    title: 'Chief Medical Officer',
    image: '/assets/physician-fairlamb.png',
    imageAlt: 'Dr. James Fairlamb, Chief Medical Officer at PulsePoint Clinic',
    profileHref: '/physicians/james-fairlamb',
  },
  {
    slug: 'afton-miller',
    name: 'Afton Miller',
    title: 'Founding Director of Clinical Operations & Cardiovascular Imaging',
    image: '/assets/team/afton-miller.png',
    imageAlt: 'Afton Miller, Founding Director of Clinical Operations and Cardiovascular Imaging',
  },
  {
    slug: 'janelle-bond',
    name: 'Janelle Bond',
    title: 'Founding Director of Patient Experience & Access',
    image: '/assets/team/janelle-bond.png',
    imageAlt: 'Janelle Bond, Founding Director of Patient Experience and Access',
  },
  {
    slug: 'chrissy-teter',
    name: 'Chrissy Teter',
    title: 'Founding Director of Finance, Human Resources & Administration',
    image: '/assets/team/chrissy-teter.png',
    imageAlt: 'Chrissy Teter, Founding Director of Finance, Human Resources and Administration',
  },
  {
    slug: 'josh-abbey',
    name: 'Josh Abbey',
    title: 'Technology & Digital Operations Manager',
    image: '/assets/team/josh-abbey.png',
    imageAlt: 'Josh Abbey, Technology and Digital Operations Manager at PulsePoint Clinic',
  },
]
