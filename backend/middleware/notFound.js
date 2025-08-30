// 404 Not Found middleware
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
    error: "The requested resource was not found on this server"
  });
};
