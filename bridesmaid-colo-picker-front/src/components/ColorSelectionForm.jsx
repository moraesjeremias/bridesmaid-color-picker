import React from 'react';
import { Sparkles, Check } from 'lucide-react';

const ColorSelectionForm = ({
  currentName,
  setCurrentName,
  selectedColor,
  setSelectedColor,
  availableColors,
  onSubmit
}) => (
  <div className="form-card">
    <h2 className="form-title">
      <Sparkles className="form-title-icon" />
      Make Your Selection
    </h2>
    <div className="input-group">
      <label className="input-label">Your Name</label>
      <input
        type="text"
        value={currentName}
        onChange={(e) => setCurrentName(e.target.value)}
        className="name-input"
        placeholder="Enter your beautiful name..."
      />
    </div>
    <div className="color-section">
      <label className="color-label">
        Choose Your Dress Color ({availableColors.length} available)
      </label>
      <div className="color-grid">
        {availableColors.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(color.id)}
            className={`color-button ${selectedColor === color.id ? 'selected' : ''}`}
            type="button"
          >
            <div
              className="color-swatch"
              style={{ backgroundColor: color.hex }}
            ></div>
            <p className="color-name">{color.name}</p>
            {selectedColor === color.id && (
              <Check className="color-check-icon" />
            )}
          </button>
        ))}
      </div>
    </div>
    <button onClick={onSubmit} className="submit-button" type="button">
      Confirm My Selection ✨
    </button>
  </div>
);

export default ColorSelectionForm; 