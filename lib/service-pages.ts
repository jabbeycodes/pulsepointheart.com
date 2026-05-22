export type ServicePage = {
  slug: string
  eyebrow: string
  title: string
  shortTitle: string
  description: string
  heroText: string
  image?: string
  overview: string
  reasons: string[]
  includes: string[]
  process: {
    title: string
    text: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'preventive-cardiology',
    eyebrow: 'Preventive Cardiology',
    title: 'Preventive cardiology in Columbia, MO',
    shortTitle: 'Preventive Cardiology',
    description:
      'Personalized preventive cardiology in Columbia, MO focused on risk assessment, blood pressure, cholesterol, lifestyle, and long-term heart health planning.',
    heroText:
      'A proactive approach to heart care for patients who want to understand risk early and build a practical plan before problems become urgent.',
    overview:
      'Preventive cardiology connects your history, family risk, blood pressure, cholesterol, metabolic health, imaging, and daily habits into one clear cardiovascular plan. The goal is to identify what matters most, explain why it matters, and help you take the next step with confidence.',
    reasons: [
      'Family history of heart disease',
      'High blood pressure or cholesterol',
      'Borderline or abnormal lab results',
      'Questions about calcium score or imaging findings',
      'Desire for a long-term prevention plan',
      'Second opinion on medication or risk reduction',
    ],
    includes: [
      'Cardiovascular risk review',
      'Medication and supplement review',
      'Blood pressure and cholesterol strategy',
      'Lifestyle and exercise guidance',
      'Testing recommendations when appropriate',
      'Written next-step planning',
    ],
    process: [
      {
        title: 'Risk review',
        text: 'We start with your history, family history, labs, medications, symptoms, prior testing, and personal goals.',
      },
      {
        title: 'Targeted recommendations',
        text: 'Your plan may include prevention targets, medication options, diagnostic testing, or lifestyle priorities.',
      },
      {
        title: 'Follow-through',
        text: 'Follow-up is designed to track progress, clarify results, and adjust the plan as your risk picture changes.',
      },
    ],
    faqs: [
      {
        question: 'Do I need symptoms to see a preventive cardiologist?',
        answer:
          'No. Many patients seek preventive cardiology because of family history, risk factors, abnormal labs, or a desire to understand their cardiovascular risk before symptoms appear.',
      },
      {
        question: 'Will I need testing?',
        answer:
          'Not always. Testing is recommended when it can clarify risk or change the care plan.',
      },
    ],
  },
  {
    slug: 'echocardiography',
    eyebrow: 'Echocardiography',
    title: 'Echocardiography in Columbia, MO',
    shortTitle: 'Echocardiography',
    description:
      'Echocardiography at PulsePoint Clinic uses ultrasound imaging to evaluate heart structure, pumping function, valves, and related cardiovascular concerns.',
    heroText:
      'Noninvasive ultrasound imaging that helps explain how the heart is structured, how it pumps, and whether valves or pressures need closer attention.',
    image: '/assets/diagnostics/echocardiography.png',
    overview:
      'An echocardiogram uses ultrasound to create moving images of the heart. It can help evaluate pumping strength, chamber size, valve function, fluid around the heart, and other structural findings that may explain symptoms or guide follow-up care.',
    reasons: [
      'Heart murmur evaluation',
      'Shortness of breath or swelling',
      'Chest discomfort workup',
      'Valve disease monitoring',
      'Heart function assessment',
      'Follow-up after abnormal testing',
    ],
    includes: [
      'Physician-directed indication review',
      'Heart structure and function assessment',
      'Valve evaluation',
      'Results explanation',
      'Recommended next steps',
      'Coordination with ongoing care',
    ],
    process: [
      {
        title: 'Prepare',
        text: 'The team reviews why the test is being done and what question it should help answer.',
      },
      {
        title: 'Image',
        text: 'Ultrasound images are captured in a comfortable clinical setting without radiation.',
      },
      {
        title: 'Plan',
        text: 'Results are interpreted in context and connected to prevention, treatment, or follow-up recommendations.',
      },
    ],
    faqs: [
      {
        question: 'Is echocardiography invasive?',
        answer:
          'A standard echocardiogram is noninvasive and uses ultrasound imaging from outside the chest.',
      },
      {
        question: 'What can an echo show?',
        answer:
          'It can show pumping function, valve function, chamber size, wall thickness, and other structural information.',
      },
    ],
  },
  {
    slug: 'vascular-ultrasound',
    eyebrow: 'Vascular Ultrasound',
    title: 'Vascular ultrasound in Columbia, MO',
    shortTitle: 'Vascular Ultrasound',
    description:
      'Vascular ultrasound in Columbia, MO for noninvasive assessment of circulation, blood flow, vascular risk, and selected artery or vein concerns.',
    heroText:
      'A noninvasive way to evaluate blood flow and vascular health when symptoms, risk factors, or prior results need a clearer explanation.',
    image: '/assets/diagnostics/vascular-ultrasound.png',
    overview:
      'Vascular ultrasound uses sound waves to evaluate blood flow in targeted vessels. It can support assessment of circulation concerns, leg symptoms, carotid risk, peripheral vascular disease, and selected vein or artery questions.',
    reasons: [
      'Leg pain, swelling, or circulation concerns',
      'Peripheral artery disease risk',
      'Carotid artery evaluation',
      'Vascular risk in diabetes or smoking history',
      'Follow-up of abnormal vascular findings',
      'Clarifying whether symptoms may be circulation-related',
    ],
    includes: [
      'Focused vascular history',
      'Targeted ultrasound imaging',
      'Blood flow assessment',
      'Risk factor review',
      'Results explanation',
      'Treatment or referral guidance',
    ],
    process: [
      {
        title: 'Localize the concern',
        text: 'Symptoms and risk factors help determine which vessels should be evaluated.',
      },
      {
        title: 'Capture flow data',
        text: 'Ultrasound assesses blood flow and vessel characteristics in the targeted area.',
      },
      {
        title: 'Connect the findings',
        text: 'Results are explained alongside prevention, medication, monitoring, or referral options.',
      },
    ],
    faqs: [
      {
        question: 'Does vascular ultrasound use radiation?',
        answer:
          'No. Vascular ultrasound uses sound waves and does not involve radiation.',
      },
      {
        question: 'What areas can be evaluated?',
        answer:
          'The exact study depends on the clinical question, but vascular ultrasound can assess selected arteries or veins such as leg vessels or carotid arteries.',
      },
    ],
  },
  {
    slug: 'stress-testing',
    eyebrow: 'Stress Testing',
    title: 'Cardiac stress testing in Columbia, MO',
    shortTitle: 'Stress Testing',
    description:
      'Cardiac stress testing in Columbia, MO to evaluate heart performance with exertion and support chest discomfort, exercise tolerance, or coronary risk assessment.',
    heroText:
      'A guided test that helps assess how the heart responds under physical demand and whether symptoms or risk factors need more attention.',
    image: '/assets/diagnostics/stress-testing.png',
    overview:
      'Stress testing evaluates heart performance during exercise or a clinically guided stress protocol. It can help assess exercise tolerance, rhythm changes, blood pressure response, symptoms, and whether additional coronary evaluation may be needed.',
    reasons: [
      'Chest discomfort with activity',
      'Shortness of breath during exertion',
      'Exercise tolerance concerns',
      'Coronary risk assessment',
      'Return-to-activity questions',
      'Follow-up after abnormal testing',
    ],
    includes: [
      'Pre-test safety review',
      'Monitored exercise or guided protocol',
      'Heart rhythm and blood pressure tracking',
      'Symptom assessment',
      'Physician interpretation',
      'Next-step recommendations',
    ],
    process: [
      {
        title: 'Screen',
        text: 'The team reviews your history and medications to choose an appropriate testing approach.',
      },
      {
        title: 'Monitor',
        text: 'Heart rhythm, blood pressure, exertion, and symptoms are monitored during the test.',
      },
      {
        title: 'Interpret',
        text: 'Findings are reviewed in context and used to guide prevention, treatment, or further testing.',
      },
    ],
    faqs: [
      {
        question: 'What should I wear?',
        answer:
          'Wear comfortable clothing and shoes suitable for walking or exercise unless the clinic gives different instructions.',
      },
      {
        question: 'Is stress testing right for everyone?',
        answer:
          'No. The test type depends on your history, symptoms, risk factors, and safety considerations.',
      },
    ],
  },
  {
    slug: 'heart-rhythm-monitoring',
    eyebrow: 'Heart Rhythm Monitoring',
    title: 'Heart rhythm monitoring in Columbia, MO',
    shortTitle: 'Heart Rhythm Monitoring',
    description:
      'Heart rhythm monitoring in Columbia, MO for palpitations, dizziness, atrial fibrillation screening, and intermittent rhythm symptoms.',
    heroText:
      'Wearable monitoring can capture rhythm changes over time when symptoms are intermittent or do not appear during a short office visit.',
    image: '/assets/diagnostics/heart-rhythm-monitoring.png',
    overview:
      'Heart rhythm monitoring records electrical activity over a longer period so intermittent symptoms can be matched with rhythm data. It may be useful for palpitations, dizziness, irregular heartbeat concerns, or atrial fibrillation screening.',
    reasons: [
      'Palpitations or fluttering',
      'Dizziness or near-fainting episodes',
      'Irregular heartbeat concerns',
      'Atrial fibrillation screening',
      'Medication or treatment follow-up',
      'Symptoms that come and go',
    ],
    includes: [
      'Monitor selection guidance',
      'Placement instructions',
      'Recording period based on symptoms',
      'Rhythm report review',
      'Physician interpretation',
      'Treatment or follow-up plan',
    ],
    process: [
      {
        title: 'Choose the monitor',
        text: 'The monitoring period and device type are matched to how often symptoms occur.',
      },
      {
        title: 'Record rhythm data',
        text: 'The wearable device captures rhythm information during normal daily activity.',
      },
      {
        title: 'Review patterns',
        text: 'Results are interpreted and connected to symptom patterns, risk, and treatment options.',
      },
    ],
    faqs: [
      {
        question: 'Why not just do an ECG?',
        answer:
          'An ECG captures a short moment in time. Monitoring can capture rhythm changes that happen later or only occasionally.',
      },
      {
        question: 'Can monitoring detect atrial fibrillation?',
        answer:
          'It can help identify rhythm patterns consistent with atrial fibrillation or other rhythm concerns when they occur during the recording period.',
      },
    ],
  },
  {
    slug: 'executive-health',
    eyebrow: 'Executive Health',
    title: 'Executive heart health in Columbia, MO',
    shortTitle: 'Executive Health',
    description:
      'Executive heart health at PulsePoint Clinic provides efficient, premium cardiovascular prevention, advanced screening guidance, and physician-led wellness planning for busy professionals.',
    heroText:
      'A streamlined cardiovascular wellness experience for busy patients who want clarity, prevention, advanced screening guidance, and physician-led planning without fragmented care.',
    overview:
      'Executive heart health is designed for patients who want a precise understanding of cardiovascular risk, a clear prevention strategy, and efficient coordination of testing and follow-up. The experience emphasizes access, clarity, advanced screening guidance, and long-term heart health optimization.',
    reasons: [
      'Busy schedule with limited time for fragmented visits',
      'Desire for a comprehensive cardiovascular baseline',
      'Family history of early heart disease',
      'Blood pressure, cholesterol, or metabolic risk concerns',
      'Interest in advanced heart screening',
      'Executive, entrepreneur, or high-demand professional lifestyle',
      'Need for a concise written prevention plan',
    ],
    includes: [
      'Comprehensive cardiovascular risk review',
      'Advanced screening recommendations',
      'Medication and lifestyle strategy',
      'Cardiometabolic wellness review',
      'Executive-ready summary of priorities',
      'Efficient visit planning',
      'Written prevention priorities',
    ],
    process: [
      {
        title: 'Establish the baseline',
        text: 'We review risk factors, lifestyle, labs, family history, prior testing, and goals to understand the full cardiovascular picture.',
      },
      {
        title: 'Coordinate the right data',
        text: 'Recommended diagnostics are selected intentionally so testing supports decisions rather than creating noise.',
      },
      {
        title: 'Leave with a plan',
        text: 'You receive clear next steps for prevention, wellness, monitoring, and follow-up.',
      },
    ],
    faqs: [
      {
        question: 'Is executive heart health only for executives?',
        answer:
          'No. The service is for any patient who wants an efficient, premium, prevention-focused cardiovascular evaluation with clear next steps.',
      },
      {
        question: 'Does this replace emergency care?',
        answer:
          'No. New or severe symptoms should be handled urgently. Executive health is designed for prevention, planning, screening, and follow-up.',
      },
      {
        question: 'Can testing be coordinated efficiently?',
        answer:
          'Yes. Recommended testing is selected intentionally and coordinated around the clinical question, so the experience stays focused instead of fragmented.',
      },
    ],
  },
  {
    slug: 'cardiometabolic-wellness',
    eyebrow: 'Cardiometabolic Wellness',
    title: 'Cardiometabolic wellness in Columbia, MO',
    shortTitle: 'Cardiometabolic Wellness',
    description:
      'Cardiometabolic wellness at PulsePoint Clinic helps patients address blood pressure, cholesterol, insulin resistance, weight-related risk, inflammation, and long-term cardiovascular prevention.',
    heroText:
      'A physician-led approach to metabolic risk, cardiovascular wellness, and heart health optimization for patients who want prevention to be more precise and more personal.',
    overview:
      'Cardiometabolic wellness connects the major drivers of cardiovascular risk: blood pressure, cholesterol, blood sugar, weight, inflammation, sleep, activity, stress, and family history. PulsePoint helps patients understand how these factors interact and turns that information into a practical prevention plan built around long-term cardiovascular health.',
    reasons: [
      'High blood pressure or cholesterol',
      'Prediabetes or diabetes risk',
      'Weight-related cardiovascular risk',
      'Family history of early heart disease',
      'Inflammation or abnormal metabolic labs',
      'Sleep, stress, or lifestyle patterns affecting risk',
      'Desire for longevity-focused prevention',
    ],
    includes: [
      'Cardiometabolic risk review',
      'Blood pressure and cholesterol strategy',
      'Blood sugar and insulin resistance review',
      'Medication and supplement review',
      'Lifestyle and nutrition priorities',
      'Advanced screening recommendations',
      'Long-term wellness planning',
    ],
    process: [
      {
        title: 'Map the risk picture',
        text: 'Your history, labs, blood pressure, weight trends, family history, sleep, activity, and prior testing are reviewed together.',
      },
      {
        title: 'Set prevention targets',
        text: 'The plan identifies which numbers and behaviors matter most for reducing cardiovascular risk over time.',
      },
      {
        title: 'Track and refine',
        text: 'Follow-up focuses on progress, tolerability, updated results, and whether the plan needs to change.',
      },
    ],
    faqs: [
      {
        question: 'Is this the same as primary care?',
        answer:
          'No. Cardiometabolic wellness is focused specifically on metabolic factors that drive cardiovascular risk and how they should shape prevention planning. It can complement your primary care relationship.',
      },
      {
        question: 'Do I need abnormal labs to benefit?',
        answer:
          'Not necessarily. Patients often seek this care because risk is emerging, family history is strong, or they want a more precise prevention strategy.',
      },
      {
        question: 'Does this include weight-loss medication?',
        answer:
          'Medication questions can be reviewed as part of the broader cardiovascular risk plan. Recommendations depend on your history, labs, goals, safety considerations, and coordination with the rest of your care team.',
      },
    ],
  },
  {
    slug: 'cardiac-ct-calcium-scoring',
    eyebrow: 'Cardiac CT & Calcium Scoring',
    title: 'Cardiac CT and calcium scoring in Columbia, MO',
    shortTitle: 'Cardiac CT & Calcium Scoring',
    description:
      'Cardiac CT and calcium scoring guidance in Columbia, MO to help clarify coronary plaque burden and refine prevention decisions.',
    heroText:
      'Advanced imaging guidance for selected patients who need a clearer picture of coronary risk and prevention priorities.',
    image: '/assets/diagnostics/cardiac-ct-calcium.png',
    overview:
      'Cardiac CT and calcium scoring can help estimate coronary plaque burden and refine cardiovascular risk. PulsePoint helps patients understand when imaging is useful, what the results mean, and how findings should guide prevention.',
    reasons: [
      'Intermediate heart disease risk',
      'Family history of premature heart disease',
      'Uncertainty about cholesterol medication',
      'Prior calcium score needing explanation',
      'Preventive cardiology planning',
      'Coronary risk refinement',
    ],
    includes: [
      'Risk and imaging history review',
      'Discussion of whether CT is appropriate',
      'Calcium score interpretation',
      'Prevention medication discussion',
      'Lifestyle and follow-up planning',
      'Coordination when advanced imaging is needed',
    ],
    process: [
      {
        title: 'Decide if it fits',
        text: 'Imaging is considered when it can meaningfully refine risk or guide prevention decisions.',
      },
      {
        title: 'Interpret the score',
        text: 'Findings are explained in plain language alongside your age, risk factors, and goals.',
      },
      {
        title: 'Act on the result',
        text: 'The plan may include medication, lifestyle changes, follow-up testing, or ongoing monitoring.',
      },
    ],
    faqs: [
      {
        question: 'Is a calcium score the same as a diagnosis?',
        answer:
          'A calcium score is one piece of risk information. It should be interpreted with your full clinical picture.',
      },
      {
        question: 'Who should consider calcium scoring?',
        answer:
          'It may help selected patients when risk is uncertain or when the result could change prevention decisions.',
      },
    ],
  },
]

export const SERVICE_PAGE_PATHS = SERVICE_PAGES.map((service) => `/services/${service.slug}`)

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((service) => service.slug === slug)
}
