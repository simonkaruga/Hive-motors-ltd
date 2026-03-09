'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Eye, Gauge, Fuel } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface CarCardProps {
  car: {
    _id: string;
    title: string;
    slug: { current: string };
    images: any[];
    price: number;
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    status: string;
  };
}

export default function CarCard({ car }: CarCardProps) {
  const whatsappNumber = '254XXXXXXXXX';
  const message = `Hi, I'm interested in the ${car.title}. Please share more details.`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-xl overflow-hidden border border-navy-brand/8 hover:border-red-brand/30 hover:shadow-[0_8px_40px_rgba(218,29,23,0.1)] transition-all duration-300 shadow-[0_2px_16px_rgba(10,62,102,0.08)]"
    >
      {/* Image area */}
      <div className="relative h-56 overflow-hidden bg-grey-soft">
        {car.images?.[0] ? (
          <Image
            src={car.images[0]}
            alt={car.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 bg-gradient-to-br from-grey-soft to-white">
            <svg width="80" height="40" viewBox="0 0 120 50" fill="none" className="opacity-20">
              <rect x="10" y="20" width="100" height="20" rx="4" fill="#0A3E66"/>
              <rect x="25" y="10" width="70" height="20" rx="4" fill="#0A3E66"/>
              <circle cx="30" cy="42" r="8" fill="#0A3E66"/>
              <circle cx="90" cy="42" r="8" fill="#0A3E66"/>
            </svg>
            <span className="text-charcoal/30 text-xs">Photo coming soon</span>
          </div>
        )}

        {/* Navy overlay gradient at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />

        {/* Status badge */}
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-charcoal/70 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="red">SOLD</Badge>
          </div>
        )}
        {car.status === 'on-transit' && (
          <div className="absolute top-12 left-12">
            <Badge variant="amber">🚢 In Transit</Badge>
          </div>
        )}

        {/* Year pill */}
        <div className="absolute top-12 right-12">
          <span className="bg-navy-brand text-white text-xs font-mono font-bold px-10 py-4 rounded-full">
            {car.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-20">
        <h3 className="text-base font-semibold text-navy-brand mb-12 leading-snug group-hover:text-red-brand transition-colors">
          {car.title}
        </h3>

        {/* Specs */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 text-sm text-charcoal/50 mb-16">
          <span className="flex items-center gap-6">
            <Gauge size={13} className="text-red-brand/60" />
            {car.mileage?.toLocaleString()} km
          </span>
          <span className="flex items-center gap-6">
            <Fuel size={13} className="text-red-brand/60" />
            <span className="capitalize">{car.fuelType}</span>
          </span>
          <span className="capitalize">{car.transmission}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-navy-brand/6 mb-16" />

        {/* Price + Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-charcoal/40 uppercase tracking-wide mb-2">Price</p>
            <p className="text-xl font-mono font-bold text-red-brand">
              KSh {car.price?.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-8">
            <Link href={`/cars/${car.slug.current}`}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                title="View Details"
                className="w-10 h-10 bg-navy-brand/6 text-navy-brand rounded-lg hover:bg-navy-brand hover:text-white transition-all flex items-center justify-center border border-navy-brand/15 hover:border-navy-brand"
              >
                <Eye size={17} />
              </motion.button>
            </Link>

            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              title="WhatsApp"
              className="w-10 h-10 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition-colors flex items-center justify-center"
            >
              <MessageCircle size={17} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
