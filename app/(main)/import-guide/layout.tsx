import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cost to Import a Car from Japan to Kenya 2025 | Duty Calculator | Hive Motors',
  description: 'Importing a car from Japan to Kenya costs 20–40% less than buying locally. Full breakdown: import duty (25%), excise, VAT, shipping & clearance. Free KRA duty calculator included.',
  keywords: [
    'import car from Japan Kenya',
    'how to import car Kenya',
    'import duty calculator Kenya 2025',
    'car import duty Kenya',
    'import car Nairobi',
    'Japan car import Kenya',
    'KRA import duty Kenya',
    'cost of importing car Kenya',
    'how much to import car from japan to kenya',
    'importing car japan kenya cost',
  ],
  alternates: { canonical: 'https://www.hivemotorsltd.com/import-guide' },
  openGraph: {
    title: 'Cost to Import a Car from Japan to Kenya 2025 | Hive Motors',
    description: 'Save 20–40% vs buying locally. Step-by-step guide + free KRA import duty calculator. Trusted by 500+ Kenyan car buyers.',
    url: 'https://www.hivemotorsltd.com/import-guide',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Import Car Guide Kenya — Hive Motors' }],
  },
  twitter: { card: 'summary_large_image', title: 'Cost to Import a Car from Japan to Kenya 2025 | Hive Motors' },
};

export default function ImportGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
