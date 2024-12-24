import React, { useRef, useEffect } from 'react';

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
    <div className="flex justify-between items-center gap-4 mb-6 controls-container">
      <div className="flex gap-4 flex-1">
        {/* Calendar Button */}
        <div className="relative" ref={datePickerRef}>
          <button
            className="calendar-button w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
          {showDatePicker && (
            <div className="date-picker-container">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setShowDatePicker(false);
                }}
                className="w-full border border-gray-200 rounded-md px-3 py-2"
              />
            </div>
          )}
        </div>
        {/* Filter Dropdown */}
        <div className="relative flex-1 max-w-xs">
          <select className="w-full appearance-none border border-gray-200 rounded-md px-3 py-2">
            <option value="">Select Filter</option>
            <option value="name">Name</option>
            <option value="variant">Variant</option>
          </select>
        </div>
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-200 rounded-md px-3 py-2 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/* Total Stock Info */}
      <div className="bg-purple-50 px-6 py-2 rounded-lg">
        <div className="text-sm text-red-500">Total Stock</div>
        <div className="text-2xl font-semibold text-red-500">{totalItems}</div>
      </div>
    </div>
  );
};

export default ControlsStock;