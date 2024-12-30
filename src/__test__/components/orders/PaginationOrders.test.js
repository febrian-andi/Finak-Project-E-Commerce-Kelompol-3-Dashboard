import { render, screen, fireEvent } from '@testing-library/react';
import PaginationOrders from '../../../components/orders/PaginationOrders';
import '@testing-library/jest-dom';

describe('PaginationOrders', () => {
  const mockSetRowsPerPage = jest.fn();
  const mockSetCurrentPage = jest.fn();

  const props = {
    startIndex: 0,
    endIndex: 20,
    totalItems: 100,
    rowsPerPage: 20,
    currentPage: 1,
    totalPages: 5,
    setRowsPerPage: mockSetRowsPerPage,
    setCurrentPage: mockSetCurrentPage,
  };

  beforeEach(() => {
    mockSetRowsPerPage.mockClear();
    mockSetCurrentPage.mockClear();
  });

  test('should render pagination info correctly', () => {
    render(<PaginationOrders {...props} />);
    expect(screen.getByText('1-20 of 100')).toBeInTheDocument();
    expect(screen.getByText('1/5')).toBeInTheDocument();
  });

  test('should update rows per page and reset current page to 1', () => {
    render(<PaginationOrders {...props} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '50' } });

    expect(mockSetRowsPerPage).toHaveBeenCalledWith(50);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });
});
