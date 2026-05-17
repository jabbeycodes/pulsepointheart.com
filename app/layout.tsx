import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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

// Metadata carried over from the live static site, plus a few upgrades.
export const metadata: Metadata = {
  metadataBase: new URL('https://pulsepointheart.com'),
  title: {
    default: 'PulsePoint Clinic - State-of-the-Art Heart Care',
    template: '%s | PulsePoint Clinic',
  },
  description:
    'PulsePoint Clinic - Concierge cardiology built around you. Precision care, advanced diagnostics, and direct physician access for stronger hearts and better lives.',
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://pulsepointheart.com/',
    siteName: 'PulsePoint Clinic',
    title: 'PulsePoint Clinic - State-of-the-Art Heart Care',
    description:
      'Concierge cardiology built around you. Precision care, advanced diagnostics, and direct physician access for stronger hearts and better lives.',
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
    title: 'PulsePoint Clinic - State-of-the-Art Heart Care',
    description:
      'Concierge cardiology built around you. Precision care, advanced diagnostics, and direct physician access for stronger hearts and better lives.',
    images: ['/assets/social-preview.png'],
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
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans text-charcoal bg-white">{children}</body>
    </html>
  )
}
