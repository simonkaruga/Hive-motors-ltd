'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) return null;
  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div key={current} className="bg-white border border-navy-brand/10 rounded-2xl p-10 text-center shadow-sm animate-fade-in">
        <Quote className="text-red-brand mx-auto mb-5 opacity-50" size={32} />
        <div className="flex justify-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className={i < t.rating ? 'fill-red-brand text-red-brand' : 'text-navy-brand/15'} />
          ))}
        </div>
        <p className="text-lg text-charcoal/70 italic mb-6 leading-relaxed">&ldquo;{t.review}&rdquo;</p>
        <p className="text-navy-brand font-semibold">{t.customerName}</p>
        <p className="text-charcoal/40 text-sm mt-1">{t.carPurchased}</p>
      </div>

      <button onClick={() => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-navy-brand/30 hover:text-red-brand transition-colors" aria-label="Previous">
        <ChevronLeft size={32} />
      </button>
      <button onClick={() => setCurrent(p => (p + 1) % testimonials.length)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-navy-brand/30 hover:text-red-brand transition-colors" aria-label="Next">
        <ChevronRight size={32} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to testimonial ${i + 1}`}
            className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-red-brand' : 'w-2 h-2 bg-navy-brand/15 hover:bg-navy-brand/30'}`} />
        ))}
      </div>
    </div>
  );
}
