const BASE_URL = 'https://dummyjson.com';

// Fetch products with pagination options
export async function fetchProducts({ limit = 30, skip = 0, select = '' } = {}) {
  try {
    const url = new URL(`${BASE_URL}/products`);
    if (limit !== undefined) url.searchParams.append('limit', limit);
    if (skip !== undefined) url.searchParams.append('skip', skip);
    if (select) url.searchParams.append('select', select);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
}

// Fetch all products (limit=0)
export async function fetchAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=0`);
    if (!res.ok) {
      throw new Error(`Failed to fetch all products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchAllProducts:', error);
    throw error;
  }
}

// Fetch categories list
export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    throw error;
  }
}

// Search products by query
export async function searchProducts(query, { limit = 30, skip = 0 } = {}) {
  try {
    const url = new URL(`${BASE_URL}/products/search`);
    url.searchParams.append('q', query);
    if (limit !== undefined) url.searchParams.append('limit', limit);
    if (skip !== undefined) url.searchParams.append('skip', skip);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Failed to search products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in searchProducts:', error);
    throw error;
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category, { limit = 30, skip = 0 } = {}) {
  try {
    const url = new URL(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
    if (limit !== undefined) url.searchParams.append('limit', limit);
    if (skip !== undefined) url.searchParams.append('skip', skip);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Failed to fetch products for category ${category}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchProductsByCategory:', error);
    throw error;
  }
}

// Fetch single product by ID
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product #${id}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    throw error;
  }
}
