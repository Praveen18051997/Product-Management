import React from 'react';
import { PackageSearch, RotateCcw } from 'lucide-react';

export function EmptyState({ title = 'No products found', message = 'We couldn’t find any products matching your current filters or search query.', onReset }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-850 my-6 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 ring-8 ring-red-50/50 dark:ring-red-950/30">
        <PackageSearch className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all shadow-sm hover:shadow-red-500/20 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All Filters
        </button>
      )}
    </div>
  );
}
