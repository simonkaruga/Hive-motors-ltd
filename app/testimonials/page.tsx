'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import { client } from '@/lib/sanity/client';
import { testimonialsQuery } from '@/lib/sanity/queries';
import { Testimonial } from '@/lib/types';

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

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <SectionHeader 
          title="Customer Reviews" 
          subtitle="Hear from our happy clients who found their dream cars"
        />

        {loading ? (
          <div className="text-center text-steel py-64">
            <div className="animate-spin w-48 h-48 border-4 border-gold border-t-transparent rounded-full mx-auto mb-16" />
            <p>Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-64">
            <p className="text-2xl text-steel">No testimonials yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-cloud/5 border border-gold/20 rounded-lg p-24"
              >
                <div className="flex gap-4 mb-16">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? 'fill-gold text-gold' : 'text-steel'}
                    />
                  ))}
                </div>
                <p className="text-cloud mb-16 italic">"{testimonial.review}"</p>
                <div className="border-t border-gold/10 pt-16">
                  <p className="text-gold font-semibold">{testimonial.customerName}</p>
                  <p className="text-steel text-sm">{testimonial.carPurchased}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
