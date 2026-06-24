import Link from 'next/link'
import GoldSquiggle from '@/components/home/GoldSquiggle'
import {
  ArrowLinkIcon,
  CalendarCtaIcon,
  TrustInsuranceIcon,
  TrustPatientIcon,
  TrustPhysicianIcon,
  TrustTechnologyIcon,
} from '@/components/home/HomeIcons'
import { HOME_TRUST_INDICATORS } from '@/lib/homepage-content'

const TRUST_ICONS = [
  TrustPhysicianIcon,
  TrustTechnologyIcon,
  TrustInsuranceIcon,
  TrustPatientIcon,
]

export default function Hero() {
  return (
    <section className="bg-white px-5 pb-12 pt-8 lg:grid lg:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
      <div className="lg:order-1">
        <h1 className="mb-3 max-w-[760px] animate-fadeUp font-display text-[2.35rem] font-bold leading-[1.08] text-navy [animation-delay:.05s] sm:text-[3.05rem] lg:text-[3.6rem]">
          Cardiologist in Columbia, MO — Heart Care Built Around{' '}
          <em className="not-italic text-wine">You.</em>
        </h1>
        <GoldSquiggle className="mb-5 h-3 w-24 animate-fadeUp [animation-delay:.1s]" />
        <p className="mb-8 max-w-[660px] animate-fadeUp text-base leading-[1.75] text-charcoal/85 [animation-delay:.15s] sm:text-[1.05rem]">
          Physician-led cardiovascular care integrating prevention, diagnostics, wellness, and
          specialty care to help you live longer and healthier.
        </p>

        <div className="mb-8 flex animate-fadeUp flex-col gap-3 [animation-delay:.25s] sm:flex-row">
          <Link
            href="/book"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-wine px-6 py-3 text-[.78rem] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-wine-light sm:w-auto sm:text-[.82rem]"
          >
            <CalendarCtaIcon />
            Schedule Consultation
          </Link>
          <Link
            href="/services"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-gold bg-white px-6 py-3 text-[.78rem] font-bold uppercase tracking-[1px] text-gold transition-colors hover:bg-gold/10 sm:w-auto sm:text-[.82rem]"
          >
            Learn More
            <ArrowLinkIcon />
          </Link>
          <Link
            href="/cardiologist-columbia-mo"
            className="text-center text-[.78rem] font-semibold text-wine underline-offset-2 hover:underline sm:text-left"
          >
            Cardiologist in Columbia, MO →
          </Link>
        </div>

        <div className="grid max-w-[680px] animate-fadeUp grid-cols-2 gap-x-4 gap-y-7 border-t border-[#EEF1F5] pb-2 pt-6 [animation-delay:.35s] sm:grid-cols-4 lg:pb-0">
          {HOME_TRUST_INDICATORS.map((label, index) => {
            const Icon = TRUST_ICONS[index]
            return (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <span className="text-gold">
                  <Icon className="h-9 w-9 sm:h-10 sm:w-10" />
                </span>
                <span className="text-[.62rem] font-bold uppercase leading-[1.35] tracking-[.8px] text-navy sm:text-[.68rem]">
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-7 mt-10 aspect-[4/3] animate-fadeUp overflow-hidden rounded-lg bg-graybg shadow-card sm:mt-12 lg:order-2 lg:mb-0 lg:mt-0 lg:aspect-auto lg:h-[520px]">
        <img
          src="/assets/hero.png"
          alt="PulsePoint Clinic physician consulting with a patient"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </div>
    </section>
  )
}
