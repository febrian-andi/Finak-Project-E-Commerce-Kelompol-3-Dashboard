import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';

const HeaderBanner = ({ onAddNew, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const filterOptions = [
    { value: '', label: 'Select Filter' },
    { value: 'published', label: 'Published' },
    { value: 'unpublished', label: 'Unpublished' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-semibold'>Banner Management</h1>
          <div className='text-sm text-gray-500'>
            <span className='text-red-500'>Home</span> / Banner Management
          </div>
        </div>
        <Link 
          onClick={onAddNew} 
          to={'/banner/add'} 
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
        >
          Add New Banner
        </Link>
      </div>

      {/* Filter */}
      <div className="relative inline-block">
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className='appearance-none w-80 px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 cursor-pointer focus:outline-none'
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

HeaderBanner.propTypes = {
  onAddNew: PropsTypes.func.isRequired,
  onFilterChange: PropsTypes.func.isRequired,
};

export default HeaderBanner;