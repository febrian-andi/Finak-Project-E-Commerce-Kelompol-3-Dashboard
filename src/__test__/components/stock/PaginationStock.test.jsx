import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationStock from '../../../components/stock/PaginationStock';

describe('PaginationStock Component', () => {
  const defaultProps = {
    startIndex: 1,
    endIndex: 20,
    totalItems: 100,
    rowsPerPage: 20,
    currentPage: 1,
    totalPages: 5,
    setRowsPerPage: jest.fn(),
    setCurrentPage: jest.fn(),
  };

  it('renders the correct item range and total items', () => {
    render(<PaginationStock {...defaultProps} />);
    expect(screen.getByText('1-20 of 100')).toBeInTheDocument();
  });

  it('renders the correct current page and total pages', () => {
    render(<PaginationStock {...defaultProps} />);
    expect(screen.getByText('1/5')).toBeInTheDocument();
  });

  it('calls setRowsPerPage and resets current page when rows per page is changed', () => {
    render(<PaginationStock {...defaultProps} />);

    const rowsPerPageSelector = screen.getByDisplayValue('20');
    fireEvent.change(rowsPerPageSelector, { target: { value: '50' } });

    expect(defaultProps.setRowsPerPage).toHaveBeenCalledWith(50);
    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(1);
  });

  it('matches snapshot', () => {
    const { container } = render(<PaginationStock {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
