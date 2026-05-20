import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'
import MembershipInquiryForm from '@/components/MembershipInquiryForm'

export const metadata: Metadata = {
  title: 'Membership-Based Cardiology',
  description:
    'Learn about PulsePoint Clinic\'s personalized membership-based cardiology care in Columbia, MO with extended visits, direct physician access, and prevention planning.',
}

const BENEFITS = [
  { title: 'Extended Appointments', desc: 'Unhurried visits designed around your needs — not a 10-minute slot.' },
  { title: 'Direct Physician Access', desc: 'Reach Dr. Tibuakuu directly. No phone trees, no waiting for a callback.' },
  { title: 'Same / Next-Day Visits', desc: 'Urgent concern? We see you quickly — not in six weeks.' },
  { title: 'Preventive Wellness Planning', desc: 'Proactive, personalized strategies to keep your heart healthy long-term.' },
  { title: 'Priority Scheduling', desc: 'Members are always prioritized for appointments and follow-ups.' },
  { title: 'Coordinated Specialty Care', desc: 'We coordinate with your other specialists so nothing falls through the cracks.' },
  { title: 'Comprehensive Annual Evaluations', desc: 'In-depth yearly assessments tracking your cardiovascular health over time.' },
  { title: 'Personalized Care Plans', desc: 'A written plan built specifically around your risk factors and goals.' },
]

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-wine px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Membership-Based Care
          </div>
          <h1 className="font-display text-[2rem] font-bold leading-[1.18] text-white sm:text-[2.8rem]">
            A More Personalized Approach<br className="hidden lg:block" /> to Heart Care
          </h1>
          <p className="mt-4 max-w-xl text-[.95rem] leading-[1.7] text-white/85">
            Our membership model allows us to limit the number of patients we
            see — so we can give every patient the time, access, and attention
            they deserve.
          </p>
        </div>

        {/* Benefits grid */}
        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-display text-[1.7rem] font-bold text-charcoal sm:text-[2rem]">
              What Membership Includes
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-12 rounded bg-wine lg:mx-0" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded bg-white p-5 shadow-card">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-wine/10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="h-4 w-4 text-wine">
                    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="mb-1 text-[.9rem] font-bold text-charcoal">{b.title}</h3>
                <p className="text-[.82rem] leading-[1.55] text-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[1.7rem] font-bold text-charcoal sm:text-[2rem]">
              How It Works
            </h2>
            <div className="mx-auto mt-3 h-[3px] w-12 rounded bg-wine" />
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                { step: '01', title: 'Inquire', desc: 'Fill out the form below. Our team will reach out to answer your questions.' },
                { step: '02', title: 'Consult', desc: 'Schedule a consultation call to learn if PulsePoint is the right fit for you.' },
                { step: '03', title: 'Join', desc: 'Enroll, complete your comprehensive evaluation, and start your personalized plan.' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-wine text-lg font-bold text-wine">
                    {s.step}
                  </div>
                  <h3 className="mb-1 font-bold text-charcoal">{s.title}</h3>
                  <p className="text-[.85rem] leading-[1.6] text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry form */}
        <section id="inquire" className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-[1.7rem] font-bold text-charcoal sm:text-[2rem]">
              Interested in Membership?
            </h2>
            <div className="my-3 h-[3px] w-12 rounded bg-wine" />
            <p className="mb-8 text-[.92rem] leading-[1.65] text-muted">
              Tell us a little about yourself. There is no commitment — just a
              conversation to see if PulsePoint is the right fit.
            </p>
            <div className="rounded bg-white p-6 shadow-card lg:p-8">
              <MembershipInquiryForm />
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
