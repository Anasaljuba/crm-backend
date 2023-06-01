const express = require("express");
const excelController = require("../controllers/excelController");
const router = express.Router();

// router.post("/process_excel", controller.processExcel);
router.get("/progress", excelController.getProgress);
router.post(
  "/process_excel",
  excelController.uploadMiddleware,
  excelController.processExcel
);
router.get("/files", excelController.getAllFiles);
router.get("/files/:id", excelController.getFileById);
router.delete("/files/:id", excelController.deleteFileById);

module.exports = router;
