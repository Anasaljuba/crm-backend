const Message = require("../models/message.js");
const Season = require("../models/session.js");
const { OpenAIApi, Configuration } = require("openai");
const { config } = require("dotenv");

config();
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports.getMessages = async (req, res) => {
  const { season } = req.query;
  const messages = await Message.find({ season }).populate("season").exec();
  res.json(messages);
};

module.exports.createMessage = async (req, res) => {
  const { messages, seasonId } = req.body;

  const season = await Season.findById(seasonId); // Get the season from the database
  if (!season) {
    return res.status(404).json({ error: "Season not found." });
  }
  console.log(season.content);
  const filteredMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: season.content, // Use the season's content
      },
      ...filteredMessages,
    ],
  });
  const newMessages = [
    {
      role: "user",
      content: messages[messages.length - 1].content,
    },
    {
      role: "assistant",
      content: completion.data.choices[0].message.content,
    },
  ];

  // Save messages to the database
  try {
    const savedMessages = await Message.insertMany(
      newMessages.map((msg) => ({
        ...msg,
        season: seasonId,
      }))
    );
    const season = await Season.findById(seasonId);
    season.messages.push(...savedMessages.map((msg) => msg._id));
    await season.save();
  } catch (error) {
    console.error("Failed to save messages:", error);
    return res.status(500).json({ error: "Failed to save messages." });
  }

  res.json({
    completion: completion.data.choices[0].message,
  });
};
