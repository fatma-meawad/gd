class AppError extends Error {
  constructor(options) {
    super();
    this.status = options.status || "error";
    this.statusCode = options.statuscode || 500;
    this.messages = options.messages || "";
    this.errors = options.errors || "";
    this.locations = options.locations || "unknown";
  }
}

module.exports = AppError;
