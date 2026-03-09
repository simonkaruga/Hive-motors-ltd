'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import CarAnimation from './CarAnimation';
import { Sparkles, TrendingUp } from 'lucide-react';

const HexagonPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03]"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern id="hexagons" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse">
        <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#0A3E66" strokeWidth="1.5" />
        <polygon points="30,54 58,69 58,99 30,114 2,99 2,69" fill="none" stroke="#0A3E66" strokeWidth="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexagons)" />
  </svg>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-grey-soft/30 to-white">
      <HexagonPattern />

      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-gradient-to-br from-red-brand/20 to-red-dark/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-48 -right-48 w-[700px] h-[700px] bg-gradient-to-tl from-navy-brand/15 to-navy-light/10 rounded-full blur-3xl" 
      />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 right-0 z-[15] flex justify-center">
        <CarAnimation />
      </div>

      <div className="relative z-20 text-center px-20 max-w-6xl mx-auto pb-64">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-10 bg-gradient-to-r from-red-brand/10 via-red-brand/8 to-red-brand/10 border border-red-brand/20 rounded-full px-24 py-10 mb-40 backdrop-blur-sm"
        >
          <Sparkles size={18} className="text-red-brand" />
          <span className="text-red-brand text-sm font-bold tracking-wider uppercase">
            Premium Japanese Imports · Nairobi
          </span>
          <TrendingUp size={18} className="text-red-brand" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-7xl md:text-9xl font-display font-bold mb-12 leading-[0.95] tracking-tighter"
        >
          <span className="bg-gradient-to-r from-navy-brand via-navy-light to-navy-brand bg-clip-text text-transparent">
            Dream Cars,
          </span>
          <br />
          <span className="relative inline-block mt-8">
            <span className="bg-gradient-to-r from-red-brand via-red-dark to-red-brand bg-clip-text text-transparent">
              Real Deals!
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-4 left-0 right-0 h-[4px] bg-gradient-to-r from-red-brand to-red-dark origin-left block rounded-full"
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-xl md:text-2xl text-navy-brand/60 mb-56 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Handpicked quality vehicles sourced directly from Japanese auctions —
          delivered to your door in Nairobi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-20 justify-center"
        >
          <Link href="/cars">
            <button className="group relative overflow-hidden bg-gradient-to-r from-red-brand to-red-dark text-white px-40 py-18 rounded-full font-bold text-lg shadow-2xl shadow-red-brand/30 hover:shadow-red-brand/50 transition-all duration-300">
              <span className="relative z-10">Browse Cars</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-dark to-red-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
          <Link href="https://wa.me/254XXXXXXXXX" target="_blank">
            <button className="group px-40 py-18 rounded-full font-bold text-lg border-2 border-navy-brand text-navy-brand hover:bg-navy-brand hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              WhatsApp Us
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-10"
      >
        <span className="text-navy-brand/40 text-xs tracking-widest uppercase font-semibold">Scroll</span>
        <div className="w-6 h-11 border-2 border-navy-brand/25 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-2.5 bg-red-brand rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
