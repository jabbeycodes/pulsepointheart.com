import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyPulsePoint from '@/components/WhyPulsePoint'
import MembershipPanel from '@/components/MembershipPanel'
import DiagnosticsScroll from '@/components/DiagnosticsScroll'
import LongevitySection from '@/components/LongevitySection'
import TeamCard from '@/components/TeamCard'
import TestimonialSection from '@/components/TestimonialSection'
import BottomBanner from '@/components/BottomBanner'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

/* Build timestamp: 2026-05-25 14:58:15 */
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <WhyPulsePoint />
        <MembershipPanel />
        <DiagnosticsScroll />
        <LongevitySection />
        <TeamCard />
        <TestimonialSection />
        <BottomBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
