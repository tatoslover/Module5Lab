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
                      timestamp: { type: "string" },
                      activeConnections: { type: "integer" },
                      version: { type: "string" },
                    },
                  },
                  example: {
                    message:
                      "Welcome to Exercise 1 - Multi-Port Server Management!",
                    server: "Server 1",
                    port: 3001,
                    timestamp: "2024-01-15T10:30:00Z",
                    activeConnections: 42,
                    version: "1.0.0",
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
              description: "Server health status",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string" },
                      server: { type: "string" },
                      port: { type: "integer" },
                      uptime: { type: "integer" },
                      timestamp: { type: "string" },
                      checks: { type: "object" },
                    },
                  },
                  example: {
                    status: "healthy",
                    server: "Server 1",
                    port: 3001,
                    uptime: 3600,
                    timestamp: "2024-01-15T10:30:00Z",
                    checks: {
                      database: "connected",
                      memory: "95% available",
                      cpu: "12% usage",
                    },
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
        "Simple REST API for basic arithmetic operations with query parameters.",

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
      "/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition",
          description: "Adds two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number",
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
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 10,
                    num2: 5,
                    result: 15,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/subtract": {
        get: {
          tags: ["Calculator"],
          summary: "Subtraction",
          description: "Subtracts two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number",
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
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    operation: "subtraction",
                    num1: 20,
                    num2: 8,
                    result: 12,
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/multiply": {
        get: {
          tags: ["Calculator"],
          summary: "Multiplication",
          description: "Multiplies two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number",
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
                      timestamp: { type: "string" },
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
      "/divide": {
        get: {
          tags: ["Calculator"],
          summary: "Division",
          description: "Divides two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number (dividend)",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number (divisor)",
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
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    operation: "division",
                    num1: 50,
                    num2: 10,
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
        "Enhanced calculator API with integrated portfolio showcase and static file serving.",

      license: {
        name: "MIT",
      },
    },
    tags: [
      {
        name: "Calculator",
        description: "Basic arithmetic operations",
      },
      {
        name: "Portfolio",
        description: "Portfolio showcase endpoints",
      },
    ],
    paths: {
      "/": {
        get: {
          tags: ["Portfolio"],
          summary: "Portfolio Home",
          description: "Returns the portfolio homepage",
          responses: {
            200: {
              description: "Portfolio homepage",
              content: {
                "text/html": {
                  schema: {
                    type: "string",
                  },
                  example:
                    "<!DOCTYPE html><html><head><title>My Portfolio</title></head><body><h1>Welcome to My Portfolio</h1><p>This is a sample portfolio page served by Exercise 3.</p></body></html>",
                },
              },
            },
          },
        },
      },
      "/portfolio": {
        get: {
          tags: ["Portfolio"],
          summary: "Get All Portfolio Items",
          description: "Retrieves all portfolio items with project details",
          responses: {
            200: {
              description: "Portfolio items retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      count: { type: "number" },
                      items: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            title: { type: "string" },
                            description: { type: "string" },
                            technology: { type: "string" },
                            status: { type: "string" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    count: 3,
                    items: [
                      {
                        id: 1,
                        title: "Calculator API",
                        description: "RESTful calculator with basic operations",
                        technology: "Node.js, Express",
                        status: "completed",
                        createdAt: "2025-01-01T10:00:00Z",
                        updatedAt: "2025-01-07T15:30:00Z",
                      },
                      {
                        id: 2,
                        title: "Friends Management",
                        description: "CRUD API for managing friend data",
                        technology: "Node.js, Express, MVC",
                        status: "in-progress",
                        createdAt: "2025-01-02T09:15:00Z",
                        updatedAt: "2025-01-07T12:45:00Z",
                      },
                      {
                        id: 3,
                        title: "eCommerce Store",
                        description: "Full-featured online store API",
                        technology: "Node.js, Express, MongoDB",
                        status: "planning",
                        createdAt: "2025-01-03T14:20:00Z",
                        updatedAt: "2025-01-07T16:10:00Z",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Portfolio"],
          summary: "Create Portfolio Item",
          description: "Creates a new portfolio item",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "description", "technology"],
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    technology: { type: "string" },
                    status: {
                      type: "string",
                      enum: ["planning", "in-progress", "completed"],
                    },
                  },
                },
                example: {
                  title: "New Project",
                  description: "A new exciting project",
                  technology: "React, Node.js",
                  status: "planning",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Portfolio item created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      item: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          title: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          status: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio item created successfully",
                    item: {
                      id: 4,
                      title: "New Project",
                      description: "A new exciting project",
                      technology: "React, Node.js",
                      status: "planning",
                      createdAt: "2025-01-07T18:30:00Z",
                      updatedAt: "2025-01-07T18:30:00Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/portfolio/{id}": {
        get: {
          tags: ["Portfolio"],
          summary: "Get Portfolio Item",
          description: "Retrieves a specific portfolio item by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio item ID",
            },
          ],
          responses: {
            200: {
              description: "Portfolio item retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      item: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          title: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          status: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    item: {
                      id: 1,
                      title: "Calculator API",
                      description: "RESTful calculator with basic operations",
                      technology: "Node.js, Express",
                      status: "completed",
                      createdAt: "2025-01-01T10:00:00Z",
                      updatedAt: "2025-01-07T15:30:00Z",
                    },
                  },
                },
              },
            },
            404: {
              description: "Portfolio item not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                    },
                  },
                  example: {
                    success: false,
                    message: "Portfolio item not found",
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Portfolio"],
          summary: "Update Portfolio Item",
          description: "Updates an existing portfolio item",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio item ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    technology: { type: "string" },
                    status: {
                      type: "string",
                      enum: ["planning", "in-progress", "completed"],
                    },
                  },
                },
                example: {
                  title: "Updated Calculator API",
                  description:
                    "Enhanced RESTful calculator with advanced operations",
                  technology: "Node.js, Express, TypeScript",
                  status: "completed",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Portfolio item updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      item: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          title: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          status: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio item updated successfully",
                    item: {
                      id: 1,
                      title: "Updated Calculator API",
                      description:
                        "Enhanced RESTful calculator with advanced operations",
                      technology: "Node.js, Express, TypeScript",
                      status: "completed",
                      createdAt: "2025-01-01T10:00:00Z",
                      updatedAt: "2025-01-07T18:45:00Z",
                    },
                  },
                },
              },
            },
            404: {
              description: "Portfolio item not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                    },
                  },
                  example: {
                    success: false,
                    message: "Portfolio item not found",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Portfolio"],
          summary: "Delete Portfolio Item",
          description: "Deletes a portfolio item by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio item ID",
            },
          ],
          responses: {
            200: {
              description: "Portfolio item deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      deletedItemId: { type: "number" },
                      remainingItems: { type: "number" },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio item deleted successfully",
                    deletedItemId: 1,
                    remainingItems: 2,
                  },
                },
              },
            },
            404: {
              description: "Portfolio item not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                    },
                  },
                  example: {
                    success: false,
                    message: "Portfolio item not found",
                  },
                },
              },
            },
          },
        },
      },
      "/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition",
          description: "Adds two numbers",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number",
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
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 10,
                    num2: 5,
                    result: 15,
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
      title: "Exercise 4 - Friends Management API",
      version: "1.0.0",
      description:
        "Complete CRUD API for managing friends data with filtering, searching, and validation.",

      license: {
        name: "MIT",
      },
    },
    tags: [
      {
        name: "Friends",
        description: "Friends management operations",
      },
      {
        name: "Portfolio",
        description: "Portfolio project showcase",
      },
    ],
    paths: {
      "/friends": {
        get: {
          tags: ["Friends"],
          summary: "Get All Friends",
          description: "Retrieves all friends",
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
                            email: { type: "string" },
                          },
                        },
                      },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Retrieved all friends successfully",
                    count: 5,
                    friends: [
                      {
                        id: 1,
                        name: "John Doe",
                        gender: "male",
                        email: "john.doe@email.com",
                      },
                      {
                        id: 2,
                        name: "Jane Smith",
                        gender: "female",
                        email: "jane.smith@email.com",
                      },
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
          summary: "Add Friend",
          description: "Adds a new friend",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    gender: { type: "string" },
                    email: { type: "string" },
                  },
                  required: ["name", "gender", "email"],
                },
              },
            },
          },
          responses: {
            201: {
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
                          email: { type: "string" },
                        },
                      },
                      totalFriends: { type: "integer" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Friend added successfully",
                    friend: {
                      id: 6,
                      name: "Alice Johnson",
                      gender: "female",
                      email: "alice.johnson@email.com",
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
      "/friends/{id}": {
        get: {
          tags: ["Friends"],
          summary: "Get Friend by ID",
          description: "Retrieves a specific friend by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "Friend ID",
            },
          ],
          responses: {
            200: {
              description: "Friend found",
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
                          email: { type: "string" },
                        },
                      },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Friend found with ID 1",
                    friend: {
                      id: 1,
                      name: "John Doe",
                      gender: "male",
                      email: "john.doe@email.com",
                    },
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Friends"],
          summary: "Update Friend",
          description: "Updates an existing friend",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "Friend ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    gender: { type: "string" },
                    email: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Friend updated successfully",
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
                          email: { type: "string" },
                        },
                      },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Friend updated successfully",
                    friend: {
                      id: 1,
                      name: "John Updated",
                      gender: "male",
                      email: "john.updated@email.com",
                    },
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Friends"],
          summary: "Delete Friend",
          description: "Deletes a friend by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
              description: "Friend ID",
            },
          ],
          responses: {
            200: {
              description: "Friend deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      deletedFriendId: { type: "integer" },
                      remainingFriends: { type: "integer" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Friend deleted successfully",
                    deletedFriendId: 1,
                    remainingFriends: 4,
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
          description: "Filters friends by gender and name starting letter",
          parameters: [
            {
              name: "gender",
              in: "query",
              required: true,
              schema: { type: "string", enum: ["male", "female"] },
              description: "Gender to filter by",
            },
            {
              name: "letter",
              in: "query",
              required: true,
              schema: { type: "string" },
              description: "Starting letter of name",
            },
          ],
          responses: {
            200: {
              description: "Filtered friends",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      count: { type: "integer" },
                      filters: {
                        type: "object",
                        properties: {
                          gender: { type: "string" },
                          letter: { type: "string" },
                        },
                      },
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
                      timestamp: { type: "string" },
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
      "/portfolio": {
        get: {
          tags: ["Portfolio"],
          summary: "Get Portfolio Projects",
          description: "Retrieves all portfolio projects for the Friends API",
          responses: {
            200: {
              description: "Portfolio projects retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      count: { type: "number" },
                      projects: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            description: { type: "string" },
                            technology: { type: "string" },
                            status: { type: "string" },
                            repository: { type: "string" },
                            demo: { type: "string" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    count: 2,
                    projects: [
                      {
                        id: 1,
                        name: "Friends Management System",
                        description:
                          "CRUD API for managing friend relationships",
                        technology: "Node.js, Express, JavaScript",
                        status: "completed",
                        repository: "https://github.com/example/friends-api",
                        demo: "https://friends-api.example.com",
                        createdAt: "2025-01-01T10:00:00Z",
                        updatedAt: "2025-01-07T15:30:00Z",
                      },
                      {
                        id: 2,
                        name: "Social Network API",
                        description: "Extended social networking features",
                        technology: "Node.js, Express, MongoDB",
                        status: "in-progress",
                        repository: "https://github.com/example/social-api",
                        demo: "https://social-api.example.com",
                        createdAt: "2025-01-02T09:15:00Z",
                        updatedAt: "2025-01-07T12:45:00Z",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Portfolio"],
          summary: "Add Portfolio Project",
          description: "Creates a new portfolio project",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "description", "technology"],
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    technology: { type: "string" },
                    status: {
                      type: "string",
                      enum: ["planning", "in-progress", "completed"],
                    },
                    repository: { type: "string" },
                    demo: { type: "string" },
                  },
                },
                example: {
                  name: "Chat Application",
                  description: "Real-time messaging system",
                  technology: "Node.js, Socket.io, MongoDB",
                  status: "planning",
                  repository: "https://github.com/example/chat-app",
                  demo: "https://chat.example.com",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Portfolio project created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      project: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          status: { type: "string" },
                          repository: { type: "string" },
                          demo: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio project created successfully",
                    project: {
                      id: 3,
                      name: "Chat Application",
                      description: "Real-time messaging system",
                      technology: "Node.js, Socket.io, MongoDB",
                      status: "planning",
                      repository: "https://github.com/example/chat-app",
                      demo: "https://chat.example.com",
                      createdAt: "2025-01-07T18:30:00Z",
                      updatedAt: "2025-01-07T18:30:00Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/portfolio/{id}": {
        get: {
          tags: ["Portfolio"],
          summary: "Get Portfolio Project",
          description: "Retrieves a specific portfolio project by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio project ID",
            },
          ],
          responses: {
            200: {
              description: "Portfolio project retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      project: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          status: { type: "string" },
                          repository: { type: "string" },
                          demo: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    project: {
                      id: 1,
                      name: "Friends Management System",
                      description: "CRUD API for managing friend relationships",
                      technology: "Node.js, Express, JavaScript",
                      status: "completed",
                      repository: "https://github.com/example/friends-api",
                      demo: "https://friends-api.example.com",
                      createdAt: "2025-01-01T10:00:00Z",
                      updatedAt: "2025-01-07T15:30:00Z",
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Portfolio"],
          summary: "Update Portfolio Project",
          description: "Updates an existing portfolio project",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio project ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    technology: { type: "string" },
                    status: {
                      type: "string",
                      enum: ["planning", "in-progress", "completed"],
                    },
                    repository: { type: "string" },
                    demo: { type: "string" },
                  },
                },
                example: {
                  name: "Enhanced Friends Management System",
                  description: "Advanced CRUD API with real-time features",
                  technology: "Node.js, Express, MongoDB, Socket.io",
                  status: "completed",
                  repository: "https://github.com/example/enhanced-friends-api",
                  demo: "https://enhanced-friends-api.example.com",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Portfolio project updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      project: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          status: { type: "string" },
                          repository: { type: "string" },
                          demo: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio project updated successfully",
                    project: {
                      id: 1,
                      name: "Enhanced Friends Management System",
                      description: "Advanced CRUD API with real-time features",
                      technology: "Node.js, Express, MongoDB, Socket.io",
                      status: "completed",
                      repository:
                        "https://github.com/example/enhanced-friends-api",
                      demo: "https://enhanced-friends-api.example.com",
                      createdAt: "2025-01-01T10:00:00Z",
                      updatedAt: "2025-01-07T18:45:00Z",
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Portfolio"],
          summary: "Delete Portfolio Project",
          description: "Deletes a portfolio project by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio project ID",
            },
          ],
          responses: {
            200: {
              description: "Portfolio project deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      deletedProjectId: { type: "number" },
                      remainingProjects: { type: "number" },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio project deleted successfully",
                    deletedProjectId: 1,
                    remainingProjects: 1,
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
      title: "Exercise 5 - Friends API with MVC Architecture",
      version: "1.0.0",
      description:
        "Professional MVC implementation of the Friends API with clean separation of concerns.",

      license: {
        name: "MIT",
      },
    },
    tags: [
      {
        name: "Friends",
        description: "Friends management operations with MVC architecture",
      },
    ],
    paths: {
      "/friends": {
        get: {
          tags: ["Friends"],
          summary: "Get All Friends (MVC)",
          description: "Retrieves all friends using MVC architecture",
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
                            email: { type: "string" },
                          },
                        },
                      },
                      metadata: {
                        type: "object",
                        properties: {
                          totalPages: { type: "integer" },
                          currentPage: { type: "integer" },
                          architecture: { type: "string" },
                        },
                      },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Retrieved all friends successfully (MVC)",
                    count: 5,
                    friends: [
                      {
                        id: 1,
                        name: "John Doe",
                        gender: "male",
                        email: "john.doe@email.com",
                      },
                    ],
                    metadata: {
                      totalPages: 1,
                      currentPage: 1,
                      architecture: "MVC",
                    },
                    timestamp: "2024-01-15T10:30:00Z",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Friends"],
          summary: "Add Friend (MVC)",
          description: "Adds a new friend using MVC architecture",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    gender: { type: "string" },
                    email: { type: "string" },
                  },
                  required: ["name", "gender", "email"],
                },
              },
            },
          },
          responses: {
            201: {
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
                          email: { type: "string" },
                        },
                      },
                      totalFriends: { type: "integer" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    message: "Friend added successfully (MVC)",
                    friend: {
                      id: 6,
                      name: "Alice Johnson",
                      gender: "female",
                      email: "alice.johnson@email.com",
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
      title: "Exercise 6 - Calculator API with Comprehensive Testing",
      version: "1.0.0",
      description:
        "Calculator API with Jest testing framework and comprehensive test coverage.",

      license: {
        name: "MIT",
      },
    },
    tags: [
      {
        name: "Calculator",
        description: "Calculator operations with comprehensive testing",
      },
    ],
    paths: {
      "/add": {
        get: {
          tags: ["Calculator"],
          summary: "Addition with Test Coverage",
          description: "Adds two numbers with comprehensive test coverage",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number",
            },
          ],
          responses: {
            200: {
              description: "Addition result with test coverage info",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                      testCoverage: { type: "string" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 10,
                    num2: 5,
                    result: 15,
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
      title: "Exercise 7 - Enhanced Calculator with Advanced Libraries",
      version: "1.0.0",
      description:
        "Professional calculator API with advanced logging, error handling, and custom libraries.",

      license: {
        name: "MIT",
      },
    },
    tags: [
      {
        name: "Calculator",
        description: "Enhanced calculator operations with advanced features",
      },
    ],
    paths: {
      "/add": {
        get: {
          tags: ["Calculator"],
          summary: "Enhanced Addition",
          description:
            "Adds two numbers with advanced logging and error handling",
          parameters: [
            {
              name: "num1",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "First number",
            },
            {
              name: "num2",
              in: "query",
              required: true,
              schema: { type: "number" },
              description: "Second number",
            },
          ],
          responses: {
            200: {
              description: "Enhanced addition result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      operation: { type: "string" },
                      num1: { type: "number" },
                      num2: { type: "number" },
                      result: { type: "number" },
                      logLevel: { type: "string" },
                      executionTime: { type: "string" },
                      timestamp: { type: "string" },
                    },
                  },
                  example: {
                    operation: "addition",
                    num1: 10,
                    num2: 5,
                    result: 15,
                    logLevel: "INFO",
                    executionTime: "2.3ms",
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
      version: "2.0.0",
      description:
        "Full-featured eCommerce API with product management, search, caching, and comprehensive documentation.",

      license: {
        name: "MIT",
      },
    },
    tags: [
      {
        name: "Products",
        description: "Product management operations",
      },
      {
        name: "Categories",
        description: "Product category operations",
      },
      {
        name: "Search",
        description: "Product search operations",
      },
      {
        name: "Portfolio",
        description: "Portfolio project management",
      },
    ],
    paths: {
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get All Products",
          description: "Retrieves all products with optional pagination",
          parameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer", default: 20 },
              description: "Number of products to return",
            },
          ],
          responses: {
            200: {
              description: "List of products",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      count: { type: "integer" },
                      limit: { type: "integer" },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            title: { type: "string" },
                            price: { type: "number" },
                            category: { type: "string" },
                            description: { type: "string" },
                            image: { type: "string" },
                            rating: {
                              type: "object",
                              properties: {
                                rate: { type: "number" },
                                count: { type: "integer" },
                              },
                            },
                          },
                        },
                      },
                      timestamp: { type: "string" },
                      cached: { type: "boolean" },
                    },
                  },
                  example: {
                    success: true,
                    count: 3,
                    limit: 20,
                    data: [
                      {
                        id: 1,
                        title: "Fjallraven - Foldsack No. 1 Backpack",
                        price: 109.95,
                        category: "men's clothing",
                        description: "Your perfect pack for everyday use",
                        image:
                          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        rating: { rate: 3.9, count: 120 },
                      },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                    cached: true,
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
              description: "List of categories",
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
                      timestamp: { type: "string" },
                      cached: { type: "boolean" },
                      cacheExpiry: { type: "string" },
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
                    cached: true,
                    cacheExpiry: "2024-01-15T11:30:00Z",
                  },
                },
              },
            },
          },
        },
      },
      "/api/products/search": {
        get: {
          tags: ["Search"],
          summary: "Search Products",
          description: "Search products by query",
          parameters: [
            {
              name: "q",
              in: "query",
              required: true,
              schema: { type: "string" },
              description: "Search query",
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
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            title: { type: "string" },
                            price: { type: "number" },
                            category: { type: "string" },
                            description: { type: "string" },
                            image: { type: "string" },
                            rating: {
                              type: "object",
                              properties: {
                                rate: { type: "number" },
                                count: { type: "integer" },
                              },
                            },
                          },
                        },
                      },
                      timestamp: { type: "string" },
                      searchTime: { type: "string" },
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
                          "Your perfect pack for everyday use and walks in the forest",
                        image:
                          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        rating: { rate: 3.9, count: 120 },
                      },
                    ],
                    timestamp: "2024-01-15T10:30:00Z",
                    searchTime: "45ms",
                  },
                },
              },
            },
          },
        },
      },
      "/api/portfolio": {
        get: {
          tags: ["Portfolio"],
          summary: "Get Portfolio Projects",
          description: "Retrieves all eCommerce portfolio projects",
          responses: {
            200: {
              description: "Portfolio projects retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      count: { type: "number" },
                      projects: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            description: { type: "string" },
                            technology: { type: "string" },
                            category: { type: "string" },
                            status: { type: "string" },
                            url: { type: "string" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    count: 2,
                    projects: [
                      {
                        id: 1,
                        name: "FakeStore API Integration",
                        description:
                          "Full eCommerce store with product management",
                        technology: "Node.js, Express, REST API",
                        category: "eCommerce",
                        status: "completed",
                        url: "https://example.com/fakestore",
                        createdAt: "2025-01-01T10:00:00Z",
                        updatedAt: "2025-01-07T15:30:00Z",
                      },
                      {
                        id: 2,
                        name: "Product Search Engine",
                        description:
                          "Advanced search functionality for products",
                        technology: "Node.js, Elasticsearch",
                        category: "search",
                        status: "in-progress",
                        url: "https://example.com/search",
                        createdAt: "2025-01-02T09:15:00Z",
                        updatedAt: "2025-01-07T12:45:00Z",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Portfolio"],
          summary: "Add Portfolio Project",
          description: "Creates a new portfolio project",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "description", "technology", "category"],
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    technology: { type: "string" },
                    category: { type: "string" },
                    status: {
                      type: "string",
                      enum: ["planning", "in-progress", "completed"],
                    },
                    url: { type: "string" },
                  },
                },
                example: {
                  name: "Shopping Cart API",
                  description: "RESTful API for shopping cart management",
                  technology: "Node.js, Express, MongoDB",
                  category: "eCommerce",
                  status: "planning",
                  url: "https://example.com/cart",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Portfolio project created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      project: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          category: { type: "string" },
                          status: { type: "string" },
                          url: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio project created successfully",
                    project: {
                      id: 3,
                      name: "Shopping Cart API",
                      description: "RESTful API for shopping cart management",
                      technology: "Node.js, Express, MongoDB",
                      category: "eCommerce",
                      status: "planning",
                      url: "https://example.com/cart",
                      createdAt: "2025-01-07T18:30:00Z",
                      updatedAt: "2025-01-07T18:30:00Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/portfolio/{id}": {
        get: {
          tags: ["Portfolio"],
          summary: "Get Portfolio Project",
          description: "Retrieves a specific portfolio project by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio project ID",
            },
          ],
          responses: {
            200: {
              description: "Portfolio project retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      project: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          category: { type: "string" },
                          status: { type: "string" },
                          url: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    project: {
                      id: 1,
                      name: "FakeStore API Integration",
                      description:
                        "Full eCommerce store with product management",
                      technology: "Node.js, Express, REST API",
                      category: "eCommerce",
                      status: "completed",
                      url: "https://example.com/fakestore",
                      createdAt: "2025-01-01T10:00:00Z",
                      updatedAt: "2025-01-07T15:30:00Z",
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Portfolio"],
          summary: "Update Portfolio Project",
          description: "Updates an existing portfolio project",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio project ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    technology: { type: "string" },
                    category: { type: "string" },
                    status: {
                      type: "string",
                      enum: ["planning", "in-progress", "completed"],
                    },
                    url: { type: "string" },
                  },
                },
                example: {
                  name: "Enhanced FakeStore API",
                  description: "Full eCommerce store with advanced features",
                  technology: "Node.js, Express, MongoDB, Redis",
                  category: "eCommerce",
                  status: "completed",
                  url: "https://example.com/enhanced-fakestore",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Portfolio project updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      project: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string" },
                          technology: { type: "string" },
                          category: { type: "string" },
                          status: { type: "string" },
                          url: { type: "string" },
                          createdAt: { type: "string" },
                          updatedAt: { type: "string" },
                        },
                      },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio project updated successfully",
                    project: {
                      id: 1,
                      name: "Enhanced FakeStore API",
                      description:
                        "Full eCommerce store with advanced features",
                      technology: "Node.js, Express, MongoDB, Redis",
                      category: "eCommerce",
                      status: "completed",
                      url: "https://example.com/enhanced-fakestore",
                      createdAt: "2025-01-01T10:00:00Z",
                      updatedAt: "2025-01-07T18:45:00Z",
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Portfolio"],
          summary: "Delete Portfolio Project",
          description: "Deletes a portfolio project by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "number" },
              description: "Portfolio project ID",
            },
          ],
          responses: {
            200: {
              description: "Portfolio project deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      deletedProjectId: { type: "number" },
                      remainingProjects: { type: "number" },
                    },
                  },
                  example: {
                    success: true,
                    message: "Portfolio project deleted successfully",
                    deletedProjectId: 1,
                    remainingProjects: 1,
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

// Make swaggerSpecs available globally
window.swaggerSpecs = swaggerSpecs;

// JavaScript functionality for Swagger UI
const exercises = {
  1: {
    title: "Exercise 1 - Multi-Port Server Management",
    description:
      "Learn how to create and manage multiple Express.js servers running on different ports simultaneously.",
    file: "swagger/exercise1.yaml",
  },
  2: {
    title: "Exercise 2 - Basic Calculator API",
    description:
      "Simple REST API for basic arithmetic operations with query parameters.",
    file: "swagger/exercise2.yaml",
  },
  3: {
    title: "Exercise 3 - Calculator with Portfolio Integration",
    description:
      "Enhanced calculator API with integrated portfolio showcase and static file serving.",
    file: "swagger/exercise3.yaml",
  },
  4: {
    title: "Exercise 4 - Friends Management API",
    description:
      "Complete CRUD API for managing friends data with filtering, searching, and validation.",
    file: "swagger/exercise4.yaml",
  },
  5: {
    title: "Exercise 5 - Friends API with MVC Architecture",
    description:
      "Professional MVC implementation of the Friends API with clean separation of concerns.",
    file: "swagger/exercise5.yaml",
  },
  6: {
    title: "Exercise 6 - Calculator API with Comprehensive Testing",
    description:
      "Calculator API with Jest testing framework and comprehensive test coverage.",
    file: "swagger/exercise6.yaml",
  },
  7: {
    title: "Exercise 7 - Enhanced Calculator with Advanced Libraries",
    description:
      "Professional calculator API with advanced logging, error handling, and custom libraries.",
    file: "swagger/exercise7.yaml",
  },
  8: {
    title: "Exercise 8 - eCommerce Store API",
    description:
      "Full-featured eCommerce API with product management, search, caching, and comprehensive documentation.",
    file: "swagger/exercise8.yaml",
  },
};

let currentSwaggerUI = null;
let currentExercise = 1;
let isLoading = false;
let loadingQueue = [];
let debounceTimer = null;

function updateExerciseInfo(exerciseNumber) {
  const exercise = exercises[exerciseNumber];
  document.getElementById("exercise-title").textContent = exercise.title;
  document.getElementById("exercise-description").textContent =
    exercise.description;
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error").style.display = "none";

  // Safely clear swagger-ui
  const container = document.getElementById("swagger-ui");
  if (container) {
    container.innerHTML = "";
  }
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

function showError() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").style.display = "block";

  // Safely clear swagger-ui
  const container = document.getElementById("swagger-ui");
  if (container) {
    container.innerHTML = "";
  }

  // Reset state
  currentSwaggerUI = null;
  isLoading = false;
  processQueue();
}

function processQueue() {
  if (isLoading || loadingQueue.length === 0) return;

  const exerciseNumber = loadingQueue.shift();
  console.log(
    `📋 Processing queue: Exercise ${exerciseNumber}, Queue length: ${loadingQueue.length}`,
  );
  createSwaggerUI(exerciseNumber);
}

function addExecuteButtonNotice() {
  console.log("🎭 Adding Execute button notice");

  // Add CSS to hide execute buttons
  const style = document.createElement("style");
  style.textContent = `
    .swagger-ui .btn.execute {
      display: none !important;
    }
    .swagger-ui .try-out__btn {
      display: none !important;
    }
    .execute-notice {
      background: #e3f2fd;
      border: 1px solid #2196f3;
      border-radius: 4px;
      padding: 12px;
      margin: 15px 0;
      color: #0d47a1;
      font-size: 14px;
      line-height: 1.4;
    }
    .execute-notice strong {
      color: #0d47a1;
    }
  `;
  document.head.appendChild(style);

  // Add notice to each operation block
  setTimeout(() => {
    const operationBlocks = document.querySelectorAll(".opblock");
    operationBlocks.forEach((block) => {
      if (!block.querySelector(".execute-notice")) {
        const notice = document.createElement("div");
        notice.className = "execute-notice";
        notice.innerHTML = `
          <strong>📋 Documentation Mode:</strong> This is a static documentation viewer.
          Execute buttons are disabled as there is no live backend connected.
          View the example responses in the schema definitions below to understand the expected API response formats.
        `;

        const opblockBody = block.querySelector(".opblock-body");
        if (opblockBody) {
          opblockBody.insertBefore(notice, opblockBody.firstChild);
        }
      }
    });
  }, 500);
}

function createSwaggerUI(exerciseNumber) {
  if (isLoading) return;

  // Safety check for required libraries
  if (!window.SwaggerUIBundle || !window.SwaggerUIStandalonePreset) {
    console.error("SwaggerUI libraries not available");
    showError();
    return;
  }

  isLoading = true;
  console.log(`🔄 Creating Swagger UI for Exercise ${exerciseNumber}`);

  const spec = window.swaggerSpecs[exerciseNumber];
  if (!spec) {
    console.error(`No specification found for exercise ${exerciseNumber}`);
    showError();
    return;
  }

  // Properly dispose of previous SwaggerUI instance
  if (currentSwaggerUI && typeof currentSwaggerUI.getSystem === "function") {
    try {
      console.log("🧹 Disposing previous SwaggerUI instance");
      currentSwaggerUI = null;
    } catch (e) {
      console.warn("Warning disposing SwaggerUI:", e);
    }
  }

  // Clear the container and recreate it
  const container = document.getElementById("swagger-ui");
  const parent = container.parentNode;
  const newContainer = document.createElement("div");
  newContainer.id = "swagger-ui";
  parent.replaceChild(newContainer, container);

  // Longer delay to ensure proper cleanup
  setTimeout(() => {
    try {
      // Check if container still exists
      const targetContainer = document.getElementById("swagger-ui");
      if (!targetContainer) {
        console.error("Target container not found");
        showError();
        return;
      }

      // Remove server URLs from spec to prevent network requests
      const cleanSpec = JSON.parse(JSON.stringify(spec));
      if (cleanSpec.servers) {
        delete cleanSpec.servers;
      }

      currentSwaggerUI = SwaggerUIBundle({
        spec: cleanSpec,
        dom_id: "#swagger-ui",
        deepLinking: false,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: "StandaloneLayout",
        validatorUrl: null,
        tryItOutEnabled: true,
        supportedSubmitMethods: [],
        onComplete: function () {
          console.log(`✅ Swagger UI loaded for Exercise ${exerciseNumber}`);
          hideLoading();
          isLoading = false;
          processQueue();

          // Add notice about Execute buttons being disabled
          setTimeout(() => {
            addExecuteButtonNotice();
          }, 1000);
        },
        onFailure: function (error) {
          console.error(
            `❌ Swagger UI failed for Exercise ${exerciseNumber}:`,
            error,
          );
          showError();
        },
      });
    } catch (error) {
      console.error(
        `❌ Error creating Swagger UI for Exercise ${exerciseNumber}:`,
        error,
      );
      showError();
    }
  }, 300);
}

function loadSwaggerDoc(exerciseNumber) {
  const exercise = exercises[exerciseNumber];
  if (!exercise) {
    console.error(`Exercise ${exerciseNumber} not found`);
    return;
  }

  // Clear any existing debounce timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Debounce the loading to prevent rapid clicks
  debounceTimer = setTimeout(() => {
    console.log(`📝 Loading request for Exercise ${exerciseNumber}`);

    // Clear existing queue to prevent conflicts
    loadingQueue = [];

    showLoading();
    updateExerciseInfo(exerciseNumber);

    // Update current exercise and active tab
    currentExercise = exerciseNumber;
    document.querySelectorAll(".exercise-tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    document
      .querySelector(`[data-exercise="${exerciseNumber}"]`)
      .classList.add("active");

    // Add to queue and process
    loadingQueue.push(exerciseNumber);
    processQueue();
  }, 100);
}

// Mock response generator for simulation

// Initialize the app
function initializeApp() {
  // Check for required libraries
  if (!window.SwaggerUIBundle) {
    console.error("SwaggerUIBundle not loaded");
    showError();
    return;
  }

  if (!window.SwaggerUIStandalonePreset) {
    console.error("SwaggerUIStandalonePreset not loaded");
    showError();
    return;
  }

  if (!window.swaggerSpecs) {
    console.error("Swagger specifications not loaded");
    showError();
    return;
  }

  console.log("🚀 Initializing Swagger Documentation App");
  console.log("✅ SwaggerUIBundle loaded");
  console.log("✅ SwaggerUIStandalonePreset loaded");
  console.log("✅ Swagger specifications loaded");

  currentExercise = 1;
  updateExerciseInfo(1);
  showLoading();
  createSwaggerUI(1);
}

// Event listeners for exercise tabs
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".exercise-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      const exerciseNumber = parseInt(this.dataset.exercise);
      console.log(
        `🖱️ Tab clicked: Exercise ${exerciseNumber}, Current: ${currentExercise}, Loading: ${isLoading}`,
      );
      if (exerciseNumber !== currentExercise) {
        loadSwaggerDoc(exerciseNumber);
      }
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && currentExercise > 1) {
      console.log(
        `⬅️ Arrow left: Moving from ${currentExercise} to ${currentExercise - 1}`,
      );
      loadSwaggerDoc(currentExercise - 1);
    } else if (e.key === "ArrowRight" && currentExercise < 8) {
      console.log(
        `➡️ Arrow right: Moving from ${currentExercise} to ${currentExercise + 1}`,
      );
      loadSwaggerDoc(currentExercise + 1);
    }
  });

  // Initialize the app
  initializeApp();

  // Add some helpful instructions
  console.log("Swagger Documentation Navigator - Simulation Mode");
  console.log("Use arrow keys to navigate between exercises");
  console.log("Left/Right arrows to switch between Exercise 1-8");
  console.log("All API responses are simulated with mock data");
});
