const express = require("express");
const { createStory, getAllStories } = require("../controllers/storyController");

const router = express.Router();

// Add new story
router.post("/create", createStory);

// Get stories
router.get("/all", getAllStories);

module.exports = router;
