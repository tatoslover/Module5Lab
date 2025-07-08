const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Import routes
const storeRoutes = require("./routes/storeRoutes");

const app = express();
const PORT = process.env.PORT || 3010;

// Load Swagger specification from YAML file
const swaggerSpec = YAML.load(path.join(__dirname, "swagger.yaml"));

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Module 5 Lab - API Documentation",
  }),
);

// API Routes
app.use("/api", storeRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "Module 5 Lab - Exercise 8 eCommerce API",
  });
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    code: "NOT_FOUND",
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== "production";

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_ERROR",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// Start server only when not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("🚀 Module 5 Lab - Exercise 8: eCommerce API Server");
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🛍️  eCommerce Store: http://localhost:${PORT}`);
    console.log("");
    console.log("Available API Endpoints:");
    console.log("• GET  /api/products              - Get all products");
    console.log("• GET  /api/products/categories   - Get all categories");
    console.log("• GET  /api/products/:id          - Get product by ID");
    console.log(
      "• GET  /api/products/category/:category - Get products by category",
    );
    console.log("• GET  /health                    - Health check");
    console.log("• GET  /api-docs                  - Swagger documentation");
  });
}

module.exports = app;
