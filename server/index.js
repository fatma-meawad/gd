require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
const { clogger } = require("./utils/logger");
const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => clogger.info(`Awesome API running on port: ${PORT}`));
