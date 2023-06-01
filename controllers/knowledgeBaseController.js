const KnowledgeBasePage = require("../models/KnowledgeBasePage");

// Get all knowledge base pages
exports.getAllKnowledgeBasePages = async (req, res) => {
  try {
    const knowledgeBasePages = await KnowledgeBasePage.find();
    res.status(200).json(knowledgeBasePages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new knowledge base page
exports.createKnowledgeBasePage = async (req, res) => {
  const knowledgeBasePage = new KnowledgeBasePage(req.body);

  try {
    const savedKnowledgeBasePage = await knowledgeBasePage.save();
    res.status(201).json(savedKnowledgeBasePage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a knowledge base page by ID
exports.getKnowledgeBasePageById = async (req, res) => {
  try {
    const knowledgeBasePage = await KnowledgeBasePage.findById(req.params.id);
    if (!knowledgeBasePage) {
      return res.status(404).json({ message: "Knowledge base page not found" });
    }
    res.status(200).json(knowledgeBasePage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a knowledge base page
exports.updateKnowledgeBasePage = async (req, res) => {
  try {
    const updatedKnowledgeBasePage = await KnowledgeBasePage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedKnowledgeBasePage) {
      return res.status(404).json({ message: "Knowledge base page not found" });
    }
    res.status(200).json(updatedKnowledgeBasePage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a knowledge base page
exports.deleteKnowledgeBasePage = async (req, res) => {
  try {
    const deletedKnowledgeBasePage = await KnowledgeBasePage.findByIdAndDelete(
      req.params.id
    );
    if (!deletedKnowledgeBasePage) {
      return res.status(404).json({ message: "Knowledge base page not found" });
    }
    res.status(200).json({ message: "Knowledge base page deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
