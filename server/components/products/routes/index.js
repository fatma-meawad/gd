const router = require("express").Router();
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

router.use("/products", require("./products"));
router.use("/tags", require("./tags"));

module.exports = router;
