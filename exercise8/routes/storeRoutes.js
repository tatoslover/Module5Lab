const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

router.get("/products", storeController.getAllProducts.bind(storeController));

router.get(
  "/products/categories",
  storeController.getCategories.bind(storeController),
);

router.get(
  "/products/limit/:limit",
  storeController.getLimitedProducts.bind(storeController),
);

router.get(
  "/products/search",
  storeController.searchProducts.bind(storeController),
);

router.get(
  "/products/category/:category",
  storeController.getProductsByCategory.bind(storeController),
);

router.get(
  "/products/:id",
  storeController.getProductById.bind(storeController),
);

router.post("/cache/clear", storeController.clearCache.bind(storeController));

router.get(
  "/cache/status",
  storeController.getCacheStatus.bind(storeController),
);

module.exports = router;
