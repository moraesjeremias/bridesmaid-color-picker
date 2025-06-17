import React, { useEffect, useState } from "react";
import { getAllColors } from "../api/colors";

const colorSwatches = [
  "#f8cdd2", "#d6a5a5", "#c49bbd", "#a3b18a", "#8fc1a9",
  "#d6d6f7", "#8bb3dd", "#f7e6c4", "#bfa46f", "#e07a5f",
  "#800020", "#000080", "#50c878", "#ff7f50", "#ffdab9",
  "#98ff98", "#c8a2c8", "#6a5acd", "#ffd700", "#8e4585"
];

export default function SelectedColors() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    getAllColors().then(setColors);
    const interval = setInterval(() => getAllColors().then(setColors), 5000);
    return () => clearInterval(interval);
  }, []);

  const taken = colors.filter(c => !c.avaiable);

  return (
    <div className="selected-colors">
      <h2>❤️ Selected Colors</h2>
      {taken.length === 0 ? (
        <div style={{ textAlign: "center", color: "#e75480", marginTop: 32 }}>
          <div style={{ fontSize: 48, opacity: 0.2 }}>♡</div>
          <div>No selections yet. Be the first to choose!</div>
        </div>
      ) : (
        <div className="color-grid">
          {taken.map((color, idx) => (
            <div
              key={color.id}
              className="color-card"
              style={{ background: colorSwatches[idx % colorSwatches.length], opacity: 0.7 }}
            >
              <div style={{ height: 48 }} />
              <div style={{ fontWeight: "bold" }}>{color.displayName}</div>
              <div style={{ fontSize: 13, color: "#e75480", marginTop: 4 }}>
                {color.User?.name || "Bridesmaid"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
