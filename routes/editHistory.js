// routes/editHistory.js
const express = require("express");
const router = express.Router();
const EditHistory = require("../models/EditHistory");

router.post("/", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body

  try {
    const history = new EditHistory(req.body);
    await history.save();
    res.status(201).json(history);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const histories = await EditHistory.find()
      .populate("editor", "_id username")
      .populate("editedClient", "_id name");
    res.status(200).json(histories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
