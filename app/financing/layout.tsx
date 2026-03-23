import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Financing Kenya | Monthly Payment Calculator | Hive Motors',
  description: 'Calculate your monthly car loan repayments instantly. Flexible auto financing available in Kenya — low deposit, competitive rates. Apply through Hive Motors Nairobi.',
  keywords: ['car financing Kenya', 'car loan Nairobi', 'auto loan Kenya', 'car repayment calculator Kenya', 'buy car on loan Nairobi'],
  alternates: { canonical: 'https://www.hivemotorsltd.com/financing' },
  openGraph: {
    title: 'Car Financing & Loan Calculator | Hive Motors Kenya',
    description: 'Calculate monthly repayments instantly. Flexible financing available in Kenya.',
    url: 'https://www.hivemotorsltd.com/financing',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Car Financing Calculator | Hive Motors Kenya', images: ['/opengraph-image'] },
};

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
