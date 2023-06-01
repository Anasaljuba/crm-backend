const openaiUtil = require("../utils/openaiUtil");
const Translation = require("../models/Translation");
const { Buffer } = require("buffer");

exports.processExcelFile = async (req, res) => {
  try {
    const inputBuffer = Buffer.from(req.file.buffer);
    const sourceLanguage = req.body.sourceLanguage;
    const targetLanguage = req.body.targetLanguage;
    const systemRoleContent = req.body.systemRoleContent;
    const filename = req.file.originalname;

    const outputBuffer = await openaiUtil.processExcelFileForTranslation(
      inputBuffer,
      sourceLanguage,
      targetLanguage,
      systemRoleContent
    );

    const translation = new Translation({
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      systemRoleContent: systemRoleContent,
      filename: filename,
      file: outputBuffer,
    });

    await translation.save();

    res.status(200).send(outputBuffer);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};
exports.getAllFiles = async (req, res) => {
  try {
    const translations = await Translation.find().select(
      "filename date sourceLanguage targetLanguage systemRoleContent"
    );
    res.status(200).json(translations);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

exports.getSingleFile = async (req, res) => {
  try {
    const id = req.params.id;
    const translation = await Translation.findById(id);
    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.set(
      "Content-Disposition",
      `attachment; filename=${translation.filename}`
    );
    res.send(translation.file);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};
exports.deleteFile = async (req, res) => {
  try {
    const id = req.params.id;
    await Translation.findByIdAndDelete(id);
    res.status(200).send({ message: "File successfully deleted" });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};
