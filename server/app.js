const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const path = require("path");
require("dotenv-flow").config();
const cors = require("cors");
const helmet = require("helmet");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const { hintpage, homepage } = require("./utils/route-options");

const chatsroutes = require("./components/chat-logs/routes");
const productsroutes = require("./components/products/routes");
const categoriesroutes = require("./components/categories/routes");
const accountsroutes = require("./components/accounts/routes");
const adminsroutes = require("./components/admins/routes");

const { requestLoggerMiddleware } = require("./middleware/loghandler");
const { handleError } = require("./middleware/errorhandler");
const { logger, clogger } = require("./utils/logger");

const app = express();

app.use(express.json());
app.set("trust proxy", 1);
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(logger);
app.use(requestLoggerMiddleware({ logger: clogger }));

app.get("/api/docs.yaml", async (req, res) => {
  res
    .type("text/yaml")
    .send(YAML.load(path.resolve(__dirname, "../openapi/specs.yaml")));
});

const swaggerJsDocs = YAML.load(
  path.resolve(__dirname, "../openapi/specs.yaml")
);

app.get("/api", (req, res) => res.send(hintpage));

app.get("/", (req, res) => res.send(homepage));
app.use("/tests/report", (req, res) => {
  res.sendFile(path.join(__dirname, "reports/test-report.html"));
});

app.use("/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

if (process.env.NODE_ENV != "development") {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerJsDocs,
      validateApiSpec: true,
      validateResponses: true,
      ajvOptions: {
        allErrors: true,
      },
    })
  );
}

app.use("/api/s1", adminsroutes);
app.use("/api/s4", accountsroutes);
app.use("/api/s5", productsroutes);
app.use("/api/s3", chatsroutes);
app.use("/api/s2", categoriesroutes);

app.use(handleError);

module.exports = app;
