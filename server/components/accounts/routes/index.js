const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const OpenApiValidator = require("express-openapi-validator");
const YAML = require("yamljs");
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

const swaggerJsDocs = YAML.load(
  path.resolve(__dirname, "../config/s4-openapi.yaml")
);
router.get("/docs.yaml", async (req, res) => {
  res
    .type("text/yaml")
    .send(YAML.load(path.resolve(__dirname, "../config/s4-openapi.yaml")));
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

router.use("/businesses", require("./businesses"));
router.use("/sellers", require("./sellers"));

module.exports = router;
