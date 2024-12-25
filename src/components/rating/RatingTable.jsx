import React from 'react';
import FilterIcon from '../../assets/rating/FilterIcon';

const RatingTable = ({ headers, sortedRatings, expandedReviews, toggleReview, headerMapping, handleSort, sortConfig, showDatePicker, setShowDatePicker, selectedDate, setSelectedDate }) => (
  <div className='bg-white rounded-lg overflow-hidden border border-gray-200'>
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-50 border-b border-gray-200'>
            {headers.map((header) => (
              <th key={header} className='text-left px-6 py-4'>
                <div className='flex items-center gap-1' onClick={() => header !== 'Action' && handleSort(header)}>
                  <span className={`${header !== 'Action' ? 'cursor-pointer' : ''} whitespace-nowrap text-base font-semibold text-gray-700`}>{header}</span>
                  {header !== 'Action' && <FilterIcon className={`w-4 h-4 ml-1 ${sortConfig.key === headerMapping[header] && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRatings.map((rating) => (
            <tr key={rating.id} className='border-b border-gray-100'>
              <td className='px-6 py-4'>
                <img src={rating.profilePicture} alt={rating.userName} className='w-12 h-12 rounded-lg object-cover' />
              </td>
              <td className='px-6 py-4 text-gray-600'>{rating.userName}</td>
              <td className='px-6 py-4'>{rating.rating}</td>
              <td className='px-6 py-4'>
                <div className='flex items-center gap-2 text-gray-500  hover:text-gray-700'>{rating.reviewDate}</div>
              </td>
              <td className='px-6 py-4 text-gray-600 max-w-xl'>
                <p className={expandedReviews[rating.id] ? '' : 'line-clamp-2'}>{rating.review}</p>
              </td>
              <td className='px-6 py-4'>
                <button onClick={() => toggleReview(rating.id)} className='flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white hover:bg-gray-800'>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${expandedReviews[rating.id] ? 'rotate-90' : ''}`}
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
  </div>
);

export default RatingTable;
