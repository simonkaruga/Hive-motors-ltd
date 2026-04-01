import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Financing Kenya | Loan Calculator | Import Duty Calculator | Hive Motors',
  description: 'Calculate your monthly car loan repayments and Kenya import duty instantly. Flexible auto financing in Nairobi — low deposit, competitive rates. Trusted car dealer since 2014.',
  keywords: ['car financing Kenya', 'car loan Nairobi', 'auto loan Kenya', 'car repayment calculator Kenya', 'import duty calculator Kenya', 'buy car on loan Nairobi', 'car import duty Kenya 2025'],
  alternates: { canonical: 'https://www.hivemotorsltd.com/financing' },
  openGraph: {
    title: 'Car Financing & Import Duty Calculator Kenya | Hive Motors',
    description: 'Calculate monthly repayments and import duty instantly. Flexible financing available in Kenya.',
    url: 'https://www.hivemotorsltd.com/financing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Car Financing & Import Duty Calculator | Hive Motors Kenya', images: ['/opengraph-image'] },
};

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
