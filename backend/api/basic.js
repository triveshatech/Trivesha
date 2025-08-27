import express from "express";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// Root endpoint
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Trivedia Flow Backend API",
      version: "1.0.0",
      platform: "vercel",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check without database
app.get("/api/health", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "API is healthy",
      timestamp: new Date().toISOString(),
      server: "vercel",
      nodeVersion: process.version,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Health check failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Debug endpoint
app.get("/api/debug", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      environment: process.env.NODE_ENV || "production",
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasCloudinaryName: !!process.env.CLOUDINARY_CLOUD_NAME,
      nodeVersion: process.version,
      timestamp: new Date().toISOString(),
      envCount: Object.keys(process.env).length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Test endpoint
app.get("/api/test", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Test endpoint working perfectly",
      timestamp: new Date().toISOString(),
      requestMethod: req.method,
      requestPath: req.path,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Simple ping endpoint
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// Contact endpoint (without database)
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, email, message)",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message received successfully",
      data: { name, email, message },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Export the Express app
export default app;
