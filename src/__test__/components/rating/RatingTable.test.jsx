import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingTable from '../../../components/rating/RatingTable';

describe('RatingTable Component', () => {
  const mockData = [
    {
      id: 1,
      profilePicture: 'https://via.placeholder.com/150',
      userName: 'John Doe',
      rating: '5',
      reviewDate: new Date('2023-01-01'),
      review: 'Great product!',
    },
    {
      id: 2,
      profilePicture: 'https://via.placeholder.com/150',
      userName: 'Jane Smith',
      rating: '4',
      reviewDate: new Date('2023-01-02'),
      review: 'Good value for money.',
    },
  ];

  const defaultProps = {
    currentItems: mockData,
    expandedReviews: {},
    toggleReview: jest.fn(),
    searchQuery: '',
    selectedDate: '',
    sortConfig: { key: '', direction: '' },
    setSortConfig: jest.fn(),
    startIndex: 0,
    endIndex: 2,
    totalItems: 2,
    rowsPerPage: 20,
    currentPage: 1,
    totalPages: 1,
    setRowsPerPage: jest.fn(),
    setCurrentPage: jest.fn(),
  };

  it('renders table headers correctly', () => {
    render(<RatingTable {...defaultProps} />);
    expect(screen.getByText('Profile Picture')).toBeInTheDocument();
    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Review Date')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('displays the correct number of rows', () => {
    render(<RatingTable {...defaultProps} />);
    const rows = screen.getAllByRole('row');
    // One extra for the header row
    expect(rows).toHaveLength(mockData.length + 1);
  });

  it('displays "No reviews found" when currentItems is empty', () => {
    render(<RatingTable {...defaultProps} currentItems={[]} />);
    expect(screen.getByText('No reviews found')).toBeInTheDocument();
  });

  it('highlights search terms in the user name and review', () => {
    render(<RatingTable {...defaultProps} searchQuery="Great" />);
    expect(screen.getByText(/Great/)).toHaveClass('bg-yellow-200');
  });

  it('calls toggleReview when action button is clicked', () => {
    render(<RatingTable {...defaultProps} />);
    const actionButtons = screen.getAllByRole('button');
    fireEvent.click(actionButtons[0]);
    expect(defaultProps.toggleReview).toHaveBeenCalledWith(mockData[0].id);
  });

  it('calls setSortConfig when sortable column headers are clicked', () => {
    render(<RatingTable {...defaultProps} />);
    const userNameHeader = screen.getByText('User Name');
    fireEvent.click(userNameHeader);
    expect(defaultProps.setSortConfig).toHaveBeenCalledWith({ key: 'userName', direction: 'asc' });
  });
});
