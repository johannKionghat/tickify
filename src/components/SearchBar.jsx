import React, { useState } from 'react';
import { ElementPlusLinear, SearchNormal1Linear } from 'react-iconsax-icons';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { themeColors } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className={`flex items-center border-2 bg-[${themeColors.bgbutton1}] border-[${themeColors.primary}] rounded-full py-2 px-3`}  style={{ backgroundColor:themeColors.bgbutton1, borderColor:themeColors.primary}}>
        <div>
            <button
            type="submit"
            >
                <SearchNormal1Linear size="30" color={themeColors.primary}/>
            </button>
        </div>
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-2 py-1 px-1 leading-tight focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Link to={"/Formulaire"}>
            <ElementPlusLinear size="32" color={themeColors.primary}/>
        </Link>
      </div>
    </form>
  );
};


