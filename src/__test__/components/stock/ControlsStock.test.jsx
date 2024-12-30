import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlsStock from '../../../components/stock/ControlsStock';

describe('ControlsStock Component', () => {
  const defaultProps = {
    selectedDate: '',
    setSelectedDate: jest.fn(),
    searchQuery: '',
    setSearchQuery: jest.fn(),
    totalItems: 100,
  };

  it('renders all controls correctly', () => {
    render(<ControlsStock {...defaultProps} />);

    // Check DatePicker
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();

    // Check Filter Dropdown
    expect(screen.getByText('Select Filter')).toBeInTheDocument();

    // Check Search Input
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    // Check Total Stock
    expect(screen.getByText('Total Stock')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('updates search query when user types', () => {
    render(<ControlsStock {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'New Search' } });

    expect(defaultProps.setSearchQuery).toHaveBeenCalledWith('New Search');
  });

  it('displays the correct total items', () => {
    render(<ControlsStock {...defaultProps} totalItems={50} />);

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders filter dropdown with correct options', () => {
    render(<ControlsStock {...defaultProps} />);

    const filterDropdown = screen.getByText('Select Filter');
    expect(filterDropdown).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3); // "Select Filter", "Name", "Variant"
    expect(options[1]).toHaveTextContent('Name');
    expect(options[2]).toHaveTextContent('Variant');
  });
});
