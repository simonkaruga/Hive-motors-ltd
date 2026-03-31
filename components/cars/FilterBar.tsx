'use client';

import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronDown, ArrowUpDown } from 'lucide-react';

export interface FilterState {
  make: string;
  bodyType: string;
  condition: string;
  transmission: string;
  fuelType: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  totalCount?: number;
  filteredCount?: number;
  initialFilters?: Partial<FilterState>;
}

const MAKES = ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'Mitsubishi', 'Land Rover', 'BMW', 'Mercedes-Benz', 'Lexus'];
const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Van', 'Coupe'];
const TRANSMISSIONS = ['Automatic', 'Manual'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const CONDITIONS = [
  { value: 'fresh-import', label: '🇯🇵 Fresh Import' },
  { value: 'locally-used', label: '🇰🇪 Locally Used' },
];
const SORT_OPTIONS = [
  { value: '', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'year-desc', label: 'Year: Newest' },
  { value: 'year-asc', label: 'Year: Oldest' },
  { value: 'mileage-asc', label: 'Mileage: Lowest' },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => String(CURRENT_YEAR - i));

const EMPTY_FILTERS: FilterState = {
  make: '', bodyType: '', condition: '', transmission: '',
  fuelType: '', minYear: '', maxYear: '', minPrice: '', maxPrice: '', sortBy: '',
};

const FILTER_LABEL_MAP: Record<string, string> = {
  make: 'Make', bodyType: 'Body', condition: 'Condition', transmission: 'Trans',
  fuelType: 'Fuel', minYear: 'From', maxYear: 'To', minPrice: 'Min KSh', maxPrice: 'Max KSh',
};

export default function FilterBar({ onFilterChange, totalCount, filteredCount, initialFilters }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ ...EMPTY_FILTERS, ...initialFilters });

  useEffect(() => {
    if (initialFilters && Object.values(initialFilters).some(v => v)) {
      onFilterChange({ ...EMPTY_FILTERS, ...initialFilters });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const hasActiveFilters = Object.entries(filters).some(([k, v]) => k !== 'sortBy' && v !== '');
  const activeFilterCount = Object.entries(filters).filter(([k, v]) => k !== 'sortBy' && v !== '').length;

  const handleChange = (key: keyof FilterState, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange(next);
  };

  const clearFilters = () => {
    const reset = { ...EMPTY_FILTERS, sortBy: filters.sortBy };
    setFilters(reset);
    onFilterChange(reset);
  };

  const conditionLabel = (value: string) => CONDITIONS.find(c => c.value === value)?.label ?? value;
  const selectClass = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-charcoal text-sm focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors appearance-none cursor-pointer";
  const showFilters = isOpen || !isMobile;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`md:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            hasActiveFilters ? 'bg-red-brand text-white' : 'bg-grey-soft text-navy-brand border border-gray-200'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <div className="flex items-center gap-3 ml-auto">
          {totalCount !== undefined && (
            <p className="text-sm text-mid-grey hidden sm:block" aria-live="polite" aria-atomic="true">
              <span className="font-semibold text-navy-brand">{filteredCount ?? totalCount}</span>
              {' '}of{' '}
              <span className="font-semibold text-navy-brand">{totalCount}</span> vehicles
            </p>
          )}
          <div className="relative flex items-center">
            <ArrowUpDown size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            <select
              value={filters.sortBy}
              onChange={e => handleChange('sortBy', e.target.value)}
              aria-label="Sort vehicles"
              className="pl-8 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-charcoal text-sm focus:border-red-brand focus:ring-1 focus:ring-red-brand outline-none transition-colors appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
          </div>
        </div>
      </div>

      {totalCount !== undefined && (
        <p className="text-sm text-mid-grey mb-3 sm:hidden" aria-live="polite" aria-atomic="true">
          <span className="font-semibold text-navy-brand">{filteredCount ?? totalCount}</span> of{' '}
          <span className="font-semibold text-navy-brand">{totalCount}</span> vehicles
        </p>
      )}

      <div className={`overflow-hidden transition-all duration-250 ${showFilters ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-grey-soft border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-navy-brand flex items-center gap-2">
              <SlidersHorizontal size={15} />
              Filter Vehicles
            </h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-red-brand hover:text-red-dark text-sm font-medium transition-colors">
                <X size={14} />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="relative">
              <select value={filters.make} onChange={e => handleChange('make', e.target.value)} className={selectClass} aria-label="Filter by make">
                <option value="">All Makes</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filters.bodyType} onChange={e => handleChange('bodyType', e.target.value)} className={selectClass} aria-label="Filter by body type">
                <option value="">Body Type</option>
                {BODY_TYPES.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filters.condition} onChange={e => handleChange('condition', e.target.value)} className={selectClass} aria-label="Filter by condition">
                <option value="">All Conditions</option>
                {CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filters.transmission} onChange={e => handleChange('transmission', e.target.value)} className={selectClass} aria-label="Filter by transmission">
                <option value="">Transmission</option>
                {TRANSMISSIONS.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filters.fuelType} onChange={e => handleChange('fuelType', e.target.value)} className={selectClass} aria-label="Filter by fuel type">
                <option value="">Fuel Type</option>
                {FUEL_TYPES.map(f => <option key={f} value={f.toLowerCase()}>{f}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filters.minYear} onChange={e => handleChange('minYear', e.target.value)} className={selectClass} aria-label="Minimum year">
                <option value="">Year From</option>
                {YEARS.slice().reverse().map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <div className="relative">
              <select value={filters.maxYear} onChange={e => handleChange('maxYear', e.target.value)} className={selectClass} aria-label="Maximum year">
                <option value="">Year To</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mid-grey pointer-events-none" />
            </div>
            <input type="number" placeholder="Min Price (KSh)" value={filters.minPrice} onChange={e => handleChange('minPrice', e.target.value)} className={selectClass} aria-label="Minimum price in KSh" />
            <input type="number" placeholder="Max Price (KSh)" value={filters.maxPrice} onChange={e => handleChange('maxPrice', e.target.value)} className={selectClass} aria-label="Maximum price in KSh" />
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || key === 'sortBy') return null;
                const display = key === 'condition' ? conditionLabel(value) : value;
                const label = FILTER_LABEL_MAP[key];
                return (
                  <span key={key} className="inline-flex items-center gap-1.5 bg-navy-brand/10 text-navy-brand text-xs font-medium px-3 py-1.5 rounded-full">
                    <span className="text-mid-grey text-[10px]">{label}:</span> {display}
                    <button onClick={() => handleChange(key as keyof FilterState, '')} aria-label={`Remove ${label} filter`} className="hover:text-red-brand ml-0.5">
                      <X size={11} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
