/**
 * Health check endpoint - separate file for better routing
 */
export default async function handler(req, res) {
  const startTime = Date.now();

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      allowedMethods: ["GET"],
    });
  }

  try {
    const healthData = {
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`,
      environment: process.env.NODE_ENV || "production",
      version: "2.0.0",
      server: "vercel",
      checks: {
        server: "ok",
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
          total:
            Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + "MB",
        },
        uptime: process.uptime() + "s",
        nodeVersion: process.version,
      },
    };

    return res.status(200).json(healthData);
  } catch (error) {
    console.error("Health check error:", error);

    return res.status(500).json({
      success: false,
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
