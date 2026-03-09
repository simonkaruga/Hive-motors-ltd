'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CarCard from '@/components/cars/CarCard';
import FilterBar from '@/components/cars/FilterBar';
import SectionHeader from '@/components/shared/SectionHeader';
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

    if (filters.make) {
      filtered = filtered.filter(car => car.make.toLowerCase() === filters.make.toLowerCase());
    }
    if (filters.bodyType) {
      filtered = filtered.filter(car => car.bodyType === filters.bodyType);
    }
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    setFilteredCars(filtered);
  };

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <SectionHeader 
          title="Our Inventory" 
          subtitle="Browse our collection of premium Japanese import cars"
        />

        <FilterBar onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="text-center text-steel py-64">
            <div className="animate-spin w-48 h-48 border-4 border-gold border-t-transparent rounded-full mx-auto mb-16" />
            <p>Loading cars...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-64"
          >
            <p className="text-2xl text-steel mb-16">No cars found matching your filters</p>
            <p className="text-steel">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <>
            <div className="mb-24 text-steel">
              Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
