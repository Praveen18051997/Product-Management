import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import {
  formatCurrency,
  calculateOriginalPrice,
  formatCategoryName,
  formatDate
} from '../../utils/formatters';
import { StockBadge } from './StockBadge';

function ProductModalContent({ product, onClose }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');

  const originalPrice = calculateOriginalPrice(product.price, product.discountPercentage);
  const savings = (originalPrice - product.price).toFixed(2);
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const stockPercentage = Math.min(100, Math.max(5, (product.stock / 100) * 100));

  return (
    <div
      className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden my-auto transition-all"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer shadow-sm backdrop-blur-xs"
        title="Close modal (Esc)"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[88vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Gallery column */}
        <div className="p-4 sm:p-6 bg-zinc-50/70 dark:bg-zinc-850 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200/80 dark:border-zinc-800">
          {/* Main image */}
          <div className="relative w-full aspect-square bg-white dark:bg-zinc-900 rounded-2xl p-4 flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800 shadow-xs mb-3 sm:mb-4">
            <img
              src={images[selectedImageIdx] || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300"
            />
            {product.discountPercentage > 0 && (
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-rose-500 text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                Save {Math.round(product.discountPercentage)}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-13 h-13 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-zinc-900 p-1 flex-shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImageIdx === idx
                      ? 'border-red-500 dark:border-red-400 shadow-md ring-2 ring-red-500/20'
                      : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Guarantees */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-zinc-200/80 dark:border-zinc-800 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto text-red-500 mb-1" />
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-700 dark:text-zinc-300 leading-tight">
                {product.shippingInformation || 'Fast Delivery'}
              </p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto text-rose-500 mb-1" />
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-700 dark:text-zinc-300 leading-tight">
                {product.warrantyInformation || 'Warranty Included'}
              </p>
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto text-amber-500 mb-1" />
              <p className="text-[9px] sm:text-[10px] font-bold text-zinc-700 dark:text-zinc-300 leading-tight">
                {product.returnPolicy || '7 Days Return'}
              </p>
            </div>
          </div>
        </div>

        {/* Product details column */}
        <div className="p-4 sm:p-6 flex flex-col">
          {/* Header metadata */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 capitalize">
              {formatCategoryName(product.category)}
            </span>
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {product.brand || 'StockForge Brand'}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">SKU: {product.sku || `PRD-${product.id}`}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight mb-2">
            {product.title}
          </h2>

          {/* Reviews summary */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                {product.rating?.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-zinc-400">
              ({product.reviews?.length || 0} verified customer reviews)
            </span>
          </div>

          {/* Price box */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 mb-5">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-zinc-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-base text-zinc-400 line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-red-600 dark:text-red-400">
                    Save {formatCurrency(savings)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stock status & progress bar */}
          <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                Inventory Availability
              </span>
              <StockBadge stock={product.stock} />
            </div>
            <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
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
            <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
              <span>{product.stock} units remaining in warehouse</span>
              <span>MOQ: {product.minimumOrderQuantity || 1} units</span>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 px-3 text-xs font-bold transition cursor-pointer border-b-2 ${
                activeTab === 'specs'
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Specifications & Dimensions
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 px-3 text-xs font-bold transition cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <span>Customer Reviews</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {product.reviews?.length || 0}
              </span>
            </button>
          </div>

          {/* Specifications tab */}
          {activeTab === 'specs' && (
            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase">Width</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {product.dimensions?.width || '—'} cm
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase">Height</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {product.dimensions?.height || '—'} cm
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase">Depth</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {product.dimensions?.depth || '—'} cm
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-400 block text-[10px] uppercase">Weight</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {product.weight || '—'} kg
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5">
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-zinc-400">Barcode</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">
                    {product.meta?.barcode || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span className="text-zinc-400">Stock Availability</span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {product.availabilityStatus || 'Available'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Tags</span>
                  <span className="text-zinc-700 dark:text-zinc-300 capitalize">
                    {product.tags?.join(', ') || 'None'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Reviews tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-[10px]">
                          {rev.reviewerName?.charAt(0) || 'U'}
                        </div>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200">
                          {rev.reviewerName}
                        </span>
                      </div>
                      <span className="text-zinc-400 text-[10px]">{formatDate(rev.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-300 dark:text-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 italic">"{rev.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-400 italic">No reviews yet for this product.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal wrapper with keyboard escape listener
export function ProductDetailModal({ product, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-zinc-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <ProductModalContent key={product.id} product={product} onClose={onClose} />
    </div>
  );
}
