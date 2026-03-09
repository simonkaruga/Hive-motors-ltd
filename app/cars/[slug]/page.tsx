import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Phone, Share2, Calendar, Gauge, Fuel, Settings, Palette } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { carBySlugQuery } from '@/lib/sanity/queries';
import ImageGallery from '@/components/cars/ImageGallery';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatPrice, formatMileage } from '@/lib/utils';

export default async function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = await client.fetch(carBySlugQuery, { slug: params.slug });

  if (!car) {
    notFound();
  }

  const whatsappNumber = '254XXXXXXXXX';
  const whatsappMessage = `Hi, I'm interested in ${car.title}`;

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Settings, label: 'Drive Type', value: car.driveType?.toUpperCase() },
    { icon: Palette, label: 'Colour', value: car.colour },
  ];

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <div className="mb-24">
          <Link href="/cars" className="text-steel hover:text-gold transition-colors">
            ← Back to Inventory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-48">
          <div className="lg:col-span-2">
            <ImageGallery images={car.images || []} title={car.title} />

            <div className="mt-48">
              <h2 className="text-2xl font-display text-gold mb-24">Description</h2>
              <div className="text-cloud leading-relaxed space-y-16">
                {car.description ? (
                  <p>{car.description}</p>
                ) : (
                  <p>Premium Japanese import in excellent condition. Contact us for more details.</p>
                )}
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="mt-48">
                <h2 className="text-2xl font-display text-gold mb-24">Features</h2>
                <div className="grid grid-cols-2 gap-12">
                  {car.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-8 text-cloud">
                      <div className="w-6 h-6 rounded-full bg-gold/20" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-96 bg-cloud/5 border border-gold/20 rounded-lg p-24">
              <div className="mb-24">
                <h1 className="text-3xl font-display text-gold mb-12">{car.title}</h1>
                <div className="flex gap-12">
                  <Badge variant={car.status === 'sold' ? 'red' : car.status === 'on-transit' ? 'amber' : 'green'}>
                    {car.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="mb-32">
                <p className="text-4xl font-mono font-bold text-gold">
                  {formatPrice(car.price)}
                </p>
              </div>

              <div className="space-y-12 mb-32">
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between py-8 border-b border-gold/10">
                    <div className="flex items-center gap-8 text-steel">
                      <spec.icon size={18} />
                      <span>{spec.label}</span>
                    </div>
                    <span className="text-cloud font-medium capitalize">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" className="w-full flex items-center justify-center gap-8">
                    <MessageCircle size={20} />
                    WhatsApp Us
                  </Button>
                </a>

                <a href="tel:+254XXXXXXXXX" className="block">
                  <Button variant="secondary" className="w-full flex items-center justify-center gap-8">
                    <Phone size={20} />
                    Call Now
                  </Button>
                </a>

                <Button variant="outline" className="w-full flex items-center justify-center gap-8">
                  <Share2 size={20} />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
