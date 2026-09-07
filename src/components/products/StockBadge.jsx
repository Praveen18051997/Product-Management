import React from 'react';
import { getStockStatus } from '../../utils/formatters';

export function StockBadge({ stock, showCount = true }) {
  const status = getStockStatus(stock);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
      {showCount ? status.label : status.level === 'out' ? 'Out of Stock' : status.level === 'low' ? 'Low Stock' : 'In Stock'}
    </span>
  );
}
