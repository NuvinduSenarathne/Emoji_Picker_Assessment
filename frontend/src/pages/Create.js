import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

const EmojiComposer = () => {
  const [emojiSequence, setEmojiSequence] = useState([]);
  const [translation, setTranslation] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [authorNickname, setAuthorNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle emoji selection
  const handleEmojiClick = (emojiData) => {
    setEmojiSequence((prev) => [...prev, emojiData.emoji]);
  };

  // Handle translation
  const handleTranslate = async () => {
    setLoading(true);
    setError("");
    try {
      if (emojiSequence == "") {
        setError("Please insert pattern.");
      } else {
        const response = await axios.post(`http://localhost:8080/api/translation/translate`, {
        pattern: emojiSequence,
      });
      setTranslation(response.data.translation)
      console.log("Translation API Response:", response.data);
      }
    } catch (error) {
      console.error("Translation error:", error.response ? error.response.data : error.message);
      setError("Error fetching translation.");
    } finally {
      setLoading(false);
    }
  };
  

  // Handle story submission
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      if (!translation) {
        setError("Please make translation first.");
        return
      } 
      if (!authorNickname) {
        setError("Please enter author nick name.");
        return
      }

      const response = await axios.post(`http://localhost:8080/api/stories/create`, {
        emojiSequence,
        translation,
        authorNickname,
      });
      if (response.data) {
        alert("Story submitted!");
        setEmojiSequence([]);
        setTranslation("");
        setAuthorNickname("");
      } else {
        alert("Failed to submit story.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("Error submitting story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Your Emoji Story</h2>
      <div>
        <button onClick={() => setShowPicker(!showPicker)}>
          {showPicker ? "Close Emoji Picker" : "Pick Emoji"}
        </button>
        {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </div>
      <div>
        <h3>Your Emoji Sequence</h3>
        <p>{emojiSequence.join(" ")}</p>
      </div>
      <div>
        <button onClick={handleTranslate} disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
        <p><strong>Translation:</strong> {translation || "N/A"}</p>
      </div>
      <input
        type="text"
        placeholder="Enter your Nickname"
        value={authorNickname}
        onChange={(e) => setAuthorNickname(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {loading ? "Submitting..." : "Submit Story"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default EmojiComposer;
