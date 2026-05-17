import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import MembershipPanel from '@/components/MembershipPanel'
import DiagnosticsScroll from '@/components/DiagnosticsScroll'
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
        <ServicesGrid />
        <MembershipPanel />
        <DiagnosticsScroll />
        <TeamCard />
        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
