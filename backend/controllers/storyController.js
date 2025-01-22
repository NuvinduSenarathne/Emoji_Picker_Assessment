const Story = require("../models/storyModel");

// Create a new story
const createStory = async (req, res) => {
  const { emojiSequence, translation, authorNickname } = req.body;

  // VAlidator
  if (!emojiSequence || !translation || !authorNickname) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const result = await Story.create({ emojiSequence, translation, authorNickname });

  if (result.success) {
    res.status(201).json({ message: "Story created successfully.", storyId: result.id });
  } else {
    res.status(500).json({ message: "Failed to create story.", error: result.error.message });
  }
};

// Get all stories
const getAllStories = async (req, res) => {
  const stories = await Story.findAll();

  if (stories.success === false) {
    return res.status(500).json({ message: "Failed to fetch stories.", error: stories.error.message });
  }

  res.status(200).json(stories);
};

module.exports = {
    createStory,
    getAllStories
  }
