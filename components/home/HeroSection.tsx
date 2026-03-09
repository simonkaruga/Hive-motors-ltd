'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import HeroCar from './HeroCar';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #04090f 0%, #061224 50%, #080f1e 100%)' }}
    >
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,79,130,0.25) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }} />
      <div className="absolute bottom-0 right-[20%] w-[500px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(218,29,23,0.18) 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,79,130,0.12) 0%, transparent 70%)' }} />

      {/* Red corner accent lines */}
      <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-red-brand to-transparent" />
      <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-red-brand to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-16 w-full pt-80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center min-h-[calc(100vh-80px)]">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center py-64 lg:py-0">

            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-10 self-start mb-32 border border-red-brand/25 bg-red-brand/8 rounded-full px-20 py-10"
            >
              <span className="w-2 h-2 rounded-full bg-red-brand" style={{ boxShadow: '0 0 6px #DA1D17' }} />
              <span className="text-red-brand text-xs font-bold tracking-[0.2em] uppercase">
                Premium Japanese Imports
              </span>
              <span className="text-lg">🇯🇵</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="font-display leading-[0.92] tracking-tight mb-24 text-white"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
            >
              Dream Cars,
              <br />
              <span className="relative">
                <span className="text-red-brand" style={{ textShadow: '0 0 40px rgba(218,29,23,0.5)' }}>Real</span>
                {' '}
                <span className="text-white">Deals.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-3 left-0 right-0 h-[3px] origin-left block"
                  style={{ background: 'linear-gradient(90deg, #DA1D17, #ff4444, #DA1D17)' }}
                />
              </span>
            </motion.h1>

            {/* Red divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="w-16 h-[2px] mb-24 origin-left"
              style={{ background: 'linear-gradient(90deg, #DA1D17, transparent)' }}
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/50 text-lg leading-relaxed mb-40 max-w-md"
            >
              Handpicked quality vehicles sourced directly from Japanese auctions —{' '}
              <span className="text-white/75">delivered to your door in Nairobi, Kenya.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-16 mb-48"
            >
              <Link href="/cars">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(218,29,23,0.65)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-12 bg-red-brand text-white px-32 py-16 rounded-lg font-bold text-base transition-all"
                  style={{ boxShadow: '0 0 30px rgba(218,29,23,0.4)' }}
                >
                  Browse Cars <ArrowRight size={18} />
                </motion.button>
              </Link>
              <a href="https://wa.me/254XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-12 border border-white/20 text-white px-32 py-16 rounded-lg font-semibold text-base transition-all"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <MessageCircle size={18} /> WhatsApp Us
                </motion.button>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-32 pt-32 border-t border-white/8"
            >
              {[
                { value: '500+', label: 'Cars Sold' },
                { value: '450+', label: 'Happy Clients' },
                { value: '10+',  label: 'Years Exp.' },
              ].map((s, i) => (
                <div key={i} className={i > 0 ? 'pl-32 border-l border-white/8' : ''}>
                  <div className="text-2xl font-display font-bold text-red-brand" style={{ textShadow: '0 0 20px rgba(218,29,23,0.4)' }}>
                    {s.value}
                  </div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mt-2">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Car ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* "Direct from Japan" floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 }}
              className="absolute top-0 right-0 flex items-center gap-8 rounded-full px-16 py-8 z-10"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            >
              <span>🇯🇵</span>
              <span className="text-white/60 text-xs font-medium">Direct from Japan</span>
            </motion.div>

            {/* Glow ring behind car */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #0A3E66 0%, transparent 70%)' }} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full max-w-[740px]"
            >
              <HeroCar />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-8"
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border border-white/15 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="w-1 h-2 bg-red-brand rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
