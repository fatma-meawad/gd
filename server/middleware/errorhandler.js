const { StatusCodes } = require("http-status-codes");

function isOpenApi(err) {
  if (
    !err.errors ||
    !err.errors[0].errorCode ||
    !err.errors[0].errorCode.includes("openapi.")
  )
    return false;
  return true;
}

const handleError = (err, req, res, next) => {
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