module.exports = (errors) => (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  let errorToSend = {
    success: false,
    message: message,
  };

  // Report the error to Google Cloud Error Reporting
  errors.report(err);

  if (process.env.NODE_ENV !== "production") {
    errorToSend.stack = err.stack;
  }

  res.status(statusCode).json(errorToSend);
};
