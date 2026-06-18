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

export const metadata: Metadata = {
  title: 'PulsePoint Clinic | Cardiovascular Care, Diagnostics & Prevention in Columbia, MO',
  description:
    'PulsePoint Clinic provides physician-led cardiovascular care, advanced diagnostics, preventive cardiology, vein and vascular care, and cardiometabolic wellness in Columbia, Missouri.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PulsePoint Clinic | Cardiovascular Care, Diagnostics & Prevention in Columbia, MO',
    description:
      'Physician-led cardiovascular care integrating prevention, diagnostics, wellness, and specialty care in Columbia, Missouri.',
    url: 'https://pulsepointheart.com/',
  },
}

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
