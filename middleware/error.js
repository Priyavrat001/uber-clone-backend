const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field} field. Please use another value.`;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
