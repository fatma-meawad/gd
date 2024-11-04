const express = require("express");
const router = new express.Router();
const controller = require("../controllers/sellers.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/", controller.getSellers);

router.get(
  "/:seller_id/access-history",
  controller.getSellersBySellerIdAccessHistory
);

router.post(
  "/inactive-notifications",
  controller.postSellersInactiveNotifications
);

router.use(handleError);

module.exports = router;
