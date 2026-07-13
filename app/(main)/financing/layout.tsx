import type { Metadata } from 'next';

const BASE_URL = 'https://www.hivemotorsltd.com';

export const metadata: Metadata = {
  title: 'Car Financing Kenya | Loan Calculator | Import Duty Calculator | Hive Motors',
  description: 'Calculate your monthly car loan repayments and Kenya import duty instantly. Flexible auto financing in Nairobi — low deposit, competitive rates. Trusted car dealer since 2014.',
  keywords: ['car financing Kenya', 'car loan Nairobi', 'auto loan Kenya', 'car repayment calculator Kenya', 'import duty calculator Kenya', 'buy car on loan Nairobi', 'car import duty Kenya 2025'],
  alternates: { canonical: `${BASE_URL}/financing` },
  openGraph: {
    title: 'Car Financing & Import Duty Calculator Kenya | Hive Motors',
    description: 'Calculate monthly repayments and import duty instantly. Flexible financing available in Kenya.',
    url: `${BASE_URL}/financing`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Car Financing & Import Duty Calculator | Hive Motors Kenya', images: ['/opengraph-image'] },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the minimum deposit for car financing in Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'Most lenders require a minimum deposit of 10–20% of the car value. At Hive Motors we can help you find options starting from 10% down.' } },
    { '@type': 'Question', name: 'How long does financing approval take?', acceptedAnswer: { '@type': 'Answer', text: 'Pre-approval typically takes 24–48 hours. Once approved, funds are disbursed within 3–5 business days.' } },
    { '@type': 'Question', name: 'Can I finance an imported car?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both fresh imports and locally used vehicles are eligible for financing. The car must be 8 years old or newer per KRA regulations.' } },
    { '@type': 'Question', name: 'What documents do I need for a car loan in Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'You typically need: National ID, KRA PIN, 3 months bank statements, 3 months payslips (or business financials if self-employed), and a logbook valuation.' } },
    { '@type': 'Question', name: 'What interest rates should I expect?', acceptedAnswer: { '@type': 'Answer', text: 'Car loan rates in Kenya typically range from 13–18% per annum depending on your bank and credit profile.' } },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Financing', item: `${BASE_URL}/financing` },
  ],
};

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
