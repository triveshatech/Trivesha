import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables from the correct path
dotenv.config({ path: "../config.env" });

const app = express();

// Global connection promise
let connectionPromise = null;

// MongoDB connection for serverless
const connectDB = async () => {
  if (connectionPromise) {
    return connectionPromise;
  }

  if (mongoose.connections[0].readyState) {
    return mongoose.connections[0];
  }

  try {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    await connectionPromise;
    console.log("MongoDB Connected for Vercel");
    return connectionPromise;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    connectionPromise = null;
    throw error;
  }
};

// Basic middleware
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://trivesha.tech",
      "https://www.trivesha.tech",
      "https://trivesha.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Trivedia Flow Backend API is running on Vercel",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
  });
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: "API and Database are healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
      mongoStatus: "connected",
    });
  } catch (error) {
    console.error("Health check error:", error);
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
    message: "Debug endpoint",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasCloudinaryName: !!process.env.CLOUDINARY_CLOUD_NAME,
    platform: "vercel",
    nodeVersion: process.version,
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
  });
});

// Try to import and use routes with error handling
try {
  const authRoutes = await import("../routes/auth.js");
  const adminRoutes = await import("../routes/admin.js");
  const contentRoutes = await import("../routes/content.js");
  const uploadRoutes = await import("../routes/upload.js");
  const portfolioRoutes = await import("../routes/portfolio.js");
  const pricingRoutes = await import("../routes/pricing.js");
  const contactRoutes = await import("../routes/contact.js");

  // API routes
  app.use("/api/auth", authRoutes.default);
  app.use("/api/admin", adminRoutes.default);
  app.use("/api/content", contentRoutes.default);
  app.use("/api/upload", uploadRoutes.default);
  app.use("/api/portfolio", portfolioRoutes.default);
  app.use("/api/pricing", pricingRoutes.default);
  app.use("/api/contact", contactRoutes.default);

  console.log("All routes loaded successfully");
} catch (error) {
  console.error("Error loading routes:", error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    timestamp: new Date().toISOString(),
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

// Export for Vercel
export default app;
