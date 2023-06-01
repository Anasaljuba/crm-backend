const express = require("express");
const router = express.Router();
const AnnouncementsController = require("../controllers/announcementsController");

router.get("/", AnnouncementsController.getAllAnnouncements);
router.post("/", AnnouncementsController.createAnnouncement);
router.get("/:id", AnnouncementsController.getAnnouncementById);
router.put("/:id", AnnouncementsController.updateAnnouncement);
router.delete("/:id", AnnouncementsController.deleteAnnouncement);

module.exports = router;
