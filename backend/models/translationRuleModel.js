const db = require("../config/db");

const TranslationRule = {
  // Add a new rule
  create: async ({ pattern, templates }) => {
    try {
      const [result] = await db.execute(
        "INSERT INTO translationrule (pattern, templates) VALUES (?, ?)",
        [JSON.stringify(pattern), JSON.stringify(templates)]
      );
      return { success: true, id: result.insertId };
    } catch (error) {
      console.error("Error creating translation rule:", error);
      return { success: false, error };
    }
  },

  // Find translation by pattern
  findByPattern: async (pattern) => {
    try {
      const [rows] = await db.execute("SELECT * FROM translationrule WHERE pattern = ?", [
        JSON.stringify(pattern),
      ]);

      if (rows.length > 0) {
        return {
          success: true,
          templates: JSON.parse(rows[0].templates),
        };
      } else {
        return { success: false, message: "No matching rule found." };
      }
    } catch (error) {
      console.error("Error finding translation rule:", error);
      return { success: false, error };
    }
  },
};

module.exports = TranslationRule;
