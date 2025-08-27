/**
 * Vercel Serverless Function - Industry Standard Implementation
 * Built for high performance and reliability
 */

// Import only what we need - minimize cold start
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Environment configuration
const isDev = process.env.NODE_ENV === "development";
const CORS_ORIGINS = [
  "https://trivesha.tech",
  "https://www.trivesha.tech",
  "https://trivesha.vercel.app",
  ...(isDev ? ["http://localhost:3000", "http://localhost:5173"] : []),
];

/**
 * Set CORS headers for cross-origin requests
 */
function setCorsHeaders(res, origin = "*") {
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
}

/**
 * Handle preflight OPTIONS requests
 */
function handlePreflight(res) {
  res.status(200).end();
}

/**
 * Parse request body for POST requests
 */
async function parseRequestBody(req) {
  return new Promise((resolve) => {
    if (
      req.method !== "POST" &&
      req.method !== "PUT" &&
      req.method !== "PATCH"
    ) {
      resolve({});
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        resolve({});
      }
    });
  });
}

/**
 * Main serverless function handler
 */
export default async function handler(req, res) {
  const startTime = Date.now();

  try {
    // Extract request information
    const { method, url, headers } = req;
    const origin = headers.origin;

    // Set CORS headers
    setCorsHeaders(res, CORS_ORIGINS.includes(origin) ? origin : "*");

    // Handle preflight requests
    if (method === "OPTIONS") {
      return handlePreflight(res);
    }

    // Parse URL and get pathname
    const urlObj = new URL(url, `https://${headers.host}`);
    const { pathname, searchParams } = urlObj;

    // Parse request body
    const body = await parseRequestBody(req);

    // Log request (only in development)
    if (isDev) {
      console.log(`[${method}] ${pathname} - ${Date.now() - startTime}ms`);
    }

    // Route handling
    switch (pathname) {
      case "/":
      case "":
        return res.status(200).json({
          success: true,
          message: "Trivedia Flow Backend API",
          version: "2.0.0",
          environment: process.env.NODE_ENV || "production",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          nodeVersion: process.version,
        });

      case "/api/health":
        return res.status(200).json({
          success: true,
          status: "healthy",
          timestamp: new Date().toISOString(),
          responseTime: `${Date.now() - startTime}ms`,
          environment: process.env.NODE_ENV || "production",
          version: "2.0.0",
          checks: {
            server: "ok",
            memory: {
              used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
              total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            },
          },
        });

      case "/api/debug":
        return res.status(200).json({
          success: true,
          debug: {
            environment: process.env.NODE_ENV || "production",
            nodeVersion: process.version,
            platform: process.platform,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            env: {
              hasMongoUri: !!process.env.MONGODB_URI,
              hasJwtSecret: !!process.env.JWT_SECRET,
              hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
              envCount: Object.keys(process.env).length,
            },
            request: {
              method,
              pathname,
              origin: headers.origin,
              userAgent: headers["user-agent"],
            },
          },
        });

      case "/api/test":
        return res.status(200).json({
          success: true,
          message: "Test endpoint operational",
          timestamp: new Date().toISOString(),
          responseTime: `${Date.now() - startTime}ms`,
          echo: {
            method,
            pathname,
            query: Object.fromEntries(searchParams),
            body: method === "POST" ? body : undefined,
          },
        });

      case "/ping":
        return res.status(200).json({
          success: true,
          message: "pong",
          timestamp: new Date().toISOString(),
          responseTime: `${Date.now() - startTime}ms`,
        });

      case "/api/contact":
        if (method !== "POST") {
          return res.status(405).json({
            success: false,
            error: "Method not allowed",
            allowedMethods: ["POST"],
          });
        }

        const { name, email, message } = body;

        if (!name || !email || !message) {
          return res.status(400).json({
            success: false,
            error: "Validation failed",
            message: "Name, email, and message are required",
            received: Object.keys(body),
          });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            error: "Invalid email format",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Contact form submitted successfully",
          data: { name, email, message },
          timestamp: new Date().toISOString(),
          id: `contact_${Date.now()}`,
        });

      default:
        return res.status(404).json({
          success: false,
          error: "Route not found",
          path: pathname,
          method,
          timestamp: new Date().toISOString(),
          availableRoutes: [
            "/",
            "/api/health",
            "/api/debug",
            "/api/test",
            "/ping",
            "/api/contact [POST]",
          ],
        });
    }
  } catch (error) {
    console.error("Handler Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
      ...(isDev && { stack: error.stack }),
    });
  }
}
