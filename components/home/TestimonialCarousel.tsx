'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  if (!testimonials.length) return null;

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-40 text-center"
        >
          <Quote className="text-red-brand mx-auto mb-20 opacity-60" size={32} />
          <div className="flex justify-center gap-4 mb-20">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < testimonials[current].rating
                  ? 'fill-red-brand text-red-brand'
                  : 'text-white/20'}
              />
            ))}
          </div>
          <p className="text-lg text-white/80 italic mb-24 leading-relaxed">
            &ldquo;{testimonials[current].review}&rdquo;
          </p>
          <p className="text-white font-semibold">{testimonials[current].customerName}</p>
          <p className="text-white/40 text-sm mt-4">{testimonials[current].carPurchased}</p>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white/40 hover:text-red-brand transition-colors" aria-label="Previous">
        <ChevronLeft size={32} />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white/40 hover:text-red-brand transition-colors" aria-label="Next">
        <ChevronRight size={32} />
      </button>

      <div className="flex justify-center gap-8 mt-24">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'w-24 h-8 bg-red-brand' : 'w-8 h-8 bg-white/20 hover:bg-white/40'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
