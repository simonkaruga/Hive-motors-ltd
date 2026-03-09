'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ship, Shield, Award, Zap, Users } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import CarCard from '@/components/cars/CarCard';
import { client } from '@/lib/sanity/client';
import { featuredCarsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cars = await client.fetch(featuredCarsQuery);
        setFeaturedCars(cars);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="bg-white">
      <HeroSection />

      {/* On Transit Banner */}
      <section className="bg-blue-50 border-y border-blue-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Ship size={24} className="text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">🚢 Cars Arriving from Japan</p>
                <p className="text-sm text-gray-600">New stock on the way — see what's in transit</p>
              </div>
            </div>
            <Link
              href="/on-transit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              View Transit Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Cars</h2>
            <p className="text-lg text-gray-600">Handpicked premium vehicles from Japan</p>
          </div>

          {featuredCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredCars.map((car) => <CarCard key={car._id} car={car} />)}
              </div>
              <div className="text-center">
                <Link
                  href="/cars"
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
                >
                  View All Cars
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">Car Image</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Loading...</h3>
                    <p className="text-gray-600 text-sm mb-3">2020 • Auto • Petrol</p>
                    <p className="text-red-600 font-bold text-xl">KSh 0</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hive Motors</h2>
            <p className="text-lg text-gray-600">Your trusted partner for Japanese imports</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Quality Assured', desc: 'Every vehicle thoroughly inspected before import' },
              { icon: Award, title: 'Direct Import', desc: 'Sourced directly from trusted Japanese auctions' },
              { icon: Zap, title: 'Fast Process', desc: 'Streamlined clearance and delivery process' },
              { icon: Users, title: 'Expert Support', desc: 'Dedicated team guides you through every step' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl text-red-100 mb-8">
            Talk to our team and we'll help you find exactly what you need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              WhatsApp Us Now
            </a>
            <Link
              href="/cars"
              className="bg-red-700 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-800 transition-colors"
            >
              Browse Inventory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
