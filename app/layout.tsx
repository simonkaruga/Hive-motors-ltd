import type { Metadata } from "next";
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Hive Motors Ltd | Premium Japanese Import Cars in Kenya",
    template: "%s | Hive Motors Ltd",
  },
  description: "Dream Cars, Real Deals! Kenya's premier Japanese import car dealership in Nairobi. Quality Toyota, Nissan, Subaru, Honda vehicles with financing available.",
  keywords: ["Japanese cars Kenya", "buy car Nairobi", "Toyota import Kenya", "used cars Nairobi", "Japanese import dealer", "Hive Motors"],
  openGraph: {
    type: "website",
    locale: "en_KE",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
