const express = require("express");
const router = new express.Router();
const controller = require("../controllers/admins.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.post("/login", controller.postAdminsLogin);

router.put("/:id/deactivate", controller.putAdminsByIdDeactivate);

router.put("/:id/profile", controller.putAdminsByIdProfile);

router.get("/", controller.getAdmins);

router.post("/status-notifications", controller.postAdminsStatusNotifications);

router.get("/password-reset", controller.getAdminsPasswordReset);

router.put("/password-reset", controller.putAdminsPasswordReset);

router.post("/password-reset", controller.postAdminsPasswordReset);

router.post("/register", controller.postAdminsRegister);

router.use(handleError);

module.exports = router;
