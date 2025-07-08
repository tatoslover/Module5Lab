const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const calculatorRoutes = require("./routes/calculatorRoutes");

const app = express();
const PORT = 3004;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Calculator API!",
    server: "Exercise 2 - Calculator Server",
    port: PORT,
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET /calculator/add?num1=5&num2=3",
      "GET /calculator/subtract?num1=10&num2=4",
      "GET /calculator/multiply?num1=6&num2=7",
      "GET /calculator/divide?num1=20&num2=4"
    ],
    usage: "Pass num1 and num2 as query parameters"
  });
});

// Calculator routes
app.use("/calculator", calculatorRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    server: "Calculator API",
    port: PORT,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    server: "Calculator API",
    port: PORT,
    requestedPath: req.originalUrl,
    method: req.method,
    suggestion: "Try /calculator/add?num1=5&num2=3"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    server: "Calculator API",
    port: PORT,
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🧮 Calculator API is running on http://localhost:${PORT}`);
  console.log(`📊 Try: http://localhost:${PORT}/calculator/add?num1=5&num2=3`);
  console.log(`➖ Try: http://localhost:${PORT}/calculator/subtract?num1=10&num2=4`);
  console.log(`✖️  Try: http://localhost:${PORT}/calculator/multiply?num1=6&num2=7`);
  console.log(`➗ Try: http://localhost:${PORT}/calculator/divide?num1=20&num2=4`);
});

module.exports = app;