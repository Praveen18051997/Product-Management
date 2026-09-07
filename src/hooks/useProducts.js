import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAllProducts, fetchCategories } from '../api/productService';

export function useProducts() {
  // Data & API states
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isApiConnected, setIsApiConnected] = useState(true);

  // Filter & search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // View & pagination states
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Modal detail state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Disconnect API (simulates error)
  const disconnectApi = useCallback(() => {
    setIsApiConnected(false);
    setError('API connection severed. Unable to communicate with DummyJSON endpoint (Simulated Disconnected State).');
  }, []);

  // Connect / reconnect API
  const connectApi = useCallback(async () => {
    setIsApiConnected(true);
    setError(null);
    setRefreshing(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ]);
      setAllProducts(productsData.products || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error('Failed to reconnect and load data:', err);
      setError(err.message || 'Failed to reconnect. Please check your internet connection.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Toggle API connection
  const toggleApiConnection = useCallback(() => {
    if (isApiConnected) {
      disconnectApi();
    } else {
      connectApi();
    }
  }, [isApiConnected, disconnectApi, connectApi]);

  // Initial data fetch
  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchAllProducts(), fetchCategories()])
      .then(([productsData, categoriesData]) => {
        if (!isMounted) return;
        setAllProducts(productsData.products || []);
        setCategories(categoriesData || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Failed to load data:', err);
        setError(err.message || 'Failed to load products. Please check your internet connection.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync / refresh data
  const refreshData = useCallback(async () => {
    if (!isApiConnected) {
      setError('Cannot sync data while API is disconnected. Please reconnect the API to resume live synchronization.');
      return;
    }
    try {
      setRefreshing(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ]);
      setAllProducts(productsData.products || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error('Failed to refresh data:', err);
      setError(err.message || 'Failed to refresh products. Please check your internet connection.');
    } finally {
      setRefreshing(false);
    }
  }, [isApiConnected]);

  // Filter setters (resets to page 1)
  const handleSetSearchQuery = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSetSelectedCategory = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleSetMinPrice = useCallback((min) => {
    setMinPrice(min);
    setCurrentPage(1);
  }, []);

  const handleSetMaxPrice = useCallback((max) => {
    setMaxPrice(max);
    setCurrentPage(1);
  }, []);

  const handleSetStockFilter = useCallback((stock) => {
    setStockFilter(stock);
    setCurrentPage(1);
  }, []);

  const handleSetSortBy = useCallback((sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const handleSetItemsPerPage = useCallback((count) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  }, []);

  // Calculate inventory metrics
  const stats = useMemo(() => {
    if (!allProducts.length) {
      return {
        totalProducts: 0,
        lowStockCount: 0,
        outOfStockCount: 0,
        avgRating: '0.00',
        avgPrice: '0.00',
        totalInventoryValue: '0.00',
        totalCategories: 0,
      };
    }

    let lowStock = 0;
    let outOfStock = 0;
    let sumRating = 0;
    let sumPrice = 0;
    let sumInventoryValue = 0;

    allProducts.forEach((p) => {
      const stock = Number(p.stock) || 0;
      const price = Number(p.price) || 0;
      const rating = Number(p.rating) || 0;

      if (stock === 0) outOfStock++;
      else if (stock <= 15) lowStock++;

      sumRating += rating;
      sumPrice += price;
      sumInventoryValue += price * stock;
    });

    const total = allProducts.length;

    return {
      totalProducts: total,
      lowStockCount: lowStock,
      outOfStockCount: outOfStock,
      avgRating: total > 0 ? (sumRating / total).toFixed(2) : '0.00',
      avgPrice: total > 0 ? (sumPrice / total).toFixed(2) : '0.00',
      totalInventoryValue: sumInventoryValue.toFixed(2),
      totalCategories: categories.length,
    };
  }, [allProducts, categories]);

  // Global price bounds
  const priceBounds = useMemo(() => {
    if (!allProducts.length) return { min: 0, max: 2000 };
    let min = Infinity;
    let max = -Infinity;
    allProducts.forEach((p) => {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    });
    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [allProducts]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(q);
        const brandMatch = p.brand?.toLowerCase().includes(q);
        const categoryMatch = p.category?.toLowerCase().includes(q);
        const tagsMatch = p.tags?.some((tag) => tag.toLowerCase().includes(q));
        return titleMatch || brandMatch || categoryMatch || tagsMatch;
      });
    }

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range
    if (minPrice !== '' && !isNaN(Number(minPrice))) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '' && !isNaN(Number(maxPrice))) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // Stock level
    if (stockFilter === 'healthyStock') {
      result = result.filter((p) => (p.stock || 0) > 15);
    } else if (stockFilter === 'lowStock') {
      result = result.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 15);
    } else if (stockFilter === 'outOfStock') {
      result = result.filter((p) => (p.stock || 0) === 0);
    } else if (stockFilter === 'inStock') {
      result = result.filter((p) => (p.stock || 0) > 0);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating-asc':
          return (a.rating || 0) - (b.rating || 0);
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'stock-asc':
          return (a.stock || 0) - (b.stock || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [allProducts, searchQuery, selectedCategory, minPrice, maxPrice, stockFilter, sortBy]);

  // Paginated product slice
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Active filter tally
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCategory !== 'all') count++;
    if (minPrice !== '') count++;
    if (maxPrice !== '') count++;
    if (stockFilter !== 'all') count++;
    if (sortBy !== 'default') count++;
    return count;
  }, [searchQuery, selectedCategory, minPrice, maxPrice, stockFilter, sortBy]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setStockFilter('all');
    setSortBy('default');
    setCurrentPage(1);
  }, []);

  // Modal actions
  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeProductModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  return {
    allProducts,
    categories,
    loading,
    refreshing,
    error,
    refreshData,
    isApiConnected,
    connectApi,
    disconnectApi,
    toggleApiConnection,
    stats,
    priceBounds,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    selectedCategory,
    setSelectedCategory: handleSetSelectedCategory,
    minPrice,
    setMinPrice: handleSetMinPrice,
    maxPrice,
    setMaxPrice: handleSetMaxPrice,
    stockFilter,
    setStockFilter: handleSetStockFilter,
    sortBy,
    setSortBy: handleSetSortBy,
    activeFiltersCount,
    resetFilters,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage: handleSetItemsPerPage,
    totalPages,
    totalResults: filteredProducts.length,
    products: paginatedProducts,
    selectedProduct,
    isModalOpen,
    openProductModal,
    closeProductModal,
  };
}
