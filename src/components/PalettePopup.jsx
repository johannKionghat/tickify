import React from 'react';
import { CloseCircleLinear } from 'react-iconsax-icons';
import { themeColors } from '../theme';
import { useTheme } from '../theme/ThemeContext';

export const PalettePopup = ({ onClose }) => {
  const { updateTheme } = useTheme();
  
  const palettePreview = [
    { name: "Bright", colors: ['#020202', '#F8F8E8', '#FFFFFF'] },
    { name: "Dark", colors: ['#FFFFFF', '#333333', '#FFC107'] },
    { name: "Blue", colors: ['#F3F6F8', '#FFFFFF', '#0077B5'] },
    { name: "Green", colors: ['#DCF8C6', '#075E54', '#25D366'] },
    { name: "Monochrome", colors: ['#FFFFFF', '#1C1C1C', '#C0C0C0'] },
    { name: "Rose", colors: ['#EF476F', '#26547C', '#FFD166'] },
    { name: "Aries", colors: ['#FF5733', '#900C3F', '#FFC300'] },
    { name: "Taurus", colors: ['#4CAF50', '#8BC34A', '#795548'] },
    { name: "Gemini", colors: ['#2196F3', '#E91E63', '#FFEB3B'] },
    { name: "Cancer", colors: ['#673AB7', '#3F51B5', '#FFC107'] },
    { name: "Leo", colors: ['#FF8C00', '#FF4500', '#FFD700'] }
  ];

  const handleSelectPalette = (index) => {
    updateTheme(index);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 overflow-scroll scrollbar-hide"
        onClick={onClose}
      ></div>
      
      <div 
        className="relative overflow-hidden rounded-lg p-3 max-w-md w-full mx-4 shadow-xl transform transition-all"
        style={{ backgroundColor: themeColors.popupBackground, height:350 }}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-semibold" style={{ color: themeColors.bgApp }}>
            Choose Theme
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: themeColors.closeButtonBackground }}
          >
            <CloseCircleLinear
              size="24"
              color={themeColors.bgApp}
            />
          </button>
        </div>

        <div className="grid overflow-y-scroll scrollbar-hide grid-cols-2 gap-4 rounded-lg sm:grid-cols-3" style={{ height: 280 }}>
          {palettePreview.map((palette, index) => (
            <button
              key={index}
              onClick={() => handleSelectPalette(index)}
              className="p-4 rounded-lg transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: themeColors.bgbutton1 }}
            >
              <div className="flex gap-2 mb-2 justify-center">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: themeColors.primary }}>
                {palette.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
