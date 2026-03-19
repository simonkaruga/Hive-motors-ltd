'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const STATS = [
  { label: 'Cars Sold', end: 500, suffix: '+' },
  { label: 'Happy Clients', end: 450, suffix: '+' },
  { label: 'Years Experience', end: 10, suffix: '+' },
];

const MAKES = ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Land Rover', 'BMW', 'Mercedes', 'Mazda'];
const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Pickup'];

export default function HeroSection() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedBody, setSelectedBody] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();

  // Count-up animation on mount
  useEffect(() => {
    // Only load video on fast connections
    const nav = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
    const isFast = !nav || (!nav.saveData && nav.effectiveType !== 'slow-2g' && nav.effectiveType !== '2g' && nav.effectiveType !== '3g');
    if (isFast) setShowVideo(true);

    const duration = 2500;
    const fps = 60;
    const steps = duration / (1000 / fps);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCounts(STATS.map(s => Math.floor(s.end * eased)));
      if (step >= steps) clearInterval(timer);
    }, 1000 / fps);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedMake) params.set('make', selectedMake);
    if (selectedBody) params.set('bodyType', selectedBody.toLowerCase());
    router.push(`/cars${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[620px]">
      {/* Navy fallback shown until video loads */}
      <div className="absolute inset-0 bg-navy-brand z-0" />

      {/* Background Video */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          aria-hidden="true"
          onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay — always visible over video */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-brand/75 via-navy-brand/55 to-navy-brand/80 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm border border-red-brand/20 px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
            <span className="text-red-brand">🌍 Premium Imported Cars · Nairobi, Kenya</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-white mb-6 leading-tight">
            Dream Cars,{' '}
            <span className="text-red-brand">Real Deals!</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Kenya&apos;s trusted car dealership. Browse hundreds of quality vehicles sourced from around the world.
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearch}
            aria-label="Search cars"
            className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-3 mb-8 max-w-2xl mx-auto shadow-xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="hero-make" className="sr-only">Car Make</label>
              <select
                id="hero-make"
                value={selectedMake}
                onChange={e => setSelectedMake(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-navy-brand font-medium text-sm outline-none cursor-pointer"
              >
                <option value="">Any Make</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <label htmlFor="hero-body" className="sr-only">Body Type</label>
              <select
                id="hero-body"
                value={selectedBody}
                onChange={e => setSelectedBody(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-navy-brand font-medium text-sm outline-none cursor-pointer"
              >
                <option value="">Any Body Type</option>
                {BODY_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-red-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-dark transition-colors whitespace-nowrap"
              >
                <Search size={18} />
                Search Cars
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center bg-red-brand text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-dark transition-colors shadow-lg"
            >
              Browse All Cars
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1A8A4A] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#157a3e] transition-colors shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto pt-8 sm:pt-12 border-t border-white/20">
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-4xl font-bold text-white font-mono tabular-nums">
                  {counts[i]}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
