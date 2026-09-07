import React from 'react';
import {
  ArrowUpDown,
  LayoutGrid,
  List,
  RotateCcw,
  X,
  ChevronDown
} from 'lucide-react';
import { formatCategoryName } from '../../utils/formatters';

export function FilterBar({
  categories = [],
  selectedCategory,
  onCategoryChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalResults,
  activeFiltersCount,
  onResetFilters,
  searchQuery,
  onClearSearch
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-3.5 sm:p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-xs mb-6 space-y-3 sm:space-y-4">
      {/* Controls row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Filters and sort controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
          {/* Category dropdown */}
          <div className="relative flex-1 sm:flex-none min-w-[135px]">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-semibold rounded-2xl text-zinc-800 dark:text-zinc-200 outline-none focus:border-red-500 cursor-pointer shadow-xs truncate"
            >
              <option value="all">All Departments ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name || formatCategoryName(cat.slug)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>

          {/* Stock filter */}
          <div className="relative flex-1 sm:flex-none min-w-[125px]">
            <select
              value={stockFilter}
              onChange={(e) => onStockFilterChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-semibold rounded-2xl text-zinc-800 dark:text-zinc-200 outline-none focus:border-red-500 cursor-pointer shadow-xs truncate"
            >
              <option value="all">Stock: All</option>
              <option value="healthyStock">Healthy Stock (&gt;15)</option>
              <option value="lowStock">Low Stock (&le;15)</option>
              <option value="outOfStock">Out of Stock (0)</option>
              <option value="inStock">In Stock (&gt;0)</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>

          {/* Price range inputs */}
          <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex-1 sm:flex-none justify-between sm:justify-start">
            <span className="text-xs font-bold text-zinc-400">$</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-12 sm:w-16 text-xs font-medium bg-transparent text-zinc-800 dark:text-zinc-200 outline-none placeholder-zinc-400"
              min="0"
            />
            <span className="text-zinc-300 dark:text-zinc-600">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-12 sm:w-16 text-xs font-medium bg-transparent text-zinc-800 dark:text-zinc-200 outline-none placeholder-zinc-400"
              min="0"
            />
          </div>

          {/* Sort order */}
          <div className="relative flex-1 sm:flex-none min-w-[130px]">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full appearance-none pl-8 pr-8 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-semibold rounded-2xl text-zinc-800 dark:text-zinc-200 outline-none focus:border-red-500 cursor-pointer shadow-xs truncate"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: Highest First</option>
              <option value="rating-asc">Rating: Lowest First</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>

        {/* View mode and reset */}
        <div className="flex items-center justify-between lg:justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800">
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-2xl transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Grid / Table toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 ml-auto lg:ml-0">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-700 text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-zinc-700 text-red-600 dark:text-red-400 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active filter tags */}
      {(activeFiltersCount > 0 || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
          <span className="text-zinc-400 font-semibold">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-xl font-semibold border border-red-200/50 dark:border-red-900/40">
              Query: "{searchQuery}"
              <button onClick={onClearSearch} className="hover:text-red-950 dark:hover:text-red-100 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-700">
              Dept: {formatCategoryName(selectedCategory)}
              <button onClick={() => onCategoryChange('all')} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {stockFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-xl font-semibold border border-amber-200 dark:border-amber-900/40">
              Stock: {stockFilter}
              <button onClick={() => onStockFilterChange('all')} className="hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(minPrice !== '' || maxPrice !== '') && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 rounded-xl font-semibold border border-teal-200 dark:border-teal-900/40">
              Price: ${minPrice || 0} - ${maxPrice || '∞'}
              <button
                onClick={() => {
                  onMinPriceChange('');
                  onMaxPriceChange('');
                }}
                className="hover:text-teal-950 dark:hover:text-teal-100 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortBy !== 'default' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-700">
              Sort: {sortBy}
              <button onClick={() => onSortByChange('default')} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <span className="ml-auto text-zinc-400 font-semibold text-[11px]">
            {totalResults} {totalResults === 1 ? 'product' : 'products'} matching
          </span>
        </div>
      )}
    </div>
  );
}
