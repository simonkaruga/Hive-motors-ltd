'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ship, Calendar } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import SectionHeader from '@/components/shared/SectionHeader';
import { client } from '@/lib/sanity/client';
import { transitCarsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function OnTransitPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await client.fetch(transitCarsQuery);
        setCars(data);
      } catch (error) {
        console.error('Error fetching transit cars:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <SectionHeader 
          title="Cars On Transit" 
          subtitle="Premium vehicles currently shipping from Japan to Kenya"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-32 mb-48 text-center"
        >
          <Ship className="mx-auto mb-16 text-gold" size={48} />
          <h3 className="text-2xl font-display text-gold mb-12">
            Reserve Your Dream Car Today
          </h3>
          <p className="text-cloud max-w-2xl mx-auto">
            These vehicles are currently being shipped from Japan. Reserve now and be the first to drive 
            when they arrive in Kenya. Contact us for estimated arrival dates and reservation details.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-steel py-64">
            <div className="animate-spin w-48 h-48 border-4 border-gold border-t-transparent rounded-full mx-auto mb-16" />
            <p>Loading transit cars...</p>
          </div>
        ) : cars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-64"
          >
            <p className="text-2xl text-steel mb-16">No cars currently in transit</p>
            <p className="text-steel">Check back soon for new arrivals from Japan</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
            {cars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <CarCard car={car} />
                {car.expectedArrival && (
                  <div className="absolute top-16 right-16 bg-gold text-midnight px-12 py-6 rounded-full text-xs font-medium flex items-center gap-4">
                    <Calendar size={14} />
                    Arrives: {formatDate(car.expectedArrival)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
