// File: components/rating/PaginationRating.jsx
import React from 'react';
import PropTypes from 'prop-types';

const PaginationRating = ({
  startIndex,
  endIndex,
  totalItems,
  rowsPerPage,
  currentPage,
  totalPages,
  setRowsPerPage,
  setCurrentPage
}) => {
  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
      {/* Left side - Items range */}
      <div className='text-sm text-gray-600'>
        {`${startIndex + 1}-${endIndex} of ${totalItems}`}
      </div>

      {/* Right side - Pagination controls */}
      <div className='flex items-center gap-4'>
        {/* Rows per page selector */}
        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className='border rounded p-1'>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Page navigation */}
        <div className='flex items-center gap-2'>
          {/* Previous page button */}
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1} 
            className='p-1 rounded disabled:opacity-50'
          >
            <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
              <path 
                fillRule='evenodd' 
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' 
                clipRule='evenodd' 
              />
            </svg>
          </button>

          {/* Page indicator */}
          <span className='text-sm text-gray-600'>
            {currentPage}/{totalPages}
          </span>

          {/* Next page button */}
          <button 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages} 
            className='p-1 rounded disabled:opacity-50'
          >
            <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
              <path 
                fillRule='evenodd' 
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' 
                clipRule='evenodd' 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

PaginationRating.propTypes = {
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default PaginationRating;