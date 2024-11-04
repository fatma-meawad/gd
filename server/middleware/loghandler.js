const resDotSendInterceptor = (res, send) => (content) => {
  res.contentBody = content;
  res.send = send;
  res.send(content);
};

const requestLoggerMiddleware =
  ({ logger }) =>
  (req, res, next) => {
    try {
      const isApiRequest =
        req.headers.accept &&
        req.headers.accept.includes("application/json") &&
        !req.url.endsWith(".yaml");

      if (isApiRequest) {
        logger.info(
          `Request:  ${req.method} ${req.url} ${req.hostname} ${JSON.stringify(
            req.body
          )}`
        );

        res.send = resDotSendInterceptor(res, res.send);
        res.on("finish", () => {
          logger.info(
            "Response: >>>   " +
              res.statusCode +
              "  " +
              (res.contentBody ? JSON.stringify(res.contentBody) : "" + "")
          );
        });
      }
      next();
    } catch (err) {
      logger.error(`Error during request logging: ${err.message}`);
      next(err); // Pass the error to the error handler
    }
  };

module.exports = { requestLoggerMiddleware };
