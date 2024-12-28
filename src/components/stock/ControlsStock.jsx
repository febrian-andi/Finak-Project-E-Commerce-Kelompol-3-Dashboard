import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CalenderIcon from '../../assets/stock/CalenderIcon';

const ControlsStock = ({
  showDatePicker,
  setShowDatePicker,
  selectedDate,
  setSelectedDate,
  searchQuery,
  setSearchQuery,
  totalItems,
}) => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowDatePicker]);

  return (
    <div className='flex items-center gap-4 mb-6'>
      <div className='flex items-center gap-2'>
        {/* Calendar Button */}
        <div className='relative bg-white rounded-lg shadow border' ref={datePickerRef}>
          <button 
            className='p-2.5'
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
          <CalenderIcon />
          </button>
          {showDatePicker && (
            <div className='absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg z-50 p-2 w-64'>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setShowDatePicker(false);
                }}
                className='w-full border border-gray-200 rounded-md px-3 py-2 cursor-pointer'
              />
            </div>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className='relative bg-white shadow rounded-lg w-[280px] border'>
          <select className='w-full h-11 appearance-none px-4 text-gray-600'>
            <option value="">Select Filter</option>
            <option value="name">Name</option>
            <option value="variant">Variant</option>
            <option value="highest">Highest Stock</option>
            <option value="lowest">Lowest Stock</option>
          </select>
          <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
            <svg 
              className='w-4 h-4 text-gray-500' 
              viewBox='0 0 24 24' 
              fill='none' 
              stroke='currentColor' 
              strokeWidth='2' 
              strokeLinecap='round' 
              strokeLinejoin='round'
            >
              <polyline points='6 9 12 15 18 9'></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className='w-[320px] border'>
        <div className='relative bg-white shadow rounded-lg'>
          <div className='absolute inset-y-0 left-3 flex items-center'>
            <svg 
              className='w-5 h-5 text-gray-400' 
              viewBox='0 0 20 20' 
              fill='currentColor'
            >
              <path 
                fillRule='evenodd' 
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' 
                clipRule='evenodd' 
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            className='w-full h-11 bg-transparent pl-10 pr-4 text-gray-600'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Total Stock Info */}
      <div className="ml-auto bg-purple-50 px-6 py-2 rounded-lg">
        <div className="text-sm text-red-500">Total Stock</div>
        <div className="text-2xl font-semibold text-red-500">{totalItems}</div>
      </div>
    </div>
  );
};

ControlsStock.propTypes = {
  showDatePicker: PropTypes.bool.isRequired,
  setShowDatePicker: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired
};

export default ControlsStock;