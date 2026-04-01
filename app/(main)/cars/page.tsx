'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import FilterBar, { FilterState } from '@/components/cars/FilterBar';
import { client, urlFor } from '@/lib/sanity/client';
import { carsQuery } from '@/lib/sanity/queries';
import { Car } from '@/lib/types';

const EMPTY_FILTERS: FilterState = {
  make: '', bodyType: '', condition: '', transmission: '',
  fuelType: '', minYear: '', maxYear: '', minPrice: '', maxPrice: '', sortBy: '',
};

function sortCars(cars: Car[], sortBy: string): Car[] {
  const sorted = [...cars];
  switch (sortBy) {
    case 'price-asc':    return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':   return sorted.sort((a, b) => b.price - a.price);
    case 'year-desc':    return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':     return sorted.sort((a, b) => a.year - b.year);
    case 'mileage-asc':  return sorted.sort((a, b) => a.mileage - b.mileage);
    default:             return sorted;
  }
}

function applyFilters(cars: Car[], filters: FilterState): Car[] {
  let result = [...cars];
  if (filters.make)         result = result.filter(c => c.make?.toLowerCase() === filters.make.toLowerCase());
  if (filters.bodyType)     result = result.filter(c => c.bodyType === filters.bodyType);
  if (filters.condition)    result = result.filter(c => c.condition === filters.condition);
  if (filters.transmission) result = result.filter(c => c.transmission === filters.transmission);
  if (filters.fuelType)     result = result.filter(c => c.fuelType === filters.fuelType);
  if (filters.minYear)      result = result.filter(c => c.year >= parseInt(filters.minYear));
  if (filters.maxYear)      result = result.filter(c => c.year <= parseInt(filters.maxYear));
  if (filters.minPrice)     result = result.filter(c => c.price >= parseInt(filters.minPrice));
  if (filters.maxPrice)     result = result.filter(c => c.price <= parseInt(filters.maxPrice));
  return sortCars(result, filters.sortBy);
}

function CarsContent() {
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const initialFilters: Partial<FilterState> = {
    make: searchParams.get('make') || '',
    bodyType: searchParams.get('bodyType') || '',
  };

  // Track active filters in a ref so the fetch callback can apply them
  // even if FilterBar fires onFilterChange before cars have loaded
  const activeFiltersRef = useRef<FilterState>({ ...EMPTY_FILTERS, ...initialFilters });

  useEffect(() => {
    async function fetchCars() {
      try {
        const data = await client.fetch(carsQuery);
        setCars(data);
        // Apply whatever filters are currently active (from URL params or user interaction)
        setFilteredCars(applyFilters(data, activeFiltersRef.current));
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    activeFiltersRef.current = filters;
    setFilteredCars(applyFilters(cars, filters));
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
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand">Used Cars for Sale in Nairobi</h1>
            </div>
            <p className="text-mid-grey">Kenya&apos;s trusted car dealer — imported &amp; locally sourced vehicles at honest prices</p>
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
          <div className="text-center py-20 animate-fade-in">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-2xl font-bold text-navy-brand mb-3">No cars match your filters</p>
            <p className="text-mid-grey mb-8 max-w-md mx-auto">
              We might not have it in stock right now — but we source globally and can find exactly what you need.
            </p>
            <Link
              href="/notify"
              className="inline-flex items-center gap-2 bg-navy-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-navy-dark transition-colors"
            >
              <Bell size={18} />
              Request This Car
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <div key={car._id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CarCard car={{
                  ...car,
                  imageUrl: car.images?.[0]
                    ? urlFor(car.images[0]).width(800).height(533).auto('format').quality(60).url()
                    : null,
                }} />
              </div>
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
