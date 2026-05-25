import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyPulsePoint from '@/components/WhyPulsePoint'
import TeamCard from '@/components/TeamCard'
import TestimonialSection from '@/components/TestimonialSection'
import BottomBanner from '@/components/BottomBanner'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

// Force SSR to avoid stale static caching
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <WhyPulsePoint />
        <TeamCard />
        <TestimonialSection />
        <BottomBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
