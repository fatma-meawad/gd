const express = require("express");
const router = new express.Router();
const controller = require("../controllers/categories.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/", controller.getCategories);

router.post("/", controller.postCategories);

router.put("/:id", controller.putCategoriesById);

router.delete("/:id", controller.deleteCategoriesById);

router.get("/products", controller.getCategoriesProducts);

router.get("/lookups", controller.getCategoriesLookups);

router.use(handleError);

module.exports = router;
