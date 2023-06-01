const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema({
  name: String,
  content: String, // New field for content

  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Season", SeasonSchema);
