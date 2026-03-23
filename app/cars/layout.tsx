import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Inventory | Browse Imported Cars in Nairobi',
  description: 'Browse hundreds of quality imported cars in Nairobi. Filter by make, body type, budget and more. Toyota, Nissan, Subaru, Honda, Land Rover — all available at Hive Motors.',
  keywords: ['buy car Nairobi', 'imported cars Kenya', 'used cars Nairobi', 'Toyota for sale Kenya', 'SUV Nairobi', 'car inventory Kenya'],
  alternates: { canonical: 'https://www.hivemotorsltd.com/cars' },
  openGraph: {
    title: 'Car Inventory | Hive Motors Ltd',
    description: 'Browse hundreds of quality imported cars. Filter by make, year, price and more.',
    url: 'https://www.hivemotorsltd.com/cars',
  },
  twitter: { card: 'summary_large_image', title: 'Browse Our Car Inventory | Hive Motors Kenya' },
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
