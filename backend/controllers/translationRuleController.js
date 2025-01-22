const TranslationRule = require("../models/translationRuleModel");

const addTranslationRule = async (req, res) => {
  const { pattern, templates } = req.body;

  if (!pattern || !Array.isArray(pattern) || !templates || !Array.isArray(templates)) {
    return res.status(400).json({ success: false, message: "Invalid input." });
  }

  try {
    const result = await TranslationRule.create({ pattern, templates });
    if (result.success) {
      return res.status(201).json({ success: true, id: result.id });
    } else {
      throw result.error;
    }
  } catch (error) {
    console.error("Error adding translation rule:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

const getTranslation = async (req, res) => {
  const { pattern } = req.body;

  console.log("Received pattern:", pattern);

  if (!pattern || !Array.isArray(pattern)) {
    return res.status(400).json({ success: false, message: "Invalid input." });
  }

  try {
    const result = await TranslationRule.findByPattern(pattern);
    if (result.success) {
      const randomIndex = Math.floor(Math.random() * result.templates.length);
      const translation = result.templates[randomIndex];
      return res.status(200).json({ success: true, translation });
    } else {
      return res.status(200).json({ success: false, translation: "No matching pattern found." });
    }
  } catch (error) {
    console.error("Error fetching translation:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};


module.exports = { addTranslationRule, getTranslation };
