'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ship, Calendar, Bell, CheckCircle, Package, Truck, Flag } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { client } from '@/lib/sanity/client';
import { transitCarsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const SHIPPING_STEPS = [
  { icon: CheckCircle, label: 'Purchased' },
  { icon: Ship, label: 'Shipped' },
  { icon: Package, label: 'Customs' },
  { icon: Truck, label: 'Delivery' },
  { icon: Flag, label: 'Ready' },
];

export default function OnTransitPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await client.fetch(transitCarsQuery);
        setCars(data);
      } catch (err) {
        console.error('Error fetching transit cars:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-tint to-grey-soft border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Arriving Soon from Japan
              </div>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">
                🚢 Cars On Transit
              </h1>
              <p className="text-charcoal text-lg leading-relaxed">
                These cars are already purchased and sailing from Japan. Be the first to know when they arrive —
                reserve yours today before they hit the showroom.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Shipping Progress Indicator */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-between">
              {SHIPPING_STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    i <= 1 ? 'bg-navy-brand text-white' : 'bg-grey-soft text-mid-grey border border-gray-200'
                  }`}>
                    <step.icon size={18} />
                  </div>
                  <p className="text-xs text-mid-grey text-center hidden sm:block">{step.label}</p>
                  {i < SHIPPING_STEPS.length - 1 && (
                    <div className={`absolute h-0.5 ${i <= 0 ? 'bg-navy-brand' : 'bg-gray-200'}`} style={{ width: `${100 / SHIPPING_STEPS.length}%` }} />
                  )}
                </div>
              ))}
            </div>
            <div className="relative mt-2 hidden sm:block">
              <div className="absolute top-0 left-0 h-0.5 bg-gray-200 w-full" />
              <div className="absolute top-0 left-0 h-0.5 bg-navy-brand" style={{ width: '30%' }} />
            </div>
            <p className="text-center text-sm text-mid-grey mt-4">
              Current status: <span className="font-semibold text-navy-brand">Purchased → In Transit</span>
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {error ? (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">⚠️</p>
              <p className="text-2xl font-bold text-navy-brand mb-2">Failed to load transit cars</p>
              <p className="text-mid-grey">Please check your connection and try again.</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-grey-soft rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <Ship size={56} className="mx-auto text-navy-brand/20 mb-6" />
              <p className="text-2xl font-bold text-navy-brand mb-2">No cars currently in transit</p>
              <p className="text-mid-grey mb-8">New stock is sourced regularly — join our notification list!</p>
              <Link
                href="/notify"
                className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-red-dark transition-colors"
              >
                <Bell size={18} />
                Notify Me
              </Link>
            </motion.div>
          ) : (
            <>
              <RevealOnScroll>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-mid-grey">
                    <span className="font-bold text-navy-brand">{cars.length}</span> vehicle{cars.length !== 1 ? 's' : ''} on the way
                  </p>
                  <Link href="/notify" className="flex items-center gap-1.5 text-red-brand font-medium text-sm hover:text-red-dark">
                    <Bell size={14} />
                    Get notified when they arrive
                  </Link>
                </div>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car, i) => (
                  <RevealOnScroll key={car._id} delay={i * 0.07}>
                    <div className="relative">
                      <CarCard car={car} />
                      {car.expectedArrival && (
                        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2">
                          <Calendar size={14} className="text-amber-600 shrink-0" />
                          <span className="text-amber-700 text-xs font-medium">
                            Expected: {formatDate(car.expectedArrival)}
                          </span>
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

      {/* Notify Me CTA */}
      <section className="py-16 bg-grey-soft border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <Bell size={40} className="mx-auto text-red-brand mb-4" />
            <h2 className="text-3xl font-display text-navy-brand mb-4">
              Don't Miss the Next Arrivals
            </h2>
            <p className="text-mid-grey mb-8">
              Leave your details and we'll contact you as soon as new cars arrive from Japan.
            </p>
            <Link
              href="/notify"
              className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-dark transition-colors"
            >
              <Bell size={20} />
              Set Up Notifications
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-8 text-center">Common Questions</h2>
          </RevealOnScroll>

          {[
            { q: 'How long does shipping from Japan take?', a: 'Typically 4–6 weeks from Japan to Nairobi, including sea shipping and customs clearance.' },
            { q: 'Can I reserve a transit car?', a: 'Yes! Contact us via WhatsApp or phone to place a reservation. A deposit secures the car for you.' },
            { q: 'What are the clearance costs?', a: 'Import duty, excise, and VAT depend on engine size and year. We can give you a full cost breakdown — just ask!' },
            { q: 'Are transit cars inspected before shipping?', a: 'Absolutely. Every car is inspected in Japan before purchase and again upon arrival in Kenya.' },
          ].map((faq, i) => (
            <RevealOnScroll key={i} delay={i * 0.07}>
              <div className="mb-4 bg-grey-soft rounded-2xl p-6 border border-gray-200">
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
