/**
 * Simple ping endpoint for uptime monitoring
 */
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    message: "pong",
    timestamp: new Date().toISOString(),
    server: "vercel",
  });
}
