import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TableProduct from '../../../components/product/TableProduct';

describe('TableProduct Component', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', sku: 'SKU1', stock: 10, category: 'Category 1', price: '$10', published: true },
    { id: 2, name: 'Product 2', sku: 'SKU2', stock: 20, category: 'Category 2', price: '$20', published: false },
  ];
  const mockOnTogglePublish = jest.fn();
  const mockOnDelete = jest.fn().mockResolvedValue(true);

  it('renders the table and headers', () => {
    render(
      <MemoryRouter>
        <TableProduct products={mockProducts} onTogglePublish={mockOnTogglePublish} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('table-product')).toBeInTheDocument();
    mockProducts.forEach((product) => {
      expect(screen.getByTestId(`product-name-${product.id}`)).toHaveTextContent(product.name);
    });
  });

  it('handles publish toggle click', () => {
    render(
      <MemoryRouter>
        <TableProduct products={mockProducts} onTogglePublish={mockOnTogglePublish} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    const toggleButton = screen.getByTestId('toggle-publish-1');
    fireEvent.click(toggleButton);

  });

  it('handles delete action and displays success alert', async () => {
    render(
      <MemoryRouter>
        <TableProduct products={mockProducts} onTogglePublish={mockOnTogglePublish} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByTestId('delete-product-1');
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    await act(async () => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
  });

  it('renders action buttons for each product', () => {
    render(
      <MemoryRouter>
        <TableProduct products={mockProducts} onTogglePublish={mockOnTogglePublish} onDelete={mockOnDelete} />
      </MemoryRouter>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByTestId(`view-detail-${product.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`edit-product-${product.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`delete-product-${product.id}`)).toBeInTheDocument();
    });
  });
});
