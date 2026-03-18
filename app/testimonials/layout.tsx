import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews | What Our Clients Say | Hive Motors Kenya',
  description: 'Read verified reviews from 450+ happy Hive Motors customers across Kenya. See why Nairobi trusts us for quality imported cars. Real stories, real deals.',
  keywords: ['Hive Motors reviews', 'car dealer reviews Nairobi', 'car dealer Kenya reviews', 'trusted car dealer Nairobi'],
  alternates: { canonical: 'https://hivemotorsltd.com/testimonials' },
  openGraph: {
    title: 'Customer Reviews | Hive Motors Kenya',
    description: 'Read verified reviews from 450+ happy customers. Real stories, real deals.',
    url: 'https://hivemotorsltd.com/testimonials',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors Ltd — Nairobi' }],
  },
  twitter: { card: 'summary_large_image', title: 'Customer Reviews | Hive Motors Kenya', images: ['/opengraph-image'] },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
