import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Phone, Share2, Calendar, Gauge, Fuel, Settings, Palette, MapPin, ArrowLeft, Car } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { carBySlugQuery } from '@/lib/sanity/queries';
import ImageGallery from '@/components/cars/ImageGallery';
import { formatPrice, formatMileage } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await client.fetch(carBySlugQuery, { slug: params.slug });
  if (!car) return { title: 'Car Not Found' };
  return {
    title: `${car.title} | Hive Motors Ltd`,
    description: `${car.year} ${car.title} — ${car.mileage?.toLocaleString()} km, ${car.transmission}, ${car.fuelType}. Price: KSh ${car.price?.toLocaleString()}. Available at Hive Motors Nairobi.`,
    openGraph: {
      title: `${car.title} | Hive Motors`,
      images: car.images?.[0] ? [{ url: car.images[0] }] : [],
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const car = await client.fetch(carBySlugQuery, { slug: params.slug });

  if (!car) notFound();

  const whatsappNumber = '254722800436';
  const whatsappMessage = `Hi Hive Motors! I'm interested in the ${car.title} (${car.year}). Could you share more details?`;

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year?.toString() },
    { icon: Gauge, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Settings, label: 'Drive Type', value: car.driveType?.toUpperCase() },
    { icon: Palette, label: 'Colour', value: car.colour },
    { icon: Car, label: 'Body Type', value: car.bodyType },
    { icon: Settings, label: 'Engine', value: car.engine },
  ].filter(s => s.value);

  const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
    available: { label: 'Available', bg: 'bg-green-100', text: 'text-green-700' },
    'on-transit': { label: 'On Transit', bg: 'bg-amber-100', text: 'text-amber-700' },
    sold: { label: 'Sold', bg: 'bg-red-50', text: 'text-red-brand' },
  };
  const status = statusConfig[car.status] || statusConfig.available;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: car.title,
    modelDate: car.year?.toString(),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    driveWheelConfiguration: car.driveType,
    color: car.colour,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: car.price,
      availability: car.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Hive Motors Ltd', address: 'Ridgeways, Kiambu Road, Nairobi, Kenya' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-white min-h-screen">

        {/* Breadcrumb */}
        <div className="pt-28 pb-4 bg-grey-soft border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-mid-grey">
              <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
              <span className="text-gray-300">›</span>
              <Link href="/cars" className="hover:text-red-brand transition-colors">Inventory</Link>
              <span className="text-gray-300">›</span>
              <span className="text-navy-brand font-medium line-clamp-1">{car.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Images + Details */}
            <div className="lg:col-span-2 space-y-8">
              <ImageGallery images={car.images || []} title={car.title} />

              {/* Description */}
              {car.description && (
                <div>
                  <h2 className="text-2xl font-display text-navy-brand mb-4">Description</h2>
                  <div className="w-8 h-0.5 bg-red-brand rounded-full mb-4" />
                  <p className="text-charcoal leading-relaxed">
                    {typeof car.description === 'string'
                      ? car.description
                      : 'Premium Japanese import in excellent condition. Contact us for full details.'}
                  </p>
                </div>
              )}

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display text-navy-brand mb-4">Features</h2>
                  <div className="w-8 h-0.5 bg-red-brand rounded-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature: string, i: number) => (
                      <span
                        key={i}
                        className="border border-navy-brand/20 text-navy-brand text-sm font-medium px-3 py-1.5 rounded-full bg-blue-tint"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">

                {/* Price Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  {/* Title + Status */}
                  <div className="mb-4">
                    <h1 className="text-2xl font-display text-navy-brand mb-2 leading-tight">{car.title}</h1>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${car.status === 'available' ? 'bg-green-500' : car.status === 'on-transit' ? 'bg-amber-500' : 'bg-red-brand'}`} />
                      {status.label}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-4xl font-bold text-red-brand font-mono">{formatPrice(car.price)}</p>
                  </div>

                  {/* Specs */}
                  <div className="space-y-3 mb-6">
                    {specs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2 text-mid-grey text-sm">
                          <spec.icon size={15} />
                          {spec.label}
                        </div>
                        <span className="text-navy-brand font-semibold text-sm capitalize">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold hover:bg-[#1ebe5b] transition-colors"
                    >
                      <MessageCircle size={20} />
                      Enquire via WhatsApp
                    </a>

                    <a
                      href="tel:+254722800436"
                      className="flex items-center justify-center gap-2 w-full border-2 border-navy-brand text-navy-brand py-3.5 rounded-xl font-bold hover:bg-navy-brand hover:text-white transition-colors"
                    >
                      <Phone size={20} />
                      Call Us
                    </a>

                    <Link
                      href="/financing"
                      className="flex items-center justify-center gap-2 w-full border-2 border-red-brand text-red-brand py-3 rounded-xl font-semibold hover:bg-red-brand hover:text-white transition-colors text-sm"
                    >
                      Request Financing
                    </Link>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-blue-tint rounded-2xl p-4 flex items-start gap-3">
                  <MapPin size={18} className="text-navy-brand mt-0.5 shrink-0" />
                  <div>
                    <p className="text-navy-brand font-semibold text-sm">Showroom Location</p>
                    <p className="text-mid-grey text-sm">Ridgeways, Kiambu Road, Nairobi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
