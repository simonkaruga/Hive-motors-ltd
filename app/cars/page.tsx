'use client';

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import FilterBar from '@/components/cars/FilterBar';
import { client } from '@/lib/sanity/client';
import { carsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await client.fetch(carsQuery);
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...cars];
    if (filters.make) filtered = filtered.filter(c => c.make?.toLowerCase() === filters.make.toLowerCase());
    if (filters.bodyType) filtered = filtered.filter(c => c.bodyType === filters.bodyType);
    if (filters.transmission) filtered = filtered.filter(c => c.transmission === filters.transmission);
    if (filters.fuelType) filtered = filtered.filter(c => c.fuelType === filters.fuelType);
    if (filters.minPrice) filtered = filtered.filter(c => c.price >= parseInt(filters.minPrice));
    if (filters.maxPrice) filtered = filtered.filter(c => c.price <= parseInt(filters.maxPrice));
    setFilteredCars(filtered);
  };

  return (
    <main className="bg-white min-h-screen">

      {/* Page Header */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-mid-grey mb-2">
                <a href="/" className="hover:text-red-brand">Home</a>
                {' '}<span className="text-gray-300">›</span>{' '}
                <span className="text-red-brand">Inventory</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand">Our Inventory</h1>
            </div>
            <p className="text-mid-grey">
              Browse our collection of premium Japanese import cars
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FilterBar
          onFilterChange={handleFilterChange}
          totalCount={cars.length}
          filteredCount={filteredCars.length}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-grey-soft rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filteredCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-2xl font-bold text-navy-brand mb-2">No cars found</p>
            <p className="text-mid-grey">Try adjusting your filters to find what you're looking for.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
