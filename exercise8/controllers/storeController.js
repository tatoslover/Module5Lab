const axios = require('axios');

class StoreController {
  constructor() {
    this.baseURL = 'https://fakestoreapi.com';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Helper method to get data with caching
  async fetchWithCache(url, cacheKey) {
    // Check if we have cached data
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        console.log(`📦 Serving from cache: ${cacheKey}`);
        return cached.data;
      }
    }

    try {
      console.log(`🌐 Fetching from API: ${url}`);
      const response = await axios.get(url);
      
      // Cache the response
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching ${url}:`, error.message);
      
      // Pass through the error with response info if available
      const enhancedError = new Error(`Failed to fetch data from external API: ${error.message}`);
      enhancedError.response = error.response;
      enhancedError.status = error.response?.status;
      throw enhancedError;
    }
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const { limit, sort } = req.query;
      let url = `${this.baseURL}/products`;
      
      // Add query parameters if provided
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit);
      if (sort) params.append('sort', sort);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const products = await this.fetchWithCache(url, `products_${params.toString()}`);
      
      res.json({
        success: true,
        count: products.length,
        data: products,
        cached: this.cache.has(`products_${params.toString()}`)
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'FETCH_PRODUCTS_ERROR'
      });
    }
  }

  // Get all categories
  async getCategories(req, res) {
    try {
      const url = `${this.baseURL}/products/categories`;
      const categories = await this.fetchWithCache(url, 'categories');
      
      res.json({
        success: true,
        count: categories.length,
        data: categories,
        cached: this.cache.has('categories')
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'FETCH_CATEGORIES_ERROR'
      });
    }
  }

  // Get single product by ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid product ID. Must be a number.',
          code: 'INVALID_PRODUCT_ID'
        });
      }

      const url = `${this.baseURL}/products/${id}`;
      const product = await this.fetchWithCache(url, `product_${id}`);
      
      if (!product || product.message === "Product not found") {
        return res.status(404).json({
          success: false,
          error: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        });
      }

      res.json({
        success: true,
        data: product,
        cached: this.cache.has(`product_${id}`)
      });
    } catch (error) {
      if (error.response?.status === 404 || error.status === 404) {
        return res.status(404).json({
          success: false,
          error: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'FETCH_PRODUCT_ERROR'
      });
    }
  }

  // Get products by category
  async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const { limit, sort } = req.query;
      
      if (!category) {
        return res.status(400).json({
          success: false,
          error: 'Category is required',
          code: 'MISSING_CATEGORY'
        });
      }

      // Build URL with query parameters
      let url = `${this.baseURL}/products/category/${encodeURIComponent(category)}`;
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit);
      if (sort) params.append('sort', sort);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const products = await this.fetchWithCache(url, `category_${category}_${params.toString()}`);
      
      if (!products || products.length === 0) {
        return res.status(404).json({
          success: false,
          error: `No products found in category: ${category}`,
          code: 'CATEGORY_NOT_FOUND'
        });
      }

      res.json({
        success: true,
        category: category,
        count: products.length,
        data: products,
        cached: this.cache.has(`category_${category}_${params.toString()}`)
      });
    } catch (error) {
      if (error.response?.status === 404 || error.status === 404) {
        return res.status(404).json({
          success: false,
          error: `Category not found: ${req.params.category}`,
          code: 'CATEGORY_NOT_FOUND'
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'FETCH_CATEGORY_ERROR'
      });
    }
  }

  // Get limited products (for performance testing)
  async getLimitedProducts(req, res) {
    try {
      const limit = req.params.limit || req.query.limit || 5;
      
      // Validate limit
      if (isNaN(limit) || limit < 1 || limit > 20) {
        return res.status(400).json({
          success: false,
          error: 'Limit must be a number between 1 and 20',
          code: 'INVALID_LIMIT'
        });
      }

      const url = `${this.baseURL}/products?limit=${limit}`;
      const products = await this.fetchWithCache(url, `limited_${limit}`);
      
      res.json({
        success: true,
        limit: parseInt(limit),
        count: products.length,
        data: products,
        cached: this.cache.has(`limited_${limit}`)
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'FETCH_LIMITED_ERROR'
      });
    }
  }

  // Search products (client-side filtering)
  async searchProducts(req, res) {
    try {
      const { q, category, minPrice, maxPrice } = req.query;
      
      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required',
          code: 'MISSING_SEARCH_QUERY'
        });
      }

      // Get all products first
      const allProducts = await this.fetchWithCache(`${this.baseURL}/products`, 'all_products');
      
      // Filter products based on search criteria
      let filteredProducts = allProducts.filter(product => {
        const matchesQuery = product.title.toLowerCase().includes(q.toLowerCase()) ||
                           product.description.toLowerCase().includes(q.toLowerCase());
        
        const matchesCategory = !category || product.category === category;
        
        const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
        const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
        
        return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
      });

      res.json({
        success: true,
        query: q,
        filters: {
          category: category || null,
          minPrice: minPrice ? parseFloat(minPrice) : null,
          maxPrice: maxPrice ? parseFloat(maxPrice) : null
        },
        count: filteredProducts.length,
        data: filteredProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        code: 'SEARCH_ERROR'
      });
    }
  }

  // Clear cache (for development/testing)
  clearCache(req, res) {
    this.cache.clear();
    res.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  }

  // Get cache status
  getCacheStatus(req, res) {
    const cacheKeys = Array.from(this.cache.keys());
    const cacheInfo = cacheKeys.map(key => {
      const cached = this.cache.get(key);
      return {
        key,
        age: Date.now() - cached.timestamp,
        expires: Math.max(0, this.cacheTimeout - (Date.now() - cached.timestamp))
      };
    });

    res.json({
      success: true,
      cache: {
        size: this.cache.size,
        timeout: this.cacheTimeout,
        entries: cacheInfo
      }
    });
  }
}

module.exports = new StoreController();