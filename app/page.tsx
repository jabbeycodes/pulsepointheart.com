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
