'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import CarAnimation from './CarAnimation';

// Very subtle hexagon pattern on light background
const HexagonPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.04]"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern id="hexagons" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse">
        <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#0A3E66" strokeWidth="1.5" />
        <polygon points="30,54 58,69 58,99 30,114 2,99 2,69" fill="none" stroke="#0A3E66" strokeWidth="1.5" />
        <polygon points="-30,2 -2,17 -2,47 -30,62 -58,47 -58,17" fill="none" stroke="#0A3E66" strokeWidth="1.5" />
        <polygon points="90,2 118,17 118,47 90,62 62,47 62,17" fill="none" stroke="#0A3E66" strokeWidth="1.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexagons)" />
  </svg>
);

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Very subtle hexagon pattern */}
      <HexagonPattern />

      {/* Soft red glow top-left */}
      <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-red-brand/5 rounded-full blur-3xl" />

      {/* Soft navy glow bottom-right */}
      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-navy-brand/5 rounded-full blur-3xl" />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-grey-soft to-transparent z-10" />

      {/* 2D driving car */}
      <div className="absolute bottom-0 left-0 right-0 z-[15] flex justify-center">
        <CarAnimation />
      </div>

      {/* Hero content */}
      <div className="relative z-20 text-center px-16 max-w-5xl mx-auto pb-48">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-8 bg-red-brand/8 border border-red-brand/20 rounded-full px-20 py-8 mb-32"
        >
          <span className="text-base">🇯🇵</span>
          <span className="text-red-brand text-sm font-semibold tracking-widest uppercase">
            Premium Japanese Imports · Nairobi, Kenya
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-6xl md:text-8xl font-display text-navy-brand mb-8 leading-[1.1] tracking-tight"
        >
          Dream Cars,{' '}
          <span className="text-red-brand relative">
            Real Deals!
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-brand origin-left block"
            />
          </span>
        </motion.h1>

        {/* Red divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-20 h-[2px] bg-red-brand mx-auto mb-24 origin-center"
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-charcoal/55 mb-48 max-w-xl mx-auto leading-relaxed"
        >
          Handpicked quality vehicles sourced directly from Japanese auctions —
          delivered to your door in Nairobi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-16 justify-center"
        >
          <Link href="/cars">
            <Button variant="primary">Browse Cars</Button>
          </Link>
          <Link href="https://wa.me/254XXXXXXXXX" target="_blank">
            <Button variant="secondary">WhatsApp Us</Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-8"
      >
        <span className="text-charcoal/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-navy-brand/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-red-brand rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
