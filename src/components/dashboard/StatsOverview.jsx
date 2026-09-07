import React from 'react';
import {
  Package,
  AlertTriangle,
  CheckCircle2,
  Boxes
} from 'lucide-react';

export function StatsOverview({
  stats,
  onSelectTotal,
  onSelectHealthyStock,
  onSelectLowStock,
  onSelectCategories
}) {
  if (!stats) return null;

  const inStockCount = Math.max(0, (stats.totalProducts || 0) - (stats.lowStockCount || 0) - (stats.outOfStockCount || 0));

  const statCards = [
    {
      id: 'total',
      title: 'Total Products',
      value: stats.totalProducts,
      subtext: `${stats.totalCategories} active categories`,
      icon: Package,
      color: 'red',
      bgLight: 'bg-red-50 dark:bg-red-950/40',
      iconColor: 'text-red-600 dark:text-red-400',
      clickable: Boolean(onSelectTotal),
      onClick: onSelectTotal,
    },
    {
      id: 'inStock',
      title: 'Healthy Stock',
      value: inStockCount,
      subtext: 'Ready for fulfillment (>15 units)',
      icon: CheckCircle2,
      color: 'emerald',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      clickable: Boolean(onSelectHealthyStock),
      onClick: onSelectHealthyStock,
    },
    {
      id: 'lowStock',
      title: 'Low Stock Alert',
      value: stats.lowStockCount,
      subtext: `${stats.outOfStockCount} items out of stock`,
      icon: AlertTriangle,
      color: 'amber',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      clickable: Boolean(onSelectLowStock),
      onClick: onSelectLowStock,
    },
    {
      id: 'categories',
      title: 'Categories',
      value: stats.totalCategories || 24,
      subtext: 'Product classifications',
      icon: Boxes,
      color: 'violet',
      bgLight: 'bg-violet-50 dark:bg-violet-950/40',
      iconColor: 'text-violet-600 dark:text-violet-400',
      clickable: Boolean(onSelectCategories),
      onClick: onSelectCategories,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 ${
              card.clickable ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.99] border-amber-300/60 dark:border-amber-900/60' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl ${card.bgLight} ${card.iconColor} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
