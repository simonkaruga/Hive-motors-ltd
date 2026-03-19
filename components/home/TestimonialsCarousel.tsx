'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const n = testimonials.length;

  const go = useCallback((dir: number) => {
    setCurrent(c => (c + dir + n) % n);
    setAnimKey(k => k + 1);
  }, [n]);

  useEffect(() => {
    if (paused || n <= 1) return;
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [paused, go, n]);

  const t = testimonials[current];

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative px-10 md:px-14">
        <div key={t._id} className="bg-grey-soft border border-gray-200 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto animate-fade-in">
          <Quote size={40} className="text-red-brand/20 mb-4" />
          <div className="flex gap-1 mb-5">
            {[...Array(5)].map((_, j) => (
              <Star key={j} size={17} className={j < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
            ))}
          </div>
          <p className="text-charcoal text-lg leading-relaxed italic mb-8">&ldquo;{t.review}&rdquo;</p>
          <div className="flex items-center gap-3 pt-5 border-t border-gray-200">
            <div className="w-12 h-12 bg-red-brand/10 rounded-full flex items-center justify-center text-red-brand font-bold text-base shrink-0">
              {t.customerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-navy-brand">{t.customerName}</p>
              <p className="text-mid-grey text-sm">{t.carPurchased}</p>
            </div>
          </div>
        </div>

        <button onClick={() => go(-1)} aria-label="Previous testimonial" className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-red-brand hover:text-red-brand transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => go(1)} aria-label="Next testimonial" className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-red-brand hover:text-red-brand transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-7">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => { setCurrent(i); setAnimKey(k => k + 1); }}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2.5 bg-red-brand' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>

      {!paused && n > 1 && (
        <div className="max-w-2xl mx-auto mt-4 h-0.5 bg-gray-100 rounded-full overflow-hidden px-10 md:px-14">
          <div key={animKey} className="h-full bg-red-brand/40 rounded-full animate-progress-bar" />
        </div>
      )}
    </div>
  );
}
