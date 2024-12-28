import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RatingHeader from '../components/rating/RatingHeader';
import RatingTable from '../components/rating/RatingTable';
import RatingBreadCrumb from '../components/rating/RatingBreadCrumb';

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

  // Sample data with proper Date objects
  const ratings = [
    {
      id: 1,
      profilePicture: '/api/placeholder/48/48',
      userName: 'philfoden',
      rating: '4/5',
      reviewDate: new Date(2024, 8, 11), // Using Date objects like in StockPage
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      profilePicture: '/api/placeholder/48/48',
      userName: 'sarahmoraes',
      rating: '3/5',
      reviewDate: new Date(2024, 8, 11),
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      profilePicture: '/api/placeholder/48/48',
      userName: 'sasdfsafarahmoasdfasdfraes',
      rating: '3/5',
      reviewDate: new Date(2024, 8, 10),
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];

  const headerMapping = {
    'Profile Picture': 'profilePicture',
    'User Name': 'userName',
    'Rating': 'rating',
    'Review Date': 'reviewDate',
    'Review': 'review',
  };

  const headers = ['Profile Picture', 'User Name', 'Rating', 'Review Date', 'Review', 'Action'];

  const handleSort = (header) => {
    const key = headerMapping[header];
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  // Filter logic with date matching StockPage implementation
  const getFilteredRatings = () => {
    return ratings.filter((rating) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = rating.userName.toLowerCase().includes(searchLower) || rating.review.toLowerCase().includes(searchLower);

      // Date filtering using the same approach as StockPage
      const matchesDate = !selectedDate || rating.reviewDate.toISOString().split('T')[0] === selectedDate;

      return matchesSearch && matchesDate;
    });
  };

  const getSortedRatings = (filteredRatings) => {
    if (!sortConfig.key) return filteredRatings;

    return [...filteredRatings].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'rating') {
        aValue = parseInt(aValue.split('/')[0]);
        bValue = parseInt(bValue.split('/')[0]);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // No need for special date handling since we're using Date objects
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredRatings = getFilteredRatings();
  const sortedRatings = getSortedRatings(filteredRatings);

  // Format the date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        <h1 className='text-2xl font-bold mb-4'>Rating</h1>
        {/* Breadcrumb */}
        <RatingBreadCrumb />

        <RatingHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          datePickerRef={datePickerRef}
        />
        <RatingTable
          headers={headers}
          sortedRatings={sortedRatings.map((rating) => ({
            ...rating,
            reviewDate: formatDate(rating.reviewDate), // Format date for display
          }))}
          expandedReviews={expandedReviews}
          toggleReview={toggleReview}
          headerMapping={headerMapping}
          handleSort={handleSort}
          sortConfig={sortConfig}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default RatingPage;
