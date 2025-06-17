import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import ColorSelectionForm from './ColorSelectionForm';
import SelectedColorsList from './SelectedColorsList';
import { Heart } from 'lucide-react';
import getAvailableColors from '../services/color';
import '../App.css';

const BridesmaidColorPicker = () => {
  const [selectedBridesmaids, setSelectedBridesmaids] = useState([]);
  const [currentName, setCurrentName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [isFetchingColors, setIsFetchingColors] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      setIsFetchingColors(true);
      try {
        const colors = await getAvailableColors();
        setAvailableColors(colors);
      } catch {
        setAvailableColors([]);
      } finally {
        setIsFetchingColors(false);
      }
    };
    fetchColors();
  }, []);

  const getFilteredColors = () => {
    if (!Array.isArray(availableColors)) return [];
    const selectedColorIds = selectedBridesmaids.map(b => b.colorId);
    return availableColors.filter(color => !selectedColorIds.includes(color.id));
  };

  const handleSubmit = () => {
    if (!currentName.trim() || !selectedColor) {
      alert('Please fill in your name and select a color!');
      return;
    }
    const selectedColorData = availableColors.find(c => c.id === selectedColor);
    const newBridesmaid = {
      name: currentName.trim(),
      colorId: selectedColor,
      colorName: selectedColorData.name,
      colorHex: selectedColorData.hex
    };
    setSelectedBridesmaids([...selectedBridesmaids, newBridesmaid]);
    setIsLoading(true);
    setTimeout(() => {
      setCurrentName('');
      setSelectedColor('');
      setIsLoading(false);
    }, 3000);
  };

  if (isLoading) return <LoadingScreen />;
  if (isFetchingColors) return <div className="loading-container"><div className="loading-card"><div className="loading-spinner"></div><p>Loading colors...</p></div></div>;

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <div className="header">
          <div className="header-title-container">
            <Heart className="header-icon" />
            <h1 className="header-title">Bridesmaid Dress Colors</h1>
            <Heart className="header-icon" />
          </div>
          <p className="header-subtitle">Choose your perfect dress color for the special day!</p>
          <p className="header-counter">
            {selectedBridesmaids.length}/16 bridesmaids have selected their colors
          </p>
        </div>
        <div className="content-grid">
          <ColorSelectionForm
            currentName={currentName}
            setCurrentName={setCurrentName}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            availableColors={getFilteredColors()}
            onSubmit={handleSubmit}
          />
          <SelectedColorsList selectedBridesmaids={selectedBridesmaids} />
        </div>
      </div>
    </div>
  );
};

export default BridesmaidColorPicker; 