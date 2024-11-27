import React, { useState, useRef, useEffect } from 'react'
import { FilterSearchLinear, Setting4Linear, UserOctagonLinear, ColorSwatchLinear, LogoutLinear, CoffeeLinear, Send1Linear } from 'react-iconsax-icons'
import { Link, useNavigate } from 'react-router-dom'
import { FilterPopup } from './FilterPopup';
import { PalettePopup } from './PalettePopup';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Nav({ sortOrder, setSortOrder, statusFilter, setStatusFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCoffeePopupOpen, setIsCoffeePopupOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [bugReport, setBugReport] = useState({ email: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const { themeColors } = useTheme();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const settingsRef = useRef(null);
  const coffeePopupRef = useRef(null);
  const bugReportRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (coffeePopupRef.current && !coffeePopupRef.current.contains(event.target)) {
        setIsCoffeePopupOpen(false);
      }
      if (bugReportRef.current && !bugReportRef.current.contains(event.target)) {
        setIsBugReportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setBugReport(prev => ({ ...prev, email: currentUser.email }));
    }
  }, [currentUser]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSettingsOpen(false);
    setIsCoffeePopupOpen(false);
    setIsBugReportOpen(false);
  }

  const togglePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
    setIsSettingsOpen(false);
    setIsCoffeePopupOpen(false);
    setIsBugReportOpen(false);
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsCoffeePopupOpen(false);
    setIsBugReportOpen(false);
  }

  const toggleCoffeePopup = () => {
    setIsCoffeePopupOpen(!isCoffeePopupOpen);
    setIsSettingsOpen(false);
    setIsBugReportOpen(false);
  }

  const toggleBugReport = () => {
    setIsBugReportOpen(!isBugReportOpen);
    setIsSettingsOpen(false);
    setIsCoffeePopupOpen(false);
    setSubmitStatus({ type: '', message: '' });
  }

  const handleBugReportChange = (e) => {
    const { name, value } = e.target;
    setBugReport(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleBugReportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const bugReportData = {
        email: bugReport.email,
        description: bugReport.description,
        userId: currentUser ? currentUser.uid : 'anonymous',
        timestamp: serverTimestamp(),
        status: 'new'
      };

      await addDoc(collection(db, 'bugReports'), bugReportData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Bug report submitted successfully!'
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setBugReport({ email: '', description: '' });
        setIsBugReportOpen(false);
        setSubmitStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error submitting bug report:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit bug report. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleOptionClick = async (option) => {
    setIsSettingsOpen(false);
    if (option === 'theme') {
      togglePalette();
    } else if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'coffee') {
      toggleCoffeePopup();
    } else if (option === 'bug') {
      toggleBugReport();
    } else if (option === 'logout') {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Failed to log out:', error);
      }
    }
  }

  return (
    <nav>
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full mx-auto px-3 py-3 flex items-center justify-between">
          <div className="flex justify-between">
            <Link to="/" className="text-xl font-bold" style={{color:themeColors.primary}}>
              <div className='text-sm p-2 rounded-full' style={{backgroundColor:themeColors.bgbutton1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'}}>
                TickiTask
              </div>
            </Link>
          </div>
          <div className='flex gap-3'>
            <div 
              className='p-2 rounded-full cursor-pointer'
              style={{backgroundColor:themeColors.bgbutton1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'}}
              onClick={toggleFilter}
            >
              <FilterSearchLinear size="25" color={themeColors.primary}/>
            </div>
            <div ref={settingsRef} className="relative">
              <div 
                className='p-2 rounded-full cursor-pointer'
                style={{backgroundColor:themeColors.bgbutton1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'}}
                onClick={handleSettingsClick}
              >
                <Setting4Linear size="25" color={themeColors.primary}/>
              </div>

              {isSettingsOpen && (
                <div
                  className="absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-xl"
                  style={{ backgroundColor: themeColors.bgbutton1 }}
                >
                  <button
                    onClick={() => handleOptionClick('profile')}
                    className="flex items-center px-4 py-2 w-full hover:opacity-80 transition-opacity"
                    style={{ color: themeColors.primary }}
                  >
                    <UserOctagonLinear size="20" color={themeColors.primary} className="mr-2" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick('theme')}
                    className="flex items-center px-4 py-2 w-full hover:opacity-80 transition-opacity"
                    style={{ color: themeColors.primary }}
                  >
                    <ColorSwatchLinear size="20" color={themeColors.primary} className="mr-2" />
                    <span>Theme</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick('coffee')}
                    className="flex items-center px-4 py-2 w-full hover:opacity-80 transition-opacity"
                    style={{ color: themeColors.primary }}
                  >
                    <CoffeeLinear size="20" color={themeColors.primary} className="mr-2" />
                    <span>Buy me a coffee</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick('bug')}
                    className="flex items-center px-4 py-2 w-full hover:opacity-80 transition-opacity"
                    style={{ color: themeColors.primary }}
                  >
                    <Send1Linear size="20" color={themeColors.primary} className="mr-2" />
                    <span>Report Bug</span>
                  </button>
                  <button
                    onClick={() => handleOptionClick('logout')}
                    className="flex items-center px-4 py-2 w-full hover:opacity-80 transition-opacity"
                    style={{ color: themeColors.primary }}
                  >
                    <LogoutLinear size="20" color={themeColors.primary} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {/* Buy me a coffee popup */}
              {isCoffeePopupOpen && (
                <div
                  ref={coffeePopupRef}
                  className="absolute right-0 mt-2 p-6 w-80 rounded-lg shadow-xl"
                  style={{ backgroundColor: themeColors.bgbutton1, opacity: 0.97 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <CoffeeLinear size="48" color={themeColors.primary} className="mb-4" />
                    <h3 className="text-xl font-bold mb-2" style={{ color: themeColors.primary }}>
                      Support My Work!
                    </h3>
                    <p className="mb-4" style={{ color: themeColors.primary }}>
                      If you enjoy using TickiTask, consider buying me a coffee!
                    </p>
                    <form action="https://www.paypal.com/donate" method="post" target="_blank">
                      <input type="hidden" name="business" value="guewoljohannkionghat@gmail.com" />
                      <input type="hidden" name="currency_code" value="USD" />
                      <input type="hidden" name="amount" value="5" />
                      <input type="hidden" name="item_name" value="Buy me a coffee - TickiTask Support" />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                        style={{ backgroundColor: themeColors.primary, color: themeColors.bgbutton1 }}
                      >
                        Donate with PayPal
                      </button>
                    </form>
                    <p className="mt-4 text-sm" style={{ color: themeColors.primary }}>
                      Your support helps me maintain and improve TickiTask ❤️
                    </p>
                  </div>
                </div>
              )}

              {/* Bug Report popup */}
              {isBugReportOpen && (
                <div
                  ref={bugReportRef}
                  className="absolute right-0 mt-2 p-6 w-96 rounded-lg shadow-xl"
                  style={{ backgroundColor: themeColors.bgbutton1, opacity: 0.97, width:350 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <Send1Linear size="48" color={themeColors.primary} className="mb-4" />
                    <h3 className="text-xl font-bold mb-2" style={{ color: themeColors.primary }}>
                      Report a Bug
                    </h3>
                    <p className="mb-4" style={{ color: themeColors.primary }}>
                      Help us improve TickiTask by reporting any issues you encounter.
                    </p>
                    <form onSubmit={handleBugReportSubmit} className="w-full">
                      <div className="mb-4">
                        <input
                          type="email"
                          name="email"
                          value={bugReport.email}
                          onChange={handleBugReportChange}
                          placeholder="Your email address"
                          className="w-full p-3 rounded-lg mb-3"
                          style={{ 
                            backgroundColor: themeColors.background,
                            color: themeColors.primary,
                            border: `1px solid ${themeColors.primary}`
                          }}
                          required
                        />
                        <textarea
                          name="description"
                          value={bugReport.description}
                          onChange={handleBugReportChange}
                          placeholder="Describe the bug and steps to reproduce it..."
                          className="w-full p-3 rounded-lg resize-none"
                          style={{ 
                            backgroundColor: themeColors.background,
                            color: themeColors.primary,
                            border: `1px solid ${themeColors.primary}`,
                            minHeight: '120px'
                          }}
                          required
                        />
                      </div>
                      {submitStatus.message && (
                        <p 
                          className="mb-4 text-sm"
                          style={{ 
                            color: submitStatus.type === 'error' ? '#ff4444' : '#00C851'
                          }}
                        >
                          {submitStatus.message}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 w-full"
                        style={{ 
                          backgroundColor: themeColors.primary, 
                          color: themeColors.bgbutton1,
                          opacity: isSubmitting ? 0.7 : 1
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Report'}
                      </button>
                    </form>
                    <p className="mt-4 text-sm" style={{ color: themeColors.primary }}>
                      Thank you for helping make TickiTask better! 🐛
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <FilterPopup
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {isPaletteOpen && (
        <PalettePopup onClose={() => setIsPaletteOpen(false)} />
      )}
    </nav>
  )
}