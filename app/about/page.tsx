import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet PulsePoint Clinic, a physician-led cardiovascular practice focused on prevention, diagnostics, and personalized heart care.',
}

const PRINCIPLES = [
  {
    title: 'Prevention first',
    text: 'We look beyond a single visit to understand risk, lifestyle, family history, and long-term cardiovascular goals.',
  },
  {
    title: 'Time to listen',
    text: 'Appointments are designed for thoughtful conversations, clear explanations, and care plans that patients can actually follow.',
  },
  {
    title: 'Modern diagnostics',
    text: 'Advanced testing helps identify cardiac and vascular concerns earlier, when prevention and treatment can make the biggest difference.',
  },
]

const CREDENTIALS = [
  'Board-certified cardiologist',
  'MD, MPH, FACC',
  'Cardiovascular disease specialist',
  'Preventive and diagnostic heart care',
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_430px] lg:items-center">
            <div>
              <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
                About PulsePoint
              </div>
              <h1 className="max-w-3xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.35rem]">
                Physician-led cardiovascular care built around prevention.
              </h1>
              <div className="my-5 h-[3px] w-12 rounded bg-wine" />
              <p className="max-w-2xl text-[1rem] leading-[1.75] text-muted">
                PulsePoint Clinic was created for patients who want a more
                personal, proactive relationship with their heart specialist.
                We combine advanced cardiovascular diagnostics with practical
                prevention planning, clear communication, and close follow-up.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
                >
                  Book an Appointment
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
                >
                  Explore Membership
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-md bg-graybg shadow-card">
              <Image
                src="/assets/care-team.jpg"
                alt="PulsePoint Clinic care team"
                width={860}
                height={940}
                className="h-full max-h-[520px] w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                The care philosophy is simple: know the patient, then treat the risk.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {PRINCIPLES.map((item) => (
                <article key={item.title} className="rounded-md bg-white p-6 shadow-card">
                  <h3 className="mb-2 text-[.98rem] font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-[.86rem] leading-[1.65] text-muted">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
            <div className="rounded-md border border-[#E5EAF0] bg-white p-6 shadow-card">
              <div className="text-[.72rem] font-bold uppercase tracking-[2px] text-gold">
                Medical Director
              </div>
              <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight text-charcoal">
                Martin Tibuakuu, MD, MPH, FACC
              </h2>
              <p className="mt-3 text-[.92rem] leading-[1.7] text-muted">
                Dr. Tibuakuu leads PulsePoint Clinic with a focus on prevention,
                early detection, and personalized cardiovascular care.
              </p>
              <ul className="mt-5 space-y-2">
                {CREDENTIALS.map((credential) => (
                  <li
                    key={credential}
                    className="flex items-start gap-2 text-[.86rem] leading-[1.5] text-charcoal"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wine" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-[1.7rem] font-bold leading-tight text-charcoal sm:text-[2rem]">
                Built for patients who want clarity before crisis.
              </h3>
              <p className="mt-4 text-[.95rem] leading-[1.75] text-muted">
                Many patients only meet a cardiologist after symptoms become
                disruptive or a test result raises concern. PulsePoint is
                designed to help patients understand their risk earlier, track
                the right markers over time, and make confident decisions with
                a physician who knows the full picture.
              </p>
              <p className="mt-4 text-[.95rem] leading-[1.75] text-muted">
                The clinic serves patients seeking preventive cardiology,
                advanced imaging guidance, vascular evaluation, metabolic
                wellness, second opinions, executive heart health, and ongoing
                cardiology follow-up.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {['Prevention', 'Diagnostics', 'Continuity'].map((label) => (
                  <div key={label} className="border-l-2 border-gold pl-4">
                    <div className="text-[.78rem] font-bold uppercase tracking-[1.5px] text-wine">
                      {label}
                    </div>
                    <p className="mt-1 text-[.82rem] leading-[1.55] text-muted">
                      Care plans that connect testing, lifestyle, and follow-up
                      into one practical path.
                    </p>
                  </div>
                ))}
              </div>
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
