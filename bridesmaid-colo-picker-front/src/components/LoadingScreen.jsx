import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen = () => (
  <div className="loading-container">
    <div className="loading-card">
      <div className="loading-spinner"></div>
      <Sparkles className="loading-icon" />
      <h2 className="loading-title">Saving Your Selection</h2>
      <p className="loading-text">Please wait while we process your beautiful choice...</p>
      <div className="loading-info">
        <p className="loading-info-text">✨ Saving your color selection</p>
      </div>
    </div>
  </div>
);

export default LoadingScreen; 