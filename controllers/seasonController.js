const Season = require("../models/session.js");

module.exports.getSeasons = async (req, res) => {
  let seasons = await Season.find().exec();

  // If no seasons are found, create a default season
  if (seasons.length === 0) {
    const defaultSeason = new Season({
      name: "Default Season",
      content: "Default content",
      messages: [],
    }); // Add default content
    await defaultSeason.save();
    seasons = [defaultSeason];
  }

  res.json(seasons);
};

module.exports.createSeason = async (req, res) => {
  const { name, content } = req.body; // Get content from request body

  const newSeason = new Season({ name, content, messages: [] }); // Add content when creating new season
  await newSeason.save();

  res.json(newSeason);
};
module.exports.deleteSeason = async (req, res) => {
  const { id } = req.params;

  try {
    const season = await Season.findById(id);

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    await Season.findByIdAndRemove(id);
    res.json({ message: "Season deleted successfully" });
  } catch (error) {
    console.error("Failed to delete season:", error);
    return res.status(500).json({ error: "Failed to delete season." });
  }
};
