// File: pages/RatingPage.jsx
import React, { useState } from 'react';
import RatingHeader from '../components/rating/RatingHeader';
import RatingTable from '../components/rating/RatingTable';
import RatingBreadCrumb from '../components/rating/RatingBreadCrumb';

const RatingPage = () => {
  // State Management
  const [expandedReviews, setExpandedReviews] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Sample data
  const ratings = [
    {
      id: 1,
      profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
      userName: 'Phil Foden',
      rating: '3/5',
      reviewDate: new Date(2024, 8, 11),
      review: 'Really impressed with the quality and performance! The customer service team was exceptionally helpful when I had questions about the features. Definitely worth the investment for both beginners and professionals.',
    },
    {
      id: 2,
      profilePicture: 'https://randomuser.me/api/portraits/women/45.jpg',
      userName: 'Sarah Moraes',
      rating: '4/5',
      reviewDate: new Date(2024, 8, 11),
      review: 'Great product overall! The interface is intuitive and user-friendly. Only giving 4 stars because the mobile app could use some improvements, but the desktop version works flawlessly.',
    },
    {
      id: 3,
      profilePicture: 'https://randomuser.me/api/portraits/men/67.jpg',
      userName: 'Alexander Chen',
      rating: '5/5',
      reviewDate: new Date(2024, 8, 10),
      review:
        'Absolutely exceeded my expectations! Been using this for my business for the past month and it has streamlined our entire workflow. The analytics features are particularly impressive, and the regular updates show that the team is constantly improving the product. Highly recommend for anyone looking to boost their productivity.',
    },
    {
      id: 4,
      profilePicture: 'https://randomuser.me/api/portraits/women/28.jpg',
      userName: 'Emma Rodriguez',
      rating: '4/5',
      reviewDate: new Date(2024, 8, 9),
      review: 'The product has been a game-changer for our team. The collaboration features are top-notch, and the learning curve is minimal. Would love to see more customization options in future updates.',
    },
    {
      id: 5,
      profilePicture: 'https://randomuser.me/api/portraits/men/91.jpg',
      userName: 'James Wilson',
      rating: '4/5',
      reviewDate: new Date(2024, 8, 8),
      review: 'Very satisfied with my purchase. The integration capabilities are extensive, and the documentation is clear and comprehensive. Technical support has been responsive and helpful whenever needed.',
    },
    // ... more ratings data
  ];

  // Filter logic
  const getFilteredRatings = () => {
    return ratings.filter((rating) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = rating.userName.toLowerCase().includes(searchLower) || rating.review.toLowerCase().includes(searchLower);

      const matchesDate = !selectedDate || rating.reviewDate.toISOString().split('T')[0] === selectedDate;

      return matchesSearch && matchesDate;
    });
  };

  // Sort logic
  const getSortedRatings = (filteredRatings) => {
    if (!sortConfig.key) return filteredRatings;

    return [...filteredRatings].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'rating') {
        aValue = parseFloat(aValue.split('/')[0]);
        bValue = parseFloat(bValue.split('/')[0]);
      }

      if (sortConfig.key === 'reviewDate') {
        return sortConfig.direction === 'asc' ? a.reviewDate - b.reviewDate : b.reviewDate - a.reviewDate;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Pagination logic
  const filteredRatings = getFilteredRatings();
  const sortedRatings = getSortedRatings(filteredRatings);
  const totalItems = sortedRatings.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = sortedRatings.slice(startIndex, endIndex);

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        <h1 className='text-2xl font-bold mb-4'>Rating</h1>
        <RatingBreadCrumb />

        <RatingHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedDate={selectedDate} setSelectedDate={setSelectedDate} totalItems={totalItems} />

        <RatingTable
          currentItems={currentItems}
          expandedReviews={expandedReviews}
          toggleReview={toggleReview}
          searchQuery={searchQuery}
          selectedDate={selectedDate}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default RatingPage;
