const express = require("express");
const router = new express.Router();
const controller = require("../controllers/products.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/", controller.getProducts);

router.post("/", controller.postProducts);

router.post("/:product_id/tags", controller.postProductsByProductIdTags);

router.post("/:product_id/price", controller.postProductsByProductIdPrice);

router.post(
  "/:product_id/inventory",
  controller.postProductsByProductIdInventory
);

router.post("/bulk-edit", controller.postProductsBulkEdit);

router.put("/:id/expiration-date", controller.putProductsByIdExpirationDate);

router.put("/:id/discount", controller.putProductsByIdDiscount);

router.post("/:product_id/photos", controller.postProductsByProductIdPhotos);

router.get("/:product_id/photos", controller.getProductsByProductIdPhotos);

router.use(handleError);

module.exports = router;
