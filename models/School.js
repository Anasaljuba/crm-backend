const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  timings: { type: String, required: true },
});

module.exports = mongoose.model("School", schoolSchema);
