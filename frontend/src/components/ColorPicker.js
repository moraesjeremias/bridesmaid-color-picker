import React, { useState, useEffect } from "react";
import { getAvailableColors, pickColor } from "../api/colors";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import LoadingScreen from "./LoadingScreen";

const colorSwatches = [
  "#f8cdd2", "#d6a5a5", "#c49bbd", "#a3b18a", "#8fc1a9",
  "#d6d6f7", "#8bb3dd", "#f7e6c4", "#bfa46f", "#e07a5f",
  "#800020", "#000080", "#50c878", "#ff7f50", "#ffdab9",
  "#98ff98", "#c8a2c8", "#6a5acd", "#ffd700", "#8e4585"
];

export default function ColorPicker({ onSelection }) {
  const [name, setName] = useState("");
  const [colors, setColors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Session cookie for userId
  useEffect(() => {
    let userId = Cookies.get("userId");
    if (!userId) {
      const random = Math.random().toString(36).substring(2) + Date.now();
      userId = CryptoJS.SHA256(random).toString(CryptoJS.enc.Hex);
      Cookies.set("userId", userId, { expires: 365 });
    }
  }, []);

  useEffect(() => {
    getAvailableColors().then(setColors);
  }, []);

  const handleSelect = (idx) => setSelected(idx);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || selected === null) return;
    setLoading(true);
    const userId = Cookies.get("userId");
    const color = colors[selected];
    try {
      await pickColor({
        id: color.id,
        displayName: color.displayName,
        userId,
        userName: name
      });
      onSelection();
    } catch (err) {
      alert("Color already taken or error occurred. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      <h2>✨ Make Your Selection</h2>
      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your beautiful name..."
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <div style={{ marginBottom: 8, fontSize: 14, color: "#e75480" }}>
          Choose Your Dress Color ({colors.length} available)
        </div>
        <div className="color-grid">
          {colors.map((color, idx) => (
            <div
              key={color.id}
              className={`color-card${selected === idx ? " selected" : ""}${!color.avaiable ? " taken" : ""}`}
              style={{ background: colorSwatches[idx % colorSwatches.length] }}
              onClick={() => handleSelect(idx)}
            >
              <div style={{ height: 48 }} />
              <div style={{ fontSize: 14, marginTop: 8 }}>{color.displayName}</div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={selected === null || !name}>
          Confirm My Selection ✨
        </button>
      </form>
    </div>
  );
}
