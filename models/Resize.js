const mongoose = require("mongoose");

const ResizeSchema = new mongoose.Schema({
  resizedImage: {
    type: String,
    required: true,
  },
  galleryId: {
    type: String,
    required: true,
  },
  galleryName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resize", ResizeSchema);
