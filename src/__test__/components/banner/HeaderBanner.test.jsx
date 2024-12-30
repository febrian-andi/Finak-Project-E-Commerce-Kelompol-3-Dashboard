import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderBanner from '../../../components/banner/HeaderBanner';

describe('HeaderBanner Component', () => {
  const mockOnAddNew = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header and filter dropdown correctly', () => {
    render(
      <MemoryRouter>
        <HeaderBanner onAddNew={mockOnAddNew} onFilterChange={mockOnFilterChange} />
      </MemoryRouter>
    );

    // Check for header title
    expect(screen.getByText('Banner Management')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check for "Add New Banner" button
    expect(screen.getByText('Add New Banner')).toBeInTheDocument();

    // Check for filter dropdown
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.value).toBe(''); // Default value
  });

  it('calls onAddNew when the "Add New Banner" button is clicked', () => {
    render(
      <MemoryRouter>
        <HeaderBanner onAddNew={mockOnAddNew} onFilterChange={mockOnFilterChange} />
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add New Banner');
    fireEvent.click(addButton);

    expect(mockOnAddNew).toHaveBeenCalledTimes(1);
  });

  it('calls onFilterChange when a filter is selected', () => {
    render(
      <MemoryRouter>
        <HeaderBanner onAddNew={mockOnAddNew} onFilterChange={mockOnFilterChange} />
      </MemoryRouter>
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'published' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('published');
    expect(dropdown.value).toBe('published');
  });
});
