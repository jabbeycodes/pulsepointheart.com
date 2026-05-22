import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { buildClinicJsonLd, buildWebsiteJsonLd } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pulsepointheart.com'),
  title: {
    default: 'PulsePoint Clinic | Premium Cardiovascular Care in Columbia, MO',
    template: '%s | PulsePoint Clinic',
  },
  description:
    'PulsePoint Clinic is a physician-led cardiovascular care platform in Columbia, MO offering preventive cardiology, advanced diagnostics, membership-based care, and personalized heart health planning.',
  keywords: [
    'cardiologist Columbia MO',
    'premium cardiology Columbia Missouri',
    'preventive cardiology',
    'heart doctor Columbia MO',
    'echocardiography Columbia MO',
    'vascular ultrasound Columbia MO',
    'calcium scoring Columbia MO',
    'membership cardiology',
    'cardiovascular wellness',
    'heart health optimization',
    'physician-led care',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://pulsepointheart.com/',
    siteName: 'PulsePoint Clinic',
    title: 'PulsePoint Clinic | Premium Cardiovascular Care in Columbia, MO',
    description:
      'Physician-led cardiovascular care in Columbia, MO with preventive cardiology, advanced diagnostics, and personalized heart health planning.',
    locale: 'en_US',
    images: [
      {
        url: '/assets/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'PulsePoint Clinic logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PulsePoint Clinic | Premium Cardiovascular Care in Columbia, MO',
    description:
      'Preventive cardiology, advanced diagnostics, and personalized heart care in Columbia, MO.',
    images: ['/assets/social-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// theme-color and viewport meta moved to its own export in Next.js 14+
export const viewport: Viewport = {
  themeColor: '#7A1E2C',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = [buildClinicJsonLd(), buildWebsiteJsonLd()]

  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans text-charcoal bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
