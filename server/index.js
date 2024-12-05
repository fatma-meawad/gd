require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
const { clogger } = require("./utils/logger");
const app = require("./app");
const DEFAULT_PORT=5000;

const server = http.createServer(app);

const PORT = process.env.PORT || DEFAULT_PORT;
server.listen(PORT, () => clogger.info(`Awesome API running on port: ${PORT}`));
