import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl my-6 shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 ring-8 ring-rose-50 dark:ring-rose-950/30">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Unable to Load Products</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {error || 'An unexpected error occurred while communicating with the server. Please check your network connection and try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 transition-all shadow-sm shadow-rose-500/20 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Retry Connection
        </button>
      )}
    </div>
  );
}
