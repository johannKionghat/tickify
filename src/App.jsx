import './App.css';
import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import { useTheme } from './theme/ThemeContext';
import Dashboard from './screens/Dashboard';
import Formulaire from './screens/Formulaire';
import Checklist from './screens/Checklist';
import { ThemeProvider } from './theme/ThemeContext';

function AppContent() {
  const { themeColors } = useTheme();

  return (
    <Router>
      <div className='overflow-scroll' style={{backgroundColor: themeColors.bgApp, height: '100vh'}}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Formulaire" element={<Formulaire />} />
          <Route path="/Checklist" element={<Checklist />} />
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
