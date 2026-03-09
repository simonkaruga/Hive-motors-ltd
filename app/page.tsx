'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, ArrowRight, MessageCircle } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import StatCounter from '@/components/home/StatCounter';
import SectionHeader from '@/components/shared/SectionHeader';
import CarCard from '@/components/cars/CarCard';
import Button from '@/components/ui/Button';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import { client } from '@/lib/sanity/client';
import { featuredCarsQuery, testimonialsQuery } from '@/lib/sanity/queries';
import { Car, Testimonial } from '@/lib/types';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cars, reviews] = await Promise.all([
          client.fetch(featuredCarsQuery),
          client.fetch(testimonialsQuery),
        ]);
        setFeaturedCars(cars);
        setTestimonials(reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="bg-white">
      <HeroSection />

      {/* ── Stats bar — very light grey ───────────────────────────── */}
      <section className="relative py-48 bg-grey-soft overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-navy-brand/8" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-navy-brand/8" />
        <div className="max-w-7xl mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-48">
            <StatCounter end={500} label="Cars Sold" suffix="+" />
            <StatCounter end={450} label="Happy Clients" suffix="+" />
            <StatCounter end={10} label="Years Experience" suffix="+" />
          </div>
        </div>
      </section>

      {/* ── On Transit teaser strip ───────────────────────────────── */}
      <section className="py-32 bg-white border-b border-navy-brand/6">
        <div className="max-w-7xl mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-16 bg-navy-brand/4 border border-navy-brand/10 rounded-xl px-32 py-24"
          >
            <div className="flex items-center gap-16">
              <div className="w-12 h-12 bg-navy-brand/8 rounded-full flex items-center justify-center flex-shrink-0">
                <Ship size={22} className="text-navy-brand" />
              </div>
              <div>
                <p className="text-navy-brand font-semibold text-lg">
                  🚢 Cars Arriving from Japan
                </p>
                <p className="text-charcoal/50 text-sm mt-2">
                  New stock on the way — see what&apos;s in transit right now
                </p>
              </div>
            </div>
            <Link href="/on-transit" className="flex-shrink-0">
              <motion.span
                whileHover={{ x: 4 }}
                className="flex items-center gap-8 text-red-brand font-semibold border border-red-brand/30 rounded-lg px-20 py-12 hover:bg-red-brand hover:text-white transition-all"
              >
                View Transit Cars <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Cars — white ─────────────────────────────────── */}
      <section className="py-96 bg-white">
        <div className="max-w-7xl mx-auto px-16">
          <SectionHeader title="Featured Cars" subtitle="Handpicked premium vehicles from Japan" light />

          {featuredCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-48">
                {featuredCars.map((car) => <CarCard key={car._id} car={car} />)}
              </div>
              <div className="text-center">
                <Link href="/cars"><Button variant="primary">View All Cars</Button></Link>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-48">
                {[
                  { label: 'Toyota Land Cruiser Prado TX', year: 2020, price: '4,500,000' },
                  { label: 'Nissan X-Trail 4WD', year: 2019, price: '2,800,000' },
                  { label: 'Subaru Forester XT', year: 2021, price: '3,200,000' },
                ].map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white border border-navy-brand/8 rounded-xl overflow-hidden shadow-sm"
                  >
                    <div className="h-56 bg-grey-soft flex items-center justify-center border-b border-navy-brand/6">
                      <svg width="80" height="40" viewBox="0 0 120 50" fill="none" className="opacity-15">
                        <rect x="10" y="20" width="100" height="20" rx="4" fill="#0A3E66"/>
                        <rect x="25" y="10" width="70" height="20" rx="4" fill="#0A3E66"/>
                        <circle cx="30" cy="42" r="8" fill="#0A3E66"/>
                        <circle cx="90" cy="42" r="8" fill="#0A3E66"/>
                      </svg>
                    </div>
                    <div className="p-20">
                      <h3 className="text-navy-brand font-semibold mb-8">{p.label}</h3>
                      <div className="flex gap-8 text-charcoal/40 text-sm mb-12">
                        <span>{p.year}</span><span>•</span><span>Auto</span><span>•</span><span>Petrol</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-brand font-mono font-bold text-xl">KSh {p.price}</span>
                        <span className="text-xs text-charcoal/30 border border-navy-brand/10 rounded px-8 py-4">Coming soon</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Link href="/cars"><Button variant="secondary">Browse All Inventory</Button></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Why Choose Us — light grey ────────────────────────────── */}
      <section className="py-96 bg-grey-soft">
        <div className="absolute top-0 left-0 right-0 h-px bg-navy-brand/6" />
        <div className="max-w-7xl mx-auto px-16">
          <SectionHeader title="Why Choose Hive Motors" subtitle="Your trusted partner for premium Japanese imports" light />
          <WhyChooseUs />
        </div>
      </section>

      {/* ── Testimonials — white ──────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-96 bg-white border-t border-navy-brand/8">
          <div className="max-w-7xl mx-auto px-16">
            <SectionHeader title="What Our Clients Say" subtitle="Real reviews from happy customers" light />
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ── Red CTA Banner ────────────────────────────────────────── */}
      <section className="relative py-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-dark via-red-brand to-red-dark" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="hc-cta" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse">
              <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
              <polygon points="30,54 58,69 58,99 30,114 2,99 2,69" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hc-cta)" />
        </svg>

        <div className="relative max-w-4xl mx-auto px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-12">🐝 Dream Cars, Real Deals!</p>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-16 leading-tight">
              Find Your Perfect Japanese Import
            </h2>
            <p className="text-white/70 text-lg mb-40 max-w-2xl mx-auto">
              Talk to our team on WhatsApp and we&apos;ll help you find exactly what you need —
              any budget, any spec, delivered to Nairobi.
            </p>
            <div className="flex flex-col sm:flex-row gap-16 justify-center">
              <a href="https://wa.me/254XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-12 bg-white text-red-brand px-32 py-16 rounded-lg font-bold text-lg hover:bg-white/90 transition-colors shadow-lg">
                <MessageCircle size={22} /> WhatsApp Us Now
              </a>
              <Link href="/cars">
                <button className="inline-flex items-center gap-12 border-2 border-white text-white px-32 py-16 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                  Browse Inventory <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
