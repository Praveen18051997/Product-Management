import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { OverviewView } from './components/dashboard/OverviewView';
import { CategoriesView } from './components/dashboard/CategoriesView';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { useProducts } from './hooks/useProducts';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const productsState = useProducts();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const {
    allProducts,
    categories,
    stats,
    searchQuery,
    setSearchQuery,
    refreshing,
    refreshData,
    selectedCategory,
    setSelectedCategory,
    setStockFilter,
    resetFilters,
    selectedProduct,
    isModalOpen,
    openProductModal,
    closeProductModal,
    isApiConnected,
    connectApi,
    toggleApiConnection,
    error,
  } = productsState;

  // Filter low stock products for notifications
  const lowStockProducts = useMemo(() => {
    return allProducts.filter((p) => (p.stock || 0) <= 15);
  }, [allProducts]);

  // Navigation handlers
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'overview') {
      resetFilters();
    } else if (tabId === 'low-stock') {
      setStockFilter('lowStock');
    } else if (tabId === 'products') {
      if (productsState.stockFilter === 'lowStock') {
        setStockFilter('all');
      }
    }
  };

  const handleSelectCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    setActiveTab('products');
  };

  const handleViewTotalProducts = () => {
    resetFilters();
    setActiveTab('products');
  };

  const handleViewHealthyStock = () => {
    resetFilters();
    setStockFilter('healthyStock');
    setActiveTab('products');
  };

  const handleViewLowStock = () => {
    resetFilters();
    setStockFilter('lowStock');
    setActiveTab('products');
  };

  const handleViewCategories = () => {
    setActiveTab('categories');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        stats={stats}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        categories={categories}
        isApiConnected={isApiConnected}
        onToggleApiConnection={toggleApiConnection}
      />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen lg:pl-64">
        {/* Header bar */}
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            if (activeTab !== 'products') setActiveTab('products');
          }}
          refreshing={refreshing}
          onRefresh={refreshData}
          theme={theme}
          onToggleTheme={toggleTheme}
          lowStockProducts={lowStockProducts}
          onSelectProduct={openProductModal}
          onViewAllLowStock={handleViewLowStock}
        />

        {/* Dynamic page view */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'overview' ? (
            <OverviewView
              allProducts={allProducts}
              stats={stats}
              categories={categories}
              onNavigateToProducts={handleViewTotalProducts}
              onNavigateToCategory={handleSelectCategory}
              onSelectProduct={openProductModal}
              onViewTotalProducts={handleViewTotalProducts}
              onViewHealthyStock={handleViewHealthyStock}
              onViewLowStock={handleViewLowStock}
              onViewCategories={handleViewCategories}
              error={error}
              onRetry={connectApi}
            />
          ) : activeTab === 'categories' ? (
            <CategoriesView
              categories={categories}
              allProducts={allProducts}
              onSelectCategory={handleSelectCategory}
              error={error}
              onRetry={connectApi}
            />
          ) : (
            <Dashboard productsState={productsState} />
          )}
        </main>
      </div>

      {/* Product detail modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeProductModal}
      />
    </div>
  );
}
