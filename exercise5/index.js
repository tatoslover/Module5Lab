const express = require("express");
const cors = require("cors");
const friendRoutes = require('./routes/friendRoutes');

const app = express();
const port = 3007; // Sequential port following the pattern

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use('/', express.static('public'));

// Routes
app.use('/friends', friendRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Exercise 5 - Friends API with MVC Architecture!",
        server: "Exercise 5 - Friends API (MVC)",
        port: port,
        architecture: "Model-View-Controller",
        endpoints: [
            "GET /friends - Get all friends",
            "GET /friends/filter?gender=male&letter=R - Filter friends",
            "GET /friends/info - Get request headers",
            "GET /friends/:id - Get single friend",
            "POST /friends - Add new friend",
            "PUT /friends/:id - Update friend"
        ],
        improvements: [
            "Business logic moved to controllers",
            "Clean separation of concerns", 
            "Professional MVC architecture",
            "Reusable controller functions"
        ],
        timestamp: new Date().toISOString()
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: "healthy",
        server: "Exercise 5 - Friends API (MVC)",
        port: port,
        uptime: process.uptime(),
        architecture: "Model-View-Controller",
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Route not found",
        server: "Exercise 5 - Friends API (MVC)",
        port: port,
        requestedPath: req.originalUrl,
        method: req.method,
        suggestion: "Try /friends or /friends/filter?gender=male"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal server error",
        server: "Exercise 5 - Friends API (MVC)",
        port: port,
        message: err.message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Exercise 5 - Friends API (MVC) is running on http://localhost:${port}`);
    console.log(`📂 Architecture: Model-View-Controller pattern`);
    console.log(`👥 Try: http://localhost:${port}/friends`);
    console.log(`🔍 Filter: http://localhost:${port}/friends/filter?gender=male&letter=R`);
    console.log(`ℹ️  Info: http://localhost:${port}/friends/info`);
});

module.exports = app;