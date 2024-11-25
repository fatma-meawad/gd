const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(options) {
    super();
    this.status = options.status || "error";
    this.statusCode = options.statuscode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.messages = options.messages || "";
    this.errors = options.errors || "";
    this.locations = options.locations || "unknown";
  }
}

module.exports = AppError;
