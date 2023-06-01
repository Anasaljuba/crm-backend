const mongoose = require("mongoose");

const TranslationSchema = new mongoose.Schema({
  sourceLanguage: {
    type: String,
    required: true,
  },
  targetLanguage: {
    type: String,
    required: true,
  },
  systemRoleContent: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: Buffer,
    required: true,
  },
});

const Translation = mongoose.model("Translation", TranslationSchema);

module.exports = Translation;
