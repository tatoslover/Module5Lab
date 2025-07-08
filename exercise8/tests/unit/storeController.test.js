// Mock axios before importing storeController
jest.mock('axios');
const axios = require('axios');
const storeController = require('../../controllers/storeController');

describe('StoreController Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    // Create fresh mock req/res objects for each test
    req = {
      params: {},
      query: {},
      body: {},
      headers: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };

    // Clear mocks
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products successfully', async () => {
      const mockProducts = [
        { id: 1, title: 'Product 1', price: 10.99, category: 'electronics' },
        { id: 2, title: 'Product 2', price: 15.99, category: 'clothing' }
      ];

      axios.get.mockResolvedValue({ data: mockProducts });

      await storeController.getAllProducts(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 2,
          data: mockProducts
        })
      );
    });

    it('should handle limit parameter', async () => {
      req.query.limit = '5';
      const mockProducts = [{ id: 1, title: 'Product 1' }];

      axios.get.mockResolvedValue({ data: mockProducts });

      await storeController.getAllProducts(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
    });


  });

  describe('getCategories', () => {
    it('should return all categories successfully', async () => {
      const mockCategories = ['electronics', 'clothing', 'books'];

      axios.get.mockResolvedValue({ data: mockCategories });

      await storeController.getCategories(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 3,
          data: mockCategories
        })
      );
    });


  });

  describe('getProductById', () => {
    it('should return single product successfully', async () => {
      req.params.id = '1';
      const mockProduct = { id: 1, title: 'Product 1', price: 10.99 };

      axios.get.mockResolvedValue({ data: mockProduct });

      await storeController.getProductById(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProduct
        })
      );
    });

    it('should return 400 for invalid product ID', async () => {
      req.params.id = 'invalid';

      await storeController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Invalid product ID. Must be a number.'
        })
      );
    });

    it('should return 404 for non-existent product', async () => {
      req.params.id = '999';
      const error = new Error('Product not found');
      error.response = { status: 404 };

      axios.get.mockRejectedValue(error);

      await storeController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Product not found'
        })
      );
    });
  });

  describe('getProductsByCategory', () => {
    it('should return products by category successfully', async () => {
      req.params.category = 'electronics';
      const mockProducts = [
        { id: 1, title: 'Product 1', category: 'electronics' },
        { id: 2, title: 'Product 2', category: 'electronics' }
      ];

      axios.get.mockResolvedValue({ data: mockProducts });

      await storeController.getProductsByCategory(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products/category/electronics');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          category: 'electronics',
          count: 2,
          data: mockProducts
        })
      );
    });

    it('should return 404 for non-existent category', async () => {
      req.params.category = 'nonexistent';
      const error = new Error('Category not found');
      error.response = { status: 404 };

      axios.get.mockRejectedValue(error);

      await storeController.getProductsByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('Category not found')
        })
      );
    });
  });

  describe('getLimitedProducts', () => {
    it('should return limited products successfully', async () => {
      req.params.limit = '5';
      const mockProducts = Array(5).fill(null).map((_, i) => ({ id: i + 1, title: `Product ${i + 1}` }));

      axios.get.mockResolvedValue({ data: mockProducts });

      await storeController.getLimitedProducts(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5');
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          limit: 5,
          count: 5,
          data: mockProducts
        })
      );
    });

    it('should return 400 for invalid limit', async () => {
      req.params.limit = '25';

      await storeController.getLimitedProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Limit must be a number between 1 and 20'
        })
      );
    });
  });

  describe('searchProducts', () => {
    it('should search products successfully', async () => {
      req.query.q = 'test';
      const mockProducts = [
        { id: 1, title: 'Test Product', description: 'A test product', price: 10.99 },
        { id: 2, title: 'Another Product', description: 'Contains test keyword', price: 15.99 }
      ];

      axios.get.mockResolvedValue({ data: mockProducts });

      await storeController.searchProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          query: 'test',
          count: 2,
          data: mockProducts
        })
      );
    });

    it('should return 400 for missing search query', async () => {
      await storeController.searchProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Search query is required'
        })
      );
    });
  });

  describe('clearCache', () => {
    it('should clear cache successfully', async () => {
      await storeController.clearCache(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Cache cleared successfully'
        })
      );
    });
  });

  describe('getCacheStatus', () => {
    it('should return cache status', async () => {
      await storeController.getCacheStatus(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          cache: expect.objectContaining({
            size: expect.any(Number),
            timeout: expect.any(Number),
            entries: expect.any(Array)
          })
        })
      );
    });
  });
});