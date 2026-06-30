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
  {
    slug: 'valvular-heart-disease',
    shortTitle: 'Valvular Heart Disease',
    title: 'Valvular Heart Disease Treatment in Columbia, MO',
    description:
      'Valve disorder evaluation and management in Columbia, Missouri. PulsePoint cardiologists use echocardiography and clinical expertise to guide treatment for stenosis and regurgitation. (855) 785-7337.',
    heroText:
      'Heart valve problems can cause shortness of breath, fatigue, chest discomfort, or no symptoms at all until the valve disease progresses. Early evaluation matters.',
    overview:
      'Valvular heart disease includes conditions where heart valves do not open or close properly — such as aortic stenosis, mitral regurgitation, or other valve disorders. PulsePoint cardiologists in Columbia, MO use careful history, physical examination, and echocardiography to determine severity, monitor progression, and coordinate medical or procedural treatment when appropriate.',
    symptoms: [
      'Shortness of breath with activity',
      'Chest discomfort or pressure',
      'Fatigue or reduced exercise tolerance',
      'Dizziness or fainting (especially with aortic stenosis)',
      'Palpitations or irregular heartbeat',
      'Sometimes discovered incidentally on echocardiogram',
    ],
    whenToSeeCardiologist: [
      'Murmur noted on exam or prior echocardiogram',
      'Known valve disease needing surveillance',
      'Worsening shortness of breath or exercise intolerance',
      'Syncope or presyncope with valve disease',
      'Planning for surgery or procedure and need for cardiology input',
    ],
    howWeTreat: [
      'Comprehensive history and cardiovascular examination',
      'Echocardiography to assess valve structure and function',
      'Medical management and activity guidance when appropriate',
      'Serial monitoring for moderate valve disease',
      'Referral coordination for valve intervention when indicated',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/echocardiography',
    faqs: [
      {
        question: 'What is a heart murmur?',
        answer:
          'A murmur is an extra sound heard during the heartbeat, sometimes caused by turbulent blood flow across a valve. Not all murmurs indicate serious disease, but evaluation is important.',
      },
      {
        question: 'Do all valve problems need surgery?',
        answer:
          'No. Many patients with mild or moderate valve disease are monitored over time with echocardiography and medical therapy. Surgery or transcatheter valve procedures are considered when disease is severe and symptomatic.',
      },
      {
        question: 'Where can I get an echocardiogram for valve disease in Columbia?',
        answer:
          'PulsePoint offers physician-interpreted echocardiography at our Columbia clinic on Nifong Blvd.',
      },
    ],
  },
  {
    slug: 'peripheral-artery-disease',
    shortTitle: 'Peripheral Artery Disease',
    title: 'Peripheral Artery Disease (PAD) Treatment in Columbia, MO',
    description:
      'PAD evaluation and prevention in Columbia, Missouri. PulsePoint cardiologists assess leg pain, circulation, and cardiovascular risk. Call (855) 785-7337.',
    heroText:
      'Peripheral artery disease affects blood flow to the legs and is a marker of broader cardiovascular risk. Early evaluation helps prevent progression and complications.',
    overview:
      'Peripheral artery disease (PAD) develops when plaque narrows arteries outside the heart — most often in the legs. It can cause leg pain with walking, slow-healing wounds, and reduced exercise tolerance. PAD also signals higher risk for heart attack and stroke. At PulsePoint Clinic in Columbia, MO, cardiologists evaluate circulation concerns alongside blood pressure, cholesterol, diabetes, and smoking history to build a prevention and treatment plan.',
    symptoms: [
      'Leg pain or cramping with walking that improves with rest (claudication)',
      'Numbness or weakness in the legs',
      'Coldness in the lower leg or foot',
      'Slow-healing sores on toes, feet, or legs',
      'Shiny skin or reduced hair growth on the legs',
      'Sometimes no symptoms until disease is advanced',
    ],
    whenToSeeCardiologist: [
      'Leg pain with exertion that limits walking',
      'Known PAD or abnormal ankle-brachial index (ABI)',
      'Diabetes, smoking, or coronary disease with leg symptoms',
      'Non-healing foot or leg wounds',
      'Family history of PAD or vascular disease',
    ],
    howWeTreat: [
      'Cardiovascular risk assessment and medication review',
      'Vascular ultrasound when circulation symptoms need clarification',
      'Exercise and walking therapy guidance',
      'Blood pressure, cholesterol, and diabetes optimization',
      'Smoking cessation counseling and referral coordination when needed',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/vascular-ultrasound',
    faqs: [
      {
        question: 'Is leg pain always peripheral artery disease?',
        answer:
          'No. Leg pain can come from arthritis, neuropathy, spine problems, or other causes. A cardiologist helps determine when circulation testing is appropriate.',
      },
      {
        question: 'How is PAD diagnosed?',
        answer:
          'Diagnosis may include history, physical exam, ankle-brachial index testing, and vascular ultrasound. Your cardiologist selects tests based on your symptoms and risk profile.',
      },
      {
        question: 'Where can I see a cardiologist for PAD in Columbia, MO?',
        answer:
          'PulsePoint Clinic on Nifong Blvd provides PAD evaluation and cardiovascular risk management for patients throughout Boone County and Central Missouri.',
      },
    ],
  },
  {
    slug: 'diabetes-and-heart-disease',
    shortTitle: 'Diabetes & Heart Disease',
    title: 'Diabetes and Heart Disease Care in Columbia, MO',
    description:
      'Cardiometabolic heart care for diabetes and prediabetes in Columbia, Missouri. PulsePoint cardiologists reduce cardiovascular risk. (855) 785-7337.',
    heroText:
      'Diabetes and prediabetes significantly increase heart attack, stroke, and heart failure risk — but aggressive prevention can change the trajectory.',
    overview:
      'Diabetes affects the heart and blood vessels through elevated blood sugar, inflammation, blood pressure, cholesterol patterns, and kidney strain. Many patients with type 2 diabetes or prediabetes benefit from cardiology input before symptoms appear. PulsePoint cardiologists in Columbia, MO integrate glucose control, blood pressure, lipids, weight, and lifestyle into a unified cardiovascular prevention plan.',
    symptoms: [
      'Often no cardiac symptoms until complications develop',
      'Shortness of breath with exertion',
      'Chest discomfort or reduced exercise tolerance',
      'Swelling in the legs',
      'Fatigue related to heart strain or poor glucose control',
      'Elevated A1c, blood pressure, or cholesterol on routine labs',
    ],
    whenToSeeCardiologist: [
      'Type 2 diabetes, prediabetes, or metabolic syndrome',
      'Diabetes with hypertension or high cholesterol',
      'Family history of heart disease and diabetes together',
      'Albuminuria or kidney concerns related to diabetes',
      'Questions about heart-protective medications (statins, BP targets, SGLT2/GLP-1)',
    ],
    howWeTreat: [
      'Cardiometabolic risk review and goal setting',
      'Blood pressure and lipid management',
      'A1c interpretation in cardiovascular context',
      'Lifestyle and nutrition priorities',
      'Coordination with primary care and endocrinology',
    ],
    relatedServicePath: '/services/cardiometabolic-wellness',
    relatedDiagnosticPath: '/diagnostics',
    faqs: [
      {
        question: 'Why does diabetes increase heart disease risk?',
        answer:
          'High blood sugar damages blood vessels over time and often clusters with hypertension, abnormal lipids, obesity, and kidney disease — all of which raise cardiovascular risk.',
      },
      {
        question: 'Should every person with diabetes see a cardiologist?',
        answer:
          'Not always. A cardiologist is especially helpful when multiple risk factors cluster, when prevention goals are unclear, or when symptoms or abnormal testing need evaluation.',
      },
      {
        question: 'Does PulsePoint treat diabetes-related heart risk in Columbia?',
        answer:
          'Yes. Cardiometabolic wellness and preventive cardiology at PulsePoint address diabetes, prediabetes, and long-term cardiovascular protection.',
      },
    ],
  },
  {
    slug: 'sleep-apnea-and-heart-disease',
    shortTitle: 'Sleep Apnea & Heart Health',
    title: 'Sleep Apnea and Heart Disease in Columbia, MO',
    description:
      'Sleep apnea cardiovascular evaluation in Columbia, Missouri. PulsePoint cardiologists address hypertension, AFib risk, and heart strain linked to sleep apnea. (855) 785-7337.',
    heroText:
      'Untreated sleep apnea strains the heart and blood vessels — raising blood pressure, arrhythmia risk, and long-term cardiovascular events.',
    overview:
      'Obstructive sleep apnea causes repeated breathing interruptions during sleep, leading to oxygen drops, surges in blood pressure, and stress on the heart. It is linked to hypertension, atrial fibrillation, heart failure, and coronary artery disease. PulsePoint cardiologists in Columbia, MO help patients understand when sleep apnea may be contributing to cardiovascular problems and coordinate testing and treatment planning with sleep medicine when appropriate.',
    symptoms: [
      'Loud snoring or witnessed breathing pauses during sleep',
      'Daytime sleepiness or unrefreshing sleep',
      'Morning headaches',
      'Difficulty controlling blood pressure',
      'Palpitations or AFib, especially with untreated apnea',
      'Often reported by a partner before the patient notices symptoms',
    ],
    whenToSeeCardiologist: [
      'Hypertension that is hard to control',
      'AFib or palpitations with suspected sleep apnea',
      'Heart failure with excessive daytime fatigue',
      'Positive sleep apnea screen or prior sleep study',
      'Coronary disease with prominent snoring or sleep symptoms',
    ],
    howWeTreat: [
      'Cardiovascular history and risk factor review',
      'Blood pressure and rhythm assessment',
      'Sleep apnea screening guidance and referral coordination',
      'Medication optimization for heart and vascular risk',
      'Follow-up after CPAP or other sleep therapy begins',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/heart-rhythm-monitoring',
    faqs: [
      {
        question: 'Can sleep apnea cause high blood pressure?',
        answer:
          'Yes. Repeated nighttime oxygen drops and sympathetic surges are strongly linked to hypertension and can make blood pressure harder to control.',
      },
      {
        question: 'Does treating sleep apnea help the heart?',
        answer:
          'Treating obstructive sleep apnea often improves blood pressure control and may reduce arrhythmia burden. Your cardiologist helps monitor cardiovascular response over time.',
      },
      {
        question: 'Who evaluates sleep apnea and heart disease in Columbia, MO?',
        answer:
          'PulsePoint cardiologists evaluate cardiovascular impact and coordinate with sleep specialists for diagnostic sleep studies when indicated.',
      },
    ],
  },
  {
    slug: 'syncope',
    shortTitle: 'Syncope (Fainting)',
    title: 'Fainting & Syncope Evaluation in Columbia, MO',
    description:
      'Syncope and fainting evaluation in Columbia, Missouri. PulsePoint cardiologists assess heart rhythm, blood pressure, and serious causes. Call (855) 785-7337.',
    heroText:
      'Fainting can be benign — or a warning sign of a heart rhythm problem, structural issue, or dangerous drop in blood pressure.',
    overview:
      'Syncope is a temporary loss of consciousness, usually from reduced blood flow to the brain. Causes range from dehydration and vasovagal episodes to serious arrhythmias or structural heart disease. PulsePoint cardiologists in Columbia, MO take a structured approach: characterizing the event, reviewing medications and triggers, and using ECG, monitoring, and imaging when needed to determine whether cardiac causes require treatment.',
    symptoms: [
      'Sudden loss of consciousness with spontaneous recovery',
      'Lightheadedness or near-fainting (presyncope)',
      'Palpitations before fainting',
      'Fainting during exertion (always warrants prompt evaluation)',
      'Brief confusion after the event',
      'Injury from falling during syncope',
    ],
    whenToSeeCardiologist: [
      'Fainting during exercise or while lying flat',
      'Recurrent unexplained syncope',
      'Family history of sudden cardiac death',
      'Known heart disease or abnormal ECG',
      'Palpitations, chest pain, or shortness of breath with syncope',
    ],
    howWeTreat: [
      'Detailed event history and medication review',
      'ECG and ambulatory rhythm monitoring when indicated',
      'Echocardiography if structural disease is suspected',
      'Blood pressure and autonomic assessment',
      'Clear guidance on activity restrictions until evaluation is complete',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/heart-rhythm-monitoring',
    faqs: [
      {
        question: 'When is fainting an emergency?',
        answer:
          'Call 911 for fainting with chest pain, severe shortness of breath, sustained confusion, injury, or if the person does not wake up normally. Fainting during exertion needs urgent evaluation.',
      },
      {
        question: 'Can fainting be caused by the heart?',
        answer:
          'Yes. Slow or fast heart rhythms and some structural heart conditions can cause syncope. Cardiac evaluation helps identify these causes.',
      },
      {
        question: 'Where can I get syncope evaluation in Columbia, MO?',
        answer:
          'PulsePoint Clinic provides cardiologist-led syncope evaluation with rhythm monitoring and echocardiography at our Nifong Blvd location.',
      },
    ],
  },
  {
    slug: 'cardiomyopathy',
    shortTitle: 'Cardiomyopathy',
    title: 'Cardiomyopathy Treatment in Columbia, MO',
    description:
      'Cardiomyopathy evaluation and management in Columbia, Missouri. PulsePoint cardiologists assess heart muscle disease, pumping function, and treatment options. (855) 785-7337.',
    heroText:
      'Cardiomyopathy affects the heart muscle itself — how well the heart pumps and fills — and benefits from specialist evaluation and long-term planning.',
    overview:
      'Cardiomyopathy refers to diseases of the heart muscle that can weaken pumping function, cause arrhythmias, or lead to heart failure. Causes include genetics, long-standing hypertension, prior heart attack, toxins, pregnancy-related cardiomyopathy, and other conditions. PulsePoint cardiologists in Columbia, MO use history, examination, echocardiography, and targeted testing to classify the type of cardiomyopathy and guide medications, lifestyle changes, device therapy referrals, and surveillance.',
    symptoms: [
      'Shortness of breath with activity or at rest',
      'Fatigue and reduced exercise tolerance',
      'Leg swelling or abdominal bloating',
      'Palpitations or irregular heartbeat',
      'Chest discomfort or pressure',
      'Sometimes discovered incidentally on echocardiogram',
    ],
    whenToSeeCardiologist: [
      'Reduced ejection fraction on prior echocardiogram',
      'Heart failure symptoms with unclear cause',
      'Family history of cardiomyopathy or sudden cardiac death',
      'Persistent palpitations with cardiomyopathy',
      'Need for ongoing surveillance after diagnosis',
    ],
    howWeTreat: [
      'Echocardiography and cardiac imaging review',
      'Guideline-directed medical therapy for heart muscle disease',
      'Rhythm monitoring when arrhythmia risk is a concern',
      'Lifestyle and activity counseling',
      'Referral coordination for advanced therapies when appropriate',
    ],
    relatedServicePath: '/services/preventive-cardiology',
    relatedDiagnosticPath: '/services/echocardiography',
    faqs: [
      {
        question: 'Is cardiomyopathy the same as heart failure?',
        answer:
          'Cardiomyopathy is disease of the heart muscle. Heart failure is a syndrome that can result from cardiomyopathy when the heart cannot pump effectively. Many patients have both.',
      },
      {
        question: 'Can cardiomyopathy be inherited?',
        answer:
          'Some forms are genetic. Family history matters, and your cardiologist may recommend screening for relatives when an inherited pattern is suspected.',
      },
      {
        question: 'Does PulsePoint manage cardiomyopathy in Columbia, MO?',
        answer:
          'Yes. PulsePoint provides outpatient evaluation, echocardiography, medication management, and long-term follow-up for cardiomyopathy and related heart failure.',
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
