/**
 * Test endpoint for validating deployment
 */
export default async function handler(req, res) {
  const startTime = Date.now();

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { method, url, headers } = req;
    const urlObj = new URL(url, `https://${headers.host}`);

    let body = {};
    if (method === "POST") {
      body = await new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({});
          }
        });
      });
    }

    return res.status(200).json({
      success: true,
      message: "Test endpoint operational",
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`,
      request: {
        method,
        path: urlObj.pathname,
        query: Object.fromEntries(urlObj.searchParams),
        ...(method === "POST" && { body }),
      },
      server: {
        environment: process.env.NODE_ENV || "production",
        nodeVersion: process.version,
        platform: process.platform,
        uptime: process.uptime(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
