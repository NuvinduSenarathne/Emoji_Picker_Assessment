const express = require("express");
const { addTranslationRule, getTranslation } = require("../controllers/translationRuleController");

const router = express.Router();

// Add a new translation rule
router.post("/rules", addTranslationRule);

// Get translation
router.post("/translate", getTranslation);

module.exports = router;
