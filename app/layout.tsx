import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import ContextProvider from "@/components/contextProvider";
import './globals.css'
import JsonLd from '@/components/JsonLd';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://avinea-hadpsar.com'), 
  
  title: {
    default: 'Avinea by Vyom Buildzone Hadapsar | Luxury 2, 3, 4, 4.5 & 5.5 BHK Apartments',
    template: '%s | Avinea by Vyom Buildzone Pune',
  },
  description: 'Experience ultra-luxury at Avinea by Vyom Buildzone. G+32 storeys in Hadapsar, Pune with 55+ amenities.',
  keywords: ['avinea hadapsar', 'avinea by vyom buildzone', 'vyom buildzone', 'pune apartments', 'luxury apartments hadapsar'],
  
  openGraph: {
    title: 'Avinea by Vyom Buildzone | Ultra-Luxury Living in Hadapsar',
    description: '7 Tectonic Towers with 115m glass elevation.',
    url: 'https://avinea-hadpsar.com/',
    siteName: 'Avinea by Vyom Buildzone',
    images: [{ url: '/images/logo.png' }], // Now resolves correctly
    locale: 'en_IN',
    type: 'website',
  },

  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleAdsId = process.env.GOOGLE_ADS_ID;
  const gtmId = process.env.GTM_ID;

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* Recommended: Move JsonLd to the top of body or use Metadata "other" field */}
        <JsonLd />
        
        <ContextProvider>
          {children}
        </ContextProvider>

        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}

        {/* Use 'lazyOnload' for Ads to improve your LCP (Largest Contentful Paint) score */}
        {googleAdsId && (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
            />
            <Script id="google-ads-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdsId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}