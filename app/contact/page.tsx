import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import ContactForm from '@/components/ContactForm'
import { CLINIC } from '@/lib/seo'
import { pageMeta } from '@/lib/page-metadata'

export const metadata: Metadata = pageMeta(
  '/contact',
  'Contact PulsePoint Clinic | Columbia, MO Cardiologist',
  'Contact PulsePoint Clinic in Columbia, MO. Call (855) 785-7337, email the clinic, or send a secure administrative inquiry.',
)

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page header */}
        <div className="bg-graybg px-5 py-10 sm:px-8 lg:px-12">
          <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
            Get in Touch
          </div>
          <h1 className="font-display text-[2rem] font-bold leading-[1.18] text-charcoal sm:text-[2.5rem]">
            Contact PulsePoint Clinic
          </h1>
          <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
        </div>

        {/* Two-column layout */}
        <div className="px-5 py-10 sm:px-8 lg:grid lg:grid-cols-[1fr_380px] lg:gap-14 lg:px-12 lg:py-14">
          {/* Form */}
          <div>
            <h2 className="mb-1 font-display text-[1.4rem] font-bold text-charcoal">
              Send us a message
            </h2>
            <p className="mb-6 text-[.9rem] leading-[1.65] text-muted">
              Fill out the form below and we will get back to you within one
              business day. For urgent matters, please call us directly.
            </p>
            <ContactForm />
          </div>

          {/* Clinic info sidebar */}
          <aside className="mt-10 lg:mt-0">
            <div className="rounded bg-graybg p-6 lg:sticky lg:top-24">
              <h3 className="mb-4 font-display text-[1.1rem] font-bold text-charcoal">
                Clinic Information
              </h3>

              <div className="space-y-4 text-[.88rem]">
                <div className="flex gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="mt-[2px] h-4 w-4 flex-shrink-0 text-wine">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a2 2 0 012-2.18h3a2 2 0 012 1.72l.26 1.56a12 12 0 00.75 2.57l-1.5 1.5a16 16 0 006.29 6.29l1.5-1.5a12 12 0 002.57.75l1.56.26a2 2 0 011.72 2z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-charcoal">Phone</div>
                    <a href="tel:18557857337" className="text-wine hover:underline">
                      (855) 785-7337
                      <br />
                      1-855-PULSEDR
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="mt-[2px] h-4 w-4 flex-shrink-0 text-wine">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <div className="font-semibold text-charcoal">Email</div>
                    <a href={`mailto:${CLINIC.email}`} className="break-all text-wine hover:underline">
                      {CLINIC.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="mt-[2px] h-4 w-4 flex-shrink-0 text-wine">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <div className="font-semibold text-charcoal">Address</div>
                    <address className="not-italic leading-[1.6] text-muted">
                      1000 W Nifong Blvd<br />
                      Bldg 2, Suite 120<br />
                      Columbia, MO 65203
                    </address>
                  </div>
                </div>

                <div className="flex gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="mt-[2px] h-4 w-4 flex-shrink-0 text-wine">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <div>
                    <div className="font-semibold text-charcoal">Hours</div>
                    <p className="leading-[1.6] text-muted">
                      {CLINIC.hoursDisplay}
                      <br />
                      {CLINIC.hoursNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps embed placeholder */}
              <div className="mt-5 overflow-hidden rounded">
                <iframe
                  title="PulsePoint Clinic location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.4!2d-92.3520!3d38.9108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1000+W+Nifong+Blvd%2C+Columbia%2C+MO+65203!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
