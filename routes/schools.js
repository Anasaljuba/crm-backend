const express = require("express");
const router = express.Router();
const SchoolsController = require("../controllers/schoolsController");

router.get("/", SchoolsController.getAllSchools);
router.post("/", SchoolsController.createSchool);
router.get("/:id", SchoolsController.getSchoolById);
router.put("/:id", SchoolsController.updateSchool);
router.delete("/:id", SchoolsController.deleteSchool);

module.exports = router;
