const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management and retrieval
 *   - name: Categories
 *     description: Product category operations
 *   - name: Search
 *     description: Product search functionality
 *   - name: Cache
 *     description: Cache management operations
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products from the fake store API with optional filtering
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *         description: Limit the number of products returned
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort products in ascending or descending order
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of products returned
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 cached:
 *                   type: boolean
 *                   description: Whether the data was served from cache
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/products', storeController.getAllProducts.bind(storeController));

/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     summary: Get all product categories
 *     description: Retrieve all available product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of categories
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["electronics", "jewelery", "men's clothing", "women's clothing"]
 *                 cached:
 *                   type: boolean
 *                   description: Whether the data was served from cache
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/products/categories', storeController.getCategories.bind(storeController));

/**
 * @swagger
 * /api/products/limit/{limit}:
 *   get:
 *     summary: Get limited number of products
 *     description: Retrieve a specific number of products (1-20)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *         description: Number of products to return
 *     responses:
 *       200:
 *         description: Limited products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 limit:
 *                   type: integer
 *                   description: The limit that was applied
 *                 count:
 *                   type: integer
 *                   description: Number of products returned
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 cached:
 *                   type: boolean
 *       400:
 *         description: Invalid limit parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/products/limit/:limit', storeController.getLimitedProducts.bind(storeController));

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     description: Search products by title, description, category, and price range
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query (searches in title and description)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: Search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 query:
 *                   type: string
 *                   description: The search query that was used
 *                 filters:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: string
 *                       nullable: true
 *                     minPrice:
 *                       type: number
 *                       nullable: true
 *                     maxPrice:
 *                       type: number
 *                       nullable: true
 *                 count:
 *                   type: integer
 *                   description: Number of products found
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Missing or invalid search query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/products/search', storeController.searchProducts.bind(storeController));

/**
 * @swagger
 * /api/products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieve all products from a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Product category name
 *         example: electronics
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Limit the number of products returned
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort products in ascending or descending order
 *     responses:
 *       200:
 *         description: Products from category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 category:
 *                   type: string
 *                   description: The category that was queried
 *                 count:
 *                   type: integer
 *                   description: Number of products in this category
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 cached:
 *                   type: boolean
 *       404:
 *         description: Category not found or no products in category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/products/category/:category', storeController.getProductsByCategory.bind(storeController));

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a single product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 cached:
 *                   type: boolean
 *                   description: Whether the data was served from cache
 *       400:
 *         description: Invalid product ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/products/:id', storeController.getProductById.bind(storeController));

/**
 * @swagger
 * /api/cache/clear:
 *   post:
 *     summary: Clear API cache
 *     description: Clear all cached API responses (development/testing purposes)
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: Cache cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cache cleared successfully"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.post('/cache/clear', storeController.clearCache.bind(storeController));

/**
 * @swagger
 * /api/cache/status:
 *   get:
 *     summary: Get cache status
 *     description: Get information about the current cache state
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: Cache status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cache:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: integer
 *                       description: Number of cached entries
 *                     timeout:
 *                       type: integer
 *                       description: Cache timeout in milliseconds
 *                     entries:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           key:
 *                             type: string
 *                             description: Cache key
 *                           age:
 *                             type: integer
 *                             description: Age of cached entry in milliseconds
 *                           expires:
 *                             type: integer
 *                             description: Time until expiry in milliseconds
 */
router.get('/cache/status', storeController.getCacheStatus.bind(storeController));

module.exports = router;