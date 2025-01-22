import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Feed from "./pages/Feed";
import Create from "./pages/Create";
import Saved from "./pages/Saved";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="feed">
        <h1>Emoji Story Generator</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">Create Stories</Link> | <Link to="/saved">Saved Stories</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<Create />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

