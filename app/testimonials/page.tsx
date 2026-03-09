'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ExternalLink } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { client } from '@/lib/sanity/client';
import { testimonialsQuery } from '@/lib/sanity/queries';
import { Testimonial } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await client.fetch(testimonialsQuery);
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
    : '5.0';

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-4">
                Customer Reviews
              </h1>
              <div className="w-16 h-1 bg-red-brand mx-auto mb-4 rounded-full" />

              {/* Rating badge */}
              {testimonials.length > 0 && (
                <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-6 py-3 shadow-sm">
                  <span className="text-4xl font-bold text-navy-brand font-mono">{averageRating}</span>
                  <div className="text-left">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-mid-grey mt-0.5">
                      Based on {testimonials.length}+ reviews
                    </p>
                  </div>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-grey-soft rounded-2xl h-48 animate-pulse" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl font-bold text-navy-brand mb-2">No reviews yet</p>
              <p className="text-mid-grey">Be the first to share your experience with Hive Motors!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <RevealOnScroll key={testimonial._id} delay={(i % 3) * 0.07}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-navy-brand/10 transition-all duration-300 group h-full flex flex-col">
                    {/* Quote icon */}
                    <Quote size={28} className="text-red-brand/20 mb-3" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={16}
                          className={j < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-charcoal text-sm leading-relaxed mb-4 italic flex-1">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>

                    {/* Customer info */}
                    <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-brand/10 rounded-full flex items-center justify-center text-red-brand font-bold text-sm">
                        {testimonial.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-navy-brand text-sm">{testimonial.customerName}</p>
                        <p className="text-mid-grey text-xs">{testimonial.carPurchased}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-16 bg-grey-soft border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <RevealOnScroll>
            <h2 className="text-2xl font-display text-navy-brand mb-3">
              Leave Us a Review on Google
            </h2>
            <p className="text-mid-grey mb-6">
              Your feedback helps other Kenyans find quality cars at honest prices.
            </p>
            <a
              href="https://g.page/r/hivemotors/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-red-dark transition-colors"
            >
              <ExternalLink size={18} />
              Write a Google Review
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
