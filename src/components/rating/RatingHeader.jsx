// File: components/rating/RatingHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import SearchIcon from '../../assets/rating/SearchIcon';
import DropDownIcon from '../../assets/rating/DropDownIcon';
import CalenderIcon from '../../assets/rating/CalenderIcon';

const RatingHeader = ({ searchQuery, setSearchQuery, selectedDate, setSelectedDate }) => {
  // Custom DatePicker styling
  const datePickerStyle = {
    width: '100%',
    height: '44px',
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.format('YYYY-MM-DD') : '');
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
            format='DD/MM/YYYY'
            placeholder='Select date'
            suffixIcon={<CalenderIcon className='w-5 h-5 text-gray-500' />}
            allowClear
            className='border-none shadow-none'
          />
        </div>

        {/* Filter Dropdown */}
        <div className='relative bg-white shadow rounded-lg w-[280px] border'>
          <select className='w-full h-11 appearance-none px-4 text-gray-600 cursor-pointer'>
            <option value=''>Select Filter</option>
            <option value='latest'>Latest Reviews</option>
            <option value='oldest'>Oldest Reviews</option>
            <option value='highest'>Highest Rating</option>
            <option value='lowest'>Lowest Rating</option>
          </select>
          <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
            <DropDownIcon className='w-5 h-5 text-gray-500' />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className='w-[320px]'>
        <div className='relative bg-white shadow rounded-lg border'>
          <div className='absolute inset-y-0 left-3 flex items-center'>
            <SearchIcon className='w-5 h-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search'
            className='w-full h-11 bg-transparent pl-10 pr-4 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

RatingHeader.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default RatingHeader;
