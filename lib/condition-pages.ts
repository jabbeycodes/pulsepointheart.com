export type ConditionPage = {
  slug: string
  shortTitle: string
  title: string
  description: string
  heroText: string
  overview: string
  symptoms: string[]
  whenToSeeCardiologist: string[]
  howWeTreat: string[]
  relatedServicePath: string
  relatedDiagnosticPath?: string
  faqs: { question: string; answer: string }[]
}

export const CONDITION_PAGES: ConditionPage[] = [
  {
    slug: 'hypertension',
    shortTitle: 'Hypertension',
    title: 'Hypertension Treatment in Columbia, MO',
    description:
      'Board-certified cardiologists treating high blood pressure in Columbia, Missouri. Personalized hypertension management for patients in Boone County and Central Missouri. Call (855) 785-7337.',
    heroText:
      'High blood pressure often has no symptoms, yet it quietly damages the heart, brain, kidneys, and arteries. Physician-led hypertension care helps you understand your numbers and build a plan that works.',
    overview:
      'Hypertension is one of the most common — and most treatable — cardiovascular risk factors. At PulsePoint Clinic in Columbia, MO, our cardiologists evaluate blood pressure in context: your history, home readings, organ risk, medications, sleep, weight, and overall cardiovascular profile. The goal is durable control that protects your heart and brain for the long term.',
    symptoms: [
      'Often no symptoms until complications develop',
      'Headaches (sometimes, especially with very high readings)',
      'Shortness of breath with exertion',
      'Dizziness or visual changes (severe hypertension)',
      'Fatigue related to heart strain over time',
    ],
    whenToSeeCardiologist: [
      'Blood pressure consistently above 130/80 despite lifestyle changes',
      'Need for multiple medications or difficulty reaching goal',
      'White-coat hypertension or uncertain home vs. office readings',
      'Hypertension with diabetes, kidney disease, or heart disease',
      'Family history of stroke or heart attack with elevated BP',
    ],
    howWeTreat: [
      'Comprehensive cardiovascular and medication review',
      'Home blood pressure monitoring guidance',
      'Lifestyle counseling: sodium, weight, activity, sleep, stress',
      'Evidence-based medication optimization when indicated',
      'Coordination of labs and imaging when organ risk is a concern',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/diagnostics',
    faqs: [
      {
        question: 'When is high blood pressure dangerous?',
        answer:
          'Persistent hypertension damages arteries and increases risk of heart attack, stroke, heart failure, and kidney disease. The risk builds over years, which is why early treatment matters even when you feel fine.',
      },
      {
        question: 'Do I need a cardiologist for high blood pressure?',
        answer:
          'Many patients start with primary care. A cardiologist is helpful when blood pressure is hard to control, readings are inconsistent, or you have other cardiovascular conditions or risk factors.',
      },
      {
        question: 'Does PulsePoint treat hypertension in Columbia, MO?',
        answer:
          'Yes. PulsePoint Core Cardiology provides physician-led hypertension evaluation and management for patients in Columbia, Boone County, and surrounding Central Missouri communities.',
      },
    ],
  },
  {
    slug: 'heart-failure',
    shortTitle: 'Heart Failure',
    title: 'Heart Failure Specialist in Columbia, MO',
    description:
      'Expert heart failure management in Columbia, Missouri. Board-certified cardiologists at PulsePoint Clinic help patients understand symptoms, staging, and treatment options. (855) 785-7337.',
    heroText:
      'Heart failure means the heart cannot pump effectively — not that it has stopped. With the right plan, many patients live actively and reduce hospitalizations.',
    overview:
      'Heart failure affects how well the heart fills and pumps blood. Symptoms can develop gradually: shortness of breath, swelling, fatigue, or reduced exercise tolerance. PulsePoint cardiologists in Columbia, MO evaluate the underlying cause — coronary disease, hypertension, valve problems, or other factors — and build a personalized management plan focused on stability, function, and quality of life.',
    symptoms: [
      'Shortness of breath with activity or when lying flat',
      'Swelling in the legs, ankles, or abdomen',
      'Persistent fatigue or reduced stamina',
      'Rapid weight gain from fluid retention',
      'Persistent cough or wheezing',
    ],
    whenToSeeCardiologist: [
      'New or worsening shortness of breath',
      'Leg swelling that does not improve with elevation',
      'Known heart failure needing medication adjustment',
      'Recent hospitalization for fluid overload',
      'Ejection fraction concerns on prior echocardiogram',
    ],
    howWeTreat: [
      'Echocardiography and targeted diagnostic testing',
      'Guideline-directed medical therapy',
      'Daily weight and symptom monitoring education',
      'Sodium and fluid management counseling',
      'Long-term follow-up to prevent flare-ups',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/echocardiography',
    faqs: [
      {
        question: 'Can heart failure be managed outside the hospital?',
        answer:
          'Yes. With proper medications, lifestyle strategies, and close follow-up, many patients manage heart failure successfully in an outpatient setting.',
      },
      {
        question: 'What tests are used for heart failure?',
        answer:
          'Echocardiography is central. Your cardiologist may also order blood work, ECG, stress testing, rhythm monitoring, or additional imaging depending on your history.',
      },
      {
        question: 'Is PulsePoint accepting heart failure patients?',
        answer:
          'Yes. PulsePoint Core Cardiology is accepting new patients in Columbia, MO for heart failure evaluation and ongoing management.',
      },
    ],
  },
  {
    slug: 'atrial-fibrillation',
    shortTitle: 'Atrial Fibrillation',
    title: 'Atrial Fibrillation Treatment in Columbia, MO',
    description:
      'AFib evaluation and management in Columbia, Missouri. PulsePoint cardiologists address rhythm symptoms, stroke risk, and personalized treatment. Schedule: (855) 785-7337.',
    heroText:
      'Atrial fibrillation (AFib) is the most common sustained heart rhythm disorder in adults. Clear diagnosis and a thoughtful plan protect both your heart and your brain.',
    overview:
      'AFib causes the upper chambers of the heart to beat irregularly, which can lead to palpitations, fatigue, shortness of breath, or no symptoms at all. It also increases stroke risk. At PulsePoint Clinic, cardiologists use history, ECG, and rhythm monitoring to confirm the diagnosis and guide rate control, rhythm management, and stroke prevention strategies tailored to each patient.',
    symptoms: [
      'Palpitations or racing heartbeat',
      'Irregular pulse',
      'Fatigue or reduced exercise tolerance',
      'Shortness of breath',
      'Dizziness or lightheadedness',
      'Sometimes no noticeable symptoms',
    ],
    whenToSeeCardiologist: [
      'Confirmed or suspected AFib on ECG or wearable device',
      'Recurrent palpitations or irregular heartbeat',
      'AFib with shortness of breath or chest discomfort',
      'Need for anticoagulation discussion',
      'Prior AFib requiring medication or ablation follow-up',
    ],
    howWeTreat: [
      'ECG and ambulatory rhythm monitoring (Holter/event monitor)',
      'Stroke risk assessment and anticoagulation planning',
      'Rate and rhythm control strategies',
      'Evaluation of triggers: sleep apnea, alcohol, thyroid, hypertension',
      'Coordination with electrophysiology when advanced therapy is needed',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/heart-rhythm-monitoring',
    faqs: [
      {
        question: 'Is AFib life-threatening?',
        answer:
          'AFib is not always immediately dangerous, but it increases stroke and heart failure risk over time. Evaluation and treatment are important even when symptoms are mild.',
      },
      {
        question: 'Can a smartwatch detect AFib?',
        answer:
          'Wearables can prompt important conversations, but they do not replace clinical evaluation. A cardiologist interprets rhythm data in the context of your full medical picture.',
      },
      {
        question: 'Where can I get heart rhythm monitoring in Columbia, MO?',
        answer:
          'PulsePoint offers physician-led rhythm monitoring and cardiology consultation at our Columbia clinic on Nifong Blvd.',
      },
    ],
  },
  {
    slug: 'coronary-artery-disease',
    shortTitle: 'Coronary Artery Disease',
    title: 'Coronary Artery Disease Treatment in Columbia, MO',
    description:
      'CAD evaluation and management in Columbia, Missouri. PulsePoint cardiologists provide prevention, diagnosis, and treatment planning for coronary artery disease. (855) 785-7337.',
    heroText:
      'Coronary artery disease develops when plaque narrows the arteries that supply the heart. Early detection and aggressive risk reduction can prevent heart attacks and improve long-term outcomes.',
    overview:
      'Coronary artery disease (CAD) is the leading cause of heart attack. Risk factors include high cholesterol, hypertension, diabetes, smoking, and family history. PulsePoint cardiologists in Columbia, MO help patients understand their risk, interpret symptoms and test results, and build a plan that may include lifestyle change, medications, stress testing, imaging, and coordination with interventional specialists when needed.',
    symptoms: [
      'Chest pressure or discomfort with exertion (angina)',
      'Shortness of breath with activity',
      'Fatigue during ordinary tasks',
      'Pain in the jaw, arm, or back with exertion',
      'Sometimes no symptoms until a cardiac event',
    ],
    whenToSeeCardiologist: [
      'Chest pain or pressure, especially with exertion',
      'Multiple cardiovascular risk factors',
      'Abnormal stress test or calcium score',
      'Family history of early heart disease',
      'Known CAD needing medication or follow-up',
    ],
    howWeTreat: [
      'Risk factor management: cholesterol, BP, diabetes, smoking',
      'Stress testing and advanced cardiac imaging when indicated',
      'Medical therapy to stabilize plaque and reduce events',
      'Lifestyle and exercise guidance appropriate for your risk',
      'Referral coordination for catheterization when necessary',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/stress-testing',
    faqs: [
      {
        question: 'What is the difference between CAD and a heart attack?',
        answer:
          'CAD is the underlying disease — plaque in coronary arteries. A heart attack occurs when a plaque ruptures and blocks blood flow. Treating CAD early helps prevent heart attacks.',
      },
      {
        question: 'Do I need a stress test for coronary disease?',
        answer:
          'Not everyone does. Stress testing is recommended when symptoms or risk factors suggest flow-limiting blockages that would change your treatment plan.',
      },
      {
        question: 'Does PulsePoint manage coronary artery disease in Columbia?',
        answer:
          'Yes. Our Core Cardiology program provides comprehensive CAD evaluation and long-term management for patients throughout Mid-Missouri.',
      },
    ],
  },
  {
    slug: 'chest-pain',
    shortTitle: 'Chest Pain',
    title: 'Chest Pain Cardiologist in Columbia, MO',
    description:
      'Chest pain evaluation in Columbia, Missouri. Board-certified cardiologists at PulsePoint Clinic help determine when chest pain is heart-related and what to do next. Call (855) 785-7337.',
    heroText:
      'Chest pain is one of the most common reasons patients seek a cardiologist — and one of the most important symptoms to evaluate carefully.',
    overview:
      'Chest discomfort can come from the heart, lungs, esophagus, muscles, or anxiety — but cardiac causes must be ruled out promptly when appropriate. PulsePoint cardiologists in Columbia, MO take a structured approach: characterizing the pain, assessing risk factors, performing targeted testing, and explaining results in plain language so you know whether reassurance, medication, or further treatment is needed.',
    symptoms: [
      'Pressure, squeezing, or tightness in the chest',
      'Pain spreading to jaw, arm, shoulder, or back',
      'Shortness of breath with chest discomfort',
      'Nausea, sweating, or lightheadedness with pain',
      'Pain that worsens with exertion and improves with rest',
    ],
    whenToSeeCardiologist: [
      'New chest pain — after emergency causes are excluded',
      'Recurrent chest discomfort with activity',
      'Chest pain with cardiovascular risk factors',
      'Abnormal ECG or prior cardiac history',
      'Uncertainty about whether pain is heart-related',
    ],
    howWeTreat: [
      'Detailed history and cardiovascular risk assessment',
      'ECG, echocardiography, and stress testing when appropriate',
      'Medication evaluation and optimization',
      'Clear guidance on activity and follow-up',
      'Emergency instructions when symptoms are concerning',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/stress-testing',
    faqs: [
      {
        question: 'When should chest pain be an emergency?',
        answer:
          'Call 911 for severe chest pressure, pain with shortness of breath, fainting, or symptoms that feel alarming and do not improve with rest. Do not drive yourself to the hospital.',
      },
      {
        question: 'Can chest pain be non-cardiac?',
        answer:
          'Yes. Musculoskeletal pain, acid reflux, and other conditions can mimic heart pain. A cardiologist helps distinguish cardiac from non-cardiac causes when the diagnosis is unclear.',
      },
      {
        question: 'How quickly can I be seen for chest pain in Columbia?',
        answer:
          'Call PulsePoint at (855) 785-7337 to discuss urgency and scheduling. We prioritize patients with new or concerning cardiac symptoms.',
      },
    ],
  },
  {
    slug: 'high-cholesterol',
    shortTitle: 'High Cholesterol',
    title: 'Cholesterol Management in Columbia, MO',
    description:
      'Lipid and cholesterol management in Columbia, Missouri. PulsePoint cardiologists provide expert LDL, HDL, and triglyceride care for long-term heart protection. (855) 785-7337.',
    heroText:
      'Cholesterol management is one of the most powerful tools in heart attack and stroke prevention — when it is personalized to your actual cardiovascular risk.',
    overview:
      'Elevated LDL cholesterol contributes to plaque buildup in arteries. But the right treatment target depends on your full risk picture: age, diabetes, blood pressure, smoking, family history, and prior events. Dr. James E. Fairlamb and the PulsePoint team bring deep expertise in lipid management to patients in Columbia, MO and Central Missouri, combining lifestyle strategies with evidence-based medications when appropriate.',
    symptoms: [
      'High cholesterol typically has no symptoms',
      'May be discovered on routine blood work',
      'Xanthomas (rare fatty deposits) in familial hyperlipidemia',
      'Cardiovascular events may be the first sign if untreated',
    ],
    whenToSeeCardiologist: [
      'LDL above goal despite lifestyle changes',
      'Family history of early heart disease or very high cholesterol',
      'Statin intolerance or need for advanced lipid therapy',
      'Diabetes or multiple risk factors raising overall risk',
      'Questions about cholesterol targets and medication options',
    ],
    howWeTreat: [
      'Full lipid panel and cardiovascular risk calculation',
      'Nutrition and lifestyle counseling',
      'Statin and non-statin medication options',
      'Monitoring for treatment response and side effects',
      'Coordination with primary care and lab follow-up',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/cardiac-ct-calcium-scoring',
    faqs: [
      {
        question: 'What is a good LDL cholesterol level?',
        answer:
          'Targets vary by risk. Many patients benefit from LDL below 100 mg/dL; higher-risk patients may need lower targets. Your cardiologist personalizes the goal to your situation.',
      },
      {
        question: 'Can I lower cholesterol without medication?',
        answer:
          'Diet, exercise, and weight management can meaningfully improve lipids. Medication is added when lifestyle alone is not enough to reach risk-appropriate targets.',
      },
      {
        question: 'Who treats high cholesterol in Columbia, MO?',
        answer:
          'PulsePoint cardiologists provide specialized lipid management as part of comprehensive preventive and core cardiology care in Columbia.',
      },
    ],
  },
  {
    slug: 'palpitations',
    shortTitle: 'Palpitations',
    title: 'Heart Palpitations Evaluation in Columbia, MO',
    description:
      'Palpitations and irregular heartbeat evaluation in Columbia, Missouri. PulsePoint cardiologists connect symptoms to rhythm data and clear next steps. (855) 785-7337.',
    heroText:
      'Feeling your heart skip, race, or flutter can be unsettling. The right evaluation connects symptoms to objective rhythm data so you know what is happening — and what to do.',
    overview:
      'Palpitations have many causes: premature beats, AFib, tachycardia, anxiety, caffeine, dehydration, thyroid disease, or medication effects. At PulsePoint Clinic in Columbia, MO, cardiologists listen carefully to your symptom pattern, review triggers, and use ECG and ambulatory monitoring when needed to determine whether reassurance, lifestyle change, or treatment is appropriate.',
    symptoms: [
      'Sensation of skipped or extra heartbeats',
      'Rapid or pounding heartbeat',
      'Irregular rhythm noticed by patient or wearable',
      'Brief dizziness with palpitations',
      'Chest discomfort associated with fast heart rate',
    ],
    whenToSeeCardiologist: [
      'Frequent or worsening palpitations',
      'Palpitations with shortness of breath or chest pain',
      'Syncope (fainting) or near-fainting',
      'Wearable alerts for irregular rhythm',
      'Palpitations in patients with heart disease or risk factors',
    ],
    howWeTreat: [
      'ECG and targeted laboratory evaluation',
      'Holter or event monitor when symptoms are intermittent',
      'Assessment of caffeine, sleep, stress, and medication triggers',
      'Treatment for underlying arrhythmia when confirmed',
      'Clear guidance on symptoms that require urgent care',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/heart-rhythm-monitoring',
    faqs: [
      {
        question: 'Are palpitations always dangerous?',
        answer:
          'Many palpitations are benign. However, some reflect significant arrhythmias. Evaluation helps distinguish harmless extra beats from conditions that need treatment.',
      },
      {
        question: 'What is a Holter monitor?',
        answer:
          'A Holter monitor records your heart rhythm continuously for 24–48 hours (or longer with event monitors) to capture intermittent palpitations.',
      },
      {
        question: 'Can I get rhythm monitoring in Columbia, MO?',
        answer:
          'Yes. PulsePoint offers ambulatory cardiac monitoring with interpretation by board-certified cardiologists at our Columbia clinic.',
      },
    ],
  },
  {
    slug: 'cardiac-risk-assessment',
    shortTitle: 'Cardiac Risk Assessment',
    title: 'Cardiovascular Risk Assessment in Columbia, MO',
    description:
      'Preventive cardiac risk assessment in Columbia, Missouri. PulsePoint cardiologists help you understand heart disease risk before symptoms appear. Schedule: (855) 785-7337.',
    heroText:
      'The best time to address heart disease risk is before symptoms appear. A structured risk assessment turns scattered lab results into a clear prevention plan.',
    overview:
      'Cardiovascular risk assessment combines your age, sex, blood pressure, cholesterol, diabetes status, smoking history, family history, and lifestyle into a picture of your long-term heart and stroke risk. PulsePoint preventive cardiologists in Columbia, MO help patients throughout Boone County and Central Missouri understand that picture — and take practical steps to improve it through lifestyle, medication, and appropriate screening.',
    symptoms: [
      'Risk assessment is preventive — symptoms may be absent',
      'Borderline blood pressure or cholesterol',
      'Family history of early heart attack or stroke',
      'Diabetes, prediabetes, or metabolic syndrome',
      'Desire for a second opinion on prevention strategy',
    ],
    whenToSeeCardiologist: [
      'Strong family history of heart disease',
      'Multiple risk factors clustering together',
      'Unclear cardiovascular risk after routine labs',
      'Interest in calcium scoring or advanced screening',
      'Wanting a long-term prevention plan before problems develop',
    ],
    howWeTreat: [
      'Comprehensive history and risk calculator review',
      'Blood pressure, lipid, and metabolic assessment',
      'Cardiac CT calcium scoring when appropriate',
      'Personalized lifestyle and medication recommendations',
      'Scheduled follow-up to track progress over time',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/cardiac-ct-calcium-scoring',
    faqs: [
      {
        question: 'Who should get a cardiac risk assessment?',
        answer:
          'Adults with risk factors, family history, or borderline labs benefit most. Many patients start in their 40s or 50s, or earlier if family history is significant.',
      },
      {
        question: 'What is a coronary calcium score?',
        answer:
          'A cardiac CT calcium score measures calcified plaque in coronary arteries. It can refine risk estimates in certain patients when results would change the prevention plan.',
      },
      {
        question: 'Is preventive cardiology covered by insurance?',
        answer:
          'Many Core Cardiology prevention visits are covered by insurance when medically appropriate. Contact PulsePoint to discuss your specific coverage and visit type.',
      },
    ],
  },
]

export function getConditionPage(slug: string) {
  return CONDITION_PAGES.find((condition) => condition.slug === slug)
}

export function getConditionSlugs() {
  return CONDITION_PAGES.map((condition) => condition.slug)
}
