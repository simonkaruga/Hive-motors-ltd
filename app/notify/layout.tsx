import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Can't Find Your Car? We'll Source It | Hive Motors Kenya",
  description: "Tell us your dream car and we'll source it directly from Japan. Specify make, body type, budget and we'll find it for you. No obligation — Hive Motors Nairobi.",
  keywords: ['source car from Japan Kenya', 'custom car import Kenya', 'order specific car Kenya', 'Japanese car sourcing Nairobi', 'car request Kenya'],
  alternates: { canonical: 'https://hivemotorsltd.com/notify' },
  openGraph: {
    title: "Can't Find Your Car? We'll Source It | Hive Motors Kenya",
    description: "Tell us your dream car and we'll source it directly from Japan. No obligation.",
    url: 'https://hivemotorsltd.com/notify',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: "Car Sourcing from Japan | Hive Motors Kenya", images: ['/opengraph-image'] },
};

export default function NotifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
