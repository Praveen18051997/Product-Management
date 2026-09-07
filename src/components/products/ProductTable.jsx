import React from 'react';
import { Star, Eye } from 'lucide-react';
import { formatCurrency, formatCategoryName, calculateOriginalPrice } from '../../utils/formatters';
import { StockBadge } from './StockBadge';

export function ProductTable({ products = [], onSelectProduct }) {
  if (!products.length) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table headers */}
          <thead>
            <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-850 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Brand</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Rating</th>
              <th className="py-3.5 px-4">Stock</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>

          {/* Product row items */}
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80 text-sm">
            {products.map((product) => {
              const originalPrice = calculateOriginalPrice(product.price, product.discountPercentage);
              return (
                <tr
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                >
                  {/* Thumbnail & title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-1 flex-shrink-0 border border-zinc-200/60 dark:border-zinc-700/60 overflow-hidden">
                        <img
                          src={product.thumbnail || product.images?.[0]}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 max-w-[220px]">
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {product.title}
                        </p>
                        <p className="text-xs text-zinc-400 truncate">SKU: {product.sku || `PRD-${product.id}`}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2.5 py-1 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 capitalize">
                      {formatCategoryName(product.category)}
                    </span>
                  </td>

                  {/* Brand */}
                  <td className="py-3 px-4">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      {product.brand || '—'}
                    </span>
                  </td>

                  {/* Price & discount */}
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {formatCurrency(product.price)}
                      </span>
                      {product.discountPercentage > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                          <span className="line-through">{formatCurrency(originalPrice)}</span>
                          <span className="text-rose-500 font-bold">
                            -{Math.round(product.discountPercentage)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                        {product.rating?.toFixed(1)}
                      </span>
                    </div>
                  </td>

                  {/* Stock badge */}
                  <td className="py-3 px-4">
                    <StockBadge stock={product.stock} />
                  </td>

                  {/* Stock status */}
                  <td className="py-3 px-4">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
