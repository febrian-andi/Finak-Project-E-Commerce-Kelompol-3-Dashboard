// File: CategoryPagination.jsx
import React from 'react';
import PropTypes from 'prop-types';

const CategoryPagination = ({ currentPage, totalPages, startIndex, endIndex, totalItems, rowsPerPage, setRowsPerPage, nextPage, prevPage }) => (
  <div className="flex justify-between items-center mt-4 px-4">
    <div className="text-sm text-gray-600">
      {`${startIndex + 1}-${endIndex} of ${totalItems}`}
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
        <select 
          className="border rounded p-1"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
          }}
        >
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center space-x-1">
        <button 
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-1 rounded hover:bg-gray-100 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="px-2">{`${currentPage}/${totalPages}`}</span>
        <button 
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-1 rounded hover:bg-gray-100 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

CategoryPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default CategoryPagination;
