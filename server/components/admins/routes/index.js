const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const OpenApiValidator = require("express-openapi-validator");
const YAML = require("yamljs");
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));
const AppError = require(path.join(__dirname, "../../../utils/error"));

const swaggerJsDocs = YAML.load(
  path.resolve(__dirname, "../config/s1-openapi.yaml")
);
router.get("/docs.yaml", async (req, res) => {
  res.type("text/yaml").send(swaggerJsDocs);
});

if (process.env.NODE_ENV === "strict") {
  router.use(
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

router.use("/admins", require("./admins"));
router.use("/admin", require("./admin"));

module.exports = router;
