const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: String,
  content: String,

  season: { type: mongoose.Schema.Types.ObjectId, ref: "Season" },
});

module.exports = mongoose.model("Message", MessageSchema);
