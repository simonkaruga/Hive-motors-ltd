'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🇯🇵 Premium Japanese Imports · Nairobi, Kenya
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-red-600"> Japanese Car</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-10">
            Quality vehicles sourced directly from Japan. Trusted by 500+ happy customers in Nairobi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/cars"
              className="bg-red-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              Browse Inventory
            </Link>
            <a
              href="https://wa.me/254XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-md font-semibold text-lg hover:border-gray-400 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-red-600">500+</div>
              <div className="text-sm text-gray-600 mt-1">Cars Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">450+</div>
              <div className="text-sm text-gray-600 mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">10+</div>
              <div className="text-sm text-gray-600 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
