// File: components/RatingHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import CalenderIcon from '../../assets/rating/CalenderIcon';
import SearchIcon from '../../assets/rating/SearchIcon';
import DropDownIcon from '../../assets/rating/DropDownIcon';

const RatingHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedDate, 
  setSelectedDate,
  totalReviews // Add this prop for total reviews count
}) => {
  // Custom DatePicker styling
  const datePickerStyle = {
    width: '100%',
    height: '44px',
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.format('YYYY-MM-DD') : '');
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    switch(value) {
      case 'latest':
        // Sort by latest date
        setSortConfig({ key: 'reviewDate', direction: 'desc' });
        break;
      case 'oldest':
        // Sort by oldest date
        setSortConfig({ key: 'reviewDate', direction: 'asc' });
        break;
      case 'highest':
        // Sort by highest rating
        setSortConfig({ key: 'rating', direction: 'desc' });
        break;
      case 'lowest':
        // Sort by lowest rating
        setSortConfig({ key: 'rating', direction: 'asc' });
        break;
      default:
        setSortConfig({ key: null, direction: 'asc' });
    }
  };

  return (
    <div className='flex items-center gap-4 mb-6'>
      <div className='flex items-center gap-2'>
        {/* Calendar with Ant Design DatePicker */}
        <div className='relative bg-white rounded-lg shadow border w-[200px]'>
          <DatePicker
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={handleDateChange}
            style={datePickerStyle}
            format="DD/MM/YYYY"
            placeholder="Select date"
            suffixIcon={<CalenderIcon />}
            allowClear
            className="border-none shadow-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className='relative bg-white shadow rounded-lg w-[280px] border'>
          <select 
            className='w-full h-11 appearance-none px-4 text-gray-600'
            onChange={handleFilterChange}
          >
            <option value=''>Select Filter</option>
            <option value='latest'>Latest Reviews</option>
            <option value='oldest'>Oldest Reviews</option>
            <option value='highest'>Highest Rating</option>
            <option value='lowest'>Lowest Rating</option>
          </select>
          <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
            <DropDownIcon />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className='w-[320px] border'>
        <div className='relative bg-white shadow rounded-lg'>
          <div className='absolute inset-y-0 left-3 flex items-center'>
            <SearchIcon />
          </div>
          <input 
            type='text' 
            placeholder='Search reviews...' 
            className='w-full h-11 bg-transparent pl-10 pr-4 text-gray-600' 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      {/* Total Reviews Info */}
      <div className='ml-auto bg-purple-50 px-6 py-2 rounded-lg'>
        <div className='text-sm text-red-500'>Total Reviews</div>
        <div className='text-2xl font-semibold text-red-500'>{totalReviews}</div>
      </div>
    </div>
  );
};

RatingHeader.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default RatingHeader;