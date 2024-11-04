const express = require("express");
const router = new express.Router();
const controller = require("../controllers/subcategories.controller");
const { handleError } = require("../../../middleware/errorhandler");

router.get("/", controller.getSubcategories);

router.post("/", controller.postSubcategories);

router.get("/:category_id", controller.getSubcategoriesByCategoryId);

router.put("/:id", controller.putSubcategoriesById);

router.delete("/:id", controller.deleteSubcategoriesById);

router.use(handleError);

module.exports = router;
