const express = require("express");
const { options, hintpage, homepage } = require("./utils/route-options");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger"); // importa swaggerSpec da swagger.js
const { requestLoggerMiddleware } = require("./middleware/loghandler");
const { handleError } = require("./middleware/errorhandler");
const cookieParser = require("cookie-parser");

const chatsroutes = require("./components/chat-logs/routes");
const productsroutes = require("./components/products/routes");
const categoriesroutes = require("./components/categories/routes");
const accountsroutes = require("./components/accounts/routes");
const adminsroutes = require("./components/admins/routes");
const { logger, clogger } = require("./utils/logger");

const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(logger);
app.use(requestLoggerMiddleware({ logger: clogger }));

app.use("/api/s1", adminsroutes);
app.use("/api/s4", accountsroutes);
app.use("/api/s5", productsroutes);
app.use("/api/s3", chatsroutes);
app.use("/api/s2", categoriesroutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api", (req, res) => res.send(hintpage));
app.get("/", (req, res) => {
  res.send(homepage);
});

app.use(handleError);

module.exports = app;
