import Image from 'next/image'
import Link from 'next/link'
import NewsletterForm from './NewsletterForm'

const QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/membership', label: 'Membership' },
  { href: '/diagnostics', label: 'Diagnostics' },
  { href: '/patient-info', label: 'Patient Info' },
  { href: '/contact', label: 'Contact' },
]

const SERVICE_LINKS = [
  'Preventive Cardiology',
  'Vascular & Vein Care',
  'Advanced Imaging',
  'Cardiometabolic Wellness',
  'Executive Health',
  'Telemedicine',
]

const PATIENT_LINKS = [
  { href: '/patient-info', label: 'Patient Portal' },
  { href: '/patient-info', label: 'Forms' },
  { href: '/patient-info', label: 'Insurance Information' },
  { href: '/patient-info', label: 'FAQs' },
  { href: '/book', label: 'Book Appointment' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white/75">
      <div className="grid grid-cols-1 gap-8 px-5 pb-8 pt-11 sm:grid-cols-2 sm:gap-8 sm:px-8 lg:grid-cols-[260px_repeat(4,1fr)] lg:gap-10 lg:px-12 lg:pb-10 lg:pt-[60px]">
        {/* Brand column */}
        <div>
          <div className="inline-block rounded bg-white px-2.5 py-1.5">
            <Image
              src="/assets/logo.png"
              alt="PulsePoint Clinic"
              width={170}
              height={42}
              className="h-[42px] w-auto"
            />
          </div>
          <p className="my-3.5 text-[.82rem] leading-[1.7] text-white/60">
            Concierge cardiology. Precision care. Stronger hearts. Better lives.
          </p>
          <div className="flex gap-2.5">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/60 transition-colors hover:border-gold hover:text-gold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/60 transition-colors hover:border-gold hover:text-gold"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/60 transition-colors hover:border-gold hover:text-gold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
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
                  className="text-[.85rem] text-white/65 hover:text-gold"
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
            Services
          </h5>
          <ul className="flex flex-col gap-2">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <Link
                  href="/services"
                  className="text-[.85rem] text-white/65 hover:text-gold"
                >
                  {label}
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
                  className="text-[.85rem] text-white/65 hover:text-gold"
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
          <div className="mb-2.5 flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-white/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-gold"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a2 2 0 012-2.18h3a2 2 0 012 1.72l.26 1.56a12 12 0 00.75 2.57l-1.5 1.5a16 16 0 006.29 6.29l1.5-1.5a12 12 0 002.57.75l1.56.26a2 2 0 011.72 2z" />
            </svg>
            <a href="tel:5734249000" className="hover:text-gold">
              573.424.9000
            </a>
          </div>
          <div className="mb-2.5 flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-white/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-gold"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href="mailto:drtibiz@pulsepointheart.com" className="hover:text-gold">
              drtibiz@pulsepointheart.com
            </a>
          </div>
          <div className="mb-2.5 flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-white/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-gold"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              1000 W Nifong Blvd, BLD 2 Suite 120
              <br />
              Columbia, MO 65203
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-[.82rem] leading-[1.5] text-white/65">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-gold"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>By Appointment</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-white/10 px-5 py-4 text-center text-[.72rem] text-white/40 sm:flex-row sm:justify-between sm:text-left sm:px-8 lg:px-12">
        <span>
          &copy; {new Date().getFullYear()} PulsePoint Clinic &middot; pulsepointheart.com
        </span>
        <div className="flex gap-[18px]">
          <Link href="/privacy" className="text-white/40 hover:text-gold">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white/40 hover:text-gold">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
