const Category = require("../models/Category");

// Create a new category
exports.createCategory = async (req, res) => {
  const category = new Category(req.body);

  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
