// models/EditHistory.js
const mongoose = require("mongoose");

const EditHistorySchema = new mongoose.Schema({
  editor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  editedClient: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  labelName: String,
  before: String,
  after: String,
  dateOfEdit: Date,
});

module.exports = mongoose.model("EditHistory", EditHistorySchema);
