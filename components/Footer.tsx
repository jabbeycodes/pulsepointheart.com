import Image from 'next/image'
import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import { CLINIC } from '@/lib/seo'

const QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/patient-info', label: 'Patient Portal' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const SERVICE_LINKS = [
  { href: '/services#preventive-cardiology', label: 'Preventive Cardiology' },
  { href: '/services#vascular-care', label: 'Vascular & Vein Care' },
  { href: '/services#advanced-imaging', label: 'Advanced Imaging' },
  { href: '/services/executive-health', label: 'Executive Health' },
  { href: '/services#telemedicine', label: 'Telemedicine' },
]

const PATIENT_LINKS = [
  { href: '/patient-info#portal', label: 'Patient Portal' },
  { href: '/patient-info#forms', label: 'Forms' },
  { href: '/patient-info#insurance', label: 'Insurance Information' },
  { href: '/patient-info', label: 'FAQs' },
  { href: '/book', label: 'Book Appointment' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-white text-charcoal">
      <div className="grid grid-cols-1 gap-8 px-5 pb-8 pt-11 sm:grid-cols-2 sm:gap-8 sm:px-8 lg:grid-cols-[260px_repeat(4,1fr)] lg:gap-10 lg:px-12 lg:pb-10 lg:pt-[60px]">
        {/* Brand column */}
        <div>
          <div className="inline-block">
            <Image
              src="/assets/logo.png"
              alt="PulsePoint Clinic"
              width={170}
              height={42}
              className="h-12 w-auto"
            />
          </div>
          <p className="my-3.5 text-[.82rem] leading-[1.7] text-charcoal/60">
            Premium personalized cardiovascular care. Stronger hearts. Better lives.
          </p>
          <div className="flex gap-2.5">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61590350815271"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded border border-charcoal/15 text-charcoal/50 transition-colors hover:border-wine hover:text-wine"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@pulsepointheart"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded border border-charcoal/15 text-charcoal/50 transition-colors hover:border-wine hover:text-wine"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82a5.7 5.7 0 003.23 1.03V10a8.9 8.9 0 01-3.23-.62v5.67a6.11 6.11 0 11-6.1-6.1c.39 0 .77.04 1.13.11v3.29a2.86 2.86 0 102.01 2.73V2h2.96v3.82z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/pulsepointheart?igsh=aGtrcHo3YTQ5Y2t0"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded border border-charcoal/15 text-charcoal/50 transition-colors hover:border-wine hover:text-wine"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          <NewsletterForm />
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="mb-3 text-[.72rem] font-bold uppercase tracking-[2px] text-gold">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[.85rem] text-charcoal/65 hover:text-wine"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 className="mb-3 text-[.72rem] font-bold uppercase tracking-[2px] text-gold">
            Our Services
          </h5>
          <ul className="flex flex-col gap-2">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[.85rem] text-charcoal/65 hover:text-wine"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Patients */}
        <div>
          <h5 className="mb-3 text-[.72rem] font-bold uppercase tracking-[2px] text-gold">
            For Patients
          </h5>
          <ul className="flex flex-col gap-2">
            {PATIENT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[.85rem] text-charcoal/65 hover:text-wine"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h5 className="mb-3 text-[.72rem] font-bold uppercase tracking-[2px] text-gold">
            Contact Us
          </h5>
          <div className="mb-2.5 flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-charcoal/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-wine"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a2 2 0 012-2.18h3a2 2 0 012 1.72l.26 1.56a12 12 0 00.75 2.57l-1.5 1.5a16 16 0 006.29 6.29l1.5-1.5a12 12 0 002.57.75l1.56.26a2 2 0 011.72 2z" />
            </svg>
            <a href="tel:18557857337" className="hover:text-wine">
              (855) 785-7337
              <br />
              1-855-PULSEDR
            </a>
          </div>
          <div className="mb-2.5 flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-charcoal/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-wine"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href={`mailto:${CLINIC.email}`} className="hover:text-wine">
              {CLINIC.email}
            </a>
          </div>
          <div className="mb-2.5 flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-charcoal/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-wine"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              1000 W Nifong Blvd
              <br />
              Bldg 2, Suite 120
              <br />
              Columbia, MO 65203
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-charcoal/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-wine"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>
              {CLINIC.hoursDisplay}
              <br />
              {CLINIC.hoursNote}
            </span>
          </div>
        </div>
      </div>

      {/* Burgundy bottom bar */}
      <div className="bg-wine px-5 py-4 text-center text-[.72rem] text-white/70 sm:text-left sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <span>
            Copyright {new Date().getFullYear()} PulsePoint Clinic - pulsepointheart.com
          </span>
          <div className="flex flex-wrap justify-center gap-x-[18px] gap-y-2 sm:justify-end">
            <Link href="/privacy" className="text-white/60 hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/hipaa-notice" className="text-white/60 hover:text-gold">
              Privacy Practices
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-gold">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
