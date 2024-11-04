const express = require("express");
const router = new express.Router();
const controller = require("../controllers/tags.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/", controller.getTags);

router.post("/", controller.postTags);

router.use(handleError);

module.exports = router;
