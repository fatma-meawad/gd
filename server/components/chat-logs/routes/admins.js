const express = require("express");
const router = new express.Router();
const controller = require("../controllers/admins.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.post("/:id/status", controller.postAdminsByIdStatus);

router.use(handleError);

module.exports = router;
