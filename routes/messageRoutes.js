const express = require("express");
const {
  getMessages,
  createMessage,
} = require("../controllers/messageController.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getMessages);
router.post("/", createMessage);

module.exports = router;
