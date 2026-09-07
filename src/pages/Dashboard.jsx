import React from 'react';
import { FilterBar } from '../components/dashboard/FilterBar';
import { ProductCard } from '../components/products/ProductCard';
import { ProductTable } from '../components/products/ProductTable';
import { Pagination } from '../components/products/Pagination';
import { ProductDetailModal } from '../components/products/ProductDetailModal';
import { ProductCardSkeleton, ProductTableSkeleton } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { AlertTriangle, Package, CheckCircle2, XCircle } from 'lucide-react';

export function Dashboard({ productsState }) {
  const {
    products,
    totalResults,
    categories,
    loading,
    error,
    refreshData,
    stats,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    stockFilter,
    setStockFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    activeFiltersCount,
    resetFilters,
    selectedProduct,
    isModalOpen,
    openProductModal,
    closeProductModal,
    connectApi,
  } = productsState;

  const healthyStockCount = Math.max(
    0,
    (stats?.totalProducts || 0) - (stats?.lowStockCount || 0) - (stats?.outOfStockCount || 0)
  );

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6 animate-fade-in">
      {/* Catalog header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex-shrink-0">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                {stockFilter === 'lowStock'
                  ? 'Low Stock Warnings'
                  : stockFilter === 'healthyStock'
                  ? 'Healthy Stock Inventory'
                  : stockFilter === 'outOfStock'
                  ? 'Out of Stock Inventory'
                  : 'Product Catalog'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                {stockFilter === 'lowStock'
                  ? `Showing ${totalResults} products requiring immediate restocking (≤ 15 units).`
                  : stockFilter === 'healthyStock'
                  ? `Showing ${totalResults} healthy stock products ready for fulfillment (> 15 units).`
                  : stockFilter === 'outOfStock'
                  ? `Showing ${totalResults} out of stock products.`
                  : `Browse, filter, and inspect all ${stats?.totalProducts || 0} catalog products.`}
              </p>
            </div>
          </div>
        </div>

        {/* Clear stock filter */}
        {stockFilter !== 'all' && (
          <button
            onClick={() => setStockFilter('all')}
            className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
          >
            Show All Products
          </button>
        )}
      </div>

      {/* Interactive KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <button
          onClick={() => setStockFilter('all')}
          className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'all'
              ? 'bg-red-50/80 dark:bg-red-950/40 border-red-500/50 shadow-xs ring-2 ring-red-500/20'
              : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total Products</span>
            <Package className={`w-4 h-4 ${stockFilter === 'all' ? 'text-red-600 dark:text-red-400' : 'text-zinc-400'}`} />
          </div>
          <p className="text-xl font-black text-zinc-900 dark:text-white">{stats?.totalProducts || 0}</p>
        </button>

        <button
          onClick={() => setStockFilter('healthyStock')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'healthyStock'
              ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500/50 shadow-xs ring-2 ring-teal-500/20'
              : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Healthy Stock</span>
            <CheckCircle2 className={`w-4 h-4 ${stockFilter === 'healthyStock' ? 'text-teal-600 dark:text-teal-400' : 'text-zinc-400'}`} />
          </div>
          <p className="text-xl font-black text-zinc-900 dark:text-white">{healthyStockCount}</p>
        </button>

        <button
          onClick={() => setStockFilter('lowStock')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'lowStock'
              ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500/50 shadow-xs ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Stock Warnings</span>
            <AlertTriangle className={`w-4 h-4 ${stockFilter === 'lowStock' ? 'text-amber-500' : 'text-zinc-400'}`} />
          </div>
          <p className="text-xl font-black text-zinc-900 dark:text-white">{stats?.lowStockCount || 0}</p>
        </button>

        <button
          onClick={() => setStockFilter('outOfStock')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'outOfStock'
              ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500/50 shadow-xs ring-2 ring-rose-500/20'
              : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Out of Stock</span>
            <XCircle className={`w-4 h-4 ${stockFilter === 'outOfStock' ? 'text-rose-500' : 'text-zinc-400'}`} />
          </div>
          <p className="text-xl font-black text-zinc-900 dark:text-white">{stats?.outOfStockCount || 0}</p>
        </button>
      </div>

      {/* Filter and control bar */}
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={totalResults}
        activeFiltersCount={activeFiltersCount}
        onResetFilters={resetFilters}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
      />

      {/* Product content */}
      {error ? (
        <ErrorState error={error} onRetry={connectApi || refreshData} />
      ) : loading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ProductTableSkeleton />
        )
      ) : totalResults === 0 ? (
        <EmptyState
          title="No Products Match Your Criteria"
          message="Try modifying your search query, adjusting the price sliders, or clearing some active filters."
          onReset={resetFilters}
        />
      ) : (
        <>
          {/* Products grid / table view */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={openProductModal}
                />
              ))}
            </div>
          ) : (
            <ProductTable
              products={products}
              onSelectProduct={openProductModal}
            />
          )}

          {/* Pagination controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            totalResults={totalResults}
          />
        </>
      )}

      {/* Product detail modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  );
}
