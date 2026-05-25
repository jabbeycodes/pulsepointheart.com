import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'

export const metadata: Metadata = {
  title: 'Dr. Martin Tibuakuu, MD, MPH, FACC — Founder & Cardiologist',
  description:
    'Meet Dr. Martin Tibuakuu, board-certified cardiologist, epidemiologist, and founder of PulsePoint. Johns Hopkins trained. Fellow of the American College of Cardiology. Dedicated to prevention, early detection, and compassionate cardiovascular care.',
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

const BIO = `Dr. Martin Tibuakuu is a board-certified cardiologist, epidemiologist, and preventive cardiovascular specialist dedicated to transforming the way heart disease is prevented and treated.

Born and raised in northern Ghana, Dr. Tibuakuu's passion for cardiovascular medicine was shaped by personal tragedy and firsthand exposure to profound healthcare disparities. At the age of 12, he lost his mother to undiagnosed hypertension — a preventable condition made more devastating by the severe lack of access to healthcare in his rural community. That experience became the driving force behind his lifelong commitment to heart disease prevention, early detection, and expanding access to high-quality cardiovascular care.

Dr. Tibuakuu received advanced training in both medicine and public health, developing a unique perspective that bridges clinical cardiology with population health and disease prevention. He completed a postdoctoral research fellowship at the internationally renowned Johns Hopkins Ciccarone Center for the Prevention of Heart Disease, where he trained under world-leading experts in preventive cardiology and cardiovascular epidemiology.

His research has focused extensively on cardiovascular prevention, cardiometabolic disease, and healthcare disparities, contributing to numerous peer-reviewed scientific publications and national presentations aimed at improving cardiovascular outcomes across diverse populations.

He subsequently completed fellowship training in cardiovascular disease at the world-renowned Johns Hopkins Hospital, where he received advanced training in non-invasive cardiology, cardiac imaging, preventive cardiology, and complex cardiovascular care.

Dr. Tibuakuu is a Fellow of the American College of Cardiology and brings a modern, prevention-focused philosophy to patient care — combining evidence-based medicine, advanced diagnostics, lifestyle optimization, and personalized treatment strategies.

Through PulsePoint, his vision is to build a next-generation cardiovascular platform that delivers world-class heart care with an emphasis on prevention, early detection, innovation, and compassionate patient-centered care.`

const PHILOSOPHY_POINTS = [
  {
    title: 'Prevention should feel personal',
    text: 'Risk scores and test results only matter when they are translated into a plan that fits the patient in front of us.',
  },
  {
    title: 'Access changes the relationship',
    text: 'Premium cardiovascular care should make it easier to ask questions, understand results, and know what happens next.',
  },
  {
    title: 'Diagnostics should create clarity',
    text: 'Advanced testing is used to answer meaningful questions, guide prevention, and reduce uncertainty.',
  },
]

const TRUST_SIGNALS = [
  'Academic medicine and public health background',
  'Board-certified cardiovascular disease specialist',
  'Fellow of the American College of Cardiology',
  'Physician-led prevention and diagnostics model',
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
                A physician-led approach to prevention, access, and lifelong heart health.
              </h1>
              <div className="my-5 h-[3px] w-12 rounded bg-wine" />
              <p className="max-w-2xl text-[1rem] leading-[1.75] text-muted">
                PulsePoint was created for patients who want a more thoughtful,
                proactive relationship with their cardiologist. The model
                combines advanced cardiovascular diagnostics with prevention
                planning, clear communication, and close follow-up.
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
                src="/assets/hero.png"
                alt="Dr. Martin Tibuakuu speaking with a PulsePoint Clinic patient"
                width={1475}
                height={1067}
                className="aspect-[4/3] w-full object-cover object-left-center"
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

        <section className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.85rem] font-bold leading-tight sm:text-[2.3rem]">
                The philosophy behind PulsePoint.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-gold" />
              <p className="mt-5 text-[.94rem] leading-[1.75] text-white/75">
                Premium cardiovascular care should give patients more than a
                diagnosis. It should provide confidence, access, and a plan for
                protecting long-term health.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {PHILOSOPHY_POINTS.map((point) => (
                <article key={point.title} className="border-t border-white/20 pt-5">
                  <h3 className="text-[1rem] font-bold text-white">{point.title}</h3>
                  <p className="mt-2 text-[.84rem] leading-[1.65] text-white/68">
                    {point.text}
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
                Founder & Cardiologist
              </div>
              <h2 className="mt-2 font-display text-[1.9rem] font-bold leading-tight text-charcoal">
                Dr. Martin Tibuakuu, MD, MPH, FACC
              </h2>
              <div className="mt-4 space-y-4 text-[.92rem] leading-[1.7] text-muted">
                <p>
                  Dr. Martin Tibuakuu is a board-certified cardiologist, epidemiologist, and preventive cardiovascular specialist dedicated to transforming the way heart disease is prevented and treated.
                </p>
                <p>
                  Born and raised in northern Ghana, Dr. Tibuakuu's passion for cardiovascular medicine was shaped by personal tragedy and firsthand exposure to profound healthcare disparities. At the age of 12, he lost his mother to undiagnosed hypertension — a preventable condition made more devastating by the severe lack of access to healthcare in his rural community. That experience became the driving force behind his lifelong commitment to heart disease prevention, early detection, and expanding access to high-quality cardiovascular care.
                </p>
                <p>
                  Dr. Tibuakuu received advanced training in both medicine and public health, developing a unique perspective that bridges clinical cardiology with population health and disease prevention. He completed a postdoctoral research fellowship at the internationally renowned Johns Hopkins Ciccarone Center for the Prevention of Heart Disease, where he trained under world-leading experts in preventive cardiology and cardiovascular epidemiology.
                </p>
                <p>
                  His research has focused extensively on cardiovascular prevention, cardiometabolic disease, and healthcare disparities, contributing to numerous peer-reviewed scientific publications and national presentations aimed at improving cardiovascular outcomes across diverse populations.
                </p>
                <p>
                  He subsequently completed fellowship training in cardiovascular disease at the world-renowned Johns Hopkins Hospital, where he received advanced training in non-invasive cardiology, cardiac imaging, preventive cardiology, and complex cardiovascular care.
                </p>
                <p>
                  Dr. Tibuakuu is a Fellow of the American College of Cardiology and brings a modern, prevention-focused philosophy to patient care — combining evidence-based medicine, advanced diagnostics, lifestyle optimization, and personalized treatment strategies.
                </p>
                <p>
                  Through PulsePoint, his vision is to build a next-generation cardiovascular platform that delivers world-class heart care with an emphasis on prevention, early detection, innovation, and compassionate patient-centered care.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
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
                The practice serves patients seeking preventive cardiology,
                advanced heart screening, vascular evaluation, cardiometabolic
                wellness, second opinions, executive health, and ongoing
                cardiovascular follow-up.
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

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                Trust signals that matter.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRUST_SIGNALS.map((signal) => (
                <div key={signal} className="rounded-md bg-white px-5 py-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <p className="text-[.9rem] font-semibold leading-[1.45] text-charcoal">
                      {signal}
                    </p>
                  </div>
                </div>
              ))}
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
