const express = require("express");
const router = express.Router();
const customColumnController = require("../controllers/customColumnController");

router.post("/", customColumnController.createCustomColumn);
router.get("/", customColumnController.getAllCustomColumns);
router.get("/:id", customColumnController.getCustomColumn);
router.put("/:id", customColumnController.updateCustomColumn);
router.delete("/:id", customColumnController.deleteCustomColumn);

module.exports = router;
