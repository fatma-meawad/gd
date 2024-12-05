const { StatusCodes } = require("http-status-codes");

function isOpenApi(err) {
  if (!Array.isArray(err.errors)) return false;

  return err.errors.some((error) => 
    error.errorCode && error.errorCode.includes("openapi.")
  );
}

const handleError = (err, req, res, next) => {
  console.log(err);
  const status =
    err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    
  const isOpenApiValidationError = isOpenApi(err);

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
