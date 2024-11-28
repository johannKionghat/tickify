import React, { useCallback } from 'react'
import { BackSquareLinear } from 'react-iconsax-icons'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../theme/ThemeContext';

export default function NavChecklist() {
  const { themeColors } = useTheme();
  const navigate = useNavigate();
  const back = useCallback(() => {
    navigate(-1);
  },[navigate]);
  return (
    <nav >
          <div className="container mx-auto px-3 py-3">
            <div className="flex justify-between">
              <div className="flex">
                <div onClick={back} className='cursor-pointer'>
                  <div className='p-2 rounded-full' style={{backgroundColor:themeColors.bgbutton1,boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'}}>
                    <BackSquareLinear size="32" color={themeColors.primary}/>              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
  )
}
