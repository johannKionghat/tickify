import React, { useState } from 'react'
import { FilterSearchLinear, Setting4Linear } from 'react-iconsax-icons'
import { Link } from 'react-router-dom'
import { FilterPopup } from './FilterPopup';
import { PalettePopup } from './PalettePopup';
import { useTheme } from '../theme/ThemeContext';

export default function Nav({ sortOrder, setSortOrder, statusFilter, setStatusFilter }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { themeColors } = useTheme();

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  }

  const togglePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
  }

  return (
    <nav>
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full mx-auto px-3 py-3 flex items-center justify-between">
          <div className="flex justify-between">
            <Link to="/" className="text-xl font-bold" style={{color:themeColors.primary}}>
              <div className='text-sm p-2 rounded-full' style={{backgroundColor:themeColors.bgbutton1}}>
                Pre-Flight-Checklist
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
            <div 
              className='p-2 rounded-full cursor-pointer'
              style={{backgroundColor:themeColors.bgbutton1}}
              onClick={togglePalette}
            >
              <Setting4Linear size="25" color={themeColors.primary}/>
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