import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Hive Motors Ltd — Ridgeways, Nairobi',
  description: 'Get in touch with Hive Motors Ltd. WhatsApp, call or visit our showroom at Ridgeways, Kiambu Road, Nairobi. Open Mon–Fri 8AM–6PM, Sat 9AM–4PM.',
  keywords: ['Hive Motors contact', 'car dealer Nairobi contact', 'Hive Motors location', 'Ridgeways car dealer', 'Kiambu Road car showroom Nairobi'],
  alternates: { canonical: 'https://www.hivemotorsltd.com/contact' },
  openGraph: {
    title: 'Contact Hive Motors | Ridgeways, Nairobi',
    description: 'WhatsApp, call or visit us at Ridgeways, Kiambu Road, Nairobi.',
    url: 'https://www.hivemotorsltd.com/contact',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact Hive Motors | Nairobi, Kenya', images: ['/opengraph-image'] },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
