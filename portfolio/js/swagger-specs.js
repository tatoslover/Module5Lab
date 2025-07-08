// Embedded Swagger Specifications for Module 5 Lab
// This file contains all swagger specs as JavaScript objects to avoid CORS issues

const swaggerSpecs = {
  1: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 1 - Multiple Web Servers API",
      version: "1.0.0",
      description:
        "API documentation for Exercise 1 which demonstrates multiple Express.js servers running on different ports. This exercise includes three independent servers (ports 3001, 3002, 3003) each with their own endpoints.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
      license: {
        name: "MIT",
      },
    },

    tags: [
      {
        name: "Server Management",
        description: "Multi-port server operations",
      },
      {
        name: "System",
        description: "System health and information",
      },
    ],
    paths: {
      "/": {
        get: {
          tags: ["Server Management"],
          summary: "Server 1 Welcome",
          description: "Returns welcome message from Server 1",
          responses: {
            200: {
              description: "Welcome message from Server 1",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      server: { type: "string" },
                      port: { type: "integer" },
                    },
                  },
                  example: {
                    message:
                      "Welcome to Exercise 1 - Multi-Port Server Management!",
                    server: "Mock Server 1",
                    port: 3001,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/health": {
        get: {
          tags: ["System"],
          summary: "Health Check",
          description: "Returns server health status",
          responses: {
            200: {
              description: "Server health information",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string" },
                      timestamp: { type: "string" },
                      uptime: { type: "number" },
                    },
                  },
                  example: {
                    status: "healthy",
                    server: "Mock Server 1",
                    port: 3001,
                    uptime: 3600,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  2: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 2 - Basic Calculator API",
      version: "1.0.0",
      description:
        "API documentation for Exercise 2 which implements a basic Calculator API using Express.js. This API provides simple arithmetic operations with query parameters and basic error handling.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
      license: {
        name: "MIT",
      },
    },

    tags: [
      {
        name: "Calculator",
        description: "Basic arithmetic operations",
      },
    ],
    paths: {
      "/calculator/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition Operation",
          description: "Performs addition of two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 5,
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 3,
            },
          ],
          responses: {
            200: {
              description: "Addition result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 5,
                    num2: 3,
                    result: 8,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/calculator/subtract": {
        get: {
          tags: ["Calculator"],
          summary: "Subtraction Operation",
          description: "Performs subtraction of two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 10,
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 4,
            },
          ],
          responses: {
            200: {
              description: "Subtraction result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "subtraction",
                    num1: 10,
                    num2: 4,
                    result: 6,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/calculator/multiply": {
        get: {
          tags: ["Calculator"],
          summary: "Multiplication Operation",
          description: "Performs multiplication of two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 6,
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 7,
            },
          ],
          responses: {
            200: {
              description: "Multiplication result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "multiplication",
                    num1: 6,
                    num2: 7,
                    result: 42,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/calculator/divide": {
        get: {
          tags: ["Calculator"],
          summary: "Division Operation",
          description: "Performs division of two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 20,
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              example: 4,
            },
          ],
          responses: {
            200: {
              description: "Division result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "division",
                    num1: 20,
                    num2: 4,
                    result: 5,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  3: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 3 - Calculator with Portfolio Integration",
      version: "1.0.0",
      description:
        "API documentation for Exercise 3 which extends the basic calculator with portfolio integration and static file serving.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },

    tags: [
      {
        name: "Calculator",
        description: "Basic arithmetic operations",
      },
      {
        name: "Portfolio",
        description: "Static file serving",
      },
    ],
    paths: {
      "/": {
        get: {
          tags: ["Portfolio"],
          summary: "Serve Portfolio",
          description: "Serves the main portfolio page",
          responses: {
            200: {
              description: "Portfolio HTML page",
              content: {
                "text/html": {
                  schema: { type: "string" },
                  example:
                    "<!DOCTYPE html><html><head><title>Portfolio</title></head><body><h1>Welcome to My Portfolio</h1></body></html>",
                },
              },
            },
          },
        },
      },
      "/calculator/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition Operation",
          description: "Performs addition of two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
            },
          ],
          responses: {
            200: {
              description: "Addition result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 15,
                    num2: 25,
                    result: 40,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  4: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 4 - Friends API",
      version: "1.0.0",
      description:
        "API documentation for Exercise 4 which implements a Friends management API with CRUD operations, filtering, and validation.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },

    tags: [
      {
        name: "Friends",
        description: "Friends management operations",
      },
    ],
    paths: {
      "/friends": {
        get: {
          tags: ["Friends"],
          summary: "Get All Friends",
          description: "Retrieves the complete list of friends",
          responses: {
            200: {
              description: "List of all friends",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      count: { type: "integer" },
                      friends: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            gender: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                  example: {
                    message: "Retrieved all friends successfully",
                    count: 5,
                    friends: [
                      { id: 1, name: "John Doe", gender: "male" },
                      { id: 2, name: "Jane Smith", gender: "female" },
                      { id: 3, name: "James Smith", gender: "male" },
                      { id: 4, name: "Emily Johnson", gender: "female" },
                      { id: 5, name: "Michael Brown", gender: "male" },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Friends"],
          summary: "Add New Friend",
          description: "Creates a new friend record",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "gender"],
                  properties: {
                    name: { type: "string" },
                    gender: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Friend added successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      friend: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          name: { type: "string" },
                          gender: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    message: "Friend added successfully",
                    friend: {
                      id: 6,
                      name: "Alice Johnson",
                      gender: "female",
                    },
                    totalFriends: 6,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/friends/filter": {
        get: {
          tags: ["Friends"],
          summary: "Filter Friends",
          description: "Filters friends by gender and/or first letter of name",
          parameters: [
            {
              name: "gender",
              in: "query",
              required: false,
              schema: { type: "string" },
            },
            {
              name: "letter",
              in: "query",
              required: false,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Filtered friends list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      count: { type: "integer" },
                      filters: { type: "object" },
                      friends: { type: "array" },
                    },
                  },
                  example: {
                    message: "Friends filtered successfully",
                    count: 2,
                    filters: { gender: "male", letter: "J" },
                    friends: [
                      { id: 1, name: "John Doe", gender: "male" },
                      { id: 3, name: "James Smith", gender: "male" },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  5: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 5 - Friends API (MVC Architecture)",
      version: "1.0.0",
      description:
        "API documentation for Exercise 5 which implements Friends API with professional MVC architecture and enhanced responses.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },

    tags: [
      {
        name: "Friends",
        description: "Friends management with MVC architecture",
      },
    ],
    paths: {
      "/friends": {
        get: {
          tags: ["Friends"],
          summary: "Get All Friends (MVC)",
          description:
            "Retrieves all friends with enhanced MVC response format",
          responses: {
            200: {
              description: "Enhanced friends list with metadata",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      count: { type: "integer" },
                      friends: { type: "array" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Retrieved all friends successfully (MVC)",
                    count: 5,
                    friends: [
                      { id: 1, name: "John Doe", gender: "male" },
                      { id: 2, name: "Jane Smith", gender: "female" },
                      { id: 3, name: "James Smith", gender: "male" },
                      { id: 4, name: "Emily Johnson", gender: "female" },
                      { id: 5, name: "Michael Brown", gender: "male" },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Friends"],
          summary: "Add New Friend (MVC)",
          description: "Creates a new friend with enhanced validation",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "gender"],
                  properties: {
                    name: { type: "string" },
                    gender: {
                      type: "string",
                      enum: ["male", "female", "other"],
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Friend added with enhanced response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      friend: { type: "object" },
                      totalFriends: { type: "integer" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Friend added successfully (MVC)",
                    friend: {
                      id: 6,
                      name: "Sarah Wilson",
                      gender: "female",
                    },
                    totalFriends: 6,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  6: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 6 - Calculator API with Tests",
      version: "1.0.0",
      description:
        "API documentation for Exercise 6 which implements Calculator API with comprehensive Jest testing coverage.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },

    tags: [
      {
        name: "Calculator",
        description: "Tested arithmetic operations",
      },
    ],
    paths: {
      "/calculator/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition with Test Coverage",
          description: "Performs addition with comprehensive test coverage",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
            },
          ],
          responses: {
            200: {
              description: "Addition result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 15,
                    num2: 25,
                    result: 40,
                    testCoverage: "100%",
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  7: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 7 - Enhanced Calculator with Libraries",
      version: "1.0.0",
      description:
        "API documentation for Exercise 7 which implements Enhanced Calculator with advanced logging and custom libraries.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },

    tags: [
      {
        name: "Calculator",
        description: "Enhanced arithmetic with logging",
      },
    ],
    paths: {
      "/calculator/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition with Enhanced Logging",
          description:
            "Performs addition with comprehensive logging and validation",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
            },
          ],
          responses: {
            200: {
              description: "Addition result with logging",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 12,
                    num2: 18,
                    result: 30,
                    logLevel: "INFO",
                    executionTime: "2ms",
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  8: {
    openapi: "3.0.0",
    info: {
      title: "Exercise 8 - eCommerce Store API",
      version: "1.0.0",
      description:
        "API documentation for Exercise 8 which implements a comprehensive eCommerce Store API with product management, search, and caching.",
      contact: {
        name: "Samuel Love",
        email: "samuelwelove@icloud.com",
      },
    },

    tags: [
      {
        name: "Products",
        description: "Product management",
      },
      {
        name: "Categories",
        description: "Product categories",
      },
    ],
    paths: {
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get All Products",
          description: "Retrieves all products from the store",
          parameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer", minimum: 1, maximum: 20 },
            },
          ],
          responses: {
            200: {
              description: "Products retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      count: { type: "integer" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            title: { type: "string" },
                            price: { type: "number" },
                            category: { type: "string" },
                            image: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    count: 3,
                    data: [
                      {
                        id: 1,
                        title: "Fjallraven - Foldsack No. 1 Backpack",
                        price: 109.95,
                        category: "men's clothing",
                        description: "Your perfect pack for everyday use",
                        image:
                          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                      },
                      {
                        id: 2,
                        title: "Mens Casual Premium Slim Fit T-Shirts",
                        price: 22.3,
                        category: "men's clothing",
                        description: "Slim-fitting style for men",
                        image:
                          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                      },
                      {
                        id: 3,
                        title: "Mens Cotton Jacket",
                        price: 55.99,
                        category: "men's clothing",
                        description: "Great outerwear for men",
                        image:
                          "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                      },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/api/products/categories": {
        get: {
          tags: ["Categories"],
          summary: "Get All Categories",
          description: "Retrieves all product categories",
          responses: {
            200: {
              description: "Categories retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      count: { type: "integer" },
                      data: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                  example: {
                    success: true,
                    count: 4,
                    data: [
                      "electronics",
                      "jewelery",
                      "men's clothing",
                      "women's clothing",
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/api/products/search": {
        get: {
          tags: ["Products"],
          summary: "Search Products",
          description: "Search products by title and description",
          parameters: [
            {
              name: "q",
              in: "query",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Search results",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      query: { type: "string" },
                      count: { type: "integer" },
                      data: { type: "array" },
                    },
                  },
                  example: {
                    success: true,
                    query: "backpack",
                    count: 1,
                    data: [
                      {
                        id: 1,
                        title: "Fjallraven - Foldsack No. 1 Backpack",
                        price: 109.95,
                        category: "men's clothing",
                        description:
                          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                        image:
                          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                      },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// Export for use in other files
window.swaggerSpecs = swaggerSpecs;
