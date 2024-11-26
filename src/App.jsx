import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Dashboard } from './screens/Dashboard';
import { Checklist } from './screens/Checklist';
import { Formulaire } from './screens/Formulaire';
import { themeColors } from './theme';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function AppContent() {
  const { themeUpdate } = useTheme();
  
  return (
    <Router>
      <div className="min-h-screen h-full" style={{backgroundColor: themeColors.bgApp}}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Checklist" element={<Checklist />} />
          <Route path="/Formulaire" element={<Formulaire />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
