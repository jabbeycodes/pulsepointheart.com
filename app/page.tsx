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
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/',
  'Cardiologist in Columbia, MO | PulsePoint Clinic',
  'Board-certified cardiologists in Columbia, Missouri. Preventive cardiology, echocardiograms, stress testing, and heart failure care. Schedule: (855) 785-7337.',
)

export default function HomePage() {
  return (
    <div className="relative">
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
        <TestimonialSection />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
