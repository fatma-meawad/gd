const router = require("express").Router();
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

router.use("/messages", require("./messages"));
router.use("/admins", require("./admins"));
router.use("/adminlogs", require("./adminlogs"));

module.exports = router;
