const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Route ${req.originalUrl} not found`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    err.message = "Resource not found";
  }

  return res.status(statusCode).json({
    message: err.message,
    errStack: process.env.ENVIROMENT === "DEV" ? err.stack : {},
  });
};

module.exports = {
  notFound,
  errorHandler,
};
