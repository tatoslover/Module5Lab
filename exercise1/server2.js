// exercise1/server2.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Server 2!",
    server: "Server 2",
    port: PORT,
    timestamp: new Date().toISOString(),
    specialFeature: "Data Processing Server",
    endpoints: [
      "GET /",
      "GET /health",
      "GET /users",
      "POST /process",
      "GET /random",
    ],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "operational",
    server: "Server 2",
    port: PORT,
    uptime: process.uptime(),
    load: process.cpuUsage(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/users", (req, res) => {
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];

  res.json({
    server: "Server 2",
    port: PORT,
    users: mockUsers,
    count: mockUsers.length,
    timestamp: new Date().toISOString(),
  });
});

app.post("/process", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      error: "No data provided",
      server: "Server 2",
      port: PORT,
    });
  }

  // Simulate data processing
  const processed = {
    original: data,
    processed: typeof data === "string" ? data.toUpperCase() : data,
    length:
      typeof data === "string" ? data.length : JSON.stringify(data).length,
    type: typeof data,
    processedAt: new Date().toISOString(),
  };

  res.json({
    message: "Data processed successfully",
    server: "Server 2",
    port: PORT,
    result: processed,
    timestamp: new Date().toISOString(),
  });
});

app.get("/random", (req, res) => {
  const randomData = {
    number: Math.floor(Math.random() * 1000),
    boolean: Math.random() > 0.5,
    color: ["red", "blue", "green", "yellow", "purple"][
      Math.floor(Math.random() * 5)
    ],
    uuid: Math.random().toString(36).substr(2, 9),
  };

  res.json({
    server: "Server 2",
    port: PORT,
    randomData,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    server: "Server 2",
    port: PORT,
    requestedPath: req.originalUrl,
    method: req.method,
    suggestion: "Try /users, /process, or /random",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    server: "Server 2",
    port: PORT,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🔥 Server 2 is running on http://localhost:${PORT}`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/users`);
  console.log(`🎲 Random data: http://localhost:${PORT}/random`);
});
