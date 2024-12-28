import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import CalenderIcon from '../../assets/stock/CalenderIcon';
import SearchIcon from '../../assets/stock/SearchIcon';
import DropDownIcon from '../../assets/stock/DropDownIcon';

const ControlsStock = ({ 
  selectedDate, 
  setSelectedDate, 
  searchQuery, 
  setSearchQuery, 
  totalItems 
}) => {
  // Custom DatePicker styling
  const datePickerStyle = {
    width: '100%',
    height: '44px', // match other controls height
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
            format="DD/MM/YYYY"
            placeholder="Select date"
            suffixIcon={<CalenderIcon />}
            allowClear
            className="border-none shadow-none "
          />
        </div>

        {/* Filter Dropdown */}
        <div className='relative bg-white shadow rounded-lg w-[280px] border'>
          <select className='w-full h-11 appearance-none px-4 text-gray-600'>
            <option value=''>Select Filter</option>
            <option value='name'>Name</option>
            <option value='variant'>Variant</option>
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
            placeholder='Search' 
            className='w-full h-11 bg-transparent pl-10 pr-4 text-gray-600' 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>

      {/* Total Stock Info */}
      <div className='ml-auto bg-purple-50 px-6 py-2 rounded-lg'>
        <div className='text-sm text-red-500'>Total Stock</div>
        <div className='text-2xl font-semibold text-red-500'>{totalItems}</div>
      </div>
    </div>
  );
};

ControlsStock.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default ControlsStock;