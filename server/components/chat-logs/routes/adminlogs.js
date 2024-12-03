const express = require("express");
const router = new express.Router();
const controller = require("../controllers/adminlogs.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/", controller.getAdminlogs);

router.use(handleError);

module.exports = router;
