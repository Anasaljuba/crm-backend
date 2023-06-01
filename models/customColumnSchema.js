// customColumnSchema.js
const mongoose = require("mongoose");

const customColumnSchema = new mongoose.Schema({
  columnName: { type: String, required: true },
  columnType: { type: String, required: true },
});

module.exports = mongoose.model("CustomColumn", customColumnSchema);
