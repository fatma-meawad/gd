const router = require("express").Router();
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

<<<<<<< HEAD
=======
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

>>>>>>> aecadb070dc41c418107f9a1c82ffc8061e4c8d0
router.use("/businesses", require("./businesses"));
router.use("/sellers", require("./sellers"));

module.exports = router;
