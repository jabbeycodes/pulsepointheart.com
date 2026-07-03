/**
 * Autonomous SEO Engine — Content Generation
 * Creates physician-grade article drafts from keyword research and topic strategy
 */

import { slugify } from '@/lib/blog'
import type {
  ArticleTopic,
  ArticleDraft,
  PillarCategory,
} from '@/lib/seo-engine/types'
import {
  buildRelatedConditionsMarkdown,
} from '@/lib/blog-condition-links'
import {
  buildBlogLocalFooterMarkdown,
  buildBlogLocalIntroMarkdown,
} from '@/lib/blog-seo'

// ──────────────────────────────────────────────
// 1. TOPIC STRATEGY GENERATOR
// ──────────────────────────────────────────────

const PILLAR_ANGLES: Record<PillarCategory, string[]> = {
  'Preventive Cardiology': [
    'how early screening changes outcomes',
    'building a prevention plan at every age',
    'what your annual heart check should include',
    'preventive cardiology vs reactive treatment',
  ],
  'Advanced Diagnostics': [
    'when advanced testing makes the difference',
    'understanding your diagnostic results',
    'the latest in cardiac imaging technology',
    'choosing the right test for your symptoms',
  ],
  'Cardiometabolic Wellness': [
    'the metabolic-heart connection explained',
    'managing weight for cardiovascular health',
    'blood sugar, blood pressure, and your heart',
    'integrated cardiometabolic care',
  ],
  'Executive Heart Health': [
    'heart health for busy professionals',
    'executive physicals vs standard checkups',
    'maintaining peak cardiovascular performance',
    'when to prioritize preventive cardiology',
  ],
  'Heart Rhythm Monitoring': [
    'understanding palpitations and irregular beats',
    'wearable heart monitors: what they can and cannot tell you',
    'when rhythm concerns need specialist evaluation',
    'living confidently with arrhythmia awareness',
  ],
  'Longevity-Focused Care': [
    'planning for decades of heart health',
    'the science of cardiovascular aging',
    'maintaining heart health after 60',
    'integrating wellness into long-term cardiac care',
  ],
  'Causes of Heart Disease': [
    'understanding your personal risk factors',
    'genetics vs lifestyle: what matters most',
    'the hidden causes of cardiovascular decline',
    'connecting the dots in multifactorial heart disease',
  ],
  'Warning Signs': [
    'symptoms you should never ignore',
    'early warning signs of cardiovascular trouble',
    'when chest discomfort is an emergency',
    'atypical heart symptoms in women and men',
  ],
  'Blood Pressure': [
    'understanding your blood pressure readings',
    'lifestyle changes that lower blood pressure',
    'when medication becomes necessary',
    'the silent danger of uncontrolled hypertension',
  ],
  Cholesterol: [
    'decoding your lipid panel results',
    'dietary approaches to cholesterol management',
    'when statins are the right choice',
    'the truth about good vs bad cholesterol',
  ],
  'Diabetes and Heart Health': [
    'protecting your heart when you have diabetes',
    'the cardiovascular risks of insulin resistance',
    'integrated care for diabetics with heart concerns',
    'blood sugar control and arterial health',
  ],
  'Stroke Prevention': [
    'understanding stroke risk factors',
    'the heart-brain connection in stroke prevention',
    'FAST: recognizing stroke warning signs',
    'lifestyle changes that reduce stroke risk',
  ],
  'Heart Failure': [
    'living well with heart failure',
    'early signs your heart is weakening',
    'modern treatments for congestive heart failure',
    'heart failure prevention strategies',
  ],
  'Women and Heart Disease': [
    'why heart disease is different for women',
    'pregnancy and cardiovascular risk',
    'menopause and heart health',
    'advocating for your cardiac care as a woman',
  ],
  'Exercise and Heart Health': [
    'safe exercise for cardiac patients',
    'the optimal workout for heart health',
    'understanding exercise stress testing',
    'building cardiovascular fitness at any age',
  ],
  'Stress and Heart Health': [
    'how chronic stress damages your heart',
    'stress management techniques for cardiac patients',
    'the cortisol-cardiovascular connection',
    'mindfulness and heart health outcomes',
  ],
  'Vein and Vascular': [
    'varicose veins vs deep vein thrombosis',
    'when leg pain signals vascular disease',
    'minimally invasive vein treatments',
    'preventing peripheral artery disease',
  ],
  'Local SEO': [
    'finding a cardiologist in Columbia Missouri',
    'what to expect at your first cardiology visit',
    'Boone County heart care resources',
    'Central Missouri cardiovascular specialists',
  ],
}

const PATIENT_PERSONA_DETAILS: Record<string, { voice: string; concerns: string[]; goals: string[] }> = {
  general: {
    voice: 'clear, reassuring, educational',
    concerns: ['understanding their condition', 'knowing when to seek care', 'preventing future problems'],
    goals: ['feel informed', 'have a plan', 'trust their provider'],
  },
  executive: {
    voice: 'efficient, evidence-based, results-oriented',
    concerns: ['time constraints', 'maintaining performance', 'proactive risk management'],
    goals: ['maximize healthspan', 'minimize clinic visits', 'get clear action items'],
  },
  women: {
    voice: 'empowering, specific about sex differences, validating',
    concerns: ['being dismissed', 'atypical symptoms', 'pregnancy-related risks'],
    goals: ['feel heard', 'get personalized care', 'advocate for themselves'],
  },
  senior: {
    voice: 'respectful, thorough, age-appropriate without being patronizing',
    concerns: ['medication interactions', 'maintaining independence', 'quality of life'],
    goals: ['preserve mobility', 'avoid hospitalization', 'stay active'],
  },
  diabetic: {
    voice: 'integrative, connecting diabetes and heart, practical',
    concerns: ['blood sugar control', 'vascular complications', 'medication burden'],
    goals: ['simplify regimen', 'protect both systems', 'prevent progression'],
  },
  athlete: {
    voice: 'performance-oriented, distinguishing normal from concerning',
    concerns: ['exercise safety', 'maintaining fitness', 'distinguishing fatigue from pathology'],
    goals: ['return to activity', 'optimize cardiovascular capacity', 'prevent sudden events'],
  },
}

/**
 * Generate an article topic from keyword research.
 */
export function generateArticleTopic(
  keyword: string,
  pillar: PillarCategory,
  geoTarget: 'columbia' | 'central-missouri' | 'missouri' | 'national',
  patientPersona: ArticleTopic['patientPersona'] = 'general',
  source: string = 'autonomous-engine'
): ArticleTopic {
  const angles = PILLAR_ANGLES[pillar]
  const angle = angles[Math.floor(Math.random() * angles.length)]
  const geoLabel = geoTarget === 'columbia' ? ' in Columbia, Missouri' : geoTarget === 'central-missouri' ? ' in Central Missouri' : ''

  const title = geoTarget === 'national'
    ? `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: ${angle.charAt(0).toUpperCase() + angle.slice(1)}`
    : `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}${geoLabel}`

  const secondaryKeywords = generateSecondaryKeywords(keyword, pillar)
  const semanticEntities = generateSemanticEntities(pillar)

  return {
    id: `topic-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    pillar,
    title,
    targetKeyword: keyword,
    secondaryKeywords,
    semanticEntities,
    geoTarget,
    intent: classifyTopicIntent(keyword),
    patientPersona,
    contentAngle: angle,
    competitorUrls: [],
    estimatedWordCount: geoTarget === 'national' ? 1800 : 1500,
    suggestedSections: generateSuggestedSections(pillar, patientPersona),
    requiresPhysicianReview: true,
    source,
    createdAt: new Date().toISOString(),
  }
}

function generateSecondaryKeywords(keyword: string, pillar: PillarCategory): string[] {
  const base = keyword.split(' ').slice(0, 3).join(' ')
  const expansions = [
    `${base} symptoms`,
    `${base} treatment`,
    `${base} prevention`,
    `${base} Columbia MO`,
    `preventive ${base}`,
    `${base} specialist`,
  ]
  return expansions.slice(0, 4)
}

function generateSemanticEntities(pillar: PillarCategory): string[] {
  const entityMap: Record<PillarCategory, string[]> = {
    'Preventive Cardiology': ['screening', 'risk assessment', 'primary prevention', 'lifestyle medicine', 'atherosclerosis'],
    'Advanced Diagnostics': ['echocardiography', 'cardiac CT', 'stress testing', 'imaging', 'calcium scoring'],
    'Cardiometabolic Wellness': ['insulin resistance', 'metabolic syndrome', 'obesity', 'inflammation', 'endothelial function'],
    'Executive Heart Health': ['performance medicine', 'concierge cardiology', 'annual physical', 'biomarkers'],
    'Heart Rhythm Monitoring': ['ECG', 'atrial fibrillation', 'palpitations', 'arrhythmia', 'wearable'],
    'Longevity-Focused Care': ['healthspan', 'aging', 'vascular health', 'cognitive preservation', 'frailty'],
    'Causes of Heart Disease': ['atherosclerosis', 'risk factors', 'genetics', 'epigenetics', 'inflammation'],
    'Warning Signs': ['chest pain', 'dyspnea', 'fatigue', 'syncope', 'angina'],
    'Blood Pressure': ['hypertension', 'systolic', 'diastolic', 'ambulatory monitoring', 'resistant hypertension'],
    Cholesterol: ['LDL', 'HDL', 'triglycerides', 'statin', 'lipoprotein(a)'],
    'Diabetes and Heart Health': ['HbA1c', 'microvascular', 'macrovascular', 'insulin'],
    'Stroke Prevention': ['cerebrovascular', 'TIA', 'carotid', 'anticoagulation'],
    'Heart Failure': ['ejection fraction', 'dyspnea', 'edema', 'BNP', 'cardiomyopathy'],
    'Women and Heart Disease': ['microvascular angina', 'SCAD', 'preeclampsia', 'menopause'],
    'Exercise and Heart Health': ['aerobic capacity', 'VO2 max', 'ischemic threshold', 'rehabilitation'],
    'Stress and Heart Health': ['cortisol', 'autonomic dysfunction', 'vascular reactivity', 'psychosocial'],
    'Vein and Vascular': ['DVT', 'varicose veins', 'PAD', 'claudication', 'venous insufficiency'],
    'Local SEO': ['Columbia Missouri', 'Boone County', 'cardiology practice', 'patient care'],
  }
  return entityMap[pillar] || []
}

function classifyTopicIntent(keyword: string): ArticleTopic['intent'] {
  if (/doctor|clinic|specialist|appointment|book|schedule/i.test(keyword)) return 'commercial'
  if (/what is|how to|why does|symptoms|causes|meaning/i.test(keyword)) return 'informational'
  return 'informational'
}

function generateSuggestedSections(
  pillar: PillarCategory,
  persona: ArticleTopic['patientPersona']
): string[] {
  const baseSections = [
    'Understanding the basics',
    'Risk factors and causes',
    'Symptoms and warning signs',
    'Diagnosis and screening',
    'Treatment options',
    'Prevention strategies',
    'When to seek emergency care',
    'Living well with [condition]',
  ]

  const personaSpecific: Record<string, string[]> = {
    executive: ['Executive health considerations', 'Time-efficient cardiac care', 'Maintaining performance'],
    women: ["Women's specific symptoms", 'Pregnancy and cardiovascular health', 'Advocating for your care'],
    senior: ['Age-appropriate management', 'Medication considerations', 'Maintaining independence'],
    diabetic: ['Blood sugar and heart connection', 'Integrated management', 'Monitoring both systems'],
    athlete: ['Exercise prescription', 'Return to play considerations', 'Performance optimization'],
  }

  return [...baseSections, ...(personaSpecific[persona] || [])]
}

// ──────────────────────────────────────────────
// 2. ARTICLE DRAFT GENERATOR
// ──────────────────────────────────────────────

/**
 * Generate a complete article draft from a topic.
 * This produces structured markdown ready for physician review.
 */
export function generateArticleDraft(topic: ArticleTopic): ArticleDraft {
  const persona = PATIENT_PERSONA_DETAILS[topic.patientPersona] || PATIENT_PERSONA_DETAILS.general
  const now = new Date()
  const draftId = `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const slug = `${slugify(topic.title)}-${now.toISOString().slice(0, 10)}`

  const bodyMd = buildArticleBody(topic, persona)
  const faqs = generateFAQs(topic)
  const { metaTitle, metaDescription } = generateMetaData(topic)

  return {
    id: draftId,
    topicId: topic.id,
    targetKeyword: topic.targetKeyword,
    status: 'draft',
    slug,
    title: topic.title,
    excerpt: generateExcerpt(topic),
    bodyMd,
    coverImagePrompt: generateCoverImagePrompt(topic),
    metaTitle,
    metaDescription,
    schemaRecommendations: generateSchemaRecommendations(topic),
    internalLinks: generateInternalLinks(topic),
    externalReferences: generateExternalReferences(topic),
    faqs,
    socialSnippets: generateSocialSnippets(topic, metaDescription),
    keywordDensity: calculateKeywordDensity(bodyMd, topic.targetKeyword, topic.secondaryKeywords),
    readabilityScore: calculateReadabilityScore(bodyMd),
    physicianNotes: null,
    reviewedBy: null,
    reviewedAt: null,
    publishedAt: null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

function buildArticleBody(
  topic: ArticleTopic,
  persona: { voice: string; concerns: string[]; goals: string[] }
): string {
  const paragraphs: string[] = []

  // H1 + Opening hook
  paragraphs.push(`# ${topic.title}`)
  paragraphs.push('')
  paragraphs.push(generateOpeningHook(topic, persona))
  paragraphs.push('')

  // Local context (if applicable)
  if (topic.geoTarget !== 'national') {
    paragraphs.push(buildBlogLocalIntroMarkdown())
    paragraphs.push('')
  }

  // Body sections based on suggested structure
  for (const section of topic.suggestedSections.slice(0, 6)) {
    paragraphs.push(`## ${section}`)
    paragraphs.push('')
    paragraphs.push(generateSectionContent(section, topic, persona))
    paragraphs.push('')
  }

  // FAQ section
  if (topic.suggestedSections.some(s => /faq|question|common/i.test(s))) {
    paragraphs.push('## Frequently Asked Questions')
    paragraphs.push('')
  }

  // CTA / Conclusion
  paragraphs.push('## The Bottom Line')
  paragraphs.push('')
  paragraphs.push(generateConclusion(topic))
  paragraphs.push('')

  // Local footer
  if (topic.geoTarget !== 'national') {
    paragraphs.push(buildBlogLocalFooterMarkdown())
  }

  // Related conditions
  paragraphs.push('')
  paragraphs.push(buildRelatedConditionsMarkdown(topic.secondaryKeywords, topic.title, topic.pillar))

  return paragraphs.join('\n')
}

function generateOpeningHook(
  topic: ArticleTopic,
  persona: { voice: string; concerns: string[]; goals: string[] }
): string {
  const hooks: Record<PillarCategory, string[]> = {
    'Preventive Cardiology': [
      'Most cardiovascular disease develops silently over decades. By the time symptoms appear, the damage is often significant. Prevention starts with understanding your risk before symptoms force the conversation.',
      'The most effective treatment for heart disease is the one that happens before you ever feel sick. Preventive cardiology is about changing the trajectory of your cardiovascular health years before a crisis.',
    ],
    'Advanced Diagnostics': [
      'Not all heart problems announce themselves. Sometimes the most important answers come from looking deeper than a standard physical exam can reach.',
      'When standard tests do not explain your symptoms, advanced cardiac diagnostics can provide the clarity needed for confident decisions.',
    ],
    'Cardiometabolic Wellness': [
      'Your heart and metabolism are not separate systems fighting different battles. They are deeply connected, and addressing one often improves the other.',
      'Blood sugar, weight, blood pressure, and cholesterol do not exist in isolation. Cardiometabolic wellness treats them as the integrated system they are.',
    ],
    'Executive Heart Health': [
      'High-performing adults often delay cardiac care because they feel fine and their schedules are full. But cardiovascular risk does not wait for a convenient time to appear.',
      'For executives and busy professionals, heart health planning should be proactive, efficient, and built around long-term performance rather than reactive crisis management.',
    ],
    'Heart Rhythm Monitoring': [
      'That fluttering sensation in your chest might be nothing. Or it might be the first signal of a rhythm problem worth understanding.',
      'Consumer wearables have made millions aware of their heart rhythms, but awareness without interpretation creates more anxiety than clarity.',
    ],
    'Longevity-Focused Care': [
      'A longer life is only valuable if those years are lived well. Longevity-focused cardiology is about preserving capacity, confidence, and independence for decades.',
      'The goal is not just to reach old age, but to reach it with a heart that still serves the life you want to live.',
    ],
    'Causes of Heart Disease': [
      'Heart disease rarely has a single cause. It is the result of years of interactions between genetics, lifestyle, environment, and medical conditions.',
      'Understanding what causes cardiovascular disease is the first step toward preventing it. The picture is more complex than most people realize.',
    ],
    'Warning Signs': [
      'Your body often sends signals before a cardiovascular event becomes critical. Learning to read those signals can be the difference between early intervention and emergency care.',
      'Not every chest discomfort is a heart attack, and not every heart attack presents with chest pain. Knowing the full spectrum of warning signs saves lives.',
    ],
    'Blood Pressure': [
      'High blood pressure is called the silent killer for good reason. It damages arteries, the heart, brain, kidneys, and eyes while producing no obvious symptoms.',
      'Most people with hypertension do not know they have it. That is why regular screening and understanding your numbers matters so much.',
    ],
    Cholesterol: [
      'Cholesterol is not inherently evil. Your body needs it to build cells and produce hormones. But too much of the wrong kind can silently narrow your arteries for years.',
      'Understanding your lipid panel goes beyond good and bad cholesterol. The full picture includes particle size, ratios, and how your numbers interact with other risk factors.',
    ],
    'Diabetes and Heart Health': [
      'If you have diabetes, your heart is working under additional strain. High blood sugar damages blood vessels and accelerates the processes that lead to cardiovascular disease.',
      'Diabetes and heart disease are not separate conditions requiring separate plans. They are deeply connected and respond best to integrated, coordinated care.',
    ],
    'Stroke Prevention': [
      'Stroke is the fifth leading cause of death in the United States and a leading cause of long-term disability. Most strokes are preventable with the right risk management.',
      'The same conditions that threaten your heart also threaten your brain. Stroke prevention is cardiovascular prevention by another name.',
    ],
    'Heart Failure': [
      'Heart failure does not mean your heart has stopped. It means your heart cannot pump as effectively as your body needs, and that gap creates cascading effects.',
      'Understanding heart failure starts with knowing it is a manageable condition, not a terminal diagnosis. Modern treatments help people live well for years.',
    ],
    'Women and Heart Disease': [
      'Heart disease is the leading cause of death for women in the United States, yet it is often underdiagnosed and undertreated in female patients.',
      "Women's heart symptoms are frequently atypical, and their risk factors differ from men's. Understanding these differences is critical for accurate diagnosis and effective prevention.",
    ],
    'Exercise and Heart Health': [
      'Physical activity is one of the most powerful tools for cardiovascular protection. But what type, how much, and how intense should it be?',
      'Exercise recommendations change based on your cardiac history, current fitness, age, and risk profile. The right plan is personalized, not generic.',
    ],
    'Stress and Heart Health': [
      'Chronic stress is not just a mental health concern. It measurably increases cardiovascular risk through inflammation, blood pressure, and unhealthy coping behaviors.',
      'Your nervous system and cardiovascular system are deeply intertwined. Managing stress is not optional self-care, it is cardiac risk management.',
    ],
    'Vein and Vascular': [
      'Vein and vascular health is cardiovascular health. Problems in your legs, like varicose veins or peripheral artery disease, often signal broader arterial concerns.',
      'Leg pain, swelling, or visible vein changes are easy to dismiss as cosmetic or aging. But they can indicate significant vascular disease that deserves evaluation.',
    ],
    'Local SEO': [
      'Finding the right cardiologist means more than proximity. It means finding a physician-led practice with the expertise, technology, and approach that matches your needs.',
      'For patients in Columbia and Central Missouri, access to specialized cardiovascular care has historically meant traveling to larger cities. That is changing.',
    ],
  }

  const pillarHooks = hooks[topic.pillar] || hooks['Preventive Cardiology']
  return pillarHooks[0] || ''
}

function generateSectionContent(
  section: string,
  topic: ArticleTopic,
  persona: { voice: string; concerns: string[]; goals: string[] }
): string {
  // Generate substantive paragraph content for each section
  // In production, this would integrate with an LLM API
  const contentTemplates: Record<string, string> = {
    'Understanding the basics': `Understanding ${topic.targetKeyword} begins with recognizing how the cardiovascular system works under normal conditions and what changes when disease develops. The heart, blood vessels, and supporting systems operate as an integrated whole. When one component is affected, others compensate until they cannot anymore.`,
    'Risk factors and causes': `Multiple factors influence your risk. Age, family history, genetics, blood pressure, cholesterol levels, diabetes status, smoking history, physical activity, diet, sleep quality, stress levels, and body composition all interact. No single factor tells the complete story. Your physician considers the full risk profile when building a prevention or treatment plan.`,
    'Symptoms and warning signs': `Symptoms vary widely between individuals. Some people experience classic chest pressure, shortness of breath, or fatigue. Others notice subtler changes: reduced exercise tolerance, unusual sweating, jaw or arm discomfort, nausea, or sleep disruption. Women, older adults, and people with diabetes are more likely to have atypical presentations.`,
    'Diagnosis and screening': `Accurate diagnosis combines your medical history, physical examination, laboratory testing, and targeted cardiac imaging or functional testing. Depending on your symptoms and risk profile, your physician may recommend blood work, electrocardiography, echocardiography, stress testing, ambulatory rhythm monitoring, or advanced imaging such as cardiac CT.`,
    'Treatment options': `Treatment is individualized based on severity, risk factors, comorbidities, and patient preferences. Options range from lifestyle optimization and medical therapy to minimally invasive procedures and, in select cases, surgery. The goal is always to reduce risk, relieve symptoms, and preserve quality of life.`,
    'Prevention strategies': `Prevention focuses on modifiable risk factors: maintaining healthy blood pressure, optimizing cholesterol, controlling blood sugar, achieving healthy weight, exercising regularly, eating a heart-healthy diet, managing stress, getting adequate sleep, and avoiding tobacco. Regular follow-up ensures your plan evolves as your health changes.`,
    'When to seek emergency care': `Call 911 immediately if you experience severe chest pressure, pain radiating to your arm or jaw, sudden severe shortness of breath, fainting, or sudden confusion. These symptoms may indicate a heart attack, stroke, or other life-threatening cardiovascular event. Do not drive yourself to the hospital.`,
    'Living well with [condition]': `A cardiovascular diagnosis does not mean giving up an active life. With proper management, monitoring, and lifestyle adjustments, most people maintain meaningful activity, travel, work, and relationships. The key is consistency, follow-up, and early intervention when things change.`,
  }

  return contentTemplates[section] || `This section covers ${section.toLowerCase()} as it relates to ${topic.targetKeyword}. Your physician can provide personalized guidance based on your complete medical history, current medications, and cardiovascular risk profile.`
}

function generateConclusion(topic: ArticleTopic): string {
  const geoPhrase = topic.geoTarget === 'national' ? '' : ' in Columbia, Missouri'
  return `If you have concerns about ${topic.targetKeyword}${geoPhrase}, the most important step is starting a conversation with a board-certified cardiologist. Early evaluation, accurate risk stratification, and a personalized prevention or treatment plan can change your cardiovascular trajectory for years to come. At PulsePoint Clinic, we combine physician-led expertise with advanced diagnostics and a commitment to the long-term health of every patient we serve.`
}

function generateExcerpt(topic: ArticleTopic): string {
  const geoPhrase = topic.geoTarget === 'national' ? '' : ` for patients in ${topic.geoTarget.replace('-', ' ').replace('columbia', 'Columbia, Missouri')}`
  return `Learn about ${topic.targetKeyword}${geoPhrase}. This physician-verified guide covers risk factors, symptoms, prevention, and when to seek care from a board-certified cardiologist.`
}

function generateFAQs(topic: ArticleTopic): { question: string; answer: string }[] {
  return [
    {
      question: `What is ${topic.targetKeyword}?`,
      answer: `${topic.targetKeyword} refers to the medical considerations, risk factors, and management approaches related to cardiovascular health. A board-certified cardiologist can evaluate your personal risk and recommend appropriate screening and treatment.`,
    },
    {
      question: `When should I see a cardiologist about ${topic.targetKeyword}?`,
      answer: 'You should consider seeing a cardiologist if you have symptoms like chest discomfort, shortness of breath, palpitations, or unusual fatigue; if you have risk factors such as high blood pressure, high cholesterol, diabetes, or family history; or if you simply want a thorough cardiovascular risk assessment.',
    },
    {
      question: `How is ${topic.targetKeyword} treated at PulsePoint Clinic?`,
      answer: 'Treatment at PulsePoint Clinic is individualized. Our board-certified cardiologists evaluate your complete risk profile, use advanced diagnostics when indicated, and build a plan that may include lifestyle optimization, medication, ongoing monitoring, and coordinated care with your broader healthcare team.',
    },
  ]
}

function generateMetaData(topic: ArticleTopic): { metaTitle: string; metaDescription: string } {
  const geoSuffix = topic.geoTarget === 'national' ? '' : ' | Columbia, MO Cardiology'
  const metaTitle = topic.title.length > 55
    ? `${topic.title.slice(0, 52)}...${geoSuffix}`
    : `${topic.title}${geoSuffix}`

  const metaDescription = `Physician-verified guide to ${topic.targetKeyword}. Covers symptoms, risk factors, prevention, and treatment from a board-certified cardiologist${topic.geoTarget === 'national' ? '' : ' in Columbia, Missouri'}. Schedule a consultation.`

  return { metaTitle, metaDescription: metaDescription.slice(0, 160) }
}

function generateCoverImagePrompt(topic: ArticleTopic): string {
  return `Professional medical illustration related to ${topic.pillar}. Clean, modern healthcare aesthetic with soft blue and white tones. Suitable for a cardiology clinic blog. No text, no faces, abstract cardiovascular imagery.`
}

function generateSchemaRecommendations(topic: ArticleTopic): string[] {
  const schemas = ['BlogPosting', 'MedicalWebPage', 'FAQPage']
  if (topic.geoTarget !== 'national') schemas.push('MedicalClinic')
  if (/how to|steps|guide/i.test(topic.title)) schemas.push('HowTo')
  return schemas
}

function generateInternalLinks(topic: ArticleTopic): { anchor: string; url: string }[] {
  return [
    { anchor: 'preventive cardiology', url: '/services/preventive-cardiology' },
    { anchor: 'advanced heart screening', url: '/diagnostics' },
    { anchor: 'book an appointment', url: '/book' },
    { anchor: 'cardiologist Columbia MO', url: '/cardiologist-columbia-mo' },
    { anchor: 'contact PulsePoint Clinic', url: '/contact' },
  ]
}

function generateExternalReferences(topic: ArticleTopic): { title: string; url: string }[] {
  return [
    { title: 'American Heart Association', url: 'https://www.heart.org' },
    { title: 'American College of Cardiology', url: 'https://www.acc.org' },
    { title: 'CDC Heart Disease Facts', url: 'https://www.cdc.gov/heartdisease' },
  ]
}

function generateSocialSnippets(
  topic: ArticleTopic,
  metaDescription: string
): { platform: 'x' | 'linkedin' | 'facebook'; text: string }[] {
  const shortTitle = topic.title.slice(0, 100)
  return [
    {
      platform: 'x',
      text: `${shortTitle} — New physician-verified guide from PulsePoint Clinic's cardiology team. #HeartHealth #ColumbiaMO`,
    },
    {
      platform: 'linkedin',
      text: `Our latest article: ${topic.title}. Physician-verified cardiovascular education from the team at PulsePoint Clinic in Columbia, Missouri.`,
    },
    {
      platform: 'facebook',
      text: metaDescription,
    },
  ]
}

function calculateKeywordDensity(
  body: string,
  targetKeyword: string,
  secondaryKeywords: string[]
): Record<string, number> {
  const allKeywords = [targetKeyword, ...secondaryKeywords]
  const words = body.toLowerCase().split(/\s+/).filter(Boolean)
  const totalWords = words.length
  const density: Record<string, number> = {}

  for (const kw of allKeywords) {
    const normalized = kw.toLowerCase()
    const occurrences = words.filter(w => w.includes(normalized) || normalized.includes(w)).length
    density[kw] = totalWords > 0 ? parseFloat(((occurrences / totalWords) * 100).toFixed(2)) : 0
  }

  return density
}

function calculateReadabilityScore(body: string): number {
  // Flesch Reading Ease simplified calculation
  const sentences = body.split(/[.!?]+/).filter(Boolean).length || 1
  const words = body.split(/\s+/).filter(Boolean).length
  const syllables = body.split(/\s+/).filter(Boolean).reduce((count, word) => {
    return count + (word.match(/[aeiouy]/gi) || []).length
  }, 0)

  if (words === 0) return 50
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  return Math.max(0, Math.min(100, Math.round(score)))
}

// ──────────────────────────────────────────────
// 3. TOPIC QUEUE MANAGER
// ──────────────────────────────────────────────

/**
 * Rank and queue article topics by expected business impact.
 */
export function rankTopicsByImpact(topics: ArticleTopic[]): ArticleTopic[] {
  return [...topics].sort((a, b) => {
    const scoreA = calculateImpactScore(a)
    const scoreB = calculateImpactScore(b)
    return scoreB - scoreA
  })
}

function calculateImpactScore(topic: ArticleTopic): number {
  let score = 50

  // Local keywords get priority for current strategy
  score += topic.geoTarget === 'columbia' ? 30 : topic.geoTarget === 'central-missouri' ? 20 : 10

  // Commercial intent = higher conversion potential
  score += topic.intent === 'commercial' ? 20 : topic.intent === 'informational' ? 5 : 0

  // Specific patient personas with service alignment
  score += topic.patientPersona === 'executive' ? 15 : 0

  // Preventive content = core brand positioning
  score += topic.pillar === 'Preventive Cardiology' ? 10 : 0

  // Seasonal relevance
  const month = new Date().getMonth() + 1
  if (month === 2 && topic.pillar === 'Preventive Cardiology') score += 15 // Heart Month
  if (month === 1 && topic.pillar === 'Cardiometabolic Wellness') score += 10 // New Year

  return Math.min(100, score)
}
