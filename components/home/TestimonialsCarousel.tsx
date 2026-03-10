'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
}

const VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? '55%' : '-55%',
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-55%' : '55%',
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.22 },
  }),
};

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent(c => (c + dir + n) % n);
    },
    [n]
  );

  // Auto-advance every 5 s, pause on hover
  useEffect(() => {
    if (paused || n <= 1) return;
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [paused, go, n]);

  const t = testimonials[current];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Card area with side padding for arrows */}
      <div className="relative px-10 md:px-14 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={t._id}
            custom={direction}
            variants={VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-grey-soft border border-gray-200 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto"
          >
            {/* Big quote icon */}
            <Quote size={40} className="text-red-brand/20 mb-4" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  size={17}
                  className={j < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                />
              ))}
            </div>

            {/* Review text */}
            <p className="text-charcoal text-lg leading-relaxed italic mb-8">
              &ldquo;{t.review}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-gray-200">
              <div className="w-12 h-12 bg-red-brand/10 rounded-full flex items-center justify-center text-red-brand font-bold text-base shrink-0">
                {t.customerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-navy-brand">{t.customerName}</p>
                <p className="text-mid-grey text-sm">{t.carPurchased}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-red-brand hover:text-red-brand transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-red-brand hover:text-red-brand transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-7">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-7 h-2.5 bg-red-brand'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Progress bar — resets on each slide */}
      {!paused && n > 1 && (
        <div className="max-w-2xl mx-auto mt-4 h-0.5 bg-gray-100 rounded-full overflow-hidden px-10 md:px-14">
          <motion.div
            key={current}
            className="h-full bg-red-brand/40 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  );
}
