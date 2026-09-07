import React from 'react';
import { Boxes, ArrowRight } from 'lucide-react';
import { formatCategoryName } from '../../utils/formatters';
import { ErrorState } from '../common/ErrorState';

export function CategoriesView({ categories = [], allProducts = [], onSelectCategory, error, onRetry }) {
  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
        <ErrorState error={error} onRetry={onRetry} />
      </div>
    );
  }

  // Calculate product count per category
  const categoryCounts = React.useMemo(() => {
    const counts = {};
    allProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6 animate-fade-in">
      {/* View header */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex-shrink-0">
          <Boxes className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Product Categories
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Explore {allProducts.length} products categorized across {categories.length} departments.
          </p>
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {categories.map((cat) => {
          const count = categoryCounts[cat.slug] || 0;
          return (
            <div
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className="group bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-lg hover:border-red-300 dark:hover:border-red-700 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Boxes className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base capitalize group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {cat.name || formatCategoryName(cat.slug)}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  View all items in {cat.name?.toLowerCase() || cat.slug}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-red-600 dark:text-red-400">
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
