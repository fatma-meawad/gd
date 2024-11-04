const express = require("express");
const router = new express.Router();
const controller = require("../controllers/admin.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/logs", controller.getAdminLogs);

router.get("/export", controller.getAdminExport);

router.put("/import", controller.putAdminImport);

router.use(handleError);

module.exports = router;
