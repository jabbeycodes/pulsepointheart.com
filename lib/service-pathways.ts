export type ServicePathway = {
  marker: 'A' | 'B' | 'C' | 'D' | 'E'
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  comingSoon?: boolean
  description: string
  services: string[]
}

export const SERVICE_PATHWAYS: ServicePathway[] = [
  {
    marker: 'A',
    id: 'core-cardiology',
    title: 'PulsePoint Core Cardiology',
    subtitle: 'Compatible with Insurance',
    image: '/assets/services/core-cardiology-consult.png',
    href: '/services/preventive-cardiology',
    description:
      'Comprehensive evaluation and management of cardiovascular disease using evidence-based medicine and coordinated specialty care.',
    services: [
      'Hypertension Management',
      'Coronary Artery Disease',
      'Arrhythmia Evaluation',
      'Heart Failure Management',
      'Preventive Cardiology',
      'Chest Pain Evaluation',
      'Cardiac Risk Assessment',
      'Second Opinions & Consultations',
    ],
  },
  {
    marker: 'B',
    id: 'premium-executive-care',
    title: 'PulsePoint Premium & Executive Cardiovascular Care',
    subtitle: 'Membership Based',
    image: '/assets/services/premium-executive-consult.png',
    href: '/premium-cardiovascular-care',
    description:
      'A highly personalized experience focused on prevention, physician access, executive screening, wellness optimization, and long-term health planning.',
    services: [
      'Extended Appointments',
      'Same/Next-Day Access',
      'Comprehensive Annual Evaluation',
      'Executive Cardiovascular Screening',
      'Direct Physician Communication',
      'Personalized Wellness Planning',
      'Lifestyle Optimization',
      'Preventive Diagnostics',
    ],
  },
  {
    marker: 'C',
    id: 'vein-vascular-clinic',
    title: 'PulsePoint Vein & Vascular Clinic',
    subtitle: 'Insurance and Self-Pay Options Available',
    image: '/assets/diagnostics/vascular-ultrasound.png',
    href: '/services/vascular-ultrasound',
    comingSoon: true,
    description:
      'Advanced evaluation and treatment of venous and vascular conditions using minimally invasive techniques and modern diagnostics.',
    services: [
      'Venous Insufficiency Evaluation',
      'Varicose Vein Treatment',
      'Spider Vein Treatment',
      'Leg Swelling & Circulation Evaluation',
      'Peripheral Artery Disease (PAD) Screening and Prevention',
      'Vascular Ultrasound & Diagnostic Testing',
      'Minimally Invasive Vein Procedures (RFA, VenaSeal, Sclerotherapy)',
    ],
  },
  {
    marker: 'D',
    id: 'cardiometabolic-weight-center',
    title: 'PulsePoint Cardiometabolic & Weight Center',
    subtitle: 'Membership Based',
    image: '/assets/services/cardiometabolic-bowl.png',
    href: '/cardiometabolic-weight-loss',
    description:
      'A comprehensive program integrating obesity medicine, preventive cardiology, lifestyle medicine, and metabolic health optimization.',
    services: [
      'Weight Management',
      'GLP-1 Therapy',
      'Obesity Medicine',
      'Diabetes Risk Reduction',
      'Lifestyle Coaching',
      'Nutrition Guidance',
      'Body Composition Analysis',
    ],
  },
  {
    marker: 'E',
    id: 'imaging-diagnostics',
    title: 'PulsePoint Imaging & Diagnostics',
    subtitle: 'Physician-Led Diagnostics Excellence',
    image: '/assets/services/diagnostics-suite.png',
    href: '/diagnostics',
    description:
      'State-of-the-art cardiovascular imaging and diagnostic testing for early detection, accurate diagnosis, and personalized treatment.',
    services: [
      'Echocardiography',
      'Vascular Ultrasound',
      'Stress Testing',
      'Rhythm Monitoring',
      'Nuclear Cardiology (Coming Soon)',
      'Cardiac CT (Coming Soon)',
      'Preventive Cardiovascular Screening',
    ],
  },
]

export function servicePathwayHref(pathway: ServicePathway) {
  if (pathway.comingSoon) return `/services#${pathway.id}`
  return pathway.href
}

/** Footer and other site-wide nav should mirror the services page pathways. */
export const FOOTER_SERVICE_LINKS = SERVICE_PATHWAYS.map((pathway) => ({
  href: servicePathwayHref(pathway),
  label: pathway.title,
}))
