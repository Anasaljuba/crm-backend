const express = require("express");
const {
  processExcelFile,
  getAllFiles,
  getSingleFile,
  deleteFile,
} = require("../controllers/translationController");
const multer = require("multer"); // for handling multipart/form-data requests
const upload = multer();

const router = express.Router();

router.post("/processExcelFile", upload.single("file"), processExcelFile);
router.get("/files", getAllFiles);
router.get("/files/:id", getSingleFile);
router.delete("/files/:id", deleteFile);

module.exports = router;
