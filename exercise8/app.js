const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Import routes
const storeRoutes = require("./routes/storeRoutes");

const app = express();
const PORT = process.env.PORT || 3010;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Module 5 Lab - Complete API Documentation",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for all Module 5 Lab exercises including Calculator API, Friends API, and eCommerce Store API",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3010",
        description: "Development server (Exercise 8 - eCommerce API)",
      },
      {
        url: "http://localhost:3004",
        description: "Calculator API (Exercise 2)",
      },
      {
        url: "http://localhost:3005",
        description: "Calculator with Portfolio (Exercise 3)",
      },
      {
        url: "http://localhost:3006",
        description: "Friends API (Exercise 4)",
      },
      {
        url: "http://localhost:3007",
        description: "Friends API with MVC (Exercise 5)",
      },
      {
        url: "http://localhost:3008",
        description: "Calculator with Tests (Exercise 6)",
      },
      {
        url: "http://localhost:3009",
        description: "Enhanced Calculator with Libraries (Exercise 7)",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Product ID",
            },
            title: {
              type: "string",
              description: "Product title",
            },
            price: {
              type: "number",
              format: "float",
              description: "Product price",
            },
            description: {
              type: "string",
              description: "Product description",
            },
            category: {
              type: "string",
              description: "Product category",
            },
            image: {
              type: "string",
              format: "uri",
              description: "Product image URL",
            },
            rating: {
              type: "object",
              properties: {
                rate: {
                  type: "number",
                  format: "float",
                },
                count: {
                  type: "integer",
                },
              },
            },
          },
        },
        Friend: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Friend ID",
            },
            name: {
              type: "string",
              description: "Friend name",
            },
            age: {
              type: "integer",
              description: "Friend age",
            },
            gender: {
              type: "string",
              enum: ["male", "female", "other"],
              description: "Friend gender",
            },
            email: {
              type: "string",
              format: "email",
              description: "Friend email address",
            },
          },
        },
        CalculationResult: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Calculation ID",
            },
            operation: {
              type: "string",
              description: "Type of operation performed",
            },
            operands: {
              type: "array",
              items: {
                type: "number",
              },
              description: "Numbers used in calculation",
            },
            result: {
              type: "number",
              description: "Calculation result",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              description: "When the calculation was performed",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
            code: {
              type: "string",
              description: "Error code",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Serve the eCommerce store portfolio
 *     description: Returns the main HTML page for the fake eCommerce store
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: HTML page served successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns server health status
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "healthy"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 */
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
