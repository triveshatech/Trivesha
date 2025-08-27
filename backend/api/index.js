import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import contentRoutes from "./routes/content.js";
import uploadRoutes from "./routes/upload.js";
import portfolioRoutes from "./routes/portfolio.js";
import pricingRoutes from "./routes/pricing.js";
import contactRoutes from "./routes/contact.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Global connection promise to avoid reconnecting on each request
let connectionPromise = null;

// MongoDB connection function for serverless
const connectDB = async () => {
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
    bufferMaxEntries: 0,
  });

  try {
    await connectionPromise;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    connectionPromise = null;
    throw error;
  }

  return connectionPromise;
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

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: "Trivedia Flow API is running on Vercel",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
      mongoStatus: "connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
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
    platform: "vercel",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Trivedia Flow API is running",
    version: "1.0.0",
    platform: "vercel",
  });
});

// Middleware to ensure DB connection on each request
app.use(async (req, res, next) => {
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
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/contact", contactRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Export for Vercel
export default app;
