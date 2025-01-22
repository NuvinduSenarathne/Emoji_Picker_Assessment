const db = require("../config/db");

const Story = {
  // Add a new story
  create: async ({ emojiSequence, translation, authorNickname }) => {
    try {
      const [result] = await db.execute(
        "INSERT INTO emojistory (emojisequence, translation, authornickname) VALUES (?, ?, ?)",
        [JSON.stringify(emojiSequence), translation, authorNickname]
      );
      return { success: true, id: result.insertId };
    } catch (error) {
      console.error("Error creating story:", error);
      return { success: false, error };
    }
  },

  // Get all stories
  findAll: async () => {
    try {
      const [rows] = await db.execute("SELECT * FROM emojistory ORDER BY createdAt DESC");
      return rows.map((row) => ({
        ...row,
        emojiSequence: row.emojiSequence ? JSON.parse(row.emojiSequence) : [], // Use correct column name
      }));
    } catch (error) {
      console.error("Error fetching stories:", error);
      return { success: false, error };
    }
  },

  // Increment likes for a story
  incrementLikes: async (id) => {
    try {
      const [result] = await db.execute("UPDATE emojistory SET likes = likes + 1 WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error incrementing likes:", error);
      return { success: false, error };
    }
  },
};

module.exports = Story;
