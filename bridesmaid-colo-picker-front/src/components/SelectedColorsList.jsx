import React from 'react';
import { Heart, Check } from 'lucide-react';

const SelectedColorsList = ({ selectedBridesmaids }) => (
  <div className="selected-card">
    <h2 className="selected-title">
      <Heart className="selected-title-icon" />
      Selected Colors
    </h2>
    {selectedBridesmaids.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon-container">
          <Heart className="empty-icon" />
        </div>
        <p className="empty-text">No selections yet. Be the first to choose!</p>
      </div>
    ) : (
      <div className="selected-list">
        {selectedBridesmaids.map((bridesmaid, index) => (
          <div key={index} className="selected-item">
            <div
              className="selected-color-circle"
              style={{ backgroundColor: bridesmaid.colorHex }}
            ></div>
            <div className="selected-info">
              <h3 className="selected-name">{bridesmaid.name}</h3>
              <p className="selected-color-name">{bridesmaid.colorName}</p>
            </div>
            <Check className="selected-check" />
          </div>
        ))}
      </div>
    )}
    <div className="remaining-counter">
      <p className="remaining-text">
        🌸 {16 - selectedBridesmaids.length} spots remaining
      </p>
    </div>
  </div>
);

export default SelectedColorsList; 