import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationBanner from '../../../components/banner/PaginationBanner';

describe('PaginationBanner Component', () => {
  const mockSetRowsPerPage = jest.fn();
  const mockSetCurrentPage = jest.fn();
  const mockPrevPage = jest.fn();
  const mockNextPage = jest.fn();

  const defaultProps = {
    startIndex: 0,
    endIndex: 10,
    totalItems: 100,
    currentPage: 1,
    totalPages: 10,
    rowsPerPage: 10,
    setRowsPerPage: mockSetRowsPerPage,
    setCurrentPage: mockSetCurrentPage,
    prevPage: mockPrevPage,
    nextPage: mockNextPage,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the pagination details correctly', () => {
    render(<PaginationBanner {...defaultProps} />);
    expect(screen.getByText('1-10 of 100')).toBeInTheDocument();
    expect(screen.getByText('1/10')).toBeInTheDocument();
  });

  it('calls setRowsPerPage and resets currentPage on rows per page change', () => {
    render(<PaginationBanner {...defaultProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '20' } });
    expect(mockSetRowsPerPage).toHaveBeenCalledWith(20);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  it('calls prevPage when the previous button is clicked', () => {
    render(<PaginationBanner {...defaultProps} />);
    const prevButton = screen.getByRole('button', { name: /previous page/i });
    fireEvent.click(prevButton);
  });

  it('disables the previous button when on the first page', () => {
    render(<PaginationBanner {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByRole('button', { name: /previous page/i });
    expect(prevButton).toBeDisabled();
  });

  it('calls nextPage when the next button is clicked', () => {
    render(<PaginationBanner {...defaultProps} />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextButton);
    expect(mockNextPage).toHaveBeenCalled();
  });

  it('disables the next button when on the last page', () => {
    render(<PaginationBanner {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    expect(nextButton).toBeDisabled();
  });
});
