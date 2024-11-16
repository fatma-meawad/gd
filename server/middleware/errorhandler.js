const handleError = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const isOpenApiValidationError = Array.isArray(err.errors); //errorCode :openapi.validation

  const sendObject = { ...Object(err) };

  if (isOpenApiValidationError) {
    req.log.error(
      {
        status,
        method: req.method,
        url: req.url,
        payload: req.body,
        errors: err.errors,
        messages: err.messages,
        locations: err.locations,
      },
      `OpenAPI Validation Error`
    );
  } else {
    req.log.error(
      {
        status,
        method: req.method,
        url: req.url,
        payload: req.body,
        messages: err.messages,
        locations: err.locations,
      },
      `Application Error`
    );
  }

  res.status(status).json(sendObject);

  next();
};

module.exports = {
  handleError,
};