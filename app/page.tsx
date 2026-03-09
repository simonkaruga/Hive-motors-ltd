'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ship, ArrowRight, MessageCircle, Search, CheckCircle, Truck, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import StatCounter from '@/components/home/StatCounter';
import SectionHeader from '@/components/shared/SectionHeader';
import CarCard from '@/components/cars/CarCard';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { client } from '@/lib/sanity/client';
import { featuredCarsQuery, testimonialsQuery } from '@/lib/sanity/queries';
import { Car, Testimonial } from '@/lib/types';

// Inline testimonial carousel styled for light bg
function LightTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);
  const next = () => setCurrent(p => (p + 1) % testimonials.length);
  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', boxShadow: '0 20px 60px rgba(10,62,102,0.08), 0 4px 16px rgba(10,62,102,0.05)', border: '1px solid rgba(10,62,102,0.06)' }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-brand via-red-brand to-transparent opacity-60" />
        <div className="p-48 text-center">
          <Quote className="text-red-brand mx-auto mb-20 opacity-40" size={36} />
          <div className="flex justify-center gap-4 mb-20">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className={i < t.rating ? 'fill-red-brand text-red-brand' : 'text-navy-brand/15'} />
            ))}
          </div>
          <p className="text-xl text-charcoal/70 italic mb-28 leading-relaxed">&ldquo;{t.review}&rdquo;</p>
          <div className="w-8 h-8 rounded-full bg-red-brand text-white text-sm font-bold flex items-center justify-center mx-auto mb-12">
            {t.customerName[0]}
          </div>
          <p className="text-navy-brand font-bold text-lg">{t.customerName}</p>
          <p className="text-charcoal/40 text-sm mt-4">{t.carPurchased}</p>
        </div>
      </div>
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 w-12 h-12 rounded-full flex items-center justify-center border border-navy-brand/10 bg-white text-navy-brand/40 hover:text-red-brand hover:border-red-brand/30 transition-all shadow-sm" aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 w-12 h-12 rounded-full flex items-center justify-center border border-navy-brand/10 bg-white text-navy-brand/40 hover:text-red-brand hover:border-red-brand/30 transition-all shadow-sm" aria-label="Next">
        <ChevronRight size={20} />
      </button>
      <div className="flex justify-center gap-8 mt-28">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-24 h-8 bg-red-brand shadow-[0_0_8px_rgba(218,29,23,0.4)]' : 'w-8 h-8 bg-navy-brand/10 hover:bg-navy-brand/25'}`}
            aria-label={`Testimonial ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// Placeholder car card for no-CMS state
function PlaceholderCard({ p, i }: { p: { label: string; year: number; price: string; badge: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.55 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl overflow-hidden border border-navy-brand/8 bg-white transition-all duration-300 hover:shadow-[0_20px_60px_rgba(10,62,102,0.1),0_4px_16px_rgba(218,29,23,0.05)] hover:border-navy-brand/15"
    >
      {/* Image placeholder */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-grey-soft to-[#e4eaf0] flex items-center justify-center">
        <svg width="120" height="56" viewBox="0 0 180 72" fill="none" className="opacity-20">
          <path d="M 4,52 L 3,42 Q 10,28 28,20 L 52,12 Q 62,6 80,6 L 130,6 Q 144,6 154,18 L 166,34 Q 172,44 174,52 Z" fill="#0A3E66" />
          <path d="M 60,12 Q 68,4 88,3 L 122,3 Q 136,3 146,14 L 158,28 L 60,28 Z" fill="#041a30" />
          <circle cx="44" cy="56" r="16" fill="#0A3E66" />
          <circle cx="136" cy="56" r="16" fill="#0A3E66" />
        </svg>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        {/* Badge */}
        <div className="absolute top-12 left-12 bg-navy-brand text-white text-xs font-bold px-12 py-6 rounded-lg">{p.badge}</div>
      </div>

      {/* Card body */}
      <div className="p-24">
        <div className="flex items-center gap-8 text-xs text-charcoal/40 mb-8">
          <span className="bg-grey-soft px-8 py-4 rounded font-mono">{p.year}</span>
          <span>Auto</span><span>•</span><span>Petrol</span>
        </div>
        <h3 className="font-semibold text-navy-brand text-lg mb-16 group-hover:text-red-brand transition-colors leading-snug">{p.label}</h3>
        <div className="flex items-center justify-between pt-16 border-t border-navy-brand/6">
          <div>
            <div className="text-xs text-charcoal/40 mb-2">Starting from</div>
            <div className="text-red-brand font-mono font-bold text-xl">KSh {p.price}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-brand/8 flex items-center justify-center group-hover:bg-red-brand transition-colors">
            <ArrowRight size={16} className="text-red-brand group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const processSteps = [
  { icon: Search, num: '01', title: 'Browse & Choose', desc: 'Browse our curated inventory or tell us exactly what you want — make, model, year, budget.' },
  { icon: Ship, num: '02', title: 'We Source in Japan', desc: 'Our agents bid at top Japanese auctions like USS and JAA to find your perfect match.' },
  { icon: CheckCircle, num: '03', title: 'Clear & Inspect', desc: 'We handle all KRA clearance, port logistics, and inspection so you never have to.' },
  { icon: Truck, num: '04', title: 'Delivered to You', desc: 'Your car is delivered to your door in Nairobi — registration-ready.' },
];

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

  const placeholderCars = [
    { label: 'Toyota Land Cruiser Prado TX', year: 2020, price: '4,500,000', badge: 'In Stock' },
    { label: 'Nissan X-Trail 4WD T32', year: 2019, price: '2,800,000', badge: 'Popular' },
    { label: 'Subaru Forester XT Turbo', year: 2021, price: '3,200,000', badge: 'New Arrival' },
  ];

  return (
    <main>
      {/* ──────────────────────────────── HERO (DARK) */}
      <HeroSection />

      {/* ──────────────────────────────── STATS (DARK, seamless) */}
      <section className="relative py-64 overflow-hidden" style={{ background: 'linear-gradient(180deg, #080f1e 0%, #050c18 100%)' }}>
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(218,29,23,0.4), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }} />

        <div className="max-w-5xl mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { end: 500, suffix: '+', label: 'Cars Sold', desc: 'Delivered across Kenya' },
              { end: 450, suffix: '+', label: 'Happy Clients', desc: 'And counting daily' },
              { end: 10,  suffix: '+', label: 'Years Experience', desc: 'In Japanese imports' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`text-center py-32 ${i > 0 ? 'border-l border-white/6' : ''}`}
              >
                <StatCounter end={s.end} label={s.label} suffix={s.suffix} dark />
                <p className="text-white/25 text-xs mt-8">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── IN TRANSIT BANNER */}
      <section className="py-32 bg-white border-b border-navy-brand/6">
        <div className="max-w-7xl mx-auto px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-16 rounded-2xl px-32 py-24"
            style={{ background: 'linear-gradient(135deg, rgba(10,62,102,0.04) 0%, rgba(218,29,23,0.02) 100%)', border: '1px solid rgba(10,62,102,0.08)' }}
          >
            <div className="flex items-center gap-16">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(10,62,102,0.1), rgba(10,62,102,0.05))' }}>
                <Ship size={22} className="text-navy-brand" />
              </div>
              <div>
                <p className="text-navy-brand font-bold text-lg">🚢 Cars En Route from Japan</p>
                <p className="text-charcoal/50 text-sm mt-2">New stock arriving soon — reserve yours before it lands</p>
              </div>
            </div>
            <Link href="/on-transit" className="flex-shrink-0">
              <motion.span
                whileHover={{ x: 4 }}
                className="flex items-center gap-8 text-red-brand font-bold border border-red-brand/25 rounded-xl px-24 py-12 hover:bg-red-brand hover:text-white transition-all text-sm"
              >
                View Transit Cars <ArrowRight size={14} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────── FEATURED CARS (LIGHT) */}
      <section className="py-96 bg-white">
        <div className="max-w-7xl mx-auto px-16">
          <SectionHeader title="Featured Cars" subtitle="Handpicked premium vehicles sourced directly from Japan" light />

          {featuredCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-48">
                {featuredCars.map((car) => <CarCard key={car._id} car={car} />)}
              </div>
              <div className="text-center">
                <Link href="/cars">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-12 bg-red-brand text-white px-40 py-16 rounded-xl font-bold text-base transition-all"
                    style={{ boxShadow: '0 8px 30px rgba(218,29,23,0.3)' }}>
                    View All Cars <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-48">
                {placeholderCars.map((p, i) => <PlaceholderCard key={i} p={p} i={i} />)}
              </div>
              <div className="text-center">
                <Link href="/cars">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-12 border-2 border-navy-brand text-navy-brand px-40 py-16 rounded-xl font-bold text-base hover:bg-navy-brand hover:text-white transition-all">
                    Browse All Inventory <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ──────────────────────────────── HOW IT WORKS (DARK) */}
      <section className="relative py-96 overflow-hidden" style={{ background: 'linear-gradient(160deg, #060e1c 0%, #050a16 100%)' }}>
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        {/* Background grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="process-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#process-grid)" />
        </svg>

        {/* Red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(ellipse, #DA1D17 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-16">
          <SectionHeader
            title="How We Work"
            subtitle="From Japan to your driveway — a seamless process built around you"
          />

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px hidden lg:block"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(218,29,23,0.3), rgba(218,29,23,0.3), rgba(218,29,23,0.3), transparent)' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-16 h-16 rounded-full flex items-center justify-center mb-24 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(218,29,23,0.15), rgba(218,29,23,0.05))',
                      border: '1px solid rgba(218,29,23,0.3)',
                      boxShadow: '0 0 0 4px rgba(218,29,23,0.05)',
                    }}
                  >
                    <step.icon className="text-red-brand" size={28} />
                    {/* Step number */}
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-red-brand text-white text-xs font-bold flex items-center justify-center"
                      style={{ boxShadow: '0 0 10px rgba(218,29,23,0.5)' }}>
                      {i + 1}
                    </div>
                  </motion.div>

                  <h3 className="text-white font-bold text-lg mb-12 group-hover:text-red-brand/90 transition-colors">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────── WHY CHOOSE US (DARK) */}
      <section className="relative py-96 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050a16 0%, #07101f 100%)' }}>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        {/* Navy glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #0A3E66 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-16">
          <SectionHeader
            title="Why Choose Hive Motors"
            subtitle="Your trusted partner for premium Japanese imports since day one"
          />
          <WhyChooseUs />
        </div>
      </section>

      {/* ──────────────────────────────── TESTIMONIALS (LIGHT) */}
      {testimonials.length > 0 && (
        <section className="py-96 bg-grey-soft">
          <div className="max-w-7xl mx-auto px-16">
            <SectionHeader title="What Our Clients Say" subtitle="Real stories from real customers across Nairobi" light />
            <LightTestimonials testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* ──────────────────────────────── CTA BANNER (DRAMATIC RED) */}
      <section className="relative py-96 overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #8b0000 0%, #DA1D17 40%, #c41e15 60%, #8b0000 100%)' }} />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <pattern id="cta-hex" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse">
                <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                <polygon points="30,54 58,69 58,99 30,114 2,99 2,69" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-hex)" />
          </svg>
        </div>
        {/* Light streak */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {/* Top label */}
            <div className="inline-flex items-center gap-8 bg-white/10 border border-white/20 rounded-full px-20 py-8 mb-24">
              <span>🐝</span>
              <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Dream Cars, Real Deals!</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-display text-white mb-20 leading-tight" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
              Find Your Perfect<br />Japanese Import
            </h2>
            <p className="text-white/75 text-xl mb-48 max-w-2xl mx-auto leading-relaxed">
              Talk to our team on WhatsApp and we&apos;ll help you find exactly what you need —
              any budget, any spec, delivered to <strong className="text-white">Nairobi</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-16 justify-center">
              <a href="https://wa.me/254XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-12 bg-white text-red-brand px-40 py-18 rounded-xl font-extrabold text-lg shadow-2xl transition-all"
                >
                  <MessageCircle size={22} /> WhatsApp Us Now
                </motion.button>
              </a>
              <Link href="/cars">
                <motion.button
                  whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-12 border-2 border-white/50 text-white px-40 py-18 rounded-xl font-bold text-lg transition-all"
                >
                  Browse Inventory <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
