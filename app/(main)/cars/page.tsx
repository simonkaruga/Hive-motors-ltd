import type { Metadata } from 'next';
import { Suspense } from 'react';
import { client } from '@/lib/sanity/client';
import { carsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';
import CarsFilterClient from '@/components/cars/CarsFilterClient';

export const revalidate = 300; // re-fetch every 5 minutes

export const metadata: Metadata = {
  title: 'Used Cars for Sale in Nairobi | Buy Car Kenya | Hive Motors',
  description: 'Buy quality used & imported cars in Nairobi, Kenya. Toyota, Nissan, Subaru, Honda, Land Rover, BMW & more. Trusted car dealer in Nairobi since 2014. Visit Hive Motors at Ridgeways.',
  keywords: ['used cars Nairobi', 'buy car Nairobi', 'car dealer Nairobi', 'imported cars Kenya', 'Toyota for sale Kenya', 'cars for sale Kenya', 'second hand cars Nairobi', 'SUV for sale Nairobi'],
  alternates: { canonical: 'https://www.hivemotorsltd.com/cars' },
  openGraph: {
    title: 'Used Cars for Sale in Nairobi | Hive Motors Kenya',
    description: 'Buy quality used & imported cars in Nairobi. Toyota, Nissan, Subaru, Honda, Land Rover & more. Trusted dealer since 2014.',
    url: 'https://www.hivemotorsltd.com/cars',
  },
  twitter: { card: 'summary_large_image', title: 'Used Cars for Sale Nairobi | Hive Motors Kenya' },
};

export default async function CarsPage() {
  let cars: Car[] = [];
  try {
    cars = await client.fetch(carsQuery);
  } catch {
    // renders with empty list — filter client handles it gracefully
  }

  const itemListJsonLd = cars.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Used Cars for Sale in Nairobi | Hive Motors',
    url: 'https://www.hivemotorsltd.com/cars',
    numberOfItems: cars.length,
    itemListElement: cars.slice(0, 20).map((car, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.hivemotorsltd.com/cars/${car.slug.current}`,
      name: car.title,
    })),
  } : null;

  return (
    <main className="bg-white min-h-screen">
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}
      {/* Page Header — server rendered, instantly visible, fully SEO indexed */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-mid-grey mb-2">
                <a href="/" className="hover:text-red-brand">Home</a>
                {' '}<span className="text-gray-300">›</span>{' '}
                <span className="text-red-brand">Inventory</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand">
                Used Cars for Sale in Nairobi
              </h1>
            </div>
            <p className="text-mid-grey">
              Kenya&apos;s trusted car dealer — imported &amp; locally sourced vehicles at honest prices
            </p>
          </div>
        </div>
      </section>

      {/* Client filter + grid — wrapped in Suspense for useSearchParams */}
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-grey-soft rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <CarsFilterClient cars={cars} />
      </Suspense>
    </main>
  );
}
