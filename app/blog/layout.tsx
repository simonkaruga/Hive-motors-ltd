import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Buying Tips & Import Guides | Hive Motors Blog Kenya',
  description: 'Expert advice on buying Japanese import cars in Kenya. Guides on import duty, financing, car maintenance, and how to choose the right vehicle for Kenyan roads.',
  keywords: ['Japanese car import guide Kenya', 'car buying tips Kenya', 'import duty Kenya 2025', 'best cars for Kenya roads', 'car maintenance Kenya'],
  alternates: { canonical: 'https://hivemotorsltd.com/blog' },
  openGraph: {
    title: 'Car Buying Tips & Import Guides | Hive Motors Blog',
    description: 'Expert advice on buying Japanese import cars in Kenya. Import duty, financing, maintenance guides.',
    url: 'https://hivemotorsltd.com/blog',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Car Import & Buying Guides | Hive Motors Kenya', images: ['/opengraph-image'] },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
