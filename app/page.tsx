import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyPulsePoint from '@/components/WhyPulsePoint'
import ServicesGrid from '@/components/ServicesGrid'
import MembershipPanel from '@/components/MembershipPanel'
import DiagnosticsScroll from '@/components/DiagnosticsScroll'
import LongevitySection from '@/components/LongevitySection'
import TeamCard from '@/components/TeamCard'
import CtaBanner from '@/components/CtaBanner'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyPulsePoint />
        <ServicesGrid />
        <MembershipPanel />
        <LongevitySection />
        <DiagnosticsScroll />
        <TeamCard />
        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
