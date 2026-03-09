'use client';

import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
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

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      make: '',
      bodyType: '',
      transmission: '',
      fuelType: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="mb-32">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center gap-8 px-16 py-12 bg-gold text-midnight rounded-lg font-medium mb-16"
      >
        <SlidersHorizontal size={20} />
        Filters
      </button>

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-cloud/5 border border-gold/20 rounded-lg p-24"
          >
            <div className="flex justify-between items-center mb-24">
              <h3 className="text-xl font-semibold text-gold">Filter Cars</h3>
              <button
                onClick={clearFilters}
                className="text-steel hover:text-gold transition-colors text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-16">
              <select
                value={filters.make}
                onChange={(e) => handleChange('make', e.target.value)}
                className="px-12 py-8 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>

              <select
                value={filters.bodyType}
                onChange={(e) => handleChange('bodyType', e.target.value)}
                className="px-12 py-8 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              >
                <option value="">Body Type</option>
                {bodyTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>

              <select
                value={filters.transmission}
                onChange={(e) => handleChange('transmission', e.target.value)}
                className="px-12 py-8 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              >
                <option value="">Transmission</option>
                {transmissions.map((trans) => (
                  <option key={trans} value={trans.toLowerCase()}>{trans}</option>
                ))}
              </select>

              <select
                value={filters.fuelType}
                onChange={(e) => handleChange('fuelType', e.target.value)}
                className="px-12 py-8 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              >
                <option value="">Fuel Type</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel.toLowerCase()}>{fuel}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className="px-12 py-8 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              />

              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="px-12 py-8 bg-midnight border border-gold/20 rounded-lg text-cloud focus:border-gold outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
