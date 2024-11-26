import React, { createContext, useContext, useState, useEffect } from 'react';
import { palette, themeColors } from './index';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeUpdate, setThemeUpdate] = useState(0);

  useEffect(() => {
    // Load saved theme on initial mount
    const savedThemeIndex = localStorage.getItem('selectedThemeIndex');
    if (savedThemeIndex !== null) {
      updateThemeColors(parseInt(savedThemeIndex));
    }
  }, []);

  const updateThemeColors = (themeIndex) => {
    Object.keys(palette[themeIndex]).forEach(key => {
      themeColors[key] = palette[themeIndex][key];
    });
    localStorage.setItem('selectedThemeIndex', themeIndex);
    setThemeUpdate(prev => prev + 1); // Force update
  };

  return (
    <ThemeContext.Provider value={{ updateTheme: updateThemeColors, themeUpdate }}>
      {children}
    </ThemeContext.Provider>
  );
};