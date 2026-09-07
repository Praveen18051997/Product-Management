import React from 'react';

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
      <div className="mt-4 w-32 h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
      <div className="mt-2 w-20 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm animate-pulse flex flex-col">
      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl mb-4"></div>
      <div className="flex items-center justify-between mb-2">
        <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-12 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="w-20 h-6 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-16 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      </div>
    </div>
  );
}

export function ProductTableSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm animate-pulse">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex gap-6">
        <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-1/6 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-1/6 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-1/6 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="w-1/6 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-6">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-lg flex-shrink-0"></div>
            <div className="w-1/3 space-y-2">
              <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="w-1/2 h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="w-1/6 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-1/6 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-1/6 h-5 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="w-1/6 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
