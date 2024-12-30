import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryHeader from '../../../components/category/CategoryHeader';

describe('CategoryHeader Component', () => {
  it('renders the header with correct title and breadcrumb', () => {
    render(<CategoryHeader onAddNew={jest.fn()} />);

    // Periksa heading dan breadcrumb
    expect(screen.getByRole('heading', { name: 'Category' })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('/ Category')).toBeInTheDocument();
  });

  it('renders the "Add New Category" button', () => {
    render(<CategoryHeader onAddNew={jest.fn()} />);

    // Periksa tombol "Add New Category"
    const button = screen.getByRole('button', { name: 'Add New Category' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg');
  });

  it('calls the onAddNew function when the button is clicked', () => {
    const mockOnAddNew = jest.fn();
    render(<CategoryHeader onAddNew={mockOnAddNew} />);

    const button = screen.getByRole('button', { name: 'Add New Category' });
    fireEvent.click(button);

    expect(mockOnAddNew).toHaveBeenCalledTimes(1);
  });
});
