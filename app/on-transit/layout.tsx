import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cars On Transit from Japan | Coming Soon | Hive Motors Kenya',
  description: 'Preview cars currently shipping from Japan to Nairobi. Reserve your vehicle before it arrives. Fresh Japanese imports arriving at Hive Motors — Ridgeways, Kiambu Road.',
  keywords: ['cars on transit Kenya', 'Japanese import arriving Kenya', 'reserve car Kenya', 'fresh import Nairobi', 'cars shipping Japan Kenya'],
  alternates: { canonical: 'https://hivemotorsltd.com/on-transit' },
  openGraph: {
    title: 'Cars On Transit from Japan | Hive Motors Kenya',
    description: 'Preview and reserve fresh Japanese imports currently shipping to Nairobi.',
    url: 'https://hivemotorsltd.com/on-transit',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Cars On Transit from Japan | Hive Motors Kenya', images: ['/opengraph-image'] },
};

export default function OnTransitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
