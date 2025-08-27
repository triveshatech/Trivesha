import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../config.env" });

const app = express();

// Global connection promise to avoid reconnecting on each request
let connectionPromise = null;

// MongoDB connection function for serverless
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
    console.log("MongoDB Connected");
    return connectionPromise;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    connectionPromise = null;
    throw error;
  }
};

// Security middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

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

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Trivedia Flow API is running on Vercel",
    version: "1.0.0",
    platform: "vercel",
    timestamp: new Date().toISOString(),
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
    console.error("Health check failed:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Debug endpoint to check environment
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

// Middleware to ensure DB connection on each request (for routes that need DB)
const ensureDbConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
};

// Import and use routes
let routesLoaded = false;

const loadRoutes = async () => {
  if (routesLoaded) return;

  try {
    // Import routes
    const authModule = await import("../routes/auth.js");
    const adminModule = await import("../routes/admin.js");
    const contentModule = await import("../routes/content.js");
    const uploadModule = await import("../routes/upload.js");
    const portfolioModule = await import("../routes/portfolio.js");
    const pricingModule = await import("../routes/pricing.js");
    const contactModule = await import("../routes/contact.js");

    // Use routes
    app.use("/api/auth", ensureDbConnection, authModule.default);
    app.use("/api/admin", ensureDbConnection, adminModule.default);
    app.use("/api/content", ensureDbConnection, contentModule.default);
    app.use("/api/upload", ensureDbConnection, uploadModule.default);
    app.use("/api/portfolio", ensureDbConnection, portfolioModule.default);
    app.use("/api/pricing", ensureDbConnection, pricingModule.default);
    app.use("/api/contact", ensureDbConnection, contactModule.default);

    routesLoaded = true;
    console.log("All routes loaded successfully");
  } catch (error) {
    console.error("Error loading routes:", error.message);
    console.error("Stack:", error.stack);
  }
};

// Load routes on startup
loadRoutes();

// Import error handling middleware
const loadErrorHandlers = async () => {
  try {
    const { notFound } = await import("../middleware/notFound.js");
    const { errorHandler } = await import("../middleware/errorHandler.js");

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.error("Error loading error handlers:", error.message);

    // Fallback error handlers
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString(),
      });
    });

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
  }
};

// Load error handlers
loadErrorHandlers();

// Export for Vercel
export default app;
