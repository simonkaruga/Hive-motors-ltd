import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair', weight: ['700'] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains', weight: ['400'] });

export const metadata: Metadata = {
  title: "Hive Motors Ltd | Premium Japanese Import Cars in Kenya",
  description: "Drive your dream. Premium Japanese import cars in Nairobi, Kenya. Quality vehicles from Japan with full support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
