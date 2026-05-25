import type { SupabaseClient } from '@supabase/supabase-js'
import { XMLParser } from 'fast-xml-parser'
import { slugify } from '@/lib/blog'

type BlogTopic = {
  pillar: string
  title: string
  excerpt: string
  tags: string[]
  sections: Array<{
    heading: string
    paragraphs: string[]
  }>
}

type FeedSource = {
  name: string
  url: string
  defaultTags: string[]
}

type FeedItem = {
  sourceName: string
  title: string
  url: string
  publishedAt: string | null
  tags: string[]
  score: number
}

const FEED_SOURCES: FeedSource[] = [
  {
    name: 'American Heart Association Heart News',
    url: 'https://newsroom.heart.org/cats/heart_news.xml',
    defaultTags: ['preventive cardiology', 'cardiovascular wellness'],
  },
  {
    name: 'American Heart Association Scientific Statements',
    url: 'https://newsroom.heart.org/cats/scientific_statements_guidelines.xml',
    defaultTags: ['advanced diagnostics', 'physician-led care'],
  },
  {
    name: 'MedlinePlus Heart Diseases',
    url: 'https://medlineplus.gov/feeds/topics/heartdiseases.xml',
    defaultTags: ['heart health optimization', 'early detection'],
  },
]

const RELEVANCE_TERMS = [
  'heart',
  'cardiac',
  'cardio',
  'vascular',
  'blood pressure',
  'cholesterol',
  'prevention',
  'preventive',
  'screening',
  'diagnostic',
  'arrhythmia',
  'rhythm',
  'stroke',
  'diabetes',
  'metabolic',
  'obesity',
  'exercise',
  'longevity',
  'wellness',
]

const PULSEPOINT_AUTHOR = 'Martin Tibuakuu, MD, MPH'

export function getAutoPublishAfterHours() {
  const rawValue = process.env.BLOG_AUTO_PUBLISH_AFTER_HOURS
  const parsed = rawValue ? Number.parseInt(rawValue, 10) : 6

  if (!Number.isFinite(parsed) || parsed < 1) return 6
  return parsed
}

const TOPICS: BlogTopic[] = [
  {
    pillar: 'Preventive Cardiology',
    title: 'Why Preventive Cardiology Belongs at the Center of Long-Term Heart Health',
    excerpt:
      'A practical look at how prevention, early detection, and physician-led planning can change the trajectory of cardiovascular risk.',
    tags: ['preventive cardiology', 'heart health optimization', 'early detection'],
    sections: [
      {
        heading: 'Prevention changes the conversation',
        paragraphs: [
          'Traditional cardiology often begins after symptoms appear. Preventive cardiology starts earlier, looking for risk patterns before they become a crisis.',
          'That shift matters because many cardiovascular conditions develop quietly over years. Blood pressure, cholesterol, inflammation, blood sugar, family history, sleep, stress, and fitness all influence long-term cardiovascular risk.',
        ],
      },
      {
        heading: 'What a modern prevention visit considers',
        paragraphs: [
          'A thoughtful prevention plan usually looks beyond a single lab result or office reading. It combines history, lifestyle, cardiometabolic health, advanced screening when appropriate, and a clear follow-up plan.',
          'For many patients, the goal is not simply to treat disease. The goal is to preserve capacity, confidence, and independence for the decades ahead.',
        ],
      },
      {
        heading: 'How PulsePoint thinks about risk',
        paragraphs: [
          'PulsePoint Clinic is built around physician-led cardiovascular care, advanced diagnostics, and a more personal relationship with your care team.',
          'The right plan should feel specific to the patient in front of us, not copied from a generic checklist.',
        ],
      },
    ],
  },
  {
    pillar: 'Advanced Diagnostics',
    title: 'Advanced Heart Screening: When Better Information Leads to Better Decisions',
    excerpt:
      'Advanced diagnostics can help identify early cardiovascular risk and guide a more personalized care plan.',
    tags: ['advanced heart screening', 'integrated diagnostics', 'cardiovascular wellness'],
    sections: [
      {
        heading: 'The value of seeing earlier',
        paragraphs: [
          'Cardiovascular risk can be easy to underestimate when a patient feels well. Advanced screening helps add objective information to the conversation.',
          'Tests such as echocardiography, vascular ultrasound, rhythm monitoring, stress testing, and cardiac CT coordination can each answer different questions when used thoughtfully.',
        ],
      },
      {
        heading: 'Diagnostics should serve the plan',
        paragraphs: [
          'More testing is not automatically better. The strongest diagnostic approach begins with the clinical question: what are we trying to understand, prevent, or monitor?',
          'When testing is aligned with a patient’s risk profile and goals, it can support clearer decisions about treatment, exercise, medication, follow-up, and referral.',
        ],
      },
      {
        heading: 'A platform approach to heart health',
        paragraphs: [
          'PulsePoint’s model brings prevention, diagnostics, and physician accessibility into a more connected experience.',
          'That integration is especially valuable for people who want to understand their risk before symptoms force the issue.',
        ],
      },
    ],
  },
  {
    pillar: 'Cardiometabolic Wellness',
    title: 'The Heart-Metabolism Connection: Why Cardiometabolic Wellness Matters',
    excerpt:
      'Heart health is deeply connected to metabolism, weight, blood pressure, cholesterol, sleep, and lifestyle patterns.',
    tags: ['cardiometabolic wellness', 'preventive cardiology', 'longevity-focused care'],
    sections: [
      {
        heading: 'Your heart does not live in isolation',
        paragraphs: [
          'Blood sugar, weight, waist circumference, blood pressure, cholesterol, sleep quality, stress, and physical activity all affect cardiovascular health.',
          'Cardiometabolic wellness focuses on these connected systems instead of treating each number as a separate problem.',
        ],
      },
      {
        heading: 'Small changes can compound',
        paragraphs: [
          'Improving cardiovascular risk often comes from consistent, realistic changes: movement, nutrition, sleep, medication when appropriate, and regular follow-up.',
          'The best plan is one a patient can actually sustain, with enough structure to measure progress over time.',
        ],
      },
      {
        heading: 'Why physician-led guidance matters',
        paragraphs: [
          'A physician-led plan can connect lifestyle goals with medical risk, diagnostic findings, and treatment decisions.',
          'That is where personalized cardiovascular care becomes more than advice. It becomes a strategy.',
        ],
      },
    ],
  },
  {
    pillar: 'Executive Heart Health',
    title: 'Executive Heart Health: A Smarter Approach for Busy High-Performing Adults',
    excerpt:
      'For executives and busy professionals, heart health planning should be proactive, efficient, and built around long-term performance.',
    tags: ['executive health', 'physician accessibility', 'heart health optimization'],
    sections: [
      {
        heading: 'Busy schedules should not mean reactive care',
        paragraphs: [
          'Many high-performing adults delay care because they feel well or cannot afford fragmented appointments. Cardiovascular risk, however, can build silently.',
          'Executive heart health should focus on early detection, efficient coordination, and a clear plan that fits a demanding life.',
        ],
      },
      {
        heading: 'The right experience feels organized',
        paragraphs: [
          'A premium model should make it easier to understand risk, complete appropriate screening, and stay connected with a physician over time.',
          'That level of organization can reduce uncertainty and help patients make better decisions before problems become urgent.',
        ],
      },
      {
        heading: 'Long-term capacity is the goal',
        paragraphs: [
          'Heart health is not only about avoiding disease. It is about maintaining energy, resilience, mobility, and confidence.',
          'For many patients, the most valuable care is the care that helps preserve the future they are working so hard to build.',
        ],
      },
    ],
  },
  {
    pillar: 'Heart Rhythm Monitoring',
    title: 'Heart Rhythm Monitoring: What Palpitations and Irregular Beats Can Tell Us',
    excerpt:
      'Rhythm monitoring can help connect symptoms, wearable alerts, and objective heart rhythm data.',
    tags: ['heart rhythm monitoring', 'advanced diagnostics', 'physician-led care'],
    sections: [
      {
        heading: 'Irregular rhythms deserve context',
        paragraphs: [
          'Palpitations, skipped beats, racing heart episodes, and wearable alerts can be unsettling. Rhythm monitoring helps determine what is actually happening during those moments.',
          'The goal is to match symptoms with data, then decide whether reassurance, lifestyle changes, medication, or further evaluation is appropriate.',
        ],
      },
      {
        heading: 'Wearables are helpful, but not the full answer',
        paragraphs: [
          'Consumer devices can prompt important conversations, but they do not replace clinical evaluation.',
          'A physician can interpret rhythm findings in the context of medical history, risk factors, medications, and symptoms.',
        ],
      },
      {
        heading: 'A calmer path from concern to clarity',
        paragraphs: [
          'PulsePoint’s approach is designed to turn uncertainty into a plan. That means listening carefully, using diagnostics appropriately, and explaining what the findings mean.',
          'Patients should leave with more clarity, not more confusion.',
        ],
      },
    ],
  },
  {
    pillar: 'Longevity-Focused Care',
    title: 'Longevity-Focused Heart Care: Building a Cardiovascular Plan for the Decades Ahead',
    excerpt:
      'Longevity-focused care connects prevention, diagnostics, lifestyle, and physician partnership into a long-term cardiovascular strategy.',
    tags: ['longevity-focused care', 'cardiovascular wellness', 'membership-based care'],
    sections: [
      {
        heading: 'Longevity starts with risk awareness',
        paragraphs: [
          'A longer healthspan depends in part on protecting the cardiovascular system. That begins with understanding personal risk early enough to act.',
          'Family history, blood pressure, cholesterol, diabetes risk, sleep, stress, exercise capacity, and imaging findings can all shape the plan.',
        ],
      },
      {
        heading: 'A plan should evolve with you',
        paragraphs: [
          'Cardiovascular needs change over time. A prevention plan should be revisited as life, labs, imaging, medications, and goals change.',
          'Membership-based heart care can support that continuity by making the physician relationship more accessible and proactive.',
        ],
      },
      {
        heading: 'The future of heart care is personal',
        paragraphs: [
          'Premium cardiovascular care should feel calm, informed, and specific. It should give patients a clearer sense of what matters now and what to watch next.',
          'That is the long-term opportunity for PulsePoint: prevention, wellness, advanced diagnostics, and physician-led care working together.',
        ],
      },
    ],
  },
  {
    pillar: 'Causes of Heart Disease',
    title: 'Understanding the Root Causes of Heart Disease: What Every Patient Should Know',
    excerpt:
      'Heart disease rarely has a single cause. Learn the major risk factors—from genetics and lifestyle to conditions like hypertension and diabetes—that contribute to cardiovascular disease.',
    tags: ['heart disease causes', 'cardiovascular risk factors', 'preventive cardiology'],
    sections: [
      {
        heading: 'Heart disease is multifactorial',
        paragraphs: [
          'Cardiovascular disease is rarely caused by one thing. It usually develops from a combination of genetic, environmental, lifestyle, and medical factors interacting over time.',
          'Understanding these causes helps patients recognize their own risk profile and take targeted steps to protect their heart health before problems arise.',
        ],
      },
      {
        heading: 'The major contributors',
        paragraphs: [
          'High blood pressure damages arteries over time, forcing the heart to work harder and weakening the cardiovascular system. Elevated cholesterol leads to plaque buildup in arteries, narrowing blood flow and increasing heart attack and stroke risk.',
          'Diabetes and insulin resistance accelerate atherosclerosis and damage blood vessels. Smoking introduces toxins that inflame and narrow arteries. Obesity, especially abdominal obesity, strains the heart and is linked to hypertension, diabetes, and sleep apnea.',
          'Family history plays a significant role—if a first-degree relative had early heart disease, your risk is higher. Chronic inflammation, poor sleep, chronic stress, excessive alcohol, and physical inactivity also independently raise cardiovascular risk.',
        ],
      },
      {
        heading: 'What patients can do',
        paragraphs: [
          'You cannot change your genetics or age, but you can address modifiable risk factors. That means knowing your blood pressure, cholesterol, blood sugar, and weight trends.',
          'Prevention starts with awareness. The earlier you understand your risk landscape, the more options you have to improve it through lifestyle, medication when appropriate, and regular follow-up.',
        ],
      },
    ],
  },
  {
    pillar: 'Warning Signs',
    title: 'Heart Attack Warning Signs: What to Watch For and When to Act',
    excerpt:
      'Recognizing heart attack symptoms early can save lives. Learn the classic and atypical warning signs that should never be ignored.',
    tags: ['heart attack symptoms', 'cardiovascular emergency', 'early detection'],
    sections: [
      {
        heading: 'Classic warning signs',
        paragraphs: [
          'The most recognized symptom of a heart attack is chest pressure, squeezing, or pain that lasts more than a few minutes. This discomfort may spread to the shoulders, arms, neck, jaw, or back.',
          'Other common symptoms include shortness of breath, cold sweats, nausea or vomiting, lightheadedness, and overwhelming fatigue. These symptoms often appear with or without chest discomfort.',
        ],
      },
      {
        heading: 'Atypical symptoms, especially in women',
        paragraphs: [
          'Women are more likely to experience atypical heart attack symptoms. These can include jaw or back pain, nausea, vomiting, indigestion-like discomfort, extreme fatigue, or shortness of breath without chest pain.',
          'Because these symptoms are easily dismissed as stress, anxiety, or aging, women often delay seeking care. Recognizing these patterns is critical for faster intervention and better outcomes.',
        ],
      },
      {
        heading: 'When to call 911',
        paragraphs: [
          'If you or someone near you experiences chest pressure, severe shortness of breath, fainting, or symptoms that feel alarming and do not improve with rest, call 911 immediately.',
          'Time is muscle when it comes to heart attacks. The sooner blood flow is restored, the less permanent damage occurs. Never drive yourself to the hospital if a heart attack is suspected.',
        ],
      },
    ],
  },
  {
    pillar: 'Blood Pressure',
    title: 'High Blood Pressure: The Silent Threat to Your Heart and Brain',
    excerpt:
      'Hypertension often has no symptoms yet causes lasting damage. Learn why it matters, how it harms your body, and what you can do to control it.',
    tags: ['hypertension', 'blood pressure management', 'preventive cardiology'],
    sections: [
      {
        heading: 'Why hypertension is called the silent killer',
        paragraphs: [
          'High blood pressure rarely causes noticeable symptoms, yet it quietly damages arteries, the heart, brain, kidneys, and eyes over years or decades.',
          'Many people do not know they have hypertension until a complication occurs. That is why regular blood pressure screening is one of the most important preventive steps you can take.',
        ],
      },
      {
        heading: 'How high blood pressure harms the body',
        paragraphs: [
          'Persistent hypertension forces the heart to pump against increased resistance, causing the heart muscle to thicken and weaken over time. This increases the risk of heart failure and arrhythmias.',
          'Damaged arteries are more prone to plaque buildup, raising the risk of heart attack and stroke. The brain, kidneys, and eyes also suffer from reduced or turbulent blood flow, increasing dementia and kidney disease risk.',
        ],
      },
      {
        heading: 'Control and prevention',
        paragraphs: [
          'Blood pressure control combines lifestyle changes—reducing sodium, maintaining healthy weight, regular exercise, limiting alcohol, managing stress, and good sleep—with medication when needed.',
          'The goal is not perfection overnight. It is consistent, measurable improvement guided by your physician and supported by regular monitoring.',
        ],
      },
    ],
  },
  {
    pillar: 'Cholesterol',
    title: 'Understanding Cholesterol: The Good, the Bad, and What Your Numbers Mean',
    excerpt:
      'Cholesterol is not all bad. Learn the difference between LDL and HDL, why cholesterol matters for heart health, and how to keep your levels in a healthy range.',
    tags: ['cholesterol education', 'lipid management', 'heart disease prevention'],
    sections: [
      {
        heading: 'The basics of cholesterol',
        paragraphs: [
          'Cholesterol is a waxy substance your body needs to build cells and produce hormones. But too much of the wrong kind can deposit in artery walls, forming plaque that narrows blood flow.',
          'LDL cholesterol is often called bad cholesterol because it carries cholesterol to arteries, where it can accumulate. HDL is called good cholesterol because it helps remove cholesterol from the bloodstream.',
        ],
      },
      {
        heading: 'What your numbers mean',
        paragraphs: [
          'LDL levels below 100 mg/dL are generally considered optimal, though your target may differ based on overall risk. HDL above 60 mg/dL is protective. Triglycerides, another blood fat, should ideally be below 150 mg/dL.',
          'Your physician looks at the full lipid panel along with blood pressure, diabetes status, family history, smoking, and age to calculate your true cardiovascular risk, not just individual numbers.',
        ],
      },
      {
        heading: 'Improving cholesterol naturally and medically',
        paragraphs: [
          'Dietary changes—reducing saturated fats, eliminating trans fats, increasing soluble fiber, and adding healthy fats from fish, nuts, and olive oil—can meaningfully improve lipid levels.',
          'Regular physical activity, weight management, smoking cessation, and limiting alcohol also help. When lifestyle is not enough, statins and other medications are safe, effective tools for risk reduction.',
        ],
      },
    ],
  },
  {
    pillar: 'Diabetes and Heart Health',
    title: 'Diabetes and Your Heart: Why Blood Sugar Control Protects Your Cardiovascular System',
    excerpt:
      'Diabetes dramatically increases heart disease risk. Learn the connection between blood sugar and cardiovascular health, and how to protect your heart if you have diabetes.',
    tags: ['diabetes and heart disease', 'cardiometabolic health', 'blood sugar management'],
    sections: [
      {
        heading: 'The diabetes-heart disease connection',
        paragraphs: [
          'People with diabetes are two to four times more likely to develop heart disease than those without it. Over time, high blood sugar damages blood vessels and nerves that control the heart.',
          'Diabetes also tends to cluster with other risk factors: hypertension, abnormal cholesterol, obesity, and kidney disease. Together, these amplify cardiovascular risk far beyond individual effects.',
        ],
      },
      {
        heading: 'How high blood sugar harms arteries',
        paragraphs: [
          'Excess glucose in the bloodstream promotes inflammation and oxidative stress, which damage the inner lining of arteries. This makes it easier for cholesterol to deposit and form plaque.',
          'Diabetes also increases the tendency for blood clot formation, raising the risk of heart attack and stroke. Early and consistent blood sugar control is one of the most powerful ways to reduce these risks.',
        ],
      },
      {
        heading: 'A heart-smart approach to diabetes',
        paragraphs: [
          'Managing diabetes for cardiovascular protection means more than tracking blood sugar. It also means controlling blood pressure, optimizing cholesterol, maintaining healthy weight, exercising regularly, and not smoking.',
          'Working with a physician who understands the cardiometabolic connection ensures your care plan addresses the full picture, not just one number at a time.',
        ],
      },
    ],
  },
  {
    pillar: 'Stroke Prevention',
    title: 'Stroke Prevention: Understanding Risk, Warning Signs, and How to Protect Your Brain',
    excerpt:
      'Stroke is a leading cause of disability and death. Learn the risk factors, how to recognize the warning signs with FAST, and what you can do to prevent stroke.',
    tags: ['stroke prevention', 'cerebrovascular health', 'cardiovascular wellness'],
    sections: [
      {
        heading: 'What causes stroke',
        paragraphs: [
          'Most strokes are ischemic, caused by a blocked artery cutting off blood supply to the brain. Hemorrhagic strokes occur when a blood vessel in the brain ruptures. Both are medical emergencies.',
          'The same risk factors that cause heart disease—hypertension, diabetes, high cholesterol, smoking, obesity, and atrial fibrillation—also cause stroke. Controlling these protects both heart and brain.',
        ],
      },
      {
        heading: 'Recognizing stroke: the FAST method',
        paragraphs: [
          'FAST is a simple memory tool: Face drooping, Arm weakness, Speech difficulty, Time to call 911. If you notice any of these signs, even if they come and go, seek emergency care immediately.',
          'Other warning signs include sudden severe headache, confusion, trouble seeing in one or both eyes, difficulty walking, dizziness, and loss of balance or coordination.',
        ],
      },
      {
        heading: 'Prevention strategies',
        paragraphs: [
          'Stroke prevention mirrors heart disease prevention: control blood pressure, manage diabetes, optimize cholesterol, quit smoking, maintain healthy weight, exercise regularly, limit alcohol, and treat atrial fibrillation if present.',
          'For people with atrial fibrillation, blood thinners may be recommended to prevent clot formation. Regular follow-up with a physician ensures your prevention plan stays current as your health evolves.',
        ],
      },
    ],
  },
  {
    pillar: 'Heart Failure',
    title: 'Heart Failure: Recognizing the Signs and Understanding Your Options',
    excerpt:
      'Heart failure means the heart cannot pump blood effectively. Learn the causes, symptoms, stages, and how modern treatment helps people live longer and better.',
    tags: ['heart failure', 'congestive heart failure', 'cardiovascular disease'],
    sections: [
      {
        heading: 'What heart failure means',
        paragraphs: [
          'Heart failure does not mean the heart has stopped. It means the heart is unable to pump enough blood to meet the body’s needs, or the heart muscle has become too stiff to fill properly.',
          'It can result from coronary artery disease, prior heart attack, long-standing high blood pressure, faulty heart valves, diabetes, infections, or inherited conditions.',
        ],
      },
      {
        heading: 'Recognizing the symptoms',
        paragraphs: [
          'Common symptoms include shortness of breath during activity or when lying flat, persistent coughing or wheezing, swelling in the legs, ankles, or abdomen, fatigue, and rapid or irregular heartbeat.',
          'These symptoms often develop gradually, causing people to adapt and delay seeking care. Early recognition and treatment improve quality of life and reduce hospitalizations.',
        ],
      },
      {
        heading: 'Treatment and living well',
        paragraphs: [
          'Modern heart failure treatment includes medications that improve survival and symptoms, devices like pacemakers or defibrillators when indicated, and lifestyle strategies including sodium restriction, fluid monitoring, and structured exercise.',
          'With the right plan, many people with heart failure live active, meaningful lives. The key is early diagnosis, consistent follow-up, and a care team that understands the condition.',
        ],
      },
    ],
  },
  {
    pillar: 'Atrial Fibrillation',
    title: 'Atrial Fibrillation: The Most Common Heart Rhythm Problem and How It Is Managed',
    excerpt:
      'AFib affects millions of people and increases stroke risk. Learn what causes it, how it feels, and how physicians manage it to protect both rhythm and brain health.',
    tags: ['atrial fibrillation', 'heart rhythm disorders', 'stroke risk'],
    sections: [
      {
        heading: 'Understanding AFib',
        paragraphs: [
          'Atrial fibrillation is an irregular, often rapid heart rhythm that occurs when the upper chambers of the heart quiver instead of contracting effectively. It is the most common sustained arrhythmia in adults.',
          'Some people feel palpitations, chest discomfort, shortness of breath, fatigue, or dizziness. Others have no symptoms at all and discover AFib incidentally during a routine exam or wearable alert.',
        ],
      },
      {
        heading: 'Why AFib matters',
        paragraphs: [
          'When the atria quiver instead of pumping properly, blood can pool and form clots. If a clot travels to the brain, it causes stroke. AFib increases stroke risk approximately fivefold.',
          'AFib can also weaken the heart over time, contribute to heart failure, and reduce exercise capacity and quality of life. Treating it protects both the heart and the brain.',
        ],
      },
      {
        heading: 'Management options',
        paragraphs: [
          'Treatment focuses on two goals: controlling heart rate or rhythm, and reducing stroke risk. Medications, cardioversion, catheter ablation, and lifestyle changes all play a role depending on the patient.',
          'Blood thinners are often recommended to prevent clot formation, especially in people with additional risk factors. The choice of therapy is individualized based on age, symptoms, stroke risk, and preferences.',
        ],
      },
    ],
  },
  {
    pillar: 'Lifestyle and Prevention',
    title: 'Daily Habits That Protect Your Heart: A Practical Guide to Cardiovascular Wellness',
    excerpt:
      'Small daily choices add up to meaningful cardiovascular protection. Learn evidence-based habits for nutrition, movement, sleep, and stress that support long-term heart health.',
    tags: ['heart healthy lifestyle', 'cardiovascular prevention', 'wellness habits'],
    sections: [
      {
        heading: 'Nutrition that nourishes the heart',
        paragraphs: [
          'A heart-healthy eating pattern emphasizes vegetables, fruits, whole grains, legumes, nuts, fish, and healthy oils while limiting sodium, added sugars, refined carbohydrates, and processed meats.',
          'The Mediterranean and DASH eating patterns are consistently associated with lower cardiovascular risk. They are flexible, sustainable, and backed by decades of research.',
        ],
      },
      {
        heading: 'Movement as medicine',
        paragraphs: [
          'Regular physical activity strengthens the heart, improves blood pressure and cholesterol, helps maintain healthy weight, reduces inflammation, and supports mental health.',
          'You do not need to run marathons. Brisk walking, swimming, cycling, or strength training for at least 150 minutes per week of moderate activity provides substantial cardiovascular benefit.',
        ],
      },
      {
        heading: 'Sleep, stress, and substance use',
        paragraphs: [
          'Poor sleep and untreated sleep apnea raise blood pressure and cardiovascular risk. Aim for 7 to 8 hours of quality sleep and discuss snoring or daytime fatigue with your physician.',
          'Chronic stress contributes to inflammation, hypertension, and unhealthy coping behaviors. Mindfulness, social connection, time outdoors, and professional support can help. Limit alcohol and avoid smoking entirely.',
        ],
      },
    ],
  },
  {
    pillar: 'Women and Heart Disease',
    title: 'Women and Heart Disease: Why Cardiovascular Risk Is Different and What to Do About It',
    excerpt:
      'Heart disease is the leading cause of death in women, yet it is often underrecognized. Learn the unique risk factors, symptoms, and prevention strategies for women’s cardiovascular health.',
    tags: ['women heart health', 'cardiovascular disparities', 'gender differences'],
    sections: [
      {
        heading: 'The underrecognized risk',
        paragraphs: [
          'Heart disease kills more women than all cancers combined, yet many women and even some clinicians underestimate the risk. Historically, cardiovascular research focused on men, leaving gaps in understanding women’s hearts.',
          'Women often develop heart disease later than men, but diabetes, smoking, and family history confer greater relative risk in women. Pregnancy complications like preeclampsia and gestational diabetes also predict future cardiovascular risk.',
        ],
      },
      {
        heading: 'Atypical symptoms in women',
        paragraphs: [
          'Women are more likely than men to experience atypical heart attack symptoms: extreme fatigue, shortness of breath, nausea, back or jaw pain, lightheadedness, and anxiety. Chest pain may be absent or feel more like pressure than pain.',
          'Because these symptoms overlap with common, less serious conditions, women often delay seeking care or are misdiagnosed. Knowing your body and advocating for cardiac evaluation when something feels wrong can be lifesaving.',
        ],
      },
      {
        heading: 'Prevention tailored to women',
        paragraphs: [
          'Prevention includes managing traditional risk factors—blood pressure, cholesterol, diabetes, weight, smoking, and exercise—with added attention to women-specific factors like hormonal changes, pregnancy history, and autoimmune conditions that raise cardiovascular risk.',
          'A physician who understands these differences can craft a prevention plan that respects the unique cardiovascular journey women face across their lifespan.',
        ],
      },
    ],
  },
  {
    pillar: 'Exercise and Heart Health',
    title: 'Exercise and Your Heart: How Much, What Type, and Why It Matters at Every Age',
    excerpt:
      'Physical activity is one of the most powerful tools for cardiovascular protection. Learn the optimal types, amounts, and intensity of exercise for long-term heart health.',
    tags: ['exercise and heart health', 'cardiovascular fitness', 'physical activity'],
    sections: [
      {
        heading: 'The evidence is clear',
        paragraphs: [
          'Regular physical activity reduces the risk of heart disease, stroke, hypertension, diabetes, and obesity. It also improves mood, sleep, energy, and quality of life.',
          'The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening exercises at least two days per week.',
        ],
      },
      {
        heading: 'What counts as heart-healthy exercise',
        paragraphs: [
          'Moderate-intensity activities include brisk walking, cycling, swimming, dancing, and gardening. Vigorous activities include running, hiking uphill, fast cycling, and aerobic sports.',
          'Strength training is equally important. It improves insulin sensitivity, supports healthy weight, builds bone density, and complements aerobic fitness. A balanced routine includes both.',
        ],
      },
      {
        heading: 'Starting safely and building habits',
        paragraphs: [
          'If you are new to exercise or have existing heart conditions, consult your physician before starting a new program. Begin gradually, choose activities you enjoy, and build consistency over intensity.',
          'The best exercise is the one you will actually do. Walking is one of the most accessible, sustainable, and effective cardiovascular exercises available to nearly everyone.',
        ],
      },
    ],
  },
  {
    pillar: 'Stress and Heart Health',
    title: 'Chronic Stress and Your Heart: The Hidden Cardiovascular Risk Factor',
    excerpt:
      'Stress is not just in your head—it affects your heart. Learn how chronic stress damages the cardiovascular system and practical strategies to manage it effectively.',
    tags: ['stress and heart disease', 'mental health and cardiovascular', 'stress management'],
    sections: [
      {
        heading: 'How stress harms the heart',
        paragraphs: [
          'Acute stress triggers the fight-or-flight response, releasing adrenaline and cortisol that raise heart rate and blood pressure. Chronic stress keeps these hormones elevated, promoting inflammation, hypertension, and arterial damage.',
          'Stress also drives unhealthy coping behaviors: overeating, smoking, excessive drinking, poor sleep, and physical inactivity. These compound the direct cardiovascular effects of stress hormones.',
        ],
      },
      {
        heading: 'Stress and cardiac events',
        paragraphs: [
          'Research links chronic stress to increased risk of heart attack, stroke, and arrhythmias. Stress cardiomyopathy, or broken heart syndrome, is a real condition where intense emotional stress temporarily weakens the heart muscle.',
          'Job strain, caregiving burden, financial stress, social isolation, and trauma all independently raise cardiovascular risk. Addressing stress is not optional self-care—it is medical prevention.',
        ],
      },
      {
        heading: 'Evidence-based stress management',
        paragraphs: [
          'Effective stress management includes physical activity, mindfulness practices, cognitive behavioral therapy, adequate sleep, social connection, time in nature, and sometimes medication for anxiety or depression.',
          'The goal is not to eliminate stress—it is to build resilience and healthy responses. A physician can help identify stress-related cardiovascular symptoms and connect you with appropriate resources.',
        ],
      },
    ],
  },
]

function getWeekIndex(date: Date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const diffDays = Math.floor((date.getTime() - start.getTime()) / 86400000)
  return Math.floor(diffDays / 7)
}

function buildClinicalQuestions(pillar: string) {
  const lower = pillar.toLowerCase()

  if (lower.includes('causes') || lower.includes('risk factor')) {
    return [
      "Which risk factors in this patient's history are modifiable versus fixed?",
      "How do genetics, lifestyle, and medical conditions interact to create this patient's cardiovascular risk profile?",
      "Which single change would have the greatest impact on reducing overall risk?",
      "How should we communicate complex risk data in a way that motivates action rather than fear?",
    ]
  }

  if (lower.includes('warning') || lower.includes('heart attack') || lower.includes('symptom')) {
    return [
      "Are the symptoms described typical, atypical, or non-cardiac in origin?",
      "What timeline of symptom progression would change this from routine to urgent?",
      "How do we educate patients to recognize subtle warning signs without creating unnecessary anxiety?",
      "What emergency response plan should be in place for high-risk patients?",
    ]
  }

  if (lower.includes('blood pressure') || lower.includes('hypertension')) {
    return [
      "Is this blood pressure reading representative, or could white-coat effect or masked hypertension be involved?",
      "What organ systems (heart, brain, kidneys, eyes) may already be affected?",
      "Which lifestyle modifications are realistic for this patient, and when is medication clearly indicated?",
      "How should home blood pressure monitoring be structured for meaningful data?",
    ]
  }

  if (lower.includes('cholesterol') || lower.includes('lipid')) {
    return [
      "What is the full lipid picture: LDL, HDL, triglycerides, and non-HDL cholesterol?",
      "How does family history and overall cardiovascular risk change the LDL target?",
      "What dietary changes can meaningfully improve this lipid profile?",
      "When do statins or other medications become necessary, and what are the monitoring requirements?",
    ]
  }

  if (lower.includes('diabetes') || lower.includes('blood sugar') || lower.includes('insulin')) {
    return [
      "How does this patient's glucose control translate to cardiovascular risk over time?",
      "Are there signs of microvascular or macrovascular complications already present?",
      "How should diabetes management be coordinated with cardiovascular prevention?",
      "What lifestyle interventions have the strongest evidence for improving both glucose and heart outcomes?",
    ]
  }

  if (lower.includes('stroke') || lower.includes('cerebrovascular')) {
    return [
      "What is this patient's stroke risk score, and which modifiable factors matter most?",
      "Is atrial fibrillation or another cardioembolic source present?",
      "How do we balance stroke prevention with bleeding risk in anticoagulation decisions?",
      "What lifestyle and medical management can prevent both stroke and heart disease simultaneously?",
    ]
  }

  if (lower.includes('heart failure') || lower.includes('congestive')) {
    return [
      "What is the underlying cause of this patient's heart failure: ischemic, hypertensive, valvular, or other?",
      "What is the ejection fraction, and how does it guide treatment and prognosis?",
      "How should daily weights, sodium intake, and fluid balance be monitored and managed?",
      "Which medications improve survival, which improve symptoms, and how do they work together?",
    ]
  }

  if (lower.includes('atrial fibrillation') || lower.includes('afib')) {
    return [
      "What is the stroke risk score (CHA2DS2-VASc), and is anticoagulation indicated?",
      "Are there reversible triggers such as alcohol, thyroid disease, sleep apnea, or infection?",
      "Should the focus be on rate control, rhythm control, or stroke prevention?",
      "What symptoms would indicate a need for urgent versus routine follow-up?",
    ]
  }

  if (lower.includes('lifestyle') || lower.includes('prevention') || lower.includes('habit')) {
    return [
      "What are this patient's current habits, and which changes feel achievable rather than overwhelming?",
      "How can nutrition, movement, sleep, and stress management work together rather than in isolation?",
      "What barriers (time, cost, knowledge, motivation) need to be addressed for sustainable change?",
      "How should progress be measured so the patient stays engaged and the plan can be adjusted?",
    ]
  }

  if (lower.includes('women') || lower.includes('gender')) {
    return [
      "What women-specific risk factors (pregnancy history, hormonal changes, autoimmune conditions) apply here?",
      "Are symptoms being dismissed or misattributed because they are atypical?",
      "How does cardiovascular risk change across the lifespan, from reproductive years to menopause and beyond?",
      "What prevention strategies are particularly effective for women at elevated cardiovascular risk?",
    ]
  }

  if (lower.includes('exercise') || lower.includes('physical activity') || lower.includes('fitness')) {
    return [
      "What is this patient's current fitness level, and what are the cardiovascular implications?",
      "Are there exercise restrictions based on existing heart conditions or recent procedures?",
      "What types, intensities, and durations of exercise provide the greatest cardiovascular benefit?",
      "How can we build a sustainable exercise habit that fits this patient's life and preferences?",
    ]
  }

  if (lower.includes('stress') || lower.includes('mental')) {
    return [
      "What are the sources of chronic stress in this patient's life, and how do they affect cardiovascular metrics?",
      "Are there symptoms of depression or anxiety that could be masking or mimicking cardiac symptoms?",
      "What stress management strategies have evidence for cardiovascular benefit?",
      "When should mental health support be integrated into the cardiovascular care plan?",
    ]
  }

  if (lower.includes('diagnostic') || lower.includes('screening')) {
    return [
      "What specific clinical question should this test answer?",
      "Does the result change prevention, medication, follow-up, or referral decisions?",
      "How should the result be explained in plain language so the patient can act on it?",
      "What should be repeated, watched, or coordinated over time?",
    ]
  }

  if (lower.includes('cardiometabolic')) {
    return [
      "How do blood pressure, cholesterol, blood sugar, weight, sleep, stress, and fitness interact for this patient?",
      "Which risk factor is most urgent to improve first?",
      "What lifestyle changes are realistic enough to sustain?",
      "When would medication, imaging, or closer follow-up meaningfully lower long-term risk?",
    ]
  }

  if (lower.includes('rhythm')) {
    return [
      "Are symptoms connected to a documented rhythm change?",
      "Are there triggers such as dehydration, sleep disruption, alcohol, stimulants, stress, or medication changes?",
      "Is the rhythm benign, something to monitor, or something that needs treatment?",
      "What symptoms would make the situation urgent rather than routine?",
    ]
  }

  if (lower.includes('executive')) {
    return [
      "What risk is being missed because the patient is busy, asymptomatic, or relying on fragmented care?",
      "How can evaluation be organized efficiently without becoming superficial?",
      "Which prevention steps protect long-term energy, performance, and independence?",
      "How should follow-up be structured so the plan actually happens?",
    ]
  }

  if (lower.includes('longevity')) {
    return [
      "What is the patient trying to preserve: energy, travel, work capacity, family time, athletic goals, or independence?",
      "Which cardiovascular risks are most likely to threaten that future?",
      "What should be measured now so change can be tracked over time?",
      "How should the plan evolve as labs, imaging, symptoms, and goals change?",
    ]
  }

  return [
    "What is this patient's true cardiovascular risk, not just today's snapshot?",
    "Which risk factors are silent but modifiable?",
    "Would earlier screening or closer follow-up change the plan?",
    "How can we make prevention specific, measurable, and sustainable?",
  ]
}

function buildActionSteps(tags: string[]) {
  const normalizedTags = tags.join(' ').toLowerCase()

  const steps: string[] = [
    'Know your numbers: blood pressure, cholesterol profile, blood sugar status, weight trend, and family history.',
    'Pay attention to change: new chest discomfort, shortness of breath, palpitations, exercise intolerance, swelling, dizziness, or fainting should be discussed with a clinician.',
    'Make prevention measurable: set clear goals for movement, nutrition, sleep, medication adherence, and follow-up rather than relying on vague motivation.',
  ]

  // Diet and nutrition advice for heart health
  if (normalizedTags.includes('diet') || normalizedTags.includes('nutrition') || normalizedTags.includes('eating') || normalizedTags.includes('food')) {
    steps.push(
      'Eat for your heart: prioritize vegetables, fruits, whole grains, legumes, nuts, and fish. Limit sodium to under 2,300 mg daily (ideally 1,500 mg), reduce saturated fats, eliminate trans fats, and minimize added sugars and processed meats.',
      'Follow heart-healthy patterns: the Mediterranean and DASH diets are consistently associated with lower cardiovascular risk. They emphasize olive oil, leafy greens, berries, fatty fish, whole grains, and legumes.',
      'Cook at home more often: restaurant meals are typically high in sodium, unhealthy fats, and oversized portions. Preparing meals at home gives you control over ingredients and portions.',
      'Read labels carefully: watch for hidden sodium in bread, sauces, canned goods, and frozen meals. Choose foods with less than 140 mg sodium per serving when possible.'
    )
  }

  if (normalizedTags.includes('cholesterol') || normalizedTags.includes('lipid')) {
    steps.push(
      'Lower LDL naturally: increase soluble fiber from oats, beans, lentils, apples, and flaxseed. Add nuts (walnuts, almonds) and plant sterols from fortified foods.',
      'Choose healthy fats: replace butter with olive oil, choose avocado over cheese, and eat fatty fish (salmon, mackerel, sardines) twice weekly for omega-3s.',
      'Limit dietary cholesterol: while dietary cholesterol has less impact than saturated fat, keeping egg yolks and organ meats moderate can help when LDL is elevated.'
    )
  }

  if (normalizedTags.includes('blood pressure') || normalizedTags.includes('hypertension')) {
    steps.push(
      'Follow the DASH diet: rich in potassium (bananas, spinach, sweet potatoes), magnesium (nuts, seeds, whole grains), and calcium (low-fat dairy, leafy greens) while keeping sodium low.',
      'Limit alcohol: no more than one drink per day for women and two for men. Excess alcohol raises blood pressure and contributes to weight gain.',
      'Increase potassium-rich foods: potassium helps counter sodium\u2019s effects. Good sources include bananas, oranges, tomatoes, potatoes, spinach, beans, and yogurt.'
    )
  }

  if (normalizedTags.includes('diabetes') || normalizedTags.includes('blood sugar')) {
    steps.push(
      'Control carbohydrate quality: choose low-glycemic index carbs like steel-cut oats, quinoa, lentils, and non-starchy vegetables. Limit white bread, white rice, sugary drinks, and desserts.',
      'Eat consistent meals: irregular eating patterns cause blood sugar spikes. Aim for balanced meals with protein, healthy fats, and fiber at regular intervals.',
      'Monitor carbohydrate portions: even healthy carbs raise blood sugar. Learn appropriate serving sizes and consider meeting with a registered dietitian for personalized guidance.'
    )
  }

  if (normalizedTags.includes('weight') || normalizedTags.includes('obesity')) {
    steps.push(
      'Focus on sustainable weight loss: even 5-10% weight loss significantly improves blood pressure, cholesterol, and blood sugar. Aim for 1-2 pounds per week through gradual changes.',
      'Portion control matters: use smaller plates, measure servings, and eat mindfully. It takes 20 minutes for fullness signals to reach your brain.',
      'Prioritize protein and fiber at each meal: both increase satiety. Include lean protein (fish, poultry, beans, tofu) and vegetables at every meal.'
    )
  }

  // Exercise and movement
  if (normalizedTags.includes('exercise') || normalizedTags.includes('fitness') || normalizedTags.includes('physical activity')) {
    steps.push(
      'Aim for 150 minutes of moderate exercise weekly: brisk walking, cycling, swimming, or dancing. Break it into 30-minute sessions, 5 days per week.',
      'Add strength training twice weekly: resistance exercises improve insulin sensitivity, support healthy weight, and complement aerobic fitness.',
      'Find activities you enjoy: consistency matters more than intensity. Walking is one of the most accessible and effective cardiovascular exercises.'
    )
  }

  // Sleep
  if (normalizedTags.includes('sleep') || normalizedTags.includes('apnea')) {
    steps.push(
      'Prioritize 7-8 hours of quality sleep: poor sleep raises blood pressure, increases inflammation, and disrupts metabolism.',
      'Maintain a consistent sleep schedule: go to bed and wake at the same time daily, even on weekends.',
      'Screen for sleep apnea: loud snoring, daytime fatigue, and morning headaches may indicate sleep apnea, which significantly raises cardiovascular risk.'
    )
  }

  // Stress
  if (normalizedTags.includes('stress') || normalizedTags.includes('mental')) {
    steps.push(
      'Practice stress-reduction techniques: mindfulness meditation, deep breathing, progressive muscle relaxation, yoga, and time in nature all lower cortisol and blood pressure.',
      'Build social connections: strong relationships buffer stress. Make time for family, friends, and community.',
      'Seek professional help when needed: chronic stress, anxiety, and depression are medical conditions that deserve treatment and directly affect heart health.'
    )
  }

  // Smoking
  if (normalizedTags.includes('smoking') || normalizedTags.includes('tobacco')) {
    steps.push(
      'Quit smoking completely: even one cigarette daily damages blood vessels. Within one year of quitting, heart disease risk drops by half.',
      'Avoid secondhand smoke: exposure to others\u2019 tobacco smoke also increases cardiovascular risk.',
      'Use evidence-based cessation tools: nicotine replacement, prescription medications, counseling, and support groups all improve quit rates.'
    )
  }

  // Stroke-specific
  if (normalizedTags.includes('stroke')) {
    steps.push(
      'Control the big three: blood pressure below 130/80, LDL cholesterol appropriate for your risk level, and blood sugar in target range.',
      'Recognize FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911. Teach this to family members too.',
      'Manage atrial fibrillation: if you have AFib, take prescribed blood thinners and attend all follow-up appointments.'
    )
  }

  // Heart failure
  if (normalizedTags.includes('heart failure')) {
    steps.push(
      'Track daily weights: a sudden gain of 2-3 pounds in one day or 5 pounds in a week may signal fluid retention. Call your physician.',
      'Limit sodium to 2,000 mg daily: avoid canned soups, processed meats, frozen meals, and restaurant food. Read every label.',
      'Take medications exactly as prescribed: do not skip doses or stop without consulting your physician. These medications protect your heart and improve survival.'
    )
  }

  // Women-specific
  if (normalizedTags.includes('women') || normalizedTags.includes('gender')) {
    steps.push(
      'Know your pregnancy history: preeclampsia, gestational diabetes, and preterm delivery predict future cardiovascular risk. Share this with your physician.',
      'Track symptoms across your cycle: hormonal fluctuations can affect blood pressure, palpitations, and migraine. Note patterns to discuss with your clinician.',
      'Advocate for yourself: if symptoms feel wrong, insist on cardiac evaluation. Women\u2019s heart disease is underdiagnosed but highly treatable when caught early.'
    )
  }

  if (normalizedTags.includes('diagnostic') || normalizedTags.includes('screening')) {
    steps.push(
      'Use testing with purpose: echocardiography, vascular ultrasound, rhythm monitoring, stress testing, or CT coordination should answer a clear clinical question.'
    )
  }

  if (normalizedTags.includes('metabolic') || normalizedTags.includes('wellness')) {
    steps.push(
      'Connect heart and metabolism: blood pressure, insulin resistance, weight, sleep, and inflammation often need to be addressed together.'
    )
  }

  if (normalizedTags.includes('executive') || normalizedTags.includes('accessibility')) {
    steps.push(
      'Protect time without sacrificing depth: a well-organized cardiovascular plan should be efficient, personal, and clinically complete.'
    )
  }

  if (normalizedTags.includes('lifestyle') || normalizedTags.includes('prevention') || normalizedTags.includes('habit')) {
    steps.push(
      'Small changes compound: a 10-minute walk, swapping soda for water, or adding vegetables to one meal daily creates momentum. Build from there.',
      'Set specific, measurable goals: "I will walk 20 minutes after lunch on weekdays" works better than "I will exercise more."',
      'Involve your family: heart-healthy habits are easier when shared. Cook together, walk together, and support each other\u2019s health goals.'
    )
  }

  return steps
}

function buildList(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n')
}

function buildBody(topic: BlogTopic) {
  const sections = topic.sections
    .map((section) => {
      const body = section.paragraphs.join('\n\n')
      return `## ${section.heading}\n\n${body}`
    })
    .join('\n\n')

  return `From the cardiologist's perspective at PulsePoint Clinic, ${topic.title.toLowerCase()} is not just a clinical topic. It is part of a larger conversation about prevention, early detection, and helping people make better decisions before cardiovascular disease becomes disruptive.

This article is written for educational purposes for patients and families who want a clearer, calmer way to think about heart health. It is not meant to create alarm. It is meant to make the next conversation with your physician more informed.

## Key takeaways

${buildList([
    topic.excerpt,
    'Modern cardiovascular care works best when it combines medical judgment, thoughtful diagnostics, and a prevention plan that fits the person.',
    'Symptoms matter, but risk often begins before symptoms appear.',
    'The goal is not more testing for its own sake. The goal is better decisions.',
  ])}

${sections}

## What I look for as a cardiologist

When I think through this topic with a patient, I am usually trying to answer a few practical questions:

${buildList(buildClinicalQuestions(topic.pillar))}

Those questions help turn a broad heart-health topic into a personal plan. Two people can have the same headline risk factor and still need different next steps because their history, goals, symptoms, family history, lifestyle, and test results are different.

## How patients can use this information

${buildList(buildActionSteps(topic.tags))}

The most useful heart-health plan is specific enough to guide action but realistic enough to live with. Prevention should not feel like a lecture. It should feel like a clear strategy that helps you protect the life you are trying to build.

## The PulsePoint approach

PulsePoint Clinic is designed around premium personalized cardiovascular care: more time for the physician relationship, a prevention-first mindset, advanced diagnostics when they are appropriate, and follow-up that keeps the plan moving.

That model is especially important in cardiovascular medicine because many of the highest-value decisions happen before a crisis. The earlier we understand risk, the more options we often have to improve it.

## When to seek urgent care

Educational information should never delay emergency evaluation. Chest pressure, severe shortness of breath, fainting, new neurologic symptoms such as facial droop or arm weakness, sudden severe weakness, or symptoms that feel alarming should be treated as urgent.

## Important note

This article is educational and does not replace medical advice, diagnosis, or treatment. If you have chest pain, severe shortness of breath, fainting, stroke symptoms, or another emergency concern, call 911 or seek emergency care.`
}

function textFromValue(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (Array.isArray(value)) return textFromValue(value[0])
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return textFromValue(record['#text'] ?? record._text ?? record.href ?? record['@_href'])
  }
  return ''
}

function normalizeItems(parsed: unknown): Array<Record<string, unknown>> {
  const record = parsed as Record<string, unknown>
  const rssChannel = (record.rss as Record<string, unknown> | undefined)?.channel as
    | Record<string, unknown>
    | undefined
  const rssItems = rssChannel?.item
  const atomFeed = record.feed as Record<string, unknown> | undefined
  const atomItems = atomFeed?.entry
  const rawItems = rssItems ?? atomItems ?? []

  return (Array.isArray(rawItems) ? rawItems : [rawItems]).filter(
    (item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object'
  )
}

function getItemUrl(item: Record<string, unknown>) {
  const link = item.link

  if (Array.isArray(link)) {
    const alternate = link.find(
      (entry) =>
        typeof entry === 'object' &&
        entry &&
        ((entry as Record<string, unknown>)['@_rel'] === 'alternate' ||
          !(entry as Record<string, unknown>)['@_rel'])
    )
    return textFromValue(alternate)
  }

  return textFromValue(link ?? item.guid ?? item.id)
}

function scoreTitle(title: string) {
  const normalized = title.toLowerCase()
  return RELEVANCE_TERMS.reduce((score, term) => {
    return normalized.includes(term) ? score + 1 : score
  }, 0)
}

async function fetchFeedItems(source: FeedSource): Promise<FeedItem[]> {
  try {
    const response = await fetch(source.url, {
      headers: {
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml',
        'user-agent': 'PulsePointHeart.com editorial automation',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []

    const xml = await response.text()
    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    })
    const parsed = parser.parse(xml)

    return normalizeItems(parsed)
      .map((item) => {
        const title = textFromValue(item.title).replace(/\s+/g, ' ').trim()
        const url = getItemUrl(item)
        const publishedAt = textFromValue(item.pubDate ?? item.published ?? item.updated)
        const score = scoreTitle(title)

        return {
          sourceName: source.name,
          title,
          url,
          publishedAt: publishedAt || null,
          tags: source.defaultTags,
          score,
        }
      })
      .filter((item) => item.title.length > 8 && item.url.length > 8 && item.score > 0)
  } catch (error) {
    console.error(`RSS fetch failed for ${source.name}:`, error)
    return []
  }
}

async function findBestFeedItem() {
  const batches = await Promise.all(FEED_SOURCES.map(fetchFeedItems))
  const items = batches.flat()

  return items
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return Date.parse(b.publishedAt ?? '0') - Date.parse(a.publishedAt ?? '0')
    })
    .at(0)
}

function buildFeedInspiredBody(item: FeedItem) {
  const tags = Array.from(new Set(item.tags))

  return `From the cardiologist's perspective at PulsePoint Clinic, cardiovascular news is most useful when it helps patients ask better questions about their own prevention, screening, and long-term wellness.

This educational article was inspired by a recent item from ${item.sourceName}: "${item.title}." The original source is linked below for clinical review and context. The purpose here is not to summarize or copy that article. The purpose is to translate the broader topic into a practical, patient-centered PulsePoint perspective.

## Why this matters now

Cardiovascular health is often shaped years before a diagnosis appears. Blood pressure, cholesterol, blood sugar, sleep, stress, exercise capacity, family history, inflammation, weight, vascular health, and rhythm symptoms can all move quietly in the background.

That is why timely cardiovascular topics deserve more than a quick headline reaction. The better question is: what should this make us look for earlier, explain more clearly, or monitor more thoughtfully?

## PulsePoint perspective

Premium cardiovascular care should help patients move from scattered health headlines to a clear personal plan. That plan may include blood pressure review, cholesterol and cardiometabolic risk assessment, family history, lifestyle patterns, appropriate diagnostic testing, and physician-led follow-up.

The strongest version of preventive cardiology is not fear-based. It is calm, organized, and specific. It helps patients understand their risk early enough to make meaningful decisions.

## What I would want patients to understand

${buildList([
    'A headline is not a diagnosis. It is a starting point for a better clinical conversation.',
    'Risk is personal. Age, family history, blood pressure, cholesterol, diabetes risk, kidney health, smoking history, pregnancy history, sleep, fitness, and symptoms can all change the meaning of the same topic.',
    'Prevention works best when it is measured. Patients should know what is being tracked, why it matters, and when the plan will be reassessed.',
    'Advanced diagnostics can be powerful, but only when they answer a clear question and connect back to a care plan.',
  ])}

## Clinical questions this topic raises

${buildList([
    'Could this topic change how patients think about early detection?',
    'Does it connect to preventive cardiology, cardiometabolic wellness, rhythm monitoring, vascular screening, or advanced diagnostics?',
    'Who might benefit from a more detailed cardiovascular risk review?',
    'What would a patient need to understand before discussing this with a physician?',
    'How can this be explained in a way that is clear, calm, and medically responsible?',
  ])}

## Practical next steps for patients

${buildList(buildActionSteps(tags))}

## How this fits the PulsePoint model

PulsePoint is building a modern cardiovascular and wellness platform, not a traditional reactive clinic experience. That means the work is not limited to treating disease after it appears. It includes prevention, physician accessibility, integrated diagnostics, cardiometabolic wellness, and long-term heart-health optimization.

From the cardiologist's perspective, the value is in connecting the dots. A patient may come in with a wearable alert, a family history concern, rising blood pressure, abnormal cholesterol, reduced exercise tolerance, or a desire to be proactive. The goal is to bring those signals into one coherent plan.

## Editorial review note

This draft was generated through PulsePoint's educational topic-monitoring workflow and should be reviewed for final clinical nuance, local service alignment, and any needed updates before publication.

## Source for review

${item.sourceName}: ${item.url}

## Important note

This draft was generated from RSS topic monitoring for editorial review. It is educational and does not replace medical advice, diagnosis, or treatment. If you have chest pain, severe shortness of breath, fainting, stroke symptoms, or another emergency concern, call 911 or seek emergency care.`
}

async function createFeedInspiredDraft(supabase: SupabaseClient, now: Date) {
  const item = await findBestFeedItem()
  if (!item) return null

  const title = `PulsePoint Perspective: ${item.title}`.slice(0, 190)
  const baseSlug = datedSlug(title, now)
  const createdAt = now.toISOString()

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug, title')
    .eq('slug', baseSlug)
    .maybeSingle()

  if (existing) {
    return {
      created: false,
      post: existing,
      message: 'An RSS-inspired draft for this topic already exists.',
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: baseSlug,
      title,
      excerpt:
        'A detailed educational PulsePoint perspective inspired by a recent cardiovascular source, prepared for clinical review before publication.',
      body_md: buildFeedInspiredBody(item),
      author: PULSEPOINT_AUTHOR,
      tags: Array.from(new Set(['rss-inspired', ...item.tags])),
      is_published: false,
      created_at: createdAt,
      updated_at: createdAt,
    })
    .select('id, slug, title')
    .single()

  if (error) {
    throw error
  }

  return {
    created: true,
    post: data,
    message: `Created an RSS-inspired draft from ${item.sourceName}.`,
  }
}

function datedSlug(title: string, date: Date) {
  const stamp = date.toISOString().slice(0, 10)
  return `${slugify(title)}-${stamp}`.slice(0, 120)
}

export async function createAutomatedBlogDraft(
  supabase: SupabaseClient,
  now = new Date()
) {
  const feedDraft = await createFeedInspiredDraft(supabase, now)
  if (feedDraft) return feedDraft

  const topic = TOPICS[getWeekIndex(now) % TOPICS.length]
  const baseSlug = datedSlug(topic.title, now)
  const createdAt = now.toISOString()

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug, title')
    .eq('slug', baseSlug)
    .maybeSingle()

  if (existing) {
    return {
      created: false,
      post: existing,
      message: 'A draft for this scheduled topic already exists.',
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: baseSlug,
      title: topic.title,
      excerpt: topic.excerpt,
      body_md: buildBody(topic),
      author: PULSEPOINT_AUTHOR,
      tags: topic.tags,
      is_published: false,
      created_at: createdAt,
      updated_at: createdAt,
    })
    .select('id, slug, title')
    .single()

  if (error) {
    throw error
  }

  return {
    created: true,
    post: data,
    message: `Created a new ${topic.pillar} draft.`,
  }
}

export async function autoPublishUnreviewedDrafts(
  supabase: SupabaseClient,
  now = new Date(),
  hours = getAutoPublishAfterHours()
) {
  const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString()
  const publishedAt = now.toISOString()

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      is_published: true,
      published_at: publishedAt,
      updated_at: publishedAt,
    })
    .eq('is_published', false)
    .lte('created_at', cutoff)
    .select('id, slug, title')

  if (error) {
    throw error
  }

  return {
    published: data?.length ?? 0,
    posts: data ?? [],
    message:
      data && data.length > 0
        ? `Auto-published ${data.length} unreviewed draft${data.length === 1 ? '' : 's'}.`
        : `No drafts older than ${hours} hours were ready to auto-publish.`,
  }
}
