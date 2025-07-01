const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const path = require("path");

require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Todo API is running",
    timestamp: new Date().toISOString()
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: "API endpoint not found",
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: "Validation Error", 
      details: err.errors 
    });
  }
  
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ 
      error: "Database Validation Error", 
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message,
        value: e.value
      }))
    });
  }
  
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: "Duplicate Entry",
      details: err.errors.map(e => e.message)
    });
  }
  
  // Don't crash the server, just return an error response
  res.status(500).json({ 
    error: "Internal Server Error",
    message: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
  });
});

const PORT = process.env.PORT || 4000;

// Database sync and server start
const startServer = async () => {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    
    console.log("Syncing database models...");
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log("Database models synced successfully.");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
      console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

startServer();