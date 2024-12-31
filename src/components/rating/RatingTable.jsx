// File: components/rating/RatingTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ShortFilterIcon from '../../assets/rating/ShortFilterIcon';
import PaginationRating from './PaginationRating';

const RatingTable = ({
  currentItems,
  expandedReviews,
  toggleReview,
  searchQuery,
  selectedDate,
  sortConfig,
  setSortConfig,
  // Pagination props
  startIndex,
  endIndex,
  totalItems,
  rowsPerPage,
  currentPage,
  totalPages,
  setRowsPerPage,
  setCurrentPage,
}) => {
  // Handle sorting
  const handleSort = (field) => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: field, direction });
  };

  // Highlight text for search
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className='bg-yellow-200'>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Empty state
  if (!currentItems || currentItems.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>No reviews found</p>
        {searchQuery && <p className='text-sm text-gray-400 mt-2'>No results found for "{searchQuery}"</p>}
        {selectedDate && <p className='text-sm text-gray-400 mt-2'>No reviews found for date {selectedDate}</p>}
      </div>
    );
  }

  const renderSortIcon = (fieldName) => (
    <span className={`inline-flex ${sortConfig.key === fieldName ? 'text-red-500' : 'text-gray-400'}`}>
      <ShortFilterIcon className={`w-4 h-4 transition-transform ${sortConfig.key === fieldName && sortConfig.direction === 'asc' ? 'transform rotate-180' : ''}`} />
    </span>
  );

  return (
    <div className='bg-white rounded-lg overflow-hidden  border-gray-200'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className=''>
              <th className='text-left px-6 py-4'>
                <span className='whitespace-nowrap text-base font-semibold text-gray-700'>Profile Picture</span>
              </th>
              <th className='text-left px-6 py-4 cursor-pointer hover:bg-gray-100' onClick={() => handleSort('userName')}>
                <div className='flex items-center gap-2'>
                  <span className='whitespace-nowrap text-base font-semibold text-gray-700'>User Name</span>
                  {renderSortIcon('userName')}
                </div>
              </th>
              <th className='text-left px-6 py-4 cursor-pointer hover:bg-gray-100' onClick={() => handleSort('rating')}>
                <div className='flex items-center gap-2'>
                  <span className='whitespace-nowrap text-base font-semibold text-gray-700'>Rating</span>
                  {renderSortIcon('rating')}
                </div>
              </th>
              <th className='text-left px-6 py-4 cursor-pointer hover:bg-gray-100' onClick={() => handleSort('reviewDate')}>
                <div className='flex items-center gap-2'>
                  <span className='whitespace-nowrap text-base font-semibold text-gray-700'>Review Date</span>
                  {renderSortIcon('reviewDate')}
                </div>
              </th>
              <th className='text-left px-6 py-4 cursor-pointer hover:bg-gray-100' onClick={() => handleSort('review')}>
                <div className='flex items-center gap-2'>
                  <span className='whitespace-nowrap text-base font-semibold text-gray-700'>Review</span>
                  {renderSortIcon('reviewDate')}
                </div>
              </th>
              <th className='text-left px-6 py-4'>
                <span className='whitespace-nowrap text-base font-semibold text-gray-700'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className='border-b-4 border-gray-100 hover:bg-gray-50 transition-colors'>
                <td className='px-6 py-4'>
                  <img src={item.profilePicture} alt={item.userName} className='w-12 h-12 rounded-lg object-cover' />
                </td>
                <td className='px-6 py-4 text-gray-600'>{highlightText(item.userName, searchQuery)}</td>
                <td className='px-6 py-4 text-gray-600'>{item.rating}</td>
                <td className='px-6 py-4 text-gray-500'>{formatDate(item.reviewDate)}</td>
                <td className='px-6 py-4 text-gray-600 max-w-xl'>
                  <div className={expandedReviews[item.id] ? '' : 'line-clamp-2'}>{highlightText(item.review, searchQuery)}</div>
                </td>
                <td className='px-6 py-4'>
                  <button onClick={() => toggleReview(item.id)} className='flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white hover:bg-gray-800'>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${expandedReviews[item.id] ? 'rotate-90' : ''}`}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <polyline points='9 18 15 12 9 6' />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Pagination Component */}
      <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
        {/* Left side - Items range */}
        <div className='text-sm text-gray-600'>{`${startIndex + 1}-${endIndex} of ${totalItems}`}</div>

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
          <PaginationRating startIndex={startIndex} endIndex={endIndex} totalItems={totalItems} rowsPerPage={rowsPerPage} currentPage={currentPage} totalPages={totalPages} setRowsPerPage={setRowsPerPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

RatingTable.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      profilePicture: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      reviewDate: PropTypes.instanceOf(Date).isRequired,
      review: PropTypes.string.isRequired,
    })
  ).isRequired,
  expandedReviews: PropTypes.object.isRequired,
  toggleReview: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  setSortConfig: PropTypes.func.isRequired,
  // Pagination props
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default RatingTable;
