import React from 'react';
import {
  Star,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Package
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { ErrorState } from '../common/ErrorState';

export function AnalyticsView({ allProducts = [], onSelectProduct, error, onRetry }) {
  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
        <ErrorState error={error} onRetry={onRetry} />
      </div>
    );
  }

  // Price tier breakdown
  const priceTiers = React.useMemo(() => {
    let under25 = 0;
    let b25to100 = 0;
    let b100to500 = 0;
    let over500 = 0;

    allProducts.forEach((p) => {
      const price = p.price || 0;
      if (price < 25) under25++;
      else if (price <= 100) b25to100++;
      else if (price <= 500) b100to500++;
      else over500++;
    });

    const total = allProducts.length || 1;
    return [
      { label: 'Under $25', count: under25, pct: Math.round((under25 / total) * 100), color: 'bg-emerald-500' },
      { label: '$25 - $100', count: b25to100, pct: Math.round((b25to100 / total) * 100), color: 'bg-indigo-500' },
      { label: '$100 - $500', count: b100to500, pct: Math.round((b100to500 / total) * 100), color: 'bg-violet-500' },
      { label: 'Over $500', count: over500, pct: Math.round((over500 / total) * 100), color: 'bg-amber-500' },
    ];
  }, [allProducts]);

  // Stock health status
  const stockHealth = React.useMemo(() => {
    let good = 0;
    let low = 0;
    let out = 0;

    allProducts.forEach((p) => {
      const s = p.stock || 0;
      if (s === 0) out++;
      else if (s <= 15) low++;
      else good++;
    });

    const total = allProducts.length || 1;
    return {
      good: { count: good, pct: Math.round((good / total) * 100) },
      low: { count: low, pct: Math.round((low / total) * 100) },
      out: { count: out, pct: Math.round((out / total) * 100) },
    };
  }, [allProducts]);

  // Top 5 Highest Rated
  const topRated = React.useMemo(() => {
    return [...allProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
  }, [allProducts]);

  // Top 5 Highest Inventory Value (price * stock)
  const highestValue = React.useMemo(() => {
    return [...allProducts]
      .sort((a, b) => ((b.price || 0) * (b.stock || 0)) - ((a.price || 0) * (a.stock || 0)))
      .slice(0, 5);
  }, [allProducts]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Catalog Analytics & Insights
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deep-dive inventory metrics, pricing distribution, and top performing products.
        </p>
      </div>

      {/* Grid of distribution charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Pricing Distribution */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Pricing Tiers</h3>
              <p className="text-xs text-slate-400">Distribution of product prices</p>
            </div>
          </div>

          <div className="space-y-4">
            {priceTiers.map((tier) => (
              <div key={tier.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{tier.label}</span>
                  <span>{tier.count} products ({tier.pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tier.color} transition-all duration-700`}
                    style={{ width: `${tier.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Inventory Health Status */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Stock Health Status</h3>
              <p className="text-xs text-slate-400">Inventory risk breakdown</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-center">
              <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{stockHealth.good.count}</p>
              <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400 font-medium">Healthy Stock</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-center">
              <AlertTriangle className="w-5 h-5 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
              <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{stockHealth.low.count}</p>
              <p className="text-[11px] text-amber-600/80 dark:text-amber-400 font-medium">Low Stock (&le;15)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-center">
              <Package className="w-5 h-5 mx-auto text-rose-600 dark:text-rose-400 mb-1" />
              <p className="text-xl font-bold text-rose-700 dark:text-rose-300">{stockHealth.out.count}</p>
              <p className="text-[11px] text-rose-600/80 dark:text-rose-400 font-medium">Out of Stock</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {stockHealth.low.count > 0 ? (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                Attention needed: {stockHealth.low.count} items require replenishment soon.
              </span>
            ) : (
              'All warehouse inventory levels are currently in optimal range.'
            )}
          </p>
        </div>
      </div>

      {/* Grid of Top Rated & Highest Value items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated Products */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Top Rated Products</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {topRated.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct && onSelectProduct(prod)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="w-10 h-10 rounded-lg object-contain bg-slate-100 dark:bg-slate-800 p-1 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {prod.title}
                    </p>
                    <p className="text-xs text-slate-400 capitalize">{prod.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    {prod.rating?.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Total Inventory Value */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Highest Value Holdings</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {highestValue.map((prod) => {
              const value = (prod.price || 0) * (prod.stock || 0);
              return (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-10 h-10 rounded-lg object-contain bg-slate-100 dark:bg-slate-800 p-1 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {prod.title}
                      </p>
                      <p className="text-xs text-slate-400">{prod.stock} units in stock</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(value)}
                    </p>
                    <p className="text-[11px] text-slate-400">{formatCurrency(prod.price)} / unit</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
