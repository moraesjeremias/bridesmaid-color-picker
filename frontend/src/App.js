import React, { useState } from "react";
import "./styles.css";
import ColorPicker from "./components/ColorPicker";
import SelectedColors from "./components/SelectedColors";

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <div style={{
        background: "linear-gradient(180deg, #ffe0ef 0%, #fff 100%)",
        padding: "1.5rem 0 0.5rem 0",
        textAlign: "center"
      }}>
        <h1>💗 Bridesmaid Dress Colors 💗</h1>
        <div style={{ color: "#e75480", fontWeight: 500, marginBottom: 8 }}>
          Choose your perfect dress color for the special day!
        </div>
        <div style={{ color: "#e75480", fontSize: 14, marginBottom: 16 }}>
          0/16 bridesmaids have selected their colors
        </div>
      </div>
      <div className="container">
        {!submitted ? (
          <ColorPicker onSelection={() => setSubmitted(true)} />
        ) : (
          <div style={{ textAlign: "center", color: "#e75480", fontSize: 22, margin: "2rem 0" }}>
            Thank you! Your color is locked in. 🎉
          </div>
        )}
      </div>
      <div className="container">
        <SelectedColors />
      </div>
    </div>
  );
}
