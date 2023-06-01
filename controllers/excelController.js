const multer = require("multer");
const { processExcelFileV2, getProgress } = require("../utils/openaiUtil");
const ExcelFile = require("../models/excel");

const upload = multer();

exports.uploadMiddleware = upload.single("file");

exports.processExcel = async (req, res) => {
  try {
    console.log("File received:", req.file); // Add this line for debugging

    const workbook = await processExcelFileV2(req.file.buffer);
    const newFile = new ExcelFile({
      content: workbook,
      fileName: req.file.originalname,
    });
    await newFile.save();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=processed_${req.file.originalname}`
    );
    res.status(200).send(workbook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProgress = (req, res) => {
  res.json({ progress: getProgress() });
};
exports.getAllFiles = async (req, res) => {
  try {
    const files = await ExcelFile.find({});

    res.status(200).json(
      files.map((file) => ({
        id: file._id,
        name: file.fileName,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getFileById = async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id);
    if (!file) {
      res.status(404).json({ error: "File not found" });
    } else {
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=processed_${req.params.id}.xlsx`
      );
      res.status(200).send(file.content);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteFileById = async (req, res) => {
  try {
    const file = await ExcelFile.findByIdAndRemove(req.params.id);
    if (!file) {
      res.status(404).json({ error: "File not found" });
    } else {
      res.status(200).json({ message: "File deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
