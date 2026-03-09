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

  // Static Prado car - first featured car
  const pradoCar: Car = {
    _id: 'prado-static',
    title: '2020 Toyota Prado TX-L J150',
    slug: { current: 'prado-static' },
    status: 'available',
    price: 7250000,
    year: 2020,
    make: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    mileage: 68000,
    transmission: 'automatic',
    fuelType: 'diesel',
    engine: '2.8L Turbocharged',
    bodyType: 'suv',
    driveType: '4wd',
    colour: 'Blue',
    images: [
      { asset: { url: '/cars/prado/prado-01.jpg' }, alt: 'Prado Side View' },
      { asset: { url: '/cars/prado/prado-02.jpg' }, alt: 'Prado Front' },
      { asset: { url: '/cars/prado/prado-03.jpg' }, alt: 'Prado Interior' },
      { asset: { url: '/cars/prado/prado-04.jpg' }, alt: 'Prado Rear' },
      { asset: { url: '/cars/prado/prado-05.jpg' }, alt: 'Prado Detail' },
    ],
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: '2800cc turbocharged diesel 3DA engine with 6 Speed Automatic Transmission. This stunning Blue Prado features 68k kms mileage, 4WD capability, and 7 Black Leather Seats with Electric adjustment. Enjoy Front Cooled and warmed seats, Multimedia Interface with Bluetooth Connectivity, USB, Radio, AUX and DVD player. Cool Sound Surround System with Dual zone climate settings.' }]
      }
    ],
    features: [
      '2800cc Turbocharged Diesel 3DA Engine',
      '6 Speed Automatic Transmission',
      '68k kms Mileage',
      '4WD',
      '7 Black Leather Seats',
      'Electric Seats',
      'Front Cooled and Warmed Seats',
      'Multimedia Interface with Bluetooth, USB, Radio, AUX, DVD',
      'Cool Sound Surround System',
      'Dual Zone Climate Settings',
      'Side Mirror Indicators',
      'Eco Mode',
      '360 Degrees Camera Coverage',
      'Reverse Camera',
      'Lane Departure Assist',
      'Parking Sensors',
      'Steering Controls',
      'Anti-Collision Detection',
      'Cruise Control',
      '4 Wheel Anti Lock Brakes',
      'Powered Door Locks/Mirrors/Windows',
      'Traction Control',
      'Front and Rear Cupholders'
    ],
    isFeatured: true,
    _createdAt: new Date().toISOString(),
  };

  // Static Range Rover - second featured car
  const rangeRoverCar: Car = {
    _id: 'range-rover-static',
    title: '2019 Range Rover Sport HSE',
    slug: { current: 'range-rover-static' },
    status: 'available',
    price: 9750000,
    year: 2019,
    make: 'Land Rover',
    model: 'Range Rover Sport HSE',
    mileage: 72000,
    transmission: 'automatic',
    fuelType: 'diesel',
    engine: '3.0L Turbocharged',
    bodyType: 'suv',
    driveType: '4wd',
    colour: 'Beige',
    images: [
      { asset: { url: '/cars/range-rover/range-rover-01.jpg' }, alt: 'Range Rover Side' },
      { asset: { url: '/cars/range-rover/range-rover-02.jpg' }, alt: 'Range Rover Front' },
      { asset: { url: '/cars/range-rover/range-rover-03.jpg' }, alt: 'Range Rover Interior' },
      { asset: { url: '/cars/range-rover/range-rover-04.jpg' }, alt: 'Range Rover Rear' },
      { asset: { url: '/cars/range-rover/range-rover-05.jpg' }, alt: 'Range Rover Detail' },
    ],
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: '3.0L turbocharged diesel engine with 8-Speed Automatic Transmission. This stunning Range Rover Sport HSE features 72k kms mileage, beige leather seats, and panoramic sunroof. Equipped with HUD, BSM, digital cluster, and touch screen displays.' }]
      }
    ],
    features: [
      '3.0L Turbocharged Diesel Engine',
      '8-Speed Automatic Transmission',
      'Panoramic Sunroof',
      'HUD (Heads Up Display)',
      'BSM (Blind Spot Monitor)',
      'Digital Cluster',
      'Touch Screen Infotainment',
      'All-Terrain Driving Modes',
      'Memory Seats with Warmers/Coolers',
      'Reverse Camera',
      'Cruise Control',
      'Parking Assist Sensors'
    ],
    isFeatured: true,
    _createdAt: new Date().toISOString(),
  };

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
      <section className="bg-blue-tint border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Ship size={24} className="text-navy-brand" />
              <div>
                <p className="font-semibold text-navy-brand">🚢 Cars Arriving from Japan</p>
                <p className="text-sm text-mid-grey">New stock on the way — see what's in transit</p>
              </div>
            </div>
            <Link
              href="/on-transit"
              className="bg-navy-brand text-white px-6 py-2.5 rounded-md font-medium hover:bg-navy-dark transition-colors whitespace-nowrap"
            >
              View Transit Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Featured Cars</h2>
            <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
            <p className="text-lg text-mid-grey">Handpicked premium vehicles from Japan</p>
          </div>

          {featuredCars.length > 0 || pradoCar ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Prado - First Featured Car */}
                <CarCard key={pradoCar._id} car={pradoCar} />
                
                {/* Range Rover - Second Featured Car */}
                <CarCard key={rangeRoverCar._id} car={rangeRoverCar} />
                
                {/* Other Featured Cars from Sanity */}
                {featuredCars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/cars"
                  className="inline-block bg-red-brand text-white px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-red-dark transition-colors"
                >
                  View All Cars
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">Loading...</p>
                  </div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-grey-soft">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Why Choose Hive Motors</h2>
            <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
            <p className="text-lg text-mid-grey">Your trusted partner for Japanese imports</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Quality Assured', desc: 'Every vehicle thoroughly inspected before import' },
              { icon: Award, title: 'Direct Import', desc: 'Sourced directly from trusted Japanese auctions' },
              { icon: Zap, title: 'Fast Process', desc: 'Streamlined clearance and delivery process' },
              { icon: Users, title: 'Expert Support', desc: 'Dedicated team guides you through every step' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-brand/10 text-red-brand rounded-lg mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="font-semibold text-lg text-navy-brand mb-2">{item.title}</h3>
                <p className="text-mid-grey text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Sold */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Recently Sold</h2>
            <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
            <p className="text-lg text-mid-grey">Happy customers driving their dream cars</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '2019 Toyota Harrier', price: 4200000 },
              { title: '2018 Nissan X-Trail', price: 3100000 },
              { title: '2020 Subaru Forester', price: 3800000 },
            ].map((car, i) => (
              <div key={i} className="bg-grey-soft p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-brand">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-brand" />
                    SOLD
                  </span>
                  <span className="text-xs text-mid-grey">✓ Delivered</span>
                </div>
                <h3 className="font-bold text-lg text-navy-brand mb-2">{car.title}</h3>
                <p className="text-red-brand font-mono font-semibold">KSh {car.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-brand to-red-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl text-white/90 mb-10">
            Talk to our team and we'll help you find exactly what you need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/254XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-brand px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              WhatsApp Us Now
            </a>
            <Link
              href="/cars"
              className="bg-red-dark border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-brand transition-colors"
            >
              Browse Inventory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
