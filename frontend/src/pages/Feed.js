import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/stories/all`);
      setStories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      <h2>Welcome to the Emoji Story Generator Feed!</h2>
      <p>Here you can view stories.</p>
      <div>
        {stories.map((story) => (
          <div key={story.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>Author: {story.authorNickname}</h3>
            <p>
              <strong>Translation:</strong> {story.translation}
            </p>
            <p>
              <strong>Emojis:</strong>{" "}
              {story.emojiSequence.length > 0 ? story.emojiSequence.join(" ") : "No emojis"}
            </p>
            <p>
              <strong>Likes:</strong> {story.likes}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(story.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
