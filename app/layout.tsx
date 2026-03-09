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
  title: "Hive Motors Ltd | Premium Japanese Import Cars in Kenya",
  description: "Dream Cars, Real Deals! Premium Japanese import cars in Nairobi, Kenya. Quality vehicles from Japan with full support.",
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
