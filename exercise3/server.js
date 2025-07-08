const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.static(__dirname));

// Serve the calculator HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "calculator.html"));
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    server: "Exercise 3 - Calculator Frontend",
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    server: "Calculator Frontend",
    port: PORT,
    message: "Only the calculator interface is available at /"
  });
});

app.listen(PORT, () => {
  console.log(`🌐 Calculator Frontend is running on http://localhost:${PORT}`);
  console.log(`📱 Open your browser and visit: http://localhost:${PORT}`);
  console.log(`⚠️  Make sure Exercise 2 API is running on port 3004!`);
  console.log(`   Run: npm run calculator (in another terminal)`);
});

module.exports = app;