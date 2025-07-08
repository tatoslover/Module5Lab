// exercise1/server3.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Server 3!",
    server: "Server 3",
    port: PORT,
    timestamp: new Date().toISOString(),
    specialFeature: "API Gateway & Utilities",
    endpoints: [
      "GET /",
      "GET /health",
      "GET /time",
      "GET /status/:code",
      "POST /validate",
      "GET /headers",
    ],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "running",
    server: "Server 3",
    port: PORT,
    uptime: `${Math.floor(process.uptime())} seconds`,
    memoryUsage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
    timestamp: new Date().toISOString(),
  });
});

app.get("/time", (req, res) => {
  const now = new Date();
  res.json({
    server: "Server 3",
    port: PORT,
    currentTime: {
      iso: now.toISOString(),
      utc: now.toUTCString(),
      local: now.toLocaleString(),
      timestamp: now.getTime(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });
});

app.get("/status/:code", (req, res) => {
  const statusCode = parseInt(req.params.code);

  if (isNaN(statusCode) || statusCode < 100 || statusCode > 599) {
    return res.status(400).json({
      error: "Invalid status code",
      server: "Server 3",
      port: PORT,
      validRange: "100-599",
    });
  }

  res.status(statusCode).json({
    message: `Status ${statusCode} response`,
    server: "Server 3",
    port: PORT,
    requestedStatus: statusCode,
    timestamp: new Date().toISOString(),
  });
});

app.post("/validate", (req, res) => {
  const { email, age, name } = req.body;
  const errors = [];

  if (!name || name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Valid email is required");
  }

  if (age === undefined || age < 0 || age > 120) {
    errors.push("Age must be between 0 and 120");
  }

  const isValid = errors.length === 0;

  res.status(isValid ? 200 : 400).json({
    server: "Server 3",
    port: PORT,
    valid: isValid,
    errors: errors,
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

app.get("/headers", (req, res) => {
  res.json({
    server: "Server 3",
    port: PORT,
    clientHeaders: req.headers,
    clientIP: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent"),
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Path not found",
    server: "Server 3",
    port: PORT,
    requestedPath: req.originalUrl,
    method: req.method,
    availableEndpoints: ["/time", "/status/200", "/validate", "/headers"],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Server error occurred",
    server: "Server 3",
    port: PORT,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server 3 is running on http://localhost:${PORT}`);
  console.log(`🕐 Time service: http://localhost:${PORT}/time`);
  console.log(`✅ Validation: http://localhost:${PORT}/validate`);
});
