'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [videoPaused, setVideoPaused] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoPaused(true);
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src.replace('autoplay=1', 'autoplay=0');
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <iframe
          ref={iframeRef}
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/HVf28fVK5Xk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=0&modestbranding=1&playsinline=1"
          allow="autoplay"
          title="Hive Motors Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-brand/70 via-navy-brand/50 to-navy-brand/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/90 backdrop-blur-sm border border-red-brand/20 px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
            <span className="text-red-brand">🇯🇵 Premium Japanese Imports · Nairobi, Kenya</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-display font-normal text-white mb-6 leading-tight">
            Dream Cars,{' '}
            <span className="text-red-brand">Real Deals!</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Kenya's finest Japanese import dealership. Browse hundreds of quality vehicles sourced directly from Japan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center bg-red-brand text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-red-dark transition-colors shadow-lg"
            >
              <Search size={20} className="mr-2" />
              Browse Inventory
            </Link>
            <a
              href="https://wa.me/254722800436"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-navy-brand border-2 border-navy-brand px-8 py-4 rounded-md font-semibold text-lg hover:bg-navy-brand hover:text-white transition-colors"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-white/20">
            <div>
              <div className="text-4xl font-bold text-white font-mono">500+</div>
              <div className="text-sm text-white/80 mt-2">Cars Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white font-mono">450+</div>
              <div className="text-sm text-white/80 mt-2">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white font-mono">10+</div>
              <div className="text-sm text-white/80 mt-2">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
