import React, { useState, useRef, useEffect } from 'react'
import { FilterSearchLinear, Setting4Linear, UserOctagonLinear, ColorSwatchLinear, LogoutLinear } from 'react-iconsax-icons'
import { Link, useNavigate } from 'react-router-dom'
import { FilterPopup } from './FilterPopup';
import { PalettePopup } from './PalettePopup';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Nav({ sortOrder, setSortOrder, statusFilter, setStatusFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { themeColors } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsSettingsOpen(false);
  }

  const togglePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
    setIsSettingsOpen(false);
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const handleOptionClick = async (option) => {
    setIsSettingsOpen(false);
    if (option === 'theme') {
      togglePalette();
    } else if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'logout') {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }

  return (
    <nav>
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full mx-auto px-3 py-3 flex items-center justify-between">
          <div className="flex justify-between">
            <Link to="/" className="text-xl font-bold" style={{color:themeColors.primary}}>
              <div className='text-sm p-2 rounded-full' style={{backgroundColor:themeColors.bgbutton1}}>
                TickiTask
              </div>
            </Link>
          </div>
          <div className='flex gap-3'>
            <div 
              className='p-2 rounded-full cursor-pointer'
              style={{backgroundColor:themeColors.bgbutton1}}
              onClick={toggleFilter}
            >
              <FilterSearchLinear size="25" color={themeColors.primary}/>
            </div>
            <div ref={settingsRef} className="relative">
              <div 
                className='p-2 rounded-full cursor-pointer'
                style={{backgroundColor:themeColors.bgbutton1}}
                onClick={handleSettingsClick}
              >
                <Setting4Linear size="25" color={themeColors.primary}/>
              </div>
              
              {/* OneUI-style Settings Bubble */}
              {isSettingsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-2xl py-1 z-50"
                  style={{backgroundColor: themeColors.bgApp, opacity: 0.9, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2'}}
                >
                  <div className="px-4 py-2 text-sm font-semibold" style={{color: themeColors.primary}}>
                    Settings
                  </div>
                  <div className="h-px mx-4 my-1" style={{backgroundColor: themeColors.separator}}></div>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                    style={{color: themeColors.primary}}
                    onClick={() => handleOptionClick('profile')}
                  >
                    <UserOctagonLinear size="20" color={themeColors.primary} className="mr-3" />
                    Profile
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                    style={{color: themeColors.primary}}
                    onClick={() => handleOptionClick('theme')}
                  >
                    <ColorSwatchLinear size="20" color={themeColors.primary} className="mr-3" />
                    Theme
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                    style={{color: themeColors.primary}}
                    onClick={() => handleOptionClick('logout')}
                  >
                    <LogoutLinear size="20" color={themeColors.primary} className="mr-3" />
                    Logout
                  </button>
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
        <PalettePopup
          onClose={() => setIsPaletteOpen(false)}
        />
      )}
    </nav>
  )
}