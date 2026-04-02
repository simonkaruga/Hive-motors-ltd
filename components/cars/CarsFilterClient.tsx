'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import FilterBar, { FilterState } from '@/components/cars/FilterBar';
import { urlFor } from '@/lib/sanity/client';
import { Car } from '@/lib/types';

const EMPTY_FILTERS: FilterState = {
  make: '', bodyType: '', condition: '', transmission: '',
  fuelType: '', minYear: '', maxYear: '', minPrice: '', maxPrice: '', sortBy: '',
};

function sortCars(cars: Car[], sortBy: string): Car[] {
  const sorted = [...cars];
  switch (sortBy) {
    case 'price-asc':   return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':  return sorted.sort((a, b) => b.price - a.price);
    case 'year-desc':   return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':    return sorted.sort((a, b) => a.year - b.year);
    case 'mileage-asc': return sorted.sort((a, b) => a.mileage - b.mileage);
    default:            return sorted;
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

function getImageUrl(car: Car): string | null {
  if (!car.images?.[0]) return null;
  const img = car.images[0] as any;
  return img?.asset?._ref
    ? urlFor(img).width(800).height(533).auto('format').quality(60).url()
    : img?.asset?.url ?? null;
}

export default function CarsFilterClient({ cars }: { cars: Car[] }) {
  const searchParams = useSearchParams();

  const initialFilters: Partial<FilterState> = {
    make: searchParams.get('make') || '',
    bodyType: searchParams.get('bodyType') || '',
  };

  const activeFiltersRef = useRef<FilterState>({ ...EMPTY_FILTERS, ...initialFilters });
  const [filteredCars, setFilteredCars] = useState<Car[]>(() =>
    applyFilters(cars, { ...EMPTY_FILTERS, ...initialFilters })
  );

  useEffect(() => {
    setFilteredCars(applyFilters(cars, activeFiltersRef.current));
  }, [cars]);

  const handleFilterChange = (filters: FilterState) => {
    activeFiltersRef.current = filters;
    setFilteredCars(applyFilters(cars, filters));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <FilterBar
        onFilterChange={handleFilterChange}
        totalCount={cars.length}
        filteredCount={filteredCars.length}
        initialFilters={initialFilters}
      />

      {filteredCars.length === 0 ? (
        <div className="text-center py-20">
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
              <CarCard car={{ ...car, imageUrl: getImageUrl(car) }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
