import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

const BASE_URL = 'https://www.hivemotorsltd.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hive Motors Ltd | Quality Imported Cars in Kenya",
    template: "%s | Hive Motors Ltd",
  },
  description: "Buy & import quality cars in Nairobi, Kenya. Toyota, Nissan, Subaru, Honda, Land Rover, BMW — fresh imports & locally used. Honest prices, financing available. Visit Hive Motors at Ridgeways.",
  keywords: ["imported cars Kenya", "buy car Nairobi", "Toyota import Kenya", "used cars Nairobi", "car import dealer", "Hive Motors", "Nairobi car dealer"],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: "Hive Motors Ltd",
    title: "Hive Motors Ltd | Quality Imported Cars in Kenya",
    description: "Dream Cars, Real Deals! Browse hundreds of quality imported vehicles. Nairobi's most trusted import dealer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hive Motors Ltd | Imported Cars Kenya",
    description: "Dream Cars, Real Deals! Kenya's premier car dealership.",
  },
  verification: {
    google: 'xoZ6QnxNr2TE_H4_bQEtL_Fe3BCjZ7H6ggbdDTa3x3c',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['AutoDealer', 'LocalBusiness'],
  name: 'Hive Motors Ltd',
  description: "Kenya's premier car dealership in Nairobi. Quality imported cars — Toyota, Nissan, Subaru, Honda, Land Rover, BMW and more.",
  url: BASE_URL,
  telephone: '+254722800436',
  email: 'hivemotorsltd@gmail.com',
  image: `${BASE_URL}/logo.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ridgeways, Kiambu Road',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    addressCountry: 'KE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -1.2039, longitude: 36.8432 },
  hasMap: 'https://maps.google.com/?q=Ridgeways+Kiambu+Road+Nairobi',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
  ],
  sameAs: [
    'https://www.instagram.com/hivemotors',
    'https://www.facebook.com/share/1NEPJ6VvYC',
    'https://www.tiktok.com/@hivemotors',
    // Add your Google Business profile URL here once verified:
    // 'https://g.page/hivemotorsltd',
  ],
  priceRange: 'KSh 500,000 – KSh 10,000,000',
  areaServed: { '@type': 'Country', name: 'Kenya' },
  currenciesAccepted: 'KES',
  paymentAccepted: 'Cash, Bank Transfer, Mobile Money',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
