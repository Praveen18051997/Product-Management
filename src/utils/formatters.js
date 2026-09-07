// Format number as USD currency
export function formatCurrency(value) {
  if (value === undefined || value === null || isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Calculate original price before discount
export function calculateOriginalPrice(price, discountPercentage) {
  if (!discountPercentage || discountPercentage <= 0) return price;
  return Number((price / (1 - discountPercentage / 100)).toFixed(2));
}

// Format category slug to human-readable label
export function formatCategoryName(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get stock badge info and styling
export function getStockStatus(stock) {
  const stockNum = Number(stock) || 0;
  if (stockNum === 0) {
    return {
      label: 'Out of Stock',
      level: 'out',
      color: 'rose',
      bg: 'bg-rose-500/10 dark:bg-rose-500/20',
      text: 'text-rose-700 dark:text-rose-400',
      border: 'border-rose-200 dark:border-rose-900/50',
      dot: 'bg-rose-500',
    };
  }
  if (stockNum <= 15) {
    return {
      label: `Low Stock (${stockNum})`,
      level: 'low',
      color: 'amber',
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-900/50',
      dot: 'bg-amber-500',
    };
  }
  return {
    label: `In Stock (${stockNum})`,
    level: 'good',
    color: 'emerald',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-900/50',
    dot: 'bg-emerald-500',
  };
}

// Format date string
export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}
