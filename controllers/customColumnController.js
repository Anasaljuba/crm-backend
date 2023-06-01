const CustomColumn = require("../models/customColumnSchema");

exports.createCustomColumn = async (req, res) => {
  try {
    const customColumn = new CustomColumn(req.body);
    await customColumn.save();
    res.status(201).send(customColumn);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllCustomColumns = async (req, res) => {
  try {
    const customColumns = await CustomColumn.find();
    res.status(200).send(customColumns);
  } catch (error) {
    res.status(500).send({ message: "Error fetching custom columns", error });
  }
};

exports.getCustomColumn = async (req, res) => {
  try {
    const customColumn = await CustomColumn.findById(req.params.id);
    if (!customColumn)
      return res.status(404).send({ message: "Custom column not found" });
    res.status(200).send(customColumn);
  } catch (error) {
    res.status(500).send({ message: "Error fetching custom column", error });
  }
};

exports.updateCustomColumn = async (req, res) => {
  try {
    const customColumn = await CustomColumn.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!customColumn)
      return res.status(404).send({ message: "Custom column not found" });
    res.status(200).send(customColumn);
  } catch (error) {
    res.status(400).send({ message: "Error updating custom column", error });
  }
};

exports.deleteCustomColumn = async (req, res) => {
  try {
    const customColumn = await CustomColumn.findByIdAndDelete(req.params.id);
    if (!customColumn)
      return res.status(404).send({ message: "Custom column not found" });
    res.status(200).send({ message: "Custom column deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting custom column", error });
  }
};
