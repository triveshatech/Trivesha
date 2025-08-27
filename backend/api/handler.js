// Super simple Vercel serverless function
export default function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url, method } = req;

  try {
    // Root endpoint
    if (url === "/" || url === "") {
      return res.status(200).json({
        success: true,
        message: "Trivedia Flow Backend API",
        version: "1.0.0",
        platform: "vercel",
        timestamp: new Date().toISOString(),
      });
    }

    // Health endpoint
    if (url === "/api/health") {
      return res.status(200).json({
        success: true,
        message: "API is healthy",
        timestamp: new Date().toISOString(),
        server: "vercel",
        nodeVersion: process.version,
      });
    }

    // Debug endpoint
    if (url === "/api/debug") {
      return res.status(200).json({
        success: true,
        environment: process.env.NODE_ENV || "production",
        hasMongoUri: !!process.env.MONGODB_URI,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeVersion: process.version,
        timestamp: new Date().toISOString(),
      });
    }

    // Test endpoint
    if (url === "/api/test") {
      return res.status(200).json({
        success: true,
        message: "Test endpoint working",
        timestamp: new Date().toISOString(),
        method,
        url,
      });
    }

    // Contact endpoint
    if (url === "/api/contact" && method === "POST") {
      const { name, email, message } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Message received successfully",
        data: { name, email, message },
        timestamp: new Date().toISOString(),
      });
    }

    // 404 for other routes
    return res.status(404).json({
      success: false,
      message: "Route not found",
      path: url,
      method,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
