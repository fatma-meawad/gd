const express = require("express");
const router = new express.Router();
const controller = require("../controllers/businesses.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.post("/", controller.postBusiness);

router.get("/", controller.getBusinesses);

router.put("/:id", controller.putBusinessById);

router.get(
  "/:business_id/location_id",
  controller.getBusinessByBusinessIdLocationId
);

router.post(
  "/:business_id/sellers/",
  controller.postBusinessByBusinessIdSellers
);

router.post(
  "/:business_id/:seller_id/sellers",
  controller.postBusinessByBusinessIdBySellerIdSellers
);

router.get(
  "/:business_id/sellers/export",
  controller.getBusinessByBusinessIdSellersExport
);

router.post(
  "/:business_id/sellers/import",
  controller.postBusinessByBusinessIdSellersImport
);

router.use(handleError);

module.exports = router;
