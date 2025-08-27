import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Basic middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
app.use(
  cors({
    origin: true, // Allow all origins for now
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb+srv://triveshatech:xQhzqflV9IjhOyCT@production.h6xberv.mongodb.net/?retryWrites=true&w=majority&appName=Production";

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Trivedia Flow Backend API",
    version: "1.0.0",
    platform: "vercel",
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: "API is healthy",
      mongoStatus: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Debug endpoint
app.get("/api/debug", (req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.NODE_ENV || "production",
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasCloudinaryName: !!process.env.CLOUDINARY_CLOUD_NAME,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
  });
});

// Basic contact endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // For now, just return success (you can add email sending logic later)
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

export default app;
