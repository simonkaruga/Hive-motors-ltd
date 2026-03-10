'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Phone, Calendar, Gauge, Fuel, Settings, Palette, Car, ChevronRight, Share2, Facebook, Twitter } from 'lucide-react';

export default function CX5Page() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % 7);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this ${car.title} at Hive Motors!`;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };
    
    window.open(shareUrls[platform], '_blank');
    setShowShareMenu(false);
  };

  const car = {
    title: '2019 Mazda CX-5 AWD 2.5T',
    price: 3400000,
    year: 2019,
    make: 'Mazda',
    model: 'CX-5 AWD 2.5T',
    mileage: 86000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '2.5L Turbocharged',
    driveType: 'AWD',
    colour: 'Black',
    status: 'available',
    images: [
      '/cars/cx5/cx5-01.jpg',
      '/cars/cx5/cx5-02.jpg',
      '/cars/cx5/cx5-03.jpg',
      '/cars/cx5/cx5-04.jpg',
      '/cars/cx5/cx5-05.jpg',
      '/cars/cx5/cx5-06.jpg',
      '/cars/cx5/cx5-07.jpg',
    ],
    features: [
      '2500cc TurboCharged Petrol Engine',
      '228 BHP',
      '420nm of Torque',
      '6-Speed Automatic Transmission',
      '5 Black Leather Seats',
      '86k kms Mileage',
      'Heads Up Display (HUD)',
      'DRL',
      'Front & Rear Seat Warmers',
      'Driver Memory Seat',
      'Lane Departure Warning (LDW)',
      'Blind Spot Monitoring (BSM)',
      'Multi Media Player with Radio, CD, USB, AUX, Bluetooth',
      'Digital Cluster',
      'Paddle Shifts',
      'Cruise Control',
      'Auto Boot',
      '19" Sport Alloy Wheels',
      'i-Stop Idling',
      'Smart Steering Audio Controls',
      'Smart Entry with Push Start',
      '360° Camera Coverage',
      'Front & Rear Parking Sensors',
      'Xenon Headlights',
      'Traction Control',
      'Electric Hand Brake',
      'Fog Lights',
      'Dual Climate Control',
      'Multifunctional Steering Wheel',
      'Steering Wheel Warmer'
    ]
  };

  const whatsappNumber = '254722800436';
  const message = `Hi, I'm interested in the ${car.title}. Please share more details.`;

  const similarCars = [
    { title: '2020 Toyota Prado TX-L', price: 7250000, year: 2020, mileage: 68000, image: '/cars/prado/prado-01.jpg' },
    { title: '2019 Range Rover Sport HSE', price: 9750000, year: 2019, mileage: 72000, image: '/cars/range-rover/range-rover-01.jpg' },
    { title: '2019 VW Polo Highline', price: 2150000, year: 2019, mileage: 22000, image: '/cars/polo/polo-01.jpg' },
  ];

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-mid-grey mb-6">
          <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
          <ChevronRight size={16} />
          <Link href="/cars" className="hover:text-red-brand transition-colors">Cars</Link>
          <ChevronRight size={16} />
          <span className="text-navy-brand font-medium">{car.title}</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-navy-brand hover:text-red-brand transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-grey-soft text-navy-brand rounded-lg hover:bg-blue-tint transition-colors"
            >
              <Share2 size={18} />
              <span className="font-medium">Share</span>
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button onClick={() => handleShare('facebook')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-grey-soft transition-colors">
                  <Facebook size={18} className="text-[#1877F2]" />
                  <span>Facebook</span>
                </button>
                <button onClick={() => handleShare('twitter')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-grey-soft transition-colors">
                  <Twitter size={18} className="text-[#1DA1F2]" />
                  <span>Twitter</span>
                </button>
                <button onClick={() => handleShare('whatsapp')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-grey-soft transition-colors">
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div 
              className="relative h-96 bg-grey-soft rounded-2xl overflow-hidden mb-4 cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={car.images[selectedImage]}
                alt={car.title}
                fill
                className="object-cover transition-transform duration-200"
                style={{
                  transform: isZoomed ? `scale(2)` : 'scale(1)',
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
              />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {car.images.map((img, idx) => (
                <a
                  key={idx}
                  href={img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-red-brand' : 'border-gray-200'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Available
              </span>
            </div>

            <h1 className="text-4xl font-display text-navy-brand mb-4">{car.title}</h1>
            <p className="text-5xl font-bold text-red-brand font-mono mb-8">
              KSh {car.price.toLocaleString()}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-grey-soft rounded-lg">
                <Calendar className="text-navy-brand" size={20} />
                <div>
                  <p className="text-xs text-mid-grey">Year</p>
                  <p className="font-semibold text-navy-brand">{car.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-grey-soft rounded-lg">
                <Gauge className="text-navy-brand" size={20} />
                <div>
                  <p className="text-xs text-mid-grey">Mileage</p>
                  <p className="font-semibold text-navy-brand">{car.mileage.toLocaleString()} km</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-grey-soft rounded-lg">
                <Settings className="text-navy-brand" size={20} />
                <div>
                  <p className="text-xs text-mid-grey">Transmission</p>
                  <p className="font-semibold text-navy-brand">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-grey-soft rounded-lg">
                <Fuel className="text-navy-brand" size={20} />
                <div>
                  <p className="text-xs text-mid-grey">Fuel Type</p>
                  <p className="font-semibold text-navy-brand">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-grey-soft rounded-lg">
                <Car className="text-navy-brand" size={20} />
                <div>
                  <p className="text-xs text-mid-grey">Engine</p>
                  <p className="font-semibold text-navy-brand">{car.engine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-grey-soft rounded-lg">
                <Palette className="text-navy-brand" size={20} />
                <div>
                  <p className="text-xs text-mid-grey">Colour</p>
                  <p className="font-semibold text-navy-brand">{car.colour}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-[#1ebe5b] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp Inquiry
              </a>
              <a
                href="tel:+254722800436"
                className="w-full bg-navy-brand text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-navy-dark transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Now
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to book a test drive for the ${car.title}. Please let me know available times.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-brand text-white px-6 py-4 rounded-lg font-semibold text-center hover:bg-red-dark transition-colors flex items-center justify-center gap-2"
              >
                <Car size={20} />
                Book Test Drive
              </a>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-display text-navy-brand mb-4">Description</h2>
          <p className="text-mid-grey leading-relaxed">
            2019 Mazda CX-5 AWD 2.5T with 2500cc turbocharged petrol engine producing 228 BHP and 420nm of torque. Features 6-Speed Automatic transmission, 86k kms mileage, and 5 Black Leather Seats. Equipped with Heads Up Display (HUD), 360° camera coverage, Blind Spot Monitoring (BSM), Lane Departure Warning (LDW), and premium features.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-display text-navy-brand mb-6">Features & Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {car.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-grey-soft rounded-lg">
                <span className="text-red-brand mt-1">✓</span>
                <span className="text-navy-brand text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-display text-navy-brand mb-6">Similar Cars You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map((similar, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={similar.image} alt={similar.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-navy-brand mb-2">{similar.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-mid-grey mb-3">
                    <span>{similar.year}</span>
                    <span>•</span>
                    <span>{similar.mileage.toLocaleString()} km</span>
                  </div>
                  <p className="text-red-brand font-mono font-bold mb-3">KSh {similar.price.toLocaleString()}</p>
                  <Link
                    href="/cars"
                    className="block text-center bg-navy-brand text-white px-4 py-2 rounded-lg hover:bg-navy-dark transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
