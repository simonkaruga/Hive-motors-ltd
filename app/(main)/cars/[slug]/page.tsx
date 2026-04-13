import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { MessageCircle, Phone, Calendar, Gauge, Fuel, Settings, Palette, MapPin, Car } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity/client';
import { carBySlugQuery, similarCarsQuery } from '@/lib/sanity/queries';
import CarCard from '@/components/cars/CarCard';
import { WHATSAPP_NUMBER, PHONE_HREF } from '@/lib/constants';
import { STATIC_CAR_DETAIL } from '@/lib/staticCars';
import ImageGallery from '@/components/cars/ImageGallery';
import CarDetailBreadcrumb from '@/components/cars/CarDetailBreadcrumb';
import { formatPrice, formatMileage } from '@/lib/utils';

export const revalidate = 0; // Always fetch fresh data
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

const BASE_URL = 'https://www.hivemotorsltd.com';

// Helper function to fetch car with slug fallback
async function fetchCarBySlug(slug: string) {
  try {
    const car = await client.fetch(carBySlugQuery, { slug });
    if (car) return car;

    // Fallback: find a close slug match (case-insensitive, dash/space tolerance)
    const allCars = await client.fetch<{ slug: string; title: string }[]>(
      `*[_type == "car"]{ title, "slug": slug.current }`
    );
    const match = allCars.find(c =>
      c.slug && (
        c.slug.toLowerCase() === slug.toLowerCase() ||
        c.slug.replace(/[-_\s]/g, '') === slug.replace(/[-_\s]/g, '') ||
        c.title.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      )
    );
    if (match) redirect(`/cars/${match.slug}`);

    return null;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(
      `*[_type == "car" && defined(slug.current) && slug.current != ""]{ "slug": slug.current }`
    );
    
    const sanityParams = slugs
      .filter(({ slug }) => slug && slug.trim() !== '')
      .map(({ slug }) => ({ slug: slug.trim() }));
    
    const staticParams = Object.keys(STATIC_CAR_DETAIL).map(slug => ({ slug }));
    
    return [...sanityParams, ...staticParams];
  } catch {
    return Object.keys(STATIC_CAR_DETAIL).map(slug => ({ slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Handle static cars
  const staticCar = STATIC_CAR_DETAIL[slug];
  if (staticCar) {
    const description = `${staticCar.year} ${staticCar.title} — ${staticCar.mileage.toLocaleString()} km, ${staticCar.transmission}, ${staticCar.fuelType}. Price: KSh ${staticCar.price.toLocaleString()}. Available at Hive Motors Nairobi.`;
    return {
      title: staticCar.title,
      description,
      alternates: { canonical: `${BASE_URL}/cars/${slug}` },
      openGraph: { 
        title: `${staticCar.title} | Hive Motors`, 
        description, 
        url: `${BASE_URL}/cars/${slug}`, 
        images: [{ url: staticCar.images[0], width: 1200, height: 800, alt: staticCar.title }] 
      },
      twitter: { card: 'summary_large_image', title: staticCar.title, description },
    };
  }
  
  // Handle Sanity cars
  const car = await fetchCarBySlug(slug);
  if (!car) {
    return { 
      title: 'Car Not Found | Hive Motors',
      description: 'The requested car could not be found. Browse our available inventory.'
    };
  }
  
  const pageTitle = `${car.year} ${car.title} for Sale in Nairobi`;
  const description = `${car.year} ${car.title} — ${car.mileage?.toLocaleString()} km, ${car.transmission}, ${car.fuelType}. KSh ${car.price?.toLocaleString()}. Available at Hive Motors Nairobi.`;
  const ogImage = car.images?.[0]
    ? urlFor(car.images[0]).width(1200).height(630).auto('format').quality(80).url()
    : null;
  const ogAlt = `${car.year} ${car.title} — available at Hive Motors Nairobi`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: `${BASE_URL}/cars/${slug}` },
    openGraph: {
      title: `${pageTitle} | Hive Motors`,
      description,
      url: `${BASE_URL}/cars/${slug}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }] : [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hive Motors — Quality Cars Nairobi' }],
    },
    twitter: { card: 'summary_large_image', title: pageTitle, description, images: ogImage ? [ogImage] : ['/opengraph-image'] },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;

  // Handle static cars first
  const staticCar = STATIC_CAR_DETAIL[slug];
  if (staticCar) return renderStaticCar(staticCar, slug);

  // Fetch from Sanity
  const car = await fetchCarBySlug(slug);
  if (!car) notFound();

  // Fetch similar cars
  const similarCars = await client.fetch(similarCarsQuery, {
    slug,
    make: car.make ?? '',
    bodyType: car.bodyType ?? '',
  }).catch(() => []);

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
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Inventory', item: `${BASE_URL}/cars` },
      { '@type': 'ListItem', position: 3, name: car.title, item: `${BASE_URL}/cars/${slug}` },
    ],
  };

  const carImages = car.images?.slice(0, 5).map((img: any) => {
    try { return urlFor(img).width(1200).height(800).auto('format').quality(80).url(); } catch { return null; }
  }).filter(Boolean) ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.year} ${car.title}`,
    description: `${car.year} ${car.title} — ${car.mileage?.toLocaleString()} km, ${car.transmission}, ${car.fuelType}. Available at Hive Motors Nairobi.`,
    image: carImages,
    modelDate: car.year?.toString(),
    vehicleModelDate: car.year?.toString(),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    driveWheelConfiguration: car.driveType,
    color: car.colour,
    bodyType: car.bodyType,
    vehicleEngine: car.engine ? { '@type': 'EngineSpecification', name: car.engine } : undefined,
    itemCondition: car.condition === 'fresh-import' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'KES',
      price: car.price,
      url: `${BASE_URL}/cars/${slug}`,
      availability: car.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Hive Motors Ltd',
        telephone: '+254722800436',
        address: { '@type': 'PostalAddress', streetAddress: 'Ridgeways, Kiambu Road', addressLocality: 'Nairobi', addressCountry: 'KE' },
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="pt-28 pb-4 bg-grey-soft border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={
              <div className="flex items-center gap-2 text-sm text-mid-grey">
                <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
                <span className="text-gray-300">›</span>
                <Link href="/cars" className="hover:text-red-brand transition-colors">Inventory</Link>
                <span className="text-gray-300">›</span>
                <span className="text-navy-brand font-medium line-clamp-1">{car.title}</span>
              </div>
            }>
              <CarDetailBreadcrumb carTitle={car.title} />
            </Suspense>
          </div>
        </div>

        {/* Mobile sticky bottom CTA bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#166638] text-white py-3 rounded-xl font-bold text-sm"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a
            href={PHONE_HREF}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-navy-brand text-navy-brand py-3 rounded-xl font-bold text-sm"
          >
            <Phone size={18} />
            Call Us
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Images + Details */}
            <div className="lg:col-span-2 space-y-8">
              {car.images && car.images.length > 0 ? (
                <ImageGallery
                  images={car.images.map((img: any, index: number) => {
                    try {
                      if (!img?.asset?._id && !img?.asset?._ref && !img?.asset?.url) return null;
                      return {
                        url: urlFor(img).width(1200).height(800).auto('format').quality(80).url(),
                        thumbUrl: urlFor(img).width(320).height(213).auto('format').quality(60).url(),
                        alt: img?.alt || `${car.title} - Image ${index + 1}`,
                      };
                    } catch {
                      return null;
                    }
                  }).filter(Boolean)}
                  title={car.title}
                />
              ) : (
                <div className="h-96 bg-grey-soft rounded-2xl flex items-center justify-center text-mid-grey border border-gray-200">
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">No Images Available</p>
                    <p className="text-sm">Images will be added soon</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {car.description && (
                <div>
                  <h2 className="text-2xl font-display text-navy-brand mb-4">Description</h2>
                  <div className="w-8 h-0.5 bg-red-brand rounded-full mb-4" />
                  <p className="text-charcoal leading-relaxed">
                    {typeof car.description === 'string'
                      ? car.description
                      : 'Premium import in excellent condition. Contact us for full details.'}
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
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${car.status === 'available' ? 'bg-green-500' : car.status === 'on-transit' ? 'bg-amber-500' : 'bg-red-brand'}`} />
                        {status.label}
                      </span>
                      {car.condition && (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          car.condition === 'fresh-import' ? 'bg-blue-tint text-navy-brand' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {car.condition === 'fresh-import' ? '🇯🇵 Fresh Import' : '🇰🇪 Locally Used'}
                        </span>
                      )}
                    </div>
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
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#166638] text-white py-3.5 rounded-xl font-bold hover:bg-[#125530] transition-colors"
                    >
                      <MessageCircle size={20} />
                      Enquire via WhatsApp
                    </a>

                    <a
                      href={PHONE_HREF}
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

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
            <h2 className="text-2xl font-display text-navy-brand mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((similar: any) => (
                <CarCard
                  key={similar._id}
                  car={{
                    ...similar,
                    imageUrl: similar.images?.[0]
                      ? urlFor(similar.images[0]).width(800).height(533).auto('format').quality(60).url()
                      : null,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

// Helper function to render static cars
function renderStaticCar(staticCar: any, slug: string) {
  const whatsappMessage = `Hi Hive Motors! I'm interested in the ${staticCar.title} (${staticCar.year}). Could you share more details?`;
  
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Inventory', item: `${BASE_URL}/cars` },
      { '@type': 'ListItem', position: 3, name: staticCar.title, item: `${BASE_URL}/cars/${slug}` },
    ],
  };
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: staticCar.title,
    modelDate: staticCar.year.toString(),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: staticCar.mileage, unitCode: 'KMT' },
    fuelType: staticCar.fuelType,
    vehicleTransmission: staticCar.transmission,
    offers: { '@type': 'Offer', priceCurrency: 'KES', price: staticCar.price, availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Hive Motors Ltd' } },
  };
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="bg-white min-h-screen">
        <div className="pt-28 pb-4 bg-grey-soft border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={
              <div className="flex items-center gap-2 text-sm text-mid-grey">
                <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
                <span className="text-gray-300">›</span>
                <Link href="/cars" className="hover:text-red-brand transition-colors">Inventory</Link>
                <span className="text-gray-300">›</span>
                <span className="text-navy-brand font-medium">{staticCar.title}</span>
              </div>
            }>
              <CarDetailBreadcrumb carTitle={staticCar.title} />
            </Suspense>
          </div>
        </div>
        
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex gap-3">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#166638] text-white py-3 rounded-xl font-bold text-sm">
            <MessageCircle size={18} />WhatsApp
          </a>
          <a href={PHONE_HREF} className="flex-1 flex items-center justify-center gap-2 border-2 border-navy-brand text-navy-brand py-3 rounded-xl font-bold text-sm">
            <Phone size={18} />Call Us
          </a>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-200 bg-grey-soft mb-3">
                <Image src={staticCar.images[0]} alt={`${staticCar.title} - front view`} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" priority />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {staticCar.images.slice(0, 5).map((img: string, i: number) => (
                  <div key={i} className="relative h-16 rounded-xl overflow-hidden border border-gray-200">
                    <Image src={img} alt={`${staticCar.title} - view ${i + 1}`} fill sizes="20vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h1 className="text-2xl font-display text-navy-brand mb-2">{staticCar.title}</h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Available
                  </span>
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-4xl font-bold text-red-brand font-mono">KSh {staticCar.price.toLocaleString()}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Calendar, label: 'Year', value: staticCar.year.toString() },
                      { icon: Gauge, label: 'Mileage', value: `${staticCar.mileage.toLocaleString()} km` },
                      { icon: Settings, label: 'Transmission', value: staticCar.transmission },
                      { icon: Fuel, label: 'Fuel Type', value: staticCar.fuelType },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2 text-mid-grey text-sm"><spec.icon size={15} />{spec.label}</div>
                        <span className="text-navy-brand font-semibold text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#166638] text-white py-3.5 rounded-xl font-bold hover:bg-[#125530] transition-colors">
                      <MessageCircle size={20} />Enquire via WhatsApp
                    </a>
                    <a href={PHONE_HREF} className="flex items-center justify-center gap-2 w-full border-2 border-navy-brand text-navy-brand py-3.5 rounded-xl font-bold hover:bg-navy-brand hover:text-white transition-colors">
                      <Phone size={20} />Call Us
                    </a>
                    <Link href="/financing" className="flex items-center justify-center gap-2 w-full border-2 border-red-brand text-red-brand py-3 rounded-xl font-semibold hover:bg-red-brand hover:text-white transition-colors text-sm">
                      Request Financing
                    </Link>
                  </div>
                </div>
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