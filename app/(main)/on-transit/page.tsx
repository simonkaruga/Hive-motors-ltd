import type { Metadata } from 'next';
import Link from 'next/link';
import { Ship, Calendar, Bell, CheckCircle, Package, Truck, Flag } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { client, urlFor } from '@/lib/sanity/client';
import { transitCarsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Cars On Transit | Arriving Soon | Hive Motors Kenya',
  description: 'See cars currently on their way to Nairobi from Japan. Reserve yours before they arrive. Fresh imports arriving soon at Hive Motors.',
  alternates: { canonical: 'https://www.hivemotorsltd.com/on-transit' },
};

const SHIPPING_STEPS = [
  { icon: CheckCircle, label: 'Purchased' },
  { icon: Ship, label: 'Shipped' },
  { icon: Package, label: 'Customs' },
  { icon: Truck, label: 'Delivery' },
  { icon: Flag, label: 'Ready' },
];

export default async function OnTransitPage() {
  let cars: Car[] = [];
  try {
    cars = await client.fetch(transitCarsQuery);
  } catch {}

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-tint to-grey-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Arriving Soon
              </div>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">
                🚢 Cars On Transit
              </h1>
              <p className="text-charcoal text-lg leading-relaxed">
                These cars are already purchased and on their way to Nairobi. Reserve yours today before they hit the showroom.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Shipping Progress */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative">
              {/* Track line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden sm:block" />
              <div className="absolute top-5 left-0 h-0.5 bg-navy-brand hidden sm:block" style={{ width: '30%' }} />
              <div className="relative flex justify-between">
                {SHIPPING_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      i <= 1 ? 'bg-navy-brand text-white' : 'bg-white text-mid-grey border-2 border-gray-200'
                    }`}>
                      <step.icon size={18} />
                    </div>
                    <p className="text-xs text-mid-grey text-center hidden sm:block">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-mid-grey mt-4">
              Current status: <span className="font-semibold text-navy-brand">Purchased → In Transit</span>
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cars.length === 0 ? (
            <div className="text-center py-20">
              <Ship size={56} className="mx-auto text-navy-brand/20 mb-6" />
              <p className="text-2xl font-bold text-navy-brand mb-2">No cars currently in transit</p>
              <p className="text-mid-grey mb-8">New stock is sourced regularly — join our notification list!</p>
              <Link href="/notify" className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-red-dark transition-colors">
                <Bell size={18} />Notify Me
              </Link>
            </div>
          ) : (
            <>
              <RevealOnScroll>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-mid-grey">
                    <span className="font-bold text-navy-brand">{cars.length}</span> vehicle{cars.length !== 1 ? 's' : ''} on the way
                  </p>
                  <Link href="/notify" className="flex items-center gap-1.5 text-red-brand font-medium text-sm hover:text-red-dark">
                    <Bell size={14} />Get notified when they arrive
                  </Link>
                </div>
              </RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car, i) => (
                  <RevealOnScroll key={car._id} delay={i * 0.07}>
                    <div>
                      <CarCard car={{
                        ...car,
                        imageUrl: car.images?.[0]
                          ? urlFor(car.images[0]).width(800).height(533).auto('format').quality(60).url()
                          : null,
                      }} />
                      {car.expectedArrival && (
                        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2">
                          <Calendar size={14} className="text-amber-600 shrink-0" />
                          <span className="text-amber-700 text-xs font-medium">Expected: {formatDate(car.expectedArrival)}</span>
                        </div>
                      )}
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Notify CTA */}
      <section className="py-12 bg-grey-soft border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <Bell size={36} className="mx-auto text-red-brand mb-4" />
            <h2 className="text-3xl font-display text-navy-brand mb-3">Don't Miss the Next Arrivals</h2>
            <p className="text-mid-grey mb-6">Leave your details and we'll contact you as soon as new cars arrive.</p>
            <Link href="/notify" className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-dark transition-colors">
              <Bell size={20} />Set Up Notifications
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-8 text-center">Common Questions</h2>
          </RevealOnScroll>
          {[
            { q: 'How long does shipping take?', a: 'Typically 4–8 weeks depending on the source country, including sea shipping and customs clearance in Nairobi.' },
            { q: 'Can I reserve a transit car?', a: 'Yes! Contact us via WhatsApp or phone to place a reservation. A deposit secures the car for you.' },
            { q: 'What are the clearance costs?', a: 'Import duty, excise, and VAT depend on engine size and year. We can give you a full cost breakdown — just ask!' },
            { q: 'Are transit cars inspected before shipping?', a: 'Absolutely. Every car is inspected at the source before purchase and again upon arrival in Kenya.' },
          ].map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 0.07}>
              <div className="mb-4 bg-grey-soft rounded-2xl p-5 border border-gray-200">
                <h3 className="font-bold text-navy-brand mb-2">{faq.q}</h3>
                <p className="text-mid-grey text-sm leading-relaxed">{faq.a}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </main>
  );
}
