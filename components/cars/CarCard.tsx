'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Eye } from 'lucide-react';

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
  const message = `Hi, I'm interested in the ${car.title}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {car.images?.[0] ? (
          <Image
            src={car.images[0]}
            alt={car.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>No Image</p>
          </div>
        )}

        {/* Status Badge */}
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-md font-bold">SOLD</span>
          </div>
        )}
        {car.status === 'on-transit' && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md font-semibold">
              🚢 In Transit
            </span>
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-md font-bold">
            {car.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {car.title}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          <span>{car.mileage?.toLocaleString()} km</span>
          <span>•</span>
          <span className="capitalize">{car.transmission}</span>
          <span>•</span>
          <span className="capitalize">{car.fuelType}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-red-600">
              KSh {car.price?.toLocaleString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link href={`/cars/${car.slug.current}`}>
              <button
                className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                title="View Details"
              >
                <Eye size={18} />
              </button>
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
