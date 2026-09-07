import React from 'react';
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  Boxes,
  Star,
  Eye,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { formatCurrency, formatCategoryName } from '../../utils/formatters';
import { StockBadge } from '../products/StockBadge';
import { ErrorState } from '../common/ErrorState';

export function OverviewView({
  allProducts = [],
  stats,
  categories = [],
  onNavigateToProducts,
  onNavigateToCategory,
  onSelectProduct,
  onViewTotalProducts,
  onViewHealthyStock,
  onViewLowStock,
  onViewCategories,
  error,
  onRetry,
}) {
  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
        <ErrorState error={error} onRetry={onRetry} />
      </div>
    );
  }

  const inStockCount = Math.max(0, (stats?.totalProducts || 0) - (stats?.lowStockCount || 0) - (stats?.outOfStockCount || 0));

  // Critical low stock items
  const criticalProducts = React.useMemo(() => {
    return [...allProducts]
      .filter(p => (p.stock || 0) <= 15)
      .sort((a, b) => (a.stock || 0) - (b.stock || 0))
      .slice(0, 5);
  }, [allProducts]);

  // Top rated items
  const topRatedProducts = React.useMemo(() => {
    return [...allProducts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  }, [allProducts]);

  // Featured departments
  const topCategories = categories.slice(0, 6);

  // Click handlers
  const handleTotalClick = onViewTotalProducts || onNavigateToProducts;
  const handleHealthyClick = onViewHealthyStock || onNavigateToProducts;
  const handleLowStockClick = onViewLowStock || onNavigateToProducts;
  const handleCategoriesClick = onViewCategories || (() => onNavigateToCategory && onNavigateToCategory('all'));

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-800 text-white p-5 sm:p-8 shadow-xl shadow-red-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Inventory Overview
            </h1>
            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
              Monitoring <strong className="text-white">{stats?.totalProducts || 0} products</strong> across{' '}
              <strong className="text-white">{categories.length} categories</strong>. Review critical stock warnings, top performing inventory, and department distribution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <button
              onClick={handleTotalClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-red-800 font-bold text-sm shadow-md hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {stats?.lowStockCount > 0 && (
              <button
                onClick={handleLowStockClick}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-700/60 hover:bg-red-700 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                <span>{stats.lowStockCount} Low Stock Alerts</span>
              </button>
            )}
          </div>
        </div>

        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total products card */}
        <div
          onClick={handleTotalClick}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800 hover:border-red-400 dark:hover:border-red-600 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
          title="Click to view all products in catalog"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Total Products
            </span>
            <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {stats?.totalProducts || 0}
            </h3>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-medium">Catalog items tracked</p>
              <span className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Healthy stock card */}
        <div
          onClick={handleHealthyClick}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800 hover:border-teal-400 dark:hover:border-teal-600 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
          title="Click to view healthy stock products (>15 units)"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              Healthy Stock
            </span>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {inStockCount}
            </h3>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-medium">Ready for fulfillment</p>
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View {inStockCount} items</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Low stock alerts card */}
        <div
          onClick={handleLowStockClick}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-amber-200 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-500 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
          title="Click to view stock warnings (<=15 units)"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Stock Warnings
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
              {stats?.lowStockCount || 0}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                Action Required
              </span>
            </h3>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-medium">Items with &le; 15 units left</p>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View {stats?.lowStockCount || 0} warnings</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Departments card */}
        <div
          onClick={handleCategoriesClick}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800 hover:border-cyan-400 dark:hover:border-cyan-600 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
          title="Click to browse all product departments"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Departments
            </span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {categories.length || 24}
            </h3>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-zinc-400 font-medium">Active product categories</p>
              <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Browse departments</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spotlights and highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Critical low stock spotlight */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Critical Stock Spotlight</h3>
                <p className="text-xs text-zinc-400">Products with the lowest warehouse quantities</p>
              </div>
            </div>
            <button
              onClick={onViewLowStock}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {criticalProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 p-2 rounded-2xl transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 flex-shrink-0 border border-zinc-200/60 dark:border-zinc-700/60 overflow-hidden">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {product.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {product.brand || 'Generic'} • {formatCategoryName(product.category)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <StockBadge stock={product.stock} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                    title="Inspect Product"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top rated products */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">Top Rated Products</h3>
                <p className="text-xs text-zinc-400">Customer favorites in catalog</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {topRatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="p-3 rounded-2xl bg-zinc-50/70 dark:bg-zinc-850/60 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-3 hover:border-red-300 dark:hover:border-red-700 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-800 p-1 object-contain flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {product.title}
                    </p>
                    <p className="text-[11px] font-bold text-zinc-900 dark:text-white mt-0.5">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-100/70 dark:bg-amber-950/50 px-2 py-0.5 rounded-lg flex-shrink-0 border border-amber-200 dark:border-amber-900/40">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    {product.rating?.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top departments */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">Explore by Department</h3>
              <p className="text-xs text-zinc-400">Direct shortcuts to product categories</p>
            </div>
          </div>
          <button
            onClick={onNavigateToProducts}
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories ({categories.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {topCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onNavigateToCategory(cat.slug)}
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 hover:bg-red-50 dark:hover:bg-red-950/40 border border-zinc-200/60 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-800 transition-all text-left cursor-pointer group"
            >
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 capitalize group-hover:text-red-600 dark:group-hover:text-red-400 truncate">
                {cat.name || formatCategoryName(cat.slug)}
              </p>
              <span className="text-[10px] text-zinc-400 mt-1 block">View items →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
