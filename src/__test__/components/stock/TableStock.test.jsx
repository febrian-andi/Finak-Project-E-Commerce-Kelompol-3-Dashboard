import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Add this import
import TableStock from '../../../components/stock/TableStock'; // adjust import path as needed

const mockOnDelete = jest.fn();
const mockOnViewDetail = jest.fn();

const sampleData = [
  { id: 1, name: 'Laptop HP', variant: 'Warna Hitam', quantity: 10, date: '2024-12-01' },
  { id: 2, name: 'Laptop Lenovo', variant: 'Warna Silver', quantity: 5, date: '2024-12-05' },
  { id: 3, name: 'Mouse Logitech', variant: 'Warna Hitam', quantity: 15, date: '2024-12-10' },
];

describe('TableStock Component', () => {

  test('renders table with data', () => {
    render(
      <BrowserRouter> {/* Wrap with BrowserRouter */}
        <TableStock
          currentItems={sampleData}
          onDelete={mockOnDelete}
          onViewDetail={mockOnViewDetail}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Laptop HP')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('handles sorting by name', () => {
    render(
      <BrowserRouter> {/* Wrap with BrowserRouter */}
        <TableStock
          currentItems={sampleData}
          onDelete={mockOnDelete}
          onViewDetail={mockOnViewDetail}
        />
      </BrowserRouter>
    );

    const nameHeader = screen.getByText('Product Name');
    fireEvent.click(nameHeader);

    // Verify if the items are sorted by name
    const firstRow = screen.getAllByRole('row')[1];
    expect(firstRow).toHaveTextContent('Laptop HP');
  });

  test('handles view detail button click', () => {
    render(
      <BrowserRouter> {/* Wrap with BrowserRouter */}
        <TableStock
          currentItems={sampleData}
          onDelete={mockOnDelete}
          onViewDetail={mockOnViewDetail}
        />
      </BrowserRouter>
    );

    const viewDetailButton = screen.getAllByTitle('View Details')[0];
    fireEvent.click(viewDetailButton);

    expect(mockOnViewDetail).toHaveBeenCalledWith(sampleData[0]);
  });
});
