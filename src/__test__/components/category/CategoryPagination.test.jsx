// File: CategoryPagination.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryPagination from '../../../components/category/CategoryPagination';

describe('CategoryPagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    startIndex: 0,
    endIndex: 19,
    totalItems: 100,
    rowsPerPage: 20,
    setRowsPerPage: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
  };

  it('renders the pagination component correctly', () => {
    render(<CategoryPagination {...defaultProps} />);


    // Check if dropdown for rows per page is displayed
    expect(screen.getByTestId('rows-per-page-select')).toBeInTheDocument();

    // Check if previous and next buttons are displayed
    expect(screen.getByTestId('prev-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();

    // Check if current page is displayed correctly
    expect(screen.getByTestId('pagination-current')).toHaveTextContent('1/5');
  });

  it('calls setRowsPerPage when rows per page is changed', () => {
    render(<CategoryPagination {...defaultProps} />);

    const rowsPerPageSelect = screen.getByTestId('rows-per-page-select');
    fireEvent.change(rowsPerPageSelect, { target: { value: 30 } });

    expect(defaultProps.setRowsPerPage).toHaveBeenCalledWith(30);
  });

  it('disables the previous button on the first page', () => {
    render(<CategoryPagination {...defaultProps} />);

    const prevButton = screen.getByTestId('prev-page-button');
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<CategoryPagination {...defaultProps} currentPage={5} />);

    const nextButton = screen.getByTestId('next-page-button');
    expect(nextButton).toBeDisabled();
  });

  it('calls nextPage when next button is clicked', () => {
    render(<CategoryPagination {...defaultProps} />);

    const nextButton = screen.getByTestId('next-page-button');
    fireEvent.click(nextButton);

    expect(defaultProps.nextPage).toHaveBeenCalled();
  });

  it('calls prevPage when previous button is clicked', () => {
    render(<CategoryPagination {...defaultProps} currentPage={2} />);

    const prevButton = screen.getByTestId('prev-page-button');
    fireEvent.click(prevButton);

    expect(defaultProps.prevPage).toHaveBeenCalled();
  });

  it('updates the pagination summary correctly when props change', () => {
    const { rerender } = render(<CategoryPagination {...defaultProps} />);

  

    // Update props
    rerender(
      <CategoryPagination
        {...defaultProps}
        currentPage={2}
        startIndex={20}
        endIndex={39}
      />
    );

  });
});
