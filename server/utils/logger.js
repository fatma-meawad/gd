const pinoHttp = require("pino-http");
const pino = require("pino");
require("dotenv-flow").config();

const isTestEnv = process.env.NODE_ENV === "test";
let clogger = pino();
let logger = pinoHttp();

if (!isTestEnv) {
  clogger = pino();

  logger = pinoHttp({
    customLogLevel: function (_req, _res, _err) {
      return "silent";
    },
  });
}

module.exports = { logger, clogger };
