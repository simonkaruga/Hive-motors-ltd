import type { Metadata } from 'next';

const BASE_URL = 'https://www.hivemotorsltd.com';

export const metadata: Metadata = {
  title: 'Contact Us | Hive Motors Ltd — Ridgeways, Nairobi',
  description: 'Get in touch with Hive Motors Ltd. WhatsApp, call or visit our showroom at Ridgeways, Kiambu Road, Nairobi. Open Mon–Fri 8AM–6PM, Sat 9AM–4PM.',
  keywords: ['Hive Motors contact', 'car dealer Nairobi contact', 'Hive Motors location', 'Ridgeways car dealer', 'Kiambu Road car showroom Nairobi'],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact Hive Motors | Ridgeways, Nairobi',
    description: 'WhatsApp, call or visit us at Ridgeways, Kiambu Road, Nairobi.',
    url: `${BASE_URL}/contact`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact Hive Motors | Nairobi, Kenya', images: ['/opengraph-image'] },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
