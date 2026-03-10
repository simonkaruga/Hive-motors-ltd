'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, Share2, Phone, MessageCircle, Calendar } from 'lucide-react';

const poloImages = [
  '/cars/polo/polo-01.jpg',
  '/cars/polo/polo-02.jpg',
  '/cars/polo/polo-03.jpg',
  '/cars/polo/polo-04.jpg',
  '/cars/polo/polo-05.jpg',
  '/cars/polo/polo-06.jpg',
  '/cars/polo/polo-07.jpg',
  '/cars/polo/polo-08.jpg',
];

const features = [
  'Digital Cluster',
  'VW Music Interface',
  'Radio, USB, Bluetooth',
  'DVD Player',
  'Premium Sound Surround System',
  'Dual Zone Climate Settings',
  'Multifunctional Steering Wheel',
  'Auto Start-Stop System',
  'Reverse Camera',
  'Parking Assist Monitor',
  'Cruise Control',
  '4-Wheel Anti-Lock Brakes',
  'Powered Door Locks',
  'Powered Windows',
  'Powered Mirrors',
  'Manual Handbrake',
  'Traction Control',
  'Electronic Stability',
  'Fabric Seats',
  '7-Speed Automatic Transmission',
  'Max Fuel Efficiency',
];

export default function PoloDetailPage() {
  const [mainImage, setMainImage] = useState(poloImages[0]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = '2019 VW Polo Highline MK7.5 - KSh 2,150,000';
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-grey-600 mb-6">
          <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-red-brand transition-colors">Cars</Link>
          <span>/</span>
          <span className="text-navy-brand font-medium">2019 VW Polo Highline</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-display text-navy-brand mb-2">2019 VW Polo Highline MK7.5</h1>
            <p className="text-grey-600">German Engineering with Premium Features</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleShare('facebook')} className="p-2 border border-grey-300 rounded-lg hover:border-red-brand hover:text-red-brand transition-colors">
              <Share2 size={20} />
            </button>
            <button onClick={() => handleShare('twitter')} className="p-2 border border-grey-300 rounded-lg hover:border-red-brand hover:text-red-brand transition-colors">
              <Share2 size={20} />
            </button>
            <button onClick={() => handleShare('whatsapp')} className="p-2 border border-grey-300 rounded-lg hover:border-red-brand hover:text-red-brand transition-colors">
              <MessageCircle size={20} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 group">
              <Image src={mainImage} alt="2019 VW Polo" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="grid grid-cols-8 gap-2">
              {poloImages.map((img, i) => (
                <button key={i} onClick={() => setMainImage(img)} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-red-brand' : 'border-transparent hover:border-grey-300'}`}>
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-grey-50 rounded-2xl p-6">
              <div className="text-3xl font-bold text-navy-brand font-mono mb-6">KSh 2,150,000</div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-600">Year</span>
                  <span className="font-semibold text-navy-brand">2019</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-600">Mileage</span>
                  <span className="font-semibold text-navy-brand">22,000 km</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-600">Engine</span>
                  <span className="font-semibold text-navy-brand">1.0L Turbo</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-600">Fuel Type</span>
                  <span className="font-semibold text-navy-brand">Petrol</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-600">Transmission</span>
                  <span className="font-semibold text-navy-brand">7-Speed Auto</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-grey-600">Body Type</span>
                  <span className="font-semibold text-navy-brand">Hatchback</span>
                </div>
              </div>

              <div className="space-y-3">
                <a href="https://wa.me/254722800436?text=I'm interested in the 2019 VW Polo Highline MK7.5" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#1ebe5b] transition-colors">
                  <MessageCircle size={20} />
                  WhatsApp Inquiry
                </a>
                <a href="tel:+254722800436" className="flex items-center justify-center gap-2 w-full bg-red-brand text-white py-3 rounded-lg font-semibold hover:bg-red-dark transition-colors">
                  <Phone size={20} />
                  Call Now
                </a>
                <a href="https://wa.me/254722800436?text=I'd like to book a test drive for the 2019 VW Polo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full border-2 border-navy-brand text-navy-brand py-3 rounded-lg font-semibold hover:bg-navy-brand hover:text-white transition-colors">
                  <Calendar size={20} />
                  Book Test Drive
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-display text-navy-brand mb-6">Vehicle Specifications</h2>
            <div className="bg-grey-50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-grey-600 mb-1">Make</div>
                  <div className="font-semibold text-navy-brand">Volkswagen</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Model</div>
                  <div className="font-semibold text-navy-brand">Polo Highline MK7.5</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Body Type</div>
                  <div className="font-semibold text-navy-brand">Hatchback</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Seats</div>
                  <div className="font-semibold text-navy-brand">5 Fabric</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Condition</div>
                  <div className="font-semibold text-navy-brand">Excellent</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Origin</div>
                  <div className="font-semibold text-navy-brand">🇩🇪 Germany</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-display text-navy-brand mb-6">Key Features</h2>
            <div className="bg-grey-50 rounded-2xl p-6">
              <ul className="grid grid-cols-1 gap-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-brand mt-1">✓</span>
                    <span className="text-navy-brand">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-16">
          <h2 className="text-3xl font-display text-navy-brand mb-8">Similar Cars You May Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/cars/cx5-static" className="group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image src="/cars/cx5/cx5-01.jpg" alt="Mazda CX-5" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-semibold text-navy-brand mb-1">2019 Mazda CX-5 AWD 2.5T</h3>
              <p className="text-red-brand font-mono font-bold">KSh 3,400,000</p>
            </Link>
            <Link href="/cars/prado-static" className="group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image src="/cars/prado/prado-01.jpg" alt="Toyota Prado" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-semibold text-navy-brand mb-1">2020 Toyota Prado TX-L</h3>
              <p className="text-red-brand font-mono font-bold">KSh 7,250,000</p>
            </Link>
            <Link href="/cars/range-rover-static" className="group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image src="/cars/range-rover/range-rover-01.jpg" alt="Range Rover Sport" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-semibold text-navy-brand mb-1">2019 Range Rover Sport HSE</h3>
              <p className="text-red-brand font-mono font-bold">KSh 9,750,000</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
