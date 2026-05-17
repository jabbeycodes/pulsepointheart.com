import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import CtaBanner from '@/components/CtaBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive cardiovascular and wellness care.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Services
          </div>
          <h1 className="font-display text-[2rem] font-bold leading-[1.18] text-charcoal sm:text-[2.5rem]">
            Our Services
          </h1>
          <div className="my-4 h-[3px] w-12 rounded bg-wine" />
          <p className="text-[.95rem] leading-[1.65] text-muted">
            Comprehensive cardiovascular and wellness care.
          </p>
          <p className="mt-6 text-[.9rem] leading-[1.65] text-muted">
            This page is coming soon. In the meantime, please reach out to us
            directly at{' '}
            <a href="tel:5734249000" className="font-semibold text-wine hover:underline">
              573.424.9000
            </a>{' '}
            or{' '}
            <a href="mailto:drtibiz@pulsepointheart.com" className="font-semibold text-wine hover:underline">
              drtibiz@pulsepointheart.com
            </a>
            .
          </p>
        </div>
      </main>
      <CtaBanner />
      <Footer />
      <StickyMobileCta />
    </>
  )
}
