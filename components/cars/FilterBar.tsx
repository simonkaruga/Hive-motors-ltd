'use client';

import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
  totalCount?: number;
  filteredCount?: number;
}

export default function FilterBar({ onFilterChange, totalCount, filteredCount }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    make: '',
    bodyType: '',
    transmission: '',
    fuelType: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const makes = ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'Mitsubishi'];
  const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Van', 'Coupe'];
  const transmissions = ['Automatic', 'Manual'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { make: '', bodyType: '', transmission: '', fuelType: '', minPrice: '', maxPrice: '' };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  const selectClass = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-charcoal text-sm focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors";

  return (
    <div className="mb-8">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            hasActiveFilters
              ? 'bg-red-brand text-white'
              : 'bg-grey-soft text-navy-brand border border-gray-200'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        {totalCount !== undefined && (
          <p className="text-sm text-mid-grey">
            Showing <span className="font-semibold text-navy-brand">{filteredCount ?? totalCount}</span> of{' '}
            <span className="font-semibold text-navy-brand">{totalCount}</span> vehicles
          </p>
        )}
      </div>

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-grey-soft border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-navy-brand flex items-center gap-2">
                  <SlidersHorizontal size={16} />
                  Filter Vehicles
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-red-brand hover:text-red-dark text-sm font-medium transition-colors"
                  >
                    <X size={14} />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <select value={filters.make} onChange={(e) => handleChange('make', e.target.value)} className={selectClass}>
                  <option value="">All Makes</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>

                <select value={filters.bodyType} onChange={(e) => handleChange('bodyType', e.target.value)} className={selectClass}>
                  <option value="">Body Type</option>
                  {bodyTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>

                <select value={filters.transmission} onChange={(e) => handleChange('transmission', e.target.value)} className={selectClass}>
                  <option value="">Transmission</option>
                  {transmissions.map((trans) => (
                    <option key={trans} value={trans.toLowerCase()}>{trans}</option>
                  ))}
                </select>

                <select value={filters.fuelType} onChange={(e) => handleChange('fuelType', e.target.value)} className={selectClass}>
                  <option value="">Fuel Type</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel.toLowerCase()}>{fuel}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Min Price (KSh)"
                  value={filters.minPrice}
                  onChange={(e) => handleChange('minPrice', e.target.value)}
                  className={selectClass}
                />

                <input
                  type="number"
                  placeholder="Max Price (KSh)"
                  value={filters.maxPrice}
                  onChange={(e) => handleChange('maxPrice', e.target.value)}
                  className={selectClass}
                />
              </div>

              {/* Active filter pills */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                  {Object.entries(filters).map(([key, value]) =>
                    value ? (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1.5 bg-red-brand/10 text-red-brand text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {value}
                        <button onClick={() => handleChange(key, '')} className="hover:text-red-dark">
                          <X size={12} />
                        </button>
                      </span>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop results count */}
      {totalCount !== undefined && (
        <p className="hidden md:block text-sm text-mid-grey mt-3">
          Showing <span className="font-semibold text-navy-brand">{filteredCount ?? totalCount}</span> of{' '}
          <span className="font-semibold text-navy-brand">{totalCount}</span> vehicles
        </p>
      )}
    </div>
  );
}
