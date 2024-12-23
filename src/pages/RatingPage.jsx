import React, { useState, useRef, useEffect } from 'react';
import filterIcon from '../assets/Rating/filter.svg';

const RatingPage = () => {
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

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
  }, []);

  const headerMapping = {
    'Profile Picture': 'profilePicture',
    'User Name': 'userName',
    'Rating': 'rating',
    'Review Date': 'reviewDate',
    'Review': 'review',
  };

  const ratings = [
    {
      id: 1,
      profilePicture: '/api/placeholder/48/48',
      userName: 'philfoden',
      rating: '4/5',
      reviewDate: '09/11/2024',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      profilePicture: '/api/placeholder/48/48',
      userName: 'sarahmoraes',
      rating: '3/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    },
    {
      id: 3,
      profilePicture: '/api/placeholder/48/48',
      userName: 'ashleycole',
      rating: '2/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    },
    {
      id: 4,
      profilePicture: '/api/placeholder/48/48',
      userName: 'kevindebruyne',
      rating: '5/5',
      reviewDate: '09/11/2024',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    },
  ];

  const handleSort = (header) => {
    const key = headerMapping[header];
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const getFilteredRatings = () => {
    return ratings.filter((rating) => {
      const searchLower = searchQuery.toLowerCase();
      return rating.userName.toLowerCase().includes(searchLower) || rating.review.toLowerCase().includes(searchLower) || rating.rating.toLowerCase().includes(searchLower) || rating.reviewDate.toLowerCase().includes(searchLower);
    });
  };

  const getSortedRatings = (filteredRatings) => {
    if (!sortConfig.key) return filteredRatings;

    return [...filteredRatings].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle special case for rating
      if (sortConfig.key === 'rating') {
        aValue = parseInt(aValue.split('/')[0]);
        bValue = parseInt(bValue.split('/')[0]);
      }

      // Convert to lowercase for string comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Handle date comparison
      if (sortConfig.key === 'reviewDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredRatings = getFilteredRatings();
  const sortedRatings = getSortedRatings(filteredRatings);

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const headers = ['Profile Picture', 'User Name', 'Rating', 'Review Date', 'Review', 'Action'];

  return (
    <div className='p-8'>
      {/* Judul "Rating" yang sebelumnya tidak ada */}
      <h1 className='text-2xl font-bold mb-4'>Rating</h1>

      {/* Breadcrumb dengan styling yang disesuaikan */}
      <div className='flex items-center gap-2 text-sm mb-6'>
        <span className='text-red-500 hover:underline cursor-pointer'>Home</span>
        <span className='text-red-500'>›</span>
        <span className='text-red-500'>Rating</span>
      </div>

      <div className='flex items-center gap-4 mb-6'>
        <div className='flex items-center gap-2'>
          {/* Calendar Button - dipisah sendiri dengan shadow */}
          <div className='relative bg-white rounded-lg shadow' ref={datePickerRef}>
            {' '}
        
            <button className='p-2.5' onClick={() => setShowDatePicker(!showDatePicker)}>
              <svg className='w-5 h-5 text-gray-500' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                <line x1='16' y1='2' x2='16' y2='6' />
                <line x1='8' y1='2' x2='8' y2='6' />
                <line x1='3' y1='10' x2='21' y2='10' />
              </svg>
            </button>
            {showDatePicker && (
              <div className='absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg z-50 p-2 w-64'>
                {' '}
               
                <input
                  type='date'
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setShowDatePicker(false);
                  }}
                  className='w-full border border-gray-200 rounded-md px-3 py-2'
                />
              </div>
            )}
          </div>

          {/* Select Filter - dalam container terpisah */}
          <div className='relative bg-white shadow rounded-lg w-[280px]'>
            <select className='w-full h-11 appearance-none px-4 text-gray-600'>
              <option value=''>Select Filter</option>
              <option value='latest'>Latest</option>
              <option value='oldest'>Oldest</option>
              <option value='highest'>Highest Rating</option>
              <option value='lowest'>Lowest Rating</option>
            </select>
            <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
              <svg className='w-4 h-4 text-gray-500' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <polyline points='6 9 12 15 18 9'></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className='w-[320px]'>
          <div className='relative bg-white shadow rounded-lg'>
            <div className='absolute inset-y-0 left-3 flex items-center'>
              <svg className='w-5 h-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
              </svg>
            </div>
            <input type='text' placeholder='Search' className='w-full h-11 bg-transparent pl-10 pr-4 text-gray-600' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Rating Table */}
      <div className='bg-white rounded-lg overflow-hidden border border-gray-200'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                {headers.map((header) => (
                  <th key={header} className='text-left px-6 py-4'>
                    <div className='flex items-center gap-1' onClick={() => header !== 'Action' && handleSort(header)}>
                      <span className={`${header !== 'Action' ? 'cursor-pointer' : ''} whitespace-nowrap text-base font-semibold text-gray-700`}>{header}</span>
                      {header !== 'Action' && (
                        <img src={filterIcon} alt='Filter' className={`w-3 h-3 ml-1.5 transition-transform ${sortConfig.key === headerMapping[header] && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''} cursor-pointer`} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRatings.map((rating) => (
                <tr key={rating.id} className='border-b border-gray-100'>
                  <td className='px-6 py-4'>
                    <img
                      src={rating.profilePicture}
                      alt={rating.userName}
                      className='w-12 h-12 rounded-lg object-cover' // Changed to rounded-lg
                    />
                  </td>
                  <td className='px-6 py-4 text-gray-600'>{rating.userName}</td>
                  <td className='px-6 py-4'>{rating.rating}</td>
                  <td className='px-6 py-4 text-gray-500'>{rating.reviewDate}</td>
                  <td className='px-6 py-4 text-gray-600 max-w-xl'>
                    <p className={expandedReviews[rating.id] ? '' : 'line-clamp-2'}>{rating.review}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <button onClick={() => toggleReview(rating.id)} className='p-2 rounded-lg bg-black text-white hover:bg-gray-800'>
                      <svg className='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        {expandedReviews[rating.id] ? <path d='M18 15l-6-6-6 6' /> : <path d='M6 9l6 6 6-6' />}
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - styling disesuaikan */}
        <div className='px-6 py-4 flex items-center justify-between border-t border-gray-200'>
          <span className='text-gray-500 text-sm'>1-20 of 27</span>
          <div className='flex items-center gap-4'>
            <span className='text-gray-600 text-sm'>Rows per page:</span>
            <select className='border rounded px-2 py-1 text-sm'>
              <option>20</option>
            </select>
            <div className='flex items-center gap-2'>
              <button className='p-1.5 rounded border hover:bg-gray-50'>‹</button>
              <span className='text-sm'>1/2</span>
              <button className='p-1.5 rounded border hover:bg-gray-50'>›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
