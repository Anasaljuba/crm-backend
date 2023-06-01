const express = require("express");
const {
  getSeasons,
  createSeason,
  deleteSeason,
} = require("../controllers/seasonController.js");

const router = express.Router();

router.get("/", getSeasons);
router.post("/", createSeason);
router.delete("/:id", deleteSeason);

module.exports = router;
