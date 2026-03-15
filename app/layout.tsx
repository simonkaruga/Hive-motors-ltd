import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
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

const BASE_URL = 'https://hivemotorsltd.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hive Motors Ltd | Premium Japanese Import Cars in Kenya",
    template: "%s | Hive Motors Ltd",
  },
  description: "Dream Cars, Real Deals! Kenya's premier Japanese import car dealership in Nairobi. Quality Toyota, Nissan, Subaru, Honda vehicles with financing available.",
  keywords: ["Japanese cars Kenya", "buy car Nairobi", "Toyota import Kenya", "used cars Nairobi", "Japanese import dealer", "Hive Motors", "Nairobi car dealer"],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: BASE_URL,
    siteName: "Hive Motors Ltd",
    title: "Hive Motors Ltd | Premium Japanese Import Cars in Kenya",
    description: "Dream Cars, Real Deals! Browse hundreds of quality Japanese vehicles. Nairobi's most trusted import dealer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hive Motors Ltd | Japanese Import Cars Kenya",
    description: "Dream Cars, Real Deals! Kenya's premier Japanese import car dealership.",
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
  description: "Kenya's premier Japanese import car dealership in Nairobi.",
  url: BASE_URL,
  telephone: '+254722800436',
  email: 'hivemotorsltd@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ridgeways, Kiambu Road',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -1.2039, longitude: 36.8432 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
  ],
  sameAs: [
    'https://www.instagram.com/hivemotors',
    'https://www.facebook.com/share/1NEPJ6VvYC',
    'https://www.tiktok.com/@hivemotors',
  ],
  priceRange: 'KSh 500,000 – KSh 10,000,000',
  areaServed: { '@type': 'Country', name: 'Kenya' },
  currenciesAccepted: 'KES',
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
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
