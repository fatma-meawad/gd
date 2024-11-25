const router = require("express").Router();
const path = require("path");
const { clogger } = require(path.resolve("utils/logger"));

router.use("/businesses", require("./businesses"));
router.use("/sellers", require("./sellers"));

module.exports = router;
