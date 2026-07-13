import type { Metadata } from 'next';

const BASE_URL = 'https://www.hivemotorsltd.com';

export const metadata: Metadata = {
  title: "Can't Find Your Car? We'll Source It | Hive Motors Kenya",
  description: "Tell us your dream car and we'll source it for you. Specify make, body type, budget and we'll find it for you. No obligation — Hive Motors Nairobi.",
  keywords: ['source car Kenya', 'custom car import Kenya', 'order specific car Kenya', 'car sourcing Nairobi', 'car request Kenya'],
  alternates: { canonical: `${BASE_URL}/notify` },
  openGraph: {
    title: "Can't Find Your Car? We'll Source It | Hive Motors Kenya",
    description: "Tell us your dream car and we'll source it for you. No obligation.",
    url: `${BASE_URL}/notify`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Car Sourcing | Hive Motors Kenya', images: ['/opengraph-image'] },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Request a Car', item: `${BASE_URL}/notify` },
  ],
};

export default function NotifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
