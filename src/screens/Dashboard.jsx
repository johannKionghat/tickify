import React, { useState } from 'react';
import Nav from '../components/Nav';
import { SearchBar } from '../components/SearchBar';
import DashChecklist from '../components/DashChecklist';

export const Dashboard = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
    <div className='fixed w-full'>
      <Nav 
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </div>
    <div className="flex flex-col h-screen container p-4" style={{ paddingTop: 70 }}>
      <div className='flex justify-center w-full mt-4'>
      <SearchBar onSearch={handleSearch} /> 
     </div>
      <div className='w-full'>
        <DashChecklist 
          sortOrder={sortOrder}
          statusFilter={statusFilter}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  </>
  );
};