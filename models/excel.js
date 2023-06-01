const mongoose = require("mongoose");

const excelFileSchema = new mongoose.Schema({
  content: Buffer,
  fileName: String,
});

module.exports = mongoose.model("ExcelFile", excelFileSchema);
