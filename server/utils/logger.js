const pinoHttp = require("pino-http");
const pino = require("pino");
const clogger = pino();

const logger = pinoHttp({
  customLogLevel: function (req, res, err) {
    return "silent";
  },
});

module.exports = { logger, clogger };
