'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import CarCard from '@/components/cars/CarCard';
import FilterBar from '@/components/cars/FilterBar';
import { client } from '@/lib/sanity/client';
import { carsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';

interface FilterState {
  make: string; bodyType: string; transmission: string;
  fuelType: string; minPrice: string; maxPrice: string;
}

function CarsContent() {
  const searchParams = useSearchParams();
  const initialFilters = {
    make: searchParams.get('make') || '',
    bodyType: searchParams.get('bodyType') || '',
  };

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Static cars from homepage
  const staticCars: Car[] = [
    {
      _id: 'prado-static', title: '2020 Toyota Prado TX-L J150', slug: { current: 'prado-static' }, status: 'available',
      price: 7250000, year: 2020, make: 'Toyota', model: 'Land Cruiser Prado TX-L', mileage: 68000,
      transmission: 'automatic', fuelType: 'diesel', engine: '2.8L Turbocharged', bodyType: 'suv', driveType: '4wd', colour: 'Blue',
      images: [{ asset: { url: '/cars/prado/prado-01.jpg' }, alt: 'Prado' }],
      features: ['2800cc Turbocharged Diesel', '6-Speed Automatic', '4WD', '7 Leather Seats'], isFeatured: true, _createdAt: new Date().toISOString(),
    },
    {
      _id: 'range-rover-static', title: '2019 Range Rover Sport HSE', slug: { current: 'range-rover-static' }, status: 'available',
      price: 9750000, year: 2019, make: 'Land Rover', model: 'Range Rover Sport HSE', mileage: 72000,
      transmission: 'automatic', fuelType: 'diesel', engine: '3.0L Turbocharged', bodyType: 'suv', driveType: '4wd', colour: 'Beige',
      images: [{ asset: { url: '/cars/range-rover/range-rover-01.jpg' }, alt: 'Range Rover' }],
      features: ['3.0L Turbocharged Diesel', '8-Speed Automatic', 'Panoramic Sunroof'], isFeatured: true, _createdAt: new Date().toISOString(),
    },
    {
      _id: 'gle-static', title: '2019 Mercedes-Benz GLE400d AMG-Line', slug: { current: 'gle-static' }, status: 'available',
      price: 12750000, year: 2019, make: 'Mercedes-Benz', model: 'GLE400d AMG-Line', mileage: 50000,
      transmission: 'automatic', fuelType: 'diesel', engine: '3.0L Turbocharged', bodyType: 'suv', driveType: '4wd', colour: 'Black',
      images: [{ asset: { url: '/cars/gle/gle-01.jpg' }, alt: 'GLE' }],
      features: ['9G-Tronic Automatic', '330 BHP', 'Panoramic Sunroof'], isFeatured: true, _createdAt: new Date().toISOString(),
    },
    {
      _id: 'cx5-static', title: '2019 Mazda CX-5 AWD 2.5T', slug: { current: 'cx5-static' }, status: 'available',
      price: 3400000, year: 2019, make: 'Mazda', model: 'CX-5 AWD 2.5T', mileage: 86000,
      transmission: 'automatic', fuelType: 'petrol', engine: '2.5L Turbocharged', bodyType: 'suv', driveType: 'awd', colour: 'Black',
      images: [{ asset: { url: '/cars/cx5/cx5-01.jpg' }, alt: 'CX-5' }],
      features: ['6-Speed Automatic', '228 BHP', 'HUD'], isFeatured: true, _createdAt: new Date().toISOString(),
    },
    {
      _id: 'polo-static', title: '2019 VW Polo Highline MK7.5', slug: { current: 'polo-static' }, status: 'available',
      price: 2150000, year: 2019, make: 'Volkswagen', model: 'Polo Highline MK7.5', mileage: 22000,
      transmission: 'automatic', fuelType: 'petrol', engine: '1.0L Turbocharged', bodyType: 'hatchback', driveType: 'fwd', colour: 'White',
      images: [{ asset: { url: '/cars/polo/polo-08.jpg' }, alt: 'Polo' }],
      features: ['7-Speed Automatic', 'Digital Cluster'], isFeatured: true, _createdAt: new Date().toISOString(),
    },
    {
      _id: '3008-static', title: '2019 Peugeot 3008 Cross City', slug: { current: '3008-static' }, status: 'available',
      price: 3350000, year: 2019, make: 'Peugeot', model: '3008 Cross City', mileage: 41000,
      transmission: 'automatic', fuelType: 'petrol', engine: '1.6L Turbocharged', bodyType: 'suv', driveType: 'fwd', colour: 'Grey',
      images: [{ asset: { url: '/cars/3008/3008-06.jpg' }, alt: '3008' }],
      features: ['6-Speed Automatic', '165 BHP', 'Panoramic Sunroof'], isFeatured: true, _createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await client.fetch(carsQuery);
        const allCars = [...staticCars, ...data];
        setCars(allCars);
        setFilteredCars(allCars);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setCars(staticCars);
        setFilteredCars(staticCars);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
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
    <>
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
          initialFilters={initialFilters}
        />

        {error ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-2xl font-bold text-navy-brand mb-2">Failed to load inventory</p>
            <p className="text-mid-grey mb-6">Please check your connection and try again.</p>
            <button
              onClick={() => { setError(false); setLoading(true); }}
              className="bg-red-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-dark transition-colors"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
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
            <p className="text-mid-grey">Try adjusting your filters to find what you&apos;re looking for.</p>
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
    </>
  );
}

export default function CarsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Suspense fallback={
        <div className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-12 bg-grey-soft rounded-xl animate-pulse w-64 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-grey-soft rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }>
        <CarsContent />
      </Suspense>
    </main>
  );
}
