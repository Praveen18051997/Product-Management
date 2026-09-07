import React from 'react';
import { Star, Eye } from 'lucide-react';
import { formatCurrency, calculateOriginalPrice, formatCategoryName } from '../../utils/formatters';
import { StockBadge } from './StockBadge';

export function ProductCard({ product, onClick }) {
  if (!product) return null;

  const originalPrice = calculateOriginalPrice(product.price, product.discountPercentage);
  const stockPercentage = Math.min(100, Math.max(5, (product.stock / 100) * 100));

  return (
    <div
      onClick={() => onClick(product)}
      className="group bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-xs hover:shadow-xl hover:border-red-400 dark:hover:border-red-600 transition-all duration-300 flex flex-col cursor-pointer card-hover-effect"
    >
      {/* Product image & overlay */}
      <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl overflow-hidden mb-4 border border-zinc-100 dark:border-zinc-800">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-3 group-hover:scale-108 transition-transform duration-300 ease-out"
        />

        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-zinc-900/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-lg capitalize">
          {formatCategoryName(product.category)}
        </div>

        {/* Hover quick inspect */}
        <div className="absolute inset-0 bg-zinc-950/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-3.5 py-2 rounded-2xl font-bold text-xs shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-red-500" />
            Quick Inspect
          </div>
        </div>
      </div>

      {/* Brand & rating */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-bold text-red-600 dark:text-red-400 truncate uppercase tracking-wider">
          {product.brand || 'Generic'}
        </span>
        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
            {product.rating?.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Product title */}
      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mb-1.5 line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" title={product.title}>
        {product.title}
      </h3>

      {/* Product description */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
        {product.description}
      </p>

      {/* Stock level bar */}
      <div className="mt-auto space-y-1.5 pt-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-400">Inventory Status</span>
          <StockBadge stock={product.stock} />
        </div>
        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              product.stock === 0
                ? 'bg-rose-500'
                : product.stock <= 15
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${stockPercentage}%` }}
          />
        </div>
      </div>

      {/* Price & inspect button */}
      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-zinc-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-zinc-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(product);
          }}
          className="p-2 rounded-xl text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition cursor-pointer"
          title="Inspect Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
