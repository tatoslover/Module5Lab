// exercise1/server1.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Server 1!",
    server: "Server 1",
    port: PORT,
    timestamp: new Date().toISOString(),
    endpoints: ["GET /", "GET /health", "GET /info", "POST /echo"],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    server: "Server 1",
    port: PORT,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/info", (req, res) => {
  res.json({
    server: "Server 1",
    port: PORT,
    nodeVersion: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || "development",
    pid: process.pid,
  });
});

app.post("/echo", (req, res) => {
  res.json({
    message: "Echo from Server 1",
    server: "Server 1",
    port: PORT,
    receivedData: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    server: "Server 1",
    port: PORT,
    requestedPath: req.originalUrl,
    method: req.method,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    server: "Server 1",
    port: PORT,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server 1 is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`ℹ️  Server info: http://localhost:${PORT}/info`);
});
