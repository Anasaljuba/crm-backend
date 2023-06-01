const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/categoriesController");

router.post("/", CategoriesController.createCategory);

module.exports = router;
