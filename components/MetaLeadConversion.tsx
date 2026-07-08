import Script from 'next/script'

// Fires on /book page load — mirrors GoogleAdsBookConversion so Meta ads
// can optimize for booking intent instead of just PageView.
export default function MetaLeadConversion() {
  return (
    <Script id="meta-lead-conversion" strategy="afterInteractive">
      {`window.fbq && window.fbq('track', 'Lead');`}
    </Script>
  )
}
