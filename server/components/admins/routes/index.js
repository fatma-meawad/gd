const router = require("express").Router();
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

router.use("/admins", require("./admins"));
router.use("/admin", require("./admin"));

module.exports = router;
