const router = require("express").Router();
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

router.use("/subcategories", require("./subcategories"));
router.use("/categories", require("./categories"));

module.exports = router;
