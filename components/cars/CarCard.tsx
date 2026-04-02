'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageCircle, Gauge, Fuel, Settings } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

interface CarCardProps {
  car: {
    _id: string;
    title: string;
    slug: { current: string };
    imageUrl?: string | null;
    price: number;
    year: number;
    mileage: number;
    transmission: string;
    fuelType: string;
    status: string;
    condition?: 'fresh-import' | 'locally-used';
    expectedArrival?: string;
  };
  priority?: boolean;
}

// Grey-soft (#F7F8FA) 1×1 SVG — shows while the car photo loads
const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGN0Y4RkEiLz48L3N2Zz4=';

export default function CarCard({ car, priority = false }: CarCardProps) {
  const message = `Hi, I'm interested in the ${car.title}. Please share more details.`;
  const router = useRouter();
  const imageUrl = car.imageUrl ?? null;

  const statusConfig = {
    available: { label: 'Available', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    'on-transit': { label: 'On Transit', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    sold: { label: 'Sold', bg: 'bg-red-50', text: 'text-red-brand', dot: 'bg-red-brand' },
  };
  const status = statusConfig[car.status as keyof typeof statusConfig] || statusConfig.available;

  return (
    <div
      role="article"
      onClick={() => router.push(`/cars/${car.slug.current}`)}
      onKeyDown={(e) => e.key === 'Enter' && router.push(`/cars/${car.slug.current}`)}
      tabIndex={0}
      aria-label={`View ${car.title}`}
      className="block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-1 transition-transform duration-300 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 bg-grey-soft overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={car.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-mid-grey">
            <p className="text-sm">No Image</p>
          </div>
        )}

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          {car.condition && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              car.condition === 'fresh-import'
                ? 'bg-blue-tint text-navy-brand'
                : 'bg-amber-50 text-amber-700'
            }`}>
              {car.condition === 'fresh-import' ? '🇯🇵 Fresh Import' : '🇰🇪 Locally Used'}
            </span>
          )}
        </div>

        {/* Year Badge top-right */}
        <div className="absolute top-3 right-3">
          <span className="bg-navy-brand text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {car.year}
          </span>
        </div>

        {/* Sold overlay */}
        {car.status === 'sold' && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-red-brand text-white font-black text-2xl px-6 py-2 -rotate-12 rounded-md tracking-widest">SOLD</span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-brand/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-navy-brand mb-2 line-clamp-1 leading-tight">
          {car.title}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-mid-grey font-mono mb-4">
          <span className="flex items-center gap-1">
            <Gauge size={11} />
            {car.mileage?.toLocaleString()} km
          </span>
          <span className="text-gray-200">|</span>
          <span className="flex items-center gap-1 capitalize">
            <Settings size={11} />
            {car.transmission}
          </span>
          <span className="text-gray-200">|</span>
          <span className="flex items-center gap-1 capitalize">
            <Fuel size={11} />
            {car.fuelType}
          </span>
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xl font-bold text-red-brand font-mono leading-none">
            KSh {car.price?.toLocaleString()}
          </p>

          <div className="flex gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-[#166638] text-white rounded-lg hover:bg-[#125530] hover:scale-105 active:scale-95 transition-all"
              aria-label={`Enquire about ${car.title} via WhatsApp`}
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
