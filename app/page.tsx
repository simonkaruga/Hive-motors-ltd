'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Ship, Shield, Award, Zap, Users, Search, Anchor, Truck, Star, Quote, ArrowRight, BookOpen, Clock } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import CarCard from '@/components/cars/CarCard';
import BlogCard from '@/components/blog/BlogCard';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import PageLoader from '@/components/shared/PageLoader';
import StaggerItem from '@/components/shared/StaggerItem';
import FadeInSection from '@/components/shared/FadeInSection';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { client } from '@/lib/sanity/client';
import { featuredCarsQuery, homepageTestimonialsQuery, homepagePostsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';

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
  {
    num: '01',
    icon: Search,
    title: 'Browse or Request',
    desc: 'Search our inventory or tell us your exact specs — make, model, year, and budget.',
  },
  {
    num: '02',
    icon: Anchor,
    title: 'We Source from Japan',
    desc: 'Our agents bid at trusted Japanese auctions on your behalf, securing the best price.',
  },
  {
    num: '03',
    icon: Ship,
    title: 'Shipped & Cleared',
    desc: 'Your car sails from Japan and we handle all customs clearance in Nairobi.',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Drive Away',
    desc: 'Pick up your fully cleared, roadworthy car — ready for registration.',
  },
];

const BRANDS = [
  'Toyota', 'Nissan', 'Honda', 'Subaru',
  'Land Rover', 'BMW', 'Mercedes-Benz', 'Mazda',
  'Mitsubishi', 'Lexus',
];

const FALLBACK_TESTIMONIALS: HomeTestimonial[] = [
  {
    _id: 'f1',
    customerName: 'James Kamau',
    rating: 5,
    review: 'Excellent service! Got my Toyota Prado in perfect condition. Hive Motors made the whole import process seamless and stress-free.',
    carPurchased: 'Toyota Land Cruiser Prado',
  },
  {
    _id: 'f2',
    customerName: 'Sarah Wanjiru',
    rating: 5,
    review: 'Very professional team. They found me exactly the Subaru Forester I wanted within my budget. Highly recommend to anyone!',
    carPurchased: 'Subaru Forester XT',
  },
  {
    _id: 'f3',
    customerName: 'David Mwangi',
    rating: 5,
    review: 'Transparent pricing, no hidden costs. My Range Rover arrived in pristine condition. Will definitely use Hive Motors again.',
    carPurchased: 'Range Rover Sport',
  },
];

// Static featured cars (shown while Sanity loads or as always-visible picks)
const pradoCar: Car = {
  _id: 'prado-static',
  title: '2020 Toyota Prado TX-L J150',
  slug: { current: 'prado-static' },
  status: 'available',
  price: 7250000,
  year: 2020,
  make: 'Toyota',
  model: 'Land Cruiser Prado TX-L',
  mileage: 68000,
  transmission: 'automatic',
  fuelType: 'diesel',
  engine: '2.8L Turbocharged',
  bodyType: 'suv',
  driveType: '4wd',
  colour: 'Blue',
  images: [
    { asset: { url: '/cars/prado/prado-01.jpg' }, alt: 'Prado Side View' },
    { asset: { url: '/cars/prado/prado-02.jpg' }, alt: 'Prado Front' },
    { asset: { url: '/cars/prado/prado-03.jpg' }, alt: 'Prado Interior' },
    { asset: { url: '/cars/prado/prado-04.jpg' }, alt: 'Prado Rear' },
    { asset: { url: '/cars/prado/prado-05.jpg' }, alt: 'Prado Detail' },
  ],
  description: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: '2800cc turbocharged diesel 3DA engine with 6 Speed Automatic Transmission. Stunning Blue Prado, 68k kms, 4WD, 7 Black Leather Seats with Electric adjustment.' }],
    },
  ],
  features: ['2800cc Turbocharged Diesel', '6-Speed Automatic', '4WD', '7 Leather Seats', 'Electric Seats', 'Dual Zone Climate', '360° Camera', 'Cruise Control'],
  isFeatured: true,
  _createdAt: new Date().toISOString(),
};

const rangeRoverCar: Car = {
  _id: 'range-rover-static',
  title: '2019 Range Rover Sport HSE',
  slug: { current: 'range-rover-static' },
  status: 'available',
  price: 9750000,
  year: 2019,
  make: 'Land Rover',
  model: 'Range Rover Sport HSE',
  mileage: 72000,
  transmission: 'automatic',
  fuelType: 'diesel',
  engine: '3.0L Turbocharged',
  bodyType: 'suv',
  driveType: '4wd',
  colour: 'Beige',
  images: [
    { asset: { url: '/cars/range-rover/range-rover-01.jpg' }, alt: 'Range Rover Side' },
    { asset: { url: '/cars/range-rover/range-rover-02.jpg' }, alt: 'Range Rover Front' },
    { asset: { url: '/cars/range-rover/range-rover-03.jpg' }, alt: 'Range Rover Interior' },
    { asset: { url: '/cars/range-rover/range-rover-04.jpg' }, alt: 'Range Rover Rear' },
    { asset: { url: '/cars/range-rover/range-rover-05.jpg' }, alt: 'Range Rover Detail' },
  ],
  description: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: '3.0L turbocharged diesel, 8-Speed Automatic, panoramic sunroof, HUD, BSM, digital cluster.' }],
    },
  ],
  features: ['3.0L Turbocharged Diesel', '8-Speed Automatic', 'Panoramic Sunroof', 'HUD', 'BSM', 'Digital Cluster', 'Memory Seats', 'Cruise Control'],
  isFeatured: true,
  _createdAt: new Date().toISOString(),
};

const gleCar: Car = {
  _id: 'gle-static',
  title: '2019 Mercedes-Benz GLE400d AMG-Line',
  slug: { current: 'gle-static' },
  status: 'available',
  price: 12750000,
  year: 2019,
  make: 'Mercedes-Benz',
  model: 'GLE400d AMG-Line',
  mileage: 50000,
  transmission: 'automatic',
  fuelType: 'diesel',
  engine: '3.0L Turbocharged',
  bodyType: 'suv',
  driveType: '4wd',
  colour: 'Black',
  images: [
    { asset: { url: '/cars/gle/gle-01.jpg' }, alt: 'GLE Side' },
    { asset: { url: '/cars/gle/gle-02.jpg' }, alt: 'GLE Front' },
    { asset: { url: '/cars/gle/gle-03.jpg' }, alt: 'GLE Interior' },
    { asset: { url: '/cars/gle/gle-04.jpg' }, alt: 'GLE Rear' },
    { asset: { url: '/cars/gle/gle-05.jpg' }, alt: 'GLE Detail' },
  ],
  description: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: '330 BHP, 700nm torque, panoramic sunroof, 13-speaker Burmester sound, Apple CarPlay.' }],
    },
  ],
  features: ['9G-Tronic Automatic', '330 BHP', 'Panoramic Sunroof', 'Burmester Sound', 'Apple CarPlay', '360° Camera', 'AMG Wheels'],
  isFeatured: true,
  _createdAt: new Date().toISOString(),
};

const cx5Car: Car = {
  _id: 'cx5-static',
  title: '2019 Mazda CX-5 AWD 2.5T',
  slug: { current: 'cx5-static' },
  status: 'available',
  price: 3400000,
  year: 2019,
  make: 'Mazda',
  model: 'CX-5 AWD 2.5T',
  mileage: 86000,
  transmission: 'automatic',
  fuelType: 'petrol',
  engine: '2.5L Turbocharged',
  bodyType: 'suv',
  driveType: 'awd',
  colour: 'Black',
  images: [
    { asset: { url: '/cars/cx5/cx5-01.jpg' }, alt: 'CX-5 Side' },
    { asset: { url: '/cars/cx5/cx5-02.jpg' }, alt: 'CX-5 Front' },
    { asset: { url: '/cars/cx5/cx5-03.jpg' }, alt: 'CX-5 Interior' },
    { asset: { url: '/cars/cx5/cx5-04.jpg' }, alt: 'CX-5 Rear' },
    { asset: { url: '/cars/cx5/cx5-05.jpg' }, alt: 'CX-5 Detail' },
  ],
  description: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: '228 BHP, 420nm torque, HUD, 360° camera, BSM, LDW, 5 black leather seats.' }],
    },
  ],
  features: ['6-Speed Automatic', '228 BHP', 'HUD', '360° Camera', 'BSM', 'LDW', 'Seat Warmers', 'Xenon Headlights'],
  isFeatured: true,
  _createdAt: new Date().toISOString(),
};

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [testimonials, setTestimonials] = useState<HomeTestimonial[]>([]);
  const [posts, setPosts] = useState<HomePost[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cars, reviews, blogPosts] = await Promise.all([
          client.fetch(featuredCarsQuery),
          client.fetch(homepageTestimonialsQuery),
          client.fetch(homepagePostsQuery),
        ]);
        setFeaturedCars(cars);
        setTestimonials(reviews);
        setPosts(blogPosts);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        // Static cars still display — no error state needed on homepage
      }
    }
    fetchData();
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <>
      <PageLoader />
      <main className="bg-white">

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
                  <p className="font-semibold text-navy-brand">🚢 Cars Arriving from Japan</p>
                  <p className="text-sm text-mid-grey">New stock on the way — see what&apos;s in transit</p>
                </div>
              </div>
              <Link
                href="/on-transit"
                className="bg-navy-brand text-white px-6 py-2.5 rounded-md font-medium hover:bg-navy-dark transition-colors whitespace-nowrap"
              >
                View Transit Cars
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured Cars ──────────────────────────────────────── */}
        <FadeInSection>
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Featured Cars</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <p className="text-lg text-mid-grey">Handpicked premium vehicles from Japan</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <StaggerItem index={0}><CarCard car={pradoCar} /></StaggerItem>
                <StaggerItem index={1}><CarCard car={rangeRoverCar} /></StaggerItem>
                <StaggerItem index={2}><CarCard car={gleCar} /></StaggerItem>
                <StaggerItem index={3}><CarCard car={cx5Car} /></StaggerItem>
                {featuredCars.map((car, idx) => (
                  <StaggerItem key={car._id} index={idx + 4}>
                    <CarCard car={car} />
                  </StaggerItem>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-red-dark transition-colors"
                >
                  View All Cars
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ── How It Works ───────────────────────────────────────── */}
        <FadeInSection>
          <section className="py-20 bg-navy-brand">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-display text-white mb-4">How It Works</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <p className="text-lg text-white/70">From Japan to your driveway in 4 simple steps</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {HOW_IT_WORKS.map((step, i) => (
                  <RevealOnScroll key={step.num} delay={i * 0.1}>
                    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                      {/* Connector line */}
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
                  href="https://wa.me/254722800436?text=Hi%20Hive%20Motors!%20I%27d%20like%20to%20know%20more%20about%20how%20the%20import%20process%20works."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1ebe5b] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Ask Us How It Works
                </a>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* ── Why Choose Us ──────────────────────────────────────── */}
        <FadeInSection>
          <section className="py-20 bg-grey-soft">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Why Choose Hive Motors</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <p className="text-lg text-mid-grey">Your trusted partner for Japanese imports</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Shield, title: 'Quality Assured', desc: 'Every vehicle thoroughly inspected before import' },
                  { icon: Award, title: 'Direct Import', desc: 'Sourced directly from trusted Japanese auctions' },
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
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">What Our Clients Say</h2>
                <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-mid-grey">Trusted by 450+ happy customers across Kenya</p>
              </div>

              <TestimonialsCarousel testimonials={displayTestimonials} />

              <div className="text-center mt-10">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 text-navy-brand font-semibold hover:text-red-brand transition-colors border border-navy-brand/20 px-6 py-3 rounded-xl hover:border-red-brand/30"
                >
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
            <p className="text-center text-sm font-semibold text-mid-grey uppercase tracking-widest mb-8">
              Brands We Import
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {BRANDS.map(brand => (
                <Link
                  key={brand}
                  href={`/cars?make=${brand}`}
                  className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-navy-brand font-semibold text-sm hover:bg-navy-brand hover:text-white hover:border-navy-brand transition-all duration-200 shadow-sm"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Blog Teaser ────────────────────────────────────────── */}
        {posts.length > 0 && (
          <FadeInSection>
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">Car Tips & Guides</h2>
                  <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />
                  <p className="text-lg text-mid-grey">Expert advice on Japanese cars in Kenya</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                  {posts.map((post, i) => (
                    <RevealOnScroll key={post._id} delay={i * 0.1}>
                      <BlogCard post={post} />
                    </RevealOnScroll>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-navy-brand font-semibold hover:text-red-brand transition-colors border border-navy-brand/20 px-6 py-3 rounded-xl hover:border-red-brand/30"
                  >
                    <BookOpen size={16} />
                    View All Articles
                  </Link>
                </div>
              </div>
            </section>
          </FadeInSection>
        )}

        {/* ── CTA Banner ─────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-r from-red-brand to-red-dark">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Ready to Find Your Dream Car?</h2>
            <p className="text-xl text-white/90 mb-10">
              Talk to our team and we&apos;ll help you find exactly what you need
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/254722800436"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-brand px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>
              <Link
                href="/cars"
                className="inline-flex items-center justify-center gap-2 bg-red-dark border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-brand transition-colors"
              >
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
