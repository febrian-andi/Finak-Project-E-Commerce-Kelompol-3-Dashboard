import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingHeader from '../../../components/rating/RatingHeader';

jest.mock('antd', () => {
  const actualAntd = jest.requireActual('antd');
  return {
    ...actualAntd,
    DatePicker: jest.fn(({ onChange, value }) => (
      <input
        data-testid="date-picker"
        type="text"
        value={value || ''}
        onChange={(e) => {
          const newValue = e.target.value ? e.target.value : null;
          onChange(newValue);
        }}
      />
    )),
  };
});

describe('RatingHeader Component', () => {
  const mockSetSearchQuery = jest.fn();
  const mockSetSelectedDate = jest.fn();

  const defaultProps = {
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
    selectedDate: '',
    setSelectedDate: mockSetSelectedDate,
  };

  it('renders correctly with default props', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<RatingHeader {...defaultProps} />);

    // Check if search input renders
    const searchInput = getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');

    // Check if dropdown renders
    const dropdown = getByText('Select Filter');
    expect(dropdown).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    const { getByPlaceholderText } = render(<RatingHeader {...defaultProps} />);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Test Query' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Test Query');
  });
});
