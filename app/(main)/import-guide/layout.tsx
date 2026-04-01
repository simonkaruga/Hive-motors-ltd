import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Import a Car from Japan to Kenya 2025 | Import Duty Calculator | Hive Motors',
  description: 'Complete guide to importing a car from Japan to Kenya in 2025. Step-by-step process, import duty calculator, costs breakdown, and tips from Nairobi\'s trusted car importers.',
  keywords: [
    'import car from Japan Kenya',
    'how to import car Kenya',
    'import duty calculator Kenya 2025',
    'car import duty Kenya',
    'import car Nairobi',
    'Japan car import Kenya',
    'KRA import duty Kenya',
    'cost of importing car Kenya',
  ],
  alternates: { canonical: 'https://www.hivemotorsltd.com/import-guide' },
  openGraph: {
    title: 'How to Import a Car from Japan to Kenya 2025 | Hive Motors',
    description: 'Step-by-step guide + import duty calculator. Everything you need to know about importing a car to Kenya.',
    url: 'https://www.hivemotorsltd.com/import-guide',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Import Car Guide Kenya — Hive Motors' }],
  },
  twitter: { card: 'summary_large_image', title: 'Import a Car from Japan to Kenya 2025 | Hive Motors' },
};

export default function ImportGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
