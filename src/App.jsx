import './App.css';
import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';
import { useTheme } from './theme/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './screens/Dashboard';
import Formulaire from './screens/Formulaire';
import Checklist from './screens/Checklist';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import { ThemeProvider } from './theme/ThemeContext';
import { useAuth } from './context/AuthContext';
import { PasswordReset } from './components/PasswordReset';

// Protected Route component
function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    
    if (loading) return <div>Loading...</div>;
    
    return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { themeColors } = useTheme();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className='overflow-scroll' style={{backgroundColor: themeColors.bgApp, height: '100vh'}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/Formulaire"
            element={
              <PrivateRoute>
                <Formulaire />
              </PrivateRoute>
            }
          />
          <Route
            path="/Checklist"
            element={
              <PrivateRoute>
                <Checklist />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
