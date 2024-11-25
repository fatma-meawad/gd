const YAML = require("yamljs");
const path = require("path");
require("dotenv-flow").config();

var options = {
  explorer: true,
  swaggerOptions: {
    url: process.env.OPENAPI_URL,
  },
};

var homepage =
  "<h1 style='text-align: center'>Galleria Admin Dashboard API</h1>";
var hintpage =
  "<h1 style='text-align: center'>Are you looking for /api/docs? </h1>";

module.exports = { options, homepage, hintpage };
