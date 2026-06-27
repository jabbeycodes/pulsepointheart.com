import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyPulsePoint from '@/components/WhyPulsePoint'
import HomeServiceCards from '@/components/HomeServiceCards'
import PremiumCareSection from '@/components/PremiumCareSection'
import DiagnosticsScroll from '@/components/DiagnosticsScroll'
import LongevitySection from '@/components/LongevitySection'
import HomeEcosystem from '@/components/HomeEcosystem'
import TeamCard from '@/components/TeamCard'
import TestimonialSection from '@/components/TestimonialSection'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import VoiceQuickAnswers from '@/components/VoiceQuickAnswers'
import JsonLd from '@/components/JsonLd'
import { buildFaqJsonLd, buildSpeakableWebPageJsonLd } from '@/lib/seo'
import { VOICE_HOME_ANSWERS, voiceAnswersToFaqSchema } from '@/lib/voice-seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/',
  'Cardiologist in Columbia, MO | PulsePoint Clinic',
  'Board-certified cardiologists in Columbia, Missouri. Preventive cardiology, echocardiograms, stress testing, and heart failure care. Schedule: (855) 785-7337.',
)

export default function HomePage() {
  const jsonLd = [
    buildSpeakableWebPageJsonLd({
      path: '/',
      name: 'Cardiologist in Columbia, MO | PulsePoint Clinic',
      description:
        'Board-certified cardiologists in Columbia, Missouri. Preventive cardiology, diagnostics, and heart care.',
    }),
    buildFaqJsonLd(voiceAnswersToFaqSchema(VOICE_HOME_ANSWERS)),
  ]

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <Hero />
        <WhyPulsePoint />
        <HomeServiceCards />
        <PremiumCareSection />
        <DiagnosticsScroll />
        <LongevitySection />
        <HomeEcosystem />
        <TeamCard />
        <VoiceQuickAnswers
          answers={VOICE_HOME_ANSWERS}
          heading="Common questions about our Columbia cardiologists"
          intro="Direct answers for patients searching by voice or looking for quick clinic information."
        />
        <TestimonialSection />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
