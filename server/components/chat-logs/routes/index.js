const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const OpenApiValidator = require("express-openapi-validator");
const YAML = require("yamljs");
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

const swaggerJsDocs = YAML.load(
  path.resolve(__dirname, "../config/s3-openapi.yaml")
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

router.use("/messages", require("./messages"));
router.use("/admins", require("./admins"));
router.use("/adminlogs", require("./adminlogs"));

module.exports = router;
