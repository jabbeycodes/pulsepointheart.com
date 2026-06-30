import Script from 'next/script'

// Fires on /book page load — matches Google Ads "Contact" conversion setup.
export default function GoogleAdsBookConversion() {
  return (
    <Script id="google-ads-book-conversion" strategy="afterInteractive">
      {`gtag('event', 'ads_conversion_Contact_Us_1');`}
    </Script>
  )
}
