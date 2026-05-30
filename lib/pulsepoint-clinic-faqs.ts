export type FaqBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; intro?: string; items: string[] }

export type PulsePointFaq = {
  question: string
  blocks: FaqBlock[]
}

export const PULSEPOINT_CLINIC_FAQS: PulsePointFaq[] = [
  {
    question: '1. Is PulsePoint a concierge cardiology practice?',
    blocks: [
      { type: 'paragraph', text: 'No. PulsePoint is not just a concierge practice.' },
      {
        type: 'paragraph',
        text: 'PulsePoint is a modern cardiovascular clinic with multiple care pathways:',
      },
      {
        type: 'list',
        items: [
          'Core Cardiology for patients with established or suspected heart disease, where we accept insurance.',
          'Premium & Executive Cardiovascular Care for patients who want a more personalized, prevention-focused, membership-based experience.',
          'Vein & Vascular Care for vein and vascular conditions.',
          'Cardiometabolic & Weight Center for patients needing structured metabolic, obesity, and cardiovascular risk care.',
          'Imaging & Diagnostics for heart and vascular testing.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Our goal is to provide the right level of care for the right patient.',
      },
    ],
  },
  {
    question: '2. Do you accept insurance?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Yes. PulsePoint accepts insurance for our Core Cardiology services.',
      },
      {
        type: 'paragraph',
        text: 'This includes evaluation and management of established or suspected cardiovascular conditions such as:',
      },
      {
        type: 'list',
        items: [
          'Hypertension, coronary artery disease, chest pain, arrhythmias, heart failure, palpitations, shortness of breath, abnormal testing, and cardiac risk evaluation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Patients receiving insurance-based care may still be responsible for normal insurance costs such as copays, deductibles, coinsurance, and non-covered services.',
      },
    ],
  },
  {
    question: '3. Who is Core Cardiology for?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Core Cardiology is for patients who need traditional cardiology care because they have symptoms, risk factors, or known cardiovascular disease.',
      },
      { type: 'paragraph', text: 'Examples include:' },
      {
        type: 'list',
        items: [
          'Chest pain, shortness of breath, high blood pressure, abnormal EKG, irregular heartbeat, heart failure, coronary artery disease, family history of heart disease, or referral from another doctor.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This pathway is generally billed through insurance.',
      },
    ],
  },
  {
    question: '4. What is Premium & Executive Cardiovascular Care?',
    blocks: [
      {
        type: 'paragraph',
        text: 'This is PulsePoint’s membership-based cardiovascular care program.',
      },
      {
        type: 'paragraph',
        text: 'It is designed for patients who want more than standard visit-based care, including more time, enhanced access, prevention planning, advanced screening, and a long-term cardiovascular wellness strategy.',
      },
      {
        type: 'paragraph',
        text: 'This program is not required for patients receiving Core Cardiology care.',
      },
    ],
  },
  {
    question: '5. Who should consider a membership-based program?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Membership-based care may be a good fit for people who:',
      },
      {
        type: 'list',
        items: [
          'Want a deeper preventive heart health plan, are executives or busy professionals, have a strong family history of heart disease, want advanced screening, want more time with the physician, want help optimizing blood pressure, cholesterol, weight, sleep, exercise, and metabolic health, or want a long-term cardiovascular wellness roadmap.',
        ],
      },
    ],
  },
  {
    question: '6. Does insurance cover the membership fee?',
    blocks: [
      { type: 'paragraph', text: 'Usually, no.' },
      {
        type: 'paragraph',
        text: 'Membership fees generally pay for services that are not typically covered by insurance, such as enhanced access, extended prevention planning, wellness coordination, executive-style cardiovascular screening, and personalized health planning.',
      },
    ],
  },
  {
    question: '7. What does the membership fee cover?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Depending on the specific PulsePoint program, the fee may cover:',
      },
      {
        type: 'list',
        items: [
          'Extended visits, more personalized prevention planning, enhanced physician access, annual cardiovascular wellness planning, care coordination, lifestyle and risk factor review, executive cardiovascular screening guidance, cardiometabolic planning, and longitudinal health optimization.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The membership fee is for the enhanced care experience and prevention-focused planning.',
      },
    ],
  },
  {
    question: '8. What does the membership fee not cover?',
    blocks: [
      {
        type: 'paragraph',
        text: 'The membership fee does not replace health insurance.',
      },
      { type: 'paragraph', text: 'It typically does not cover:' },
      {
        type: 'list',
        items: [
          'Hospital bills, emergency room care, procedures, outside specialist visits, medications, lab fees billed by outside labs, imaging performed by outside facilities, insurance copays, deductibles, coinsurance, or services your insurance determines are not covered.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Patients should keep their regular health insurance.',
      },
    ],
  },
  {
    question: '9. Can I be a PulsePoint patient without joining a membership program?',
    blocks: [
      { type: 'paragraph', text: 'Yes.' },
      {
        type: 'paragraph',
        text: 'Patients with established or suspected cardiovascular disease can be seen through PulsePoint Core Cardiology, which accepts insurance.',
      },
      {
        type: 'paragraph',
        text: 'Membership is optional and designed for patients seeking a different level of prevention, access, and wellness planning.',
      },
    ],
  },
  {
    question: '10. Is PulsePoint a weight loss clinic?',
    blocks: [
      {
        type: 'paragraph',
        text: 'No. PulsePoint is not simply a weight loss clinic.',
      },
      {
        type: 'paragraph',
        text: 'Our Cardiometabolic & Weight Center focuses on the connection between weight, metabolism, blood pressure, cholesterol, diabetes risk, inflammation, and heart disease prevention.',
      },
      {
        type: 'paragraph',
        text: 'Weight management may be part of care, but the goal is broader: reducing cardiovascular risk and improving long-term health.',
      },
    ],
  },
  {
    question: '11. Do you offer GLP-1 medications?',
    blocks: [
      { type: 'paragraph', text: 'Yes, when clinically appropriate.' },
      {
        type: 'paragraph',
        text: 'GLP-1 therapy may be offered as part of a structured cardiometabolic program for eligible patients. It is not a quick “weight loss shot” program. Patients receive medical evaluation, risk review, monitoring, lifestyle guidance, and cardiovascular prevention planning.',
      },
      {
        type: 'paragraph',
        text: 'Medication costs, lab costs, and insurance coverage vary.',
      },
    ],
  },
  {
    question: '12. What is the difference between Core Cardiology and Premium Cardiovascular Care?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Core Cardiology is traditional insurance-based cardiology for patients with heart symptoms, disease, or risk factors.',
      },
      {
        type: 'paragraph',
        text: 'Premium Cardiovascular Care is membership-based and designed for prevention, early detection, executive health, enhanced access, and personalized long-term planning.',
      },
      { type: 'paragraph', text: 'Some patients may use both.' },
    ],
  },
  {
    question: '13. Can I use insurance for testing?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Often, yes — if testing is medically necessary and covered by your insurance.',
      },
      {
        type: 'paragraph',
        text: 'Examples may include echocardiograms, stress testing, rhythm monitoring, vascular ultrasound, and other diagnostic studies.',
      },
      {
        type: 'paragraph',
        text: 'Coverage depends on your insurance plan, medical necessity, prior authorization requirements, deductibles, and copays.',
      },
    ],
  },
  {
    question: '14. What if I do not have heart disease but want prevention?',
    blocks: [
      {
        type: 'paragraph',
        text: 'That is where PulsePoint’s premium prevention and executive cardiovascular programs may be helpful.',
      },
      {
        type: 'paragraph',
        text: 'These programs are designed for people who want to understand their risk early and build a proactive plan before a major event occurs.',
      },
    ],
  },
  {
    question: '15. Will PulsePoint replace my primary care doctor?',
    blocks: [
      { type: 'paragraph', text: 'No.' },
      {
        type: 'paragraph',
        text: 'PulsePoint is focused on cardiovascular, vascular, cardiometabolic, preventive, and diagnostic care. We work alongside your primary care doctor and other specialists.',
      },
    ],
  },
  {
    question: '16. Can I still see other doctors or specialists?',
    blocks: [
      { type: 'paragraph', text: 'Yes.' },
      {
        type: 'paragraph',
        text: 'PulsePoint does not restrict where you receive care. We can help coordinate care when needed, but patients remain free to see other physicians, specialists, hospitals, or health systems.',
      },
    ],
  },
  {
    question: '17. Do you see Medicare patients?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Yes, PulsePoint accepts insurance, including Medicare plans where applicable. Patients should contact the office to confirm plan participation and benefits.',
      },
    ],
  },
  {
    question: '18. Is membership required for same-day or next-day appointments?',
    blocks: [
      { type: 'paragraph', text: 'Not always.' },
      {
        type: 'paragraph',
        text: 'Core Cardiology patients may be scheduled based on clinical urgency, availability, insurance requirements, and referral needs.',
      },
      {
        type: 'paragraph',
        text: 'Membership-based programs may include enhanced access features, depending on the specific program.',
      },
    ],
  },
  {
    question: '19. Can I cancel membership?',
    blocks: [
      {
        type: 'paragraph',
        text: 'PulsePoint should have a written membership agreement explaining cancellation terms, refund policies, and what happens if services have already been delivered.',
      },
      {
        type: 'paragraph',
        text: 'This should be clearly reviewed before enrollment.',
      },
    ],
  },
  {
    question: '20. Which PulsePoint pathway is right for me?',
    blocks: [
      {
        type: 'paragraph',
        text: 'If you have symptoms or known heart disease, start with Core Cardiology.',
      },
      {
        type: 'paragraph',
        text: 'If you want deeper prevention and executive-level planning, consider Premium & Executive Cardiovascular Care.',
      },
      {
        type: 'paragraph',
        text: 'If your concerns involve leg swelling, varicose veins, or vascular symptoms, consider Vein & Vascular Clinic.',
      },
      {
        type: 'paragraph',
        text: 'If your concerns involve weight, blood pressure, diabetes risk, cholesterol, or metabolic health, consider Cardiometabolic & Weight Center.',
      },
      {
        type: 'paragraph',
        text: 'If you need testing, PulsePoint Imaging & Diagnostics supports your care pathway.',
      },
    ],
  },
]
