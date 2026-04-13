export const revalidate = 300; // re-fetch from Sanity every 5 minutes

import Link from 'next/link';
import { Ship, Shield, Award, Zap, Users, Search, Anchor, Truck, Star, ArrowRight, BookOpen } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import CarCard from '@/components/cars/CarCard';
import BlogCard from '@/components/blog/BlogCard';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import PageLoader from '@/components/shared/PageLoader';
import StaggerItem from '@/components/shared/StaggerItem';
import FadeInSection from '@/components/shared/FadeInSection';
import { BRAND_LOGOS } from '@/components/home/BrandLogos';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { client } from '@/lib/sanity/client';
import { featuredCarsQuery, homepageTestimonialsQuery, homepagePostsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { Car } from '@/lib/types';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { STATIC_CARS } from '@/lib/staticCars';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

interface HomeTestimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
}

interface HomePost {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { _ref?: string; url?: string }; alt?: string };
  category: string;
  excerpt?: string;
  publishedAt: string;
  readTime: number;
}

const HOW_IT_WORKS = [
  { num: '01', icon: Search, title: 'Browse or Request', desc: 'Search our inventory or tell us your exact specs — make, model, year, and budget.' },
  { num: '02', icon: Anchor, title: 'We Source It For You', desc: 'Our agents source from trusted dealers and auctions worldwide to secure the best deal.' },
  { num: '03', icon: Ship, title: 'Shipped & Cleared', desc: 'We handle all shipping logistics and customs clearance right here in Nairobi.' },
  { num: '04', icon: Truck, title: 'Drive Away', desc: 'Pick up your fully cleared, roadworthy car — ready for registration.' },
];

const BRANDS = [
  'Toyota', 'Nissan', 'Honda', 'Subaru',
  'Land Rover', 'BMW', 'Mercedes-Benz', 'Mazda',
  'Mitsubishi', 'Lexus',
];

const FALLBACK_TESTIMONIALS: HomeTestimonial[] = [
  { _id: 'f1', customerName: 'James Kamau', rating: 5, review: 'Excellent service! Got my Toyota Prado in perfect condition. Hive Motors made the whole import process seamless and stress-free.', carPurchased: 'Toyota Land Cruiser Prado' },
  { _id: 'f2', customerName: 'Sarah Wanjiru', rating: 5, review: 'Very professional team. They found me exactly the Subaru Forester I wanted within my budget. Highly recommend to anyone!', carPurchased: 'Subaru Forester XT' },
  { _id: 'f3', customerName: 'David Mwangi', rating: 5, review: 'Transparent pricing, no hidden costs. My Range Rover arrived in pristine condition. Will definitely use Hive Motors again.', carPurchased: 'Range Rover Sport' },
];

export default async function Home() {
  let featuredCars: Car[] = [];
  let testimonials: HomeTestimonial[] = [];
  let posts: HomePost[] = [];

  try {
    [featuredCars, testimonials, posts] = await Promise.all([
      client.fetch(featuredCarsQuery),
      client.fetch(homepageTestimonialsQuery),
      client.fetch(homepagePostsQuery),
    ]);
  } catch {
    // fallback to empty arrays — static content still renders
  }

  const displayCars = featuredCars.length > 0 ? featuredCars : STATIC_CARS;

  const displayTestimonials = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <>
      <PageLoader />
      <main className="bg-white">
        {/* Preconnect for Sanity CDN — only when Sanity returned real data */}
        {featuredCars.length > 0 && (
          <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        )}

        {/* ── Hero ───────────────────────────────────────────────── */}
        <HeroSection />

        {/* ── On Transit Banner ──────────────────────────────────── */}
        <section className="bg-blue-tint border-y border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Ship size={24} className="text-navy-brand" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-navy-brand">🚢 New Stock Arriving Soon</p>
                  <p className="text-sm text-charcoal">Fresh imports on the way — see what&apos;s in transit</p>
                </div>
              </div>
              <Link href="/on-transit" className="bg-navy-brand text-white px-6 py-2.5 rounded-md font-medium hover:bg-navy-dark transition-colors whitespace-nowrap">
                View Transit Cars
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured Cars ──────────────────────────────────────── */}
        <FadeInSection>
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Featured Cars</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <p className="text-lg text-mid-grey">Handpicked premium vehicles from around the world</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {displayCars.map((car, idx) => (
                  <StaggerItem key={car._id} index={idx}>
                    <CarCard
                      car={{
                        ...car,
                        imageUrl: car.images?.[0]
                          ? (() => {
                              const img = car.images[0] as any;
                              // Handle static images (local URLs)
                              if (img?.asset?.url && img.asset.url.startsWith('/')) {
                                return img.asset.url;
                              }
                              // Handle Sanity images
                              return img?.asset?._ref || img?.asset?._id
                                ? urlFor(car.images[0]).width(800).height(533).auto('format').quality(60).url()
                                : img?.asset?.url ?? null;
                            })()
                          : null,
                      }}
                      priority={idx < 3}
                    />
                  </StaggerItem>
                ))}
              </div>

              <div className="text-center">
                <Link href="/cars" className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-red-dark transition-colors">
                  View All Cars
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ── How It Works ───────────────────────────────────────── */}
        <FadeInSection>
          <section className="py-16 bg-navy-brand">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-display text-white mb-4">How It Works</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <p className="text-lg text-white/70">From source to your driveway in 4 simple steps</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {HOW_IT_WORKS.map((step, i) => (
                  <RevealOnScroll key={step.num} delay={i * 0.1}>
                    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                      {i < HOW_IT_WORKS.length - 1 && (
                        <div className="hidden lg:block absolute top-10 left-full w-6 h-0.5 bg-white/20 z-10" />
                      )}
                      <div className="text-5xl font-black text-white/10 font-mono mb-4 leading-none">{step.num}</div>
                      <div className="w-12 h-12 bg-red-brand/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-brand/30 transition-colors">
                        <step.icon size={22} className="text-red-brand" />
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              <div className="text-center mt-12">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Hive%20Motors!%20I%27d%20like%20to%20know%20more%20about%20how%20the%20import%20process%20works.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#166638] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#125530] transition-colors"
                >
                  <WhatsAppIcon />
                  Ask Us How It Works
                </a>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ── Why Choose Us ──────────────────────────────────────── */}
        <FadeInSection>
          <section className="py-16 bg-grey-soft">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Why Choose Hive Motors</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <p className="text-lg text-mid-grey">Your trusted partner for quality imported vehicles</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Shield, title: 'Quality Assured', desc: 'Every vehicle thoroughly inspected before import' },
                  { icon: Award, title: 'Direct Import', desc: 'Sourced from trusted dealers and auctions worldwide' },
                  { icon: Zap, title: 'Fast Process', desc: 'Streamlined clearance and delivery process' },
                  { icon: Users, title: 'Expert Support', desc: 'Dedicated team guides you through every step' },
                ].map((item, i) => (
                  <RevealOnScroll key={i} delay={i * 0.07}>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg hover:border-red-brand/30 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-red-brand/10 text-red-brand rounded-xl mb-4">
                        <item.icon size={24} />
                      </div>
                      <h3 className="font-semibold text-lg text-navy-brand mb-2">{item.title}</h3>
                      <p className="text-mid-grey text-sm">{item.desc}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ── Testimonials Carousel ──────────────────────────────── */}
        <FadeInSection>
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">What Our Clients Say</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <div className="flex items-center justify-center gap-1 mb-2" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-mid-grey">Trusted by 450+ happy customers across Kenya</p>
              </div>

              <TestimonialsCarousel testimonials={displayTestimonials} />

              <div className="text-center mt-10">
                <Link href="/testimonials" className="inline-flex items-center gap-2 text-navy-brand font-semibold hover:text-red-brand transition-colors border border-navy-brand/20 px-6 py-3 rounded-xl hover:border-red-brand/30">
                  Read All Reviews
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ── Brands We Import ───────────────────────────────────── */}
        <section className="py-14 bg-grey-soft border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-mid-grey uppercase tracking-widest mb-10">
              Brands We Import
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-6">
              {BRANDS.map(brand => {
                const Logo = BRAND_LOGOS[brand];
                return (
                  <Link
                    key={brand}
                    href={`/cars?make=${brand}`}
                    className="group flex flex-col items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-6 hover:border-navy-brand/30 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="h-16 flex items-center justify-center w-full">
                      {Logo && <Logo className="h-12 w-full max-w-full object-contain" />}
                    </div>
                    <span className="text-xs font-semibold text-mid-grey group-hover:text-navy-brand transition-colors text-center leading-tight">
                      {brand}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Blog Teaser ────────────────────────────────────────── */}
        {posts.length > 0 && (
          <FadeInSection>
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-10">
                  <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Car Tips & Guides</h2>
                  <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                  <p className="text-lg text-mid-grey">Expert advice on buying & owning cars in Kenya</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                  {posts.map((post, i) => (
                    <RevealOnScroll key={post._id} delay={i * 0.1}>
                      <BlogCard post={post} />
                    </RevealOnScroll>
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/blog" className="inline-flex items-center gap-2 text-navy-brand font-semibold hover:text-red-brand transition-colors border border-navy-brand/20 px-6 py-3 rounded-xl hover:border-red-brand/30">
                    <BookOpen size={16} />
                    View All Articles
                  </Link>
                </div>
              </div>
            </section>
          </FadeInSection>
        )}

        {/* ── CTA Banner ─────────────────────────────────────────── */}
        <section className="py-16 bg-gradient-to-r from-red-brand to-red-dark">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Ready to Find Your Dream Car?</h2>
            <p className="text-xl text-white/90 mb-10">
              Talk to our team and we&apos;ll help you find exactly what you need
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-brand px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <WhatsAppIcon />
                WhatsApp Us Now
              </a>
              <Link href="/cars" className="inline-flex items-center justify-center gap-2 bg-red-dark border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-brand transition-colors">
                Browse Inventory
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
