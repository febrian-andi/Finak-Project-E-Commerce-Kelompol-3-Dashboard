import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaginationRating from '../../../components/rating/PaginationRating';

describe('PaginationRating Component', () => {
  const mockSetRowsPerPage = jest.fn();
  const mockSetCurrentPage = jest.fn();

  const defaultProps = {
    startIndex: 0,
    endIndex: 20,
    totalItems: 100,
    rowsPerPage: 20,
    currentPage: 1,
    totalPages: 5,
    setRowsPerPage: mockSetRowsPerPage,
    setCurrentPage: mockSetCurrentPage,
  };

  it('renders correctly with given props', () => {
    const { getByText } = render(<PaginationRating {...defaultProps} />);
    expect(getByText('1-20 of 100')).toBeInTheDocument();
    expect(getByText('Rows per page:')).toBeInTheDocument();
    expect(getByText('1/5')).toBeInTheDocument();
  });

  it('triggers setRowsPerPage and resets current page on rows per page change', () => {
    const { getByDisplayValue } = render(<PaginationRating {...defaultProps} />);
    const select = getByDisplayValue('20');
    fireEvent.change(select, { target: { value: '50' } });

    expect(mockSetRowsPerPage).toHaveBeenCalledWith(50);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

});
