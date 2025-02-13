const errorMiddleware = (err, req, res, next) => {
    try {
      let error = { ...err };
      error.message = err.message;
  
      // Log the error for debugging purposes
      console.error(err);
  
      // Mongoose bad ObjectId (CastError)
      if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ID: ${err.value}`;
        error = new Error(message);
        error.statusCode = 404;  // Not Found
      }
  
      // Mongoose duplicate key error (usually happens for unique constraints)
      if (err.code === 11000) {
        const message = `Duplicate key error: ${Object.keys(err.keyValue)} already exists.`;
        error = new Error(message);
        error.statusCode = 400;  // Bad Request
      }
  
      // Mongoose Validation Error
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new Error(message);
        error.statusCode = 400;  // Bad Request
      }
  
      // JSON Web Token Errors (if using JWT authentication)
      if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token. Please log in again.';
        error = new Error(message);
        error.statusCode = 401;  // Unauthorized
      }
  
      // JWT Expired Token Error
      if (err.name === 'TokenExpiredError') {
        const message = 'Token has expired. Please log in again.';
        error = new Error(message);
        error.statusCode = 401;  // Unauthorized
      }
  
      // General error handling if no specific case matches
      if (!error.statusCode) {
        error.statusCode = 500;  // Internal Server Error
      }
  
      // Send the error response
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export default errorMiddleware;
  