import type { Metadata } from 'next';

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

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
