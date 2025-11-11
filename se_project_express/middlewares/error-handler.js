// middlewares/error-handler.js
const errorHandler = (err, req, res, next) => {
  // Log the error to console
  console.error(err);
  
  // Send response with appropriate status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An error occurred on the server';
  
  res.status(statusCode).send({ message });
};

export default  errorHandler;