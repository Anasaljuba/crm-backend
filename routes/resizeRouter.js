const express = require("express");
const router = express.Router();
const {
  createImage,
  getImages,
  getImagesByGallery,
  downloadImagesByGallery,
  getGalleries,
} = require("../controllers/resizeController");
const upload = require("../middleware/multer");

router.post("/create", upload.single("image"), createImage);
router.get("/", getImages);
router.get("/gallery/:id", getImagesByGallery);
router.get("/download/:id", downloadImagesByGallery);
router.get("/galleries", getGalleries); // <-- Add this line

module.exports = router;
