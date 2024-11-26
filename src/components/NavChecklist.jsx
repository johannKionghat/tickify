import React from 'react'
import { BackSquareLinear } from 'react-iconsax-icons'
import { Link } from 'react-router-dom'
import { useTheme } from '../theme/ThemeContext';

export default function NavChecklist() {
  const { themeColors } = useTheme();
  return (
    <nav >
          <div className="container mx-auto px-3 py-3">
            <div className="flex justify-between">
              <div className="flex">
                <Link to="/">
                <div className='p-2 rounded-full' style={{backgroundColor:themeColors.bgbutton1}}>
                <BackSquareLinear size="32" color={themeColors.primary}/>              
                </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>
  )
}
