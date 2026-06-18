export type PhysicianProfile = {
  name: string
  title: string
  image: string
  imageAlt: string
  intro: string[]
  fullBio: string[]
  credentials: { icon: string; label: string }[]
}

/** Shared physician roster for homepage and about page. */
export const PHYSICIANS: PhysicianProfile[] = [
  {
    name: 'Dr. Martin Tibuakuu, MD, MPH, FACC',
    title: 'Founder & Cardiologist',
    image: '/assets/physician-headshot.png',
    imageAlt: 'Dr. Martin Tibuakuu, founder and cardiologist at PulsePoint Clinic',
    intro: [
      'Dr. Martin Tibuakuu is a board-certified cardiologist, epidemiologist, and preventive cardiovascular specialist dedicated to transforming the way heart disease is prevented and treated.',
      "Born and raised in northern Ghana, Dr. Tibuakuu's passion for cardiovascular medicine was shaped by personal tragedy and firsthand exposure to profound healthcare disparities. That experience became the driving force behind his lifelong commitment to heart disease prevention, early detection, and expanding access to high-quality cardiovascular care.",
    ],
    fullBio: [
      'At the age of 12, he lost his mother to undiagnosed hypertension - a preventable condition made more devastating by the severe lack of access to healthcare in his rural community.',
      'Dr. Tibuakuu received advanced training in both medicine and public health, developing a unique perspective that bridges clinical cardiology with population health and disease prevention. He completed a postdoctoral research fellowship at the internationally renowned Johns Hopkins Ciccarone Center for the Prevention of Heart Disease, where he trained under world-leading experts in preventive cardiology and cardiovascular epidemiology.',
      'His research has focused extensively on cardiovascular prevention, cardiometabolic disease, and healthcare disparities, contributing to numerous peer-reviewed scientific publications and national presentations aimed at improving cardiovascular outcomes across diverse populations.',
      'He subsequently completed fellowship training in cardiovascular disease at the world-renowned Johns Hopkins Hospital, where he received advanced training in non-invasive cardiology, cardiac imaging, preventive cardiology, and complex cardiovascular care.',
      'Dr. Tibuakuu is a Fellow of the American College of Cardiology and brings a modern, prevention-focused philosophy to patient care - combining evidence-based medicine, advanced diagnostics, lifestyle optimization, and personalized treatment strategies.',
      'Through PulsePoint, his vision is to build a next-generation cardiovascular platform that delivers world-class heart care with an emphasis on prevention, early detection, innovation, and compassionate patient-centered care.',
    ],
    credentials: [
      { icon: 'shield', label: 'Board Certified' },
      { icon: 'heart', label: 'Expertise in Preventive Cardiology' },
      { icon: 'monitor', label: 'Published Researcher in Cardiovascular Prevention' },
      { icon: 'partnership', label: 'Advocate for Health Equity & Access to High-Quality Cardiovascular Care' },
      { icon: 'leaf', label: 'Expertise in Cardiometabolic Health' },
      { icon: 'monitor', label: 'Expertise in Multimodality Cardiac Imaging' },
    ],
  },
  {
    name: 'Dr. James E. Fairlamb, MD, FACC',
    title: 'Cardiologist',
    image: '/assets/physician-fairlamb.png',
    imageAlt: 'Dr. James E. Fairlamb, cardiologist at PulsePoint Clinic',
    intro: [
      "Dr. James E. Fairlamb is a board-certified cardiologist with decades of experience delivering comprehensive, patient-centered cardiovascular care across Missouri and surrounding communities. Known for his clinical excellence, compassionate bedside manner, and deep commitment to his patients, he has become one of the region's most respected and trusted cardiologists.",
      "Dr. Fairlamb is a Fellow of the American College of Cardiology and has been voted Best Cardiologist in Missouri by Missouri's Best Magazine in 2024, 2025, and 2026.",
    ],
    fullBio: [
      'Originally trained at the University of the Witwatersrand Medical School, Dr. Fairlamb built an extensive medical foundation spanning internal medicine, critical care, emergency medicine, and cardiovascular disease across South Africa, Canada, and the United States.',
      'He completed advanced fellowship training in cardiovascular medicine and cardiovascular imaging at Washington University School of Medicine and Barnes-Jewish Hospital, developing specialized expertise in echocardiography, cardiac CT, cardiac MRI, nuclear cardiology, lipid management, and preventive cardiovascular care.',
      'Throughout his career, Dr. Fairlamb has served patients across both urban and rural communities, earning a reputation for clinical precision, accessibility, and individualized care. His broad clinical background includes leadership experience in critical care medicine, cardiovascular imaging, inpatient cardiology, and preventive cardiology, allowing him to bring a uniquely comprehensive perspective to heart health and complex cardiovascular disease management.',
      'His clinical interests include preventive cardiology, cholesterol management, coronary artery disease, heart failure, advanced cardiac imaging, and complex cardiovascular diagnostics. He has also contributed to cardiovascular imaging research and national scientific presentations focused on advanced cardiac MRI and non-invasive imaging techniques.',
      'At PulsePoint, Dr. Fairlamb brings a thoughtful, relationship-driven approach to cardiovascular medicine - combining decades of experience with modern, evidence-based heart care focused on prevention, precision, and compassionate patient outcomes.',
    ],
    credentials: [
      { icon: 'shield', label: 'Board-Certified Cardiologist with Decades of Clinical Experience' },
      { icon: 'heart', label: 'Renowned Expert in Preventive Cardiology' },
      { icon: 'activity', label: 'Renowned Expert in Lipid Management' },
      { icon: 'leaf', label: 'Expertise in Cardiometabolic Management' },
      { icon: 'monitor', label: 'Extensive Background in Complex Cardiac Disease Management' },
      { icon: 'star', label: "Three-Time Recipient of Missouri's Best Cardiologist Award (2024, 2025, 2026)" },
    ],
  },
]
