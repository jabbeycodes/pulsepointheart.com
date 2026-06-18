import { servicePathwayHref } from '@/lib/service-pathways'

export const HOME_TRUST_INDICATORS = [
  'Board-Certified Cardiologists',
  'State-of-the-Art Technology',
  'Insurance Accepted',
  'Patient-Centered Care',
] as const

export const HOME_DIFFERENTIATORS = [
  {
    title: 'Physician-Led Care',
    text: 'Expert cardiovascular care directed by board-certified cardiologists.',
    icon: 'physician',
  },
  {
    title: 'More Time. Better Care.',
    text: 'Longer visits focused on listening, clarity, and thoughtful planning.',
    icon: 'clock',
  },
  {
    title: 'Advanced Technology',
    text: 'Modern diagnostics and technology for earlier detection and precision.',
    icon: 'monitor',
  },
  {
    title: 'Whole-Person Approach',
    text: 'Care that considers lifestyle, prevention, and long-term wellness.',
    icon: 'person',
  },
  {
    title: 'Prevention Focused',
    text: 'Proactive strategies to reduce risk before problems become urgent.',
    icon: 'heart',
  },
  {
    title: 'Coordinated Care',
    text: 'Multiple cardiovascular specialties working together in one platform.',
    icon: 'network',
  },
] as const

export const HOME_SERVICE_CARDS = [
  {
    id: 'core-cardiology',
    title: 'Core Cardiology',
    description: 'Insurance-based cardiovascular care for prevention, diagnosis, and treatment.',
    href: '/services/preventive-cardiology',
    icon: 'heart',
  },
  {
    id: 'premium-executive-care',
    title: 'Premium Cardiovascular Care',
    description:
      'Membership-based care with elevated access, comprehensive evaluations, and personalized attention.',
    href: '/premium-cardiovascular-care',
    icon: 'star',
  },
  {
    id: 'vein-vascular-clinic',
    title: 'Vein & Vascular Clinic',
    description: 'Advanced treatments for vein conditions and vascular disease.',
    href: '/services#vein-vascular-clinic',
    icon: 'vein',
  },
  {
    id: 'cardiometabolic-weight-center',
    title: 'Cardiometabolic & Weight Center',
    description: 'Evidence-based programs for weight optimization, metabolic health, and lasting results.',
    href: '/cardiometabolic-weight-loss',
    icon: 'leaf',
  },
  {
    id: 'imaging-diagnostics',
    title: 'Imaging & Diagnostics',
    description: 'Advanced testing and imaging for accurate answers and confident treatment decisions.',
    href: '/diagnostics',
    icon: 'monitor',
  },
] as const

export const HOME_PREMIUM_FEATURES = [
  { title: 'Extended Appointments', icon: 'calendar' },
  { title: 'Same or Next-Day Access', icon: 'clock-fast' },
  { title: 'Comprehensive Annual Evaluations', icon: 'clipboard' },
  { title: 'Ongoing Wellness Guidance', icon: 'heart' },
] as const

export const HOME_DIAGNOSTIC_TILES = [
  {
    title: 'Echocardiogram',
    image: '/assets/diagnostics/echocardiogram-tte.png',
    href: '/services/echocardiography',
  },
  {
    title: 'Stress Testing',
    image: '/assets/diagnostics/exercise-stress-ecg.png',
    href: '/services/stress-testing',
  },
  {
    title: 'Vascular Ultrasound',
    image: '/assets/diagnostics/carotid-ultrasound.png',
    href: '/services/vascular-ultrasound',
  },
  {
    title: 'Heart Rhythm Monitoring',
    image: '/assets/diagnostics/holter-monitor.png',
    href: '/services/heart-rhythm-monitoring',
  },
  {
    title: 'Advanced Cardiac Imaging',
    image: '/assets/diagnostics/diagnostics-hero.png',
    href: '/diagnostics',
  },
] as const

export const HOME_WELLNESS_FEATURES = [
  { title: 'Lifestyle Optimization', icon: 'dumbbell' },
  { title: 'Risk Factor Management', icon: 'shield' },
  { title: 'Nutrition Guidance', icon: 'apple' },
  { title: 'Exercise Support', icon: 'exercise' },
  { title: 'Stress Reduction', icon: 'moon' },
] as const

export const HOME_ECOSYSTEM = [
  {
    label: 'Core Cardiology',
    description: 'Insurance-based prevention, diagnosis, and treatment.',
    href: '/services/preventive-cardiology',
    icon: 'heart',
  },
  {
    label: 'Imaging & Diagnostics',
    description: 'Advanced testing for accurate answers.',
    href: '/diagnostics',
    icon: 'monitor',
  },
  {
    label: 'Premium Cardiovascular Care',
    description: 'Elevated access and comprehensive evaluations.',
    href: '/premium-cardiovascular-care',
    icon: 'star',
  },
  {
    label: 'Vein & Vascular Clinic',
    description: 'Advanced vein and vascular treatments.',
    href: '/services#vein-vascular-clinic',
    icon: 'vein',
  },
  {
    label: 'Cardiometabolic & Weight Center',
    description: 'Metabolic health and lasting results.',
    href: '/cardiometabolic-weight-loss',
    icon: 'leaf',
  },
] as const

/** Re-export for components that need full pathway href logic */
export { servicePathwayHref }
