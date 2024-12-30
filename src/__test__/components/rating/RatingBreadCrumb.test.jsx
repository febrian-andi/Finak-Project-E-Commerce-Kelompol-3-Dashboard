import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RatingBreadCrumb from '../../../components/rating/RatingBreadCrumb';

describe('RatingBreadCrumb Component', () => {
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders correctly', () => {
    const { getByText } = renderWithRouter(<RatingBreadCrumb />);

    // Check if the "Home" link is rendered
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    // Check if the "Rating" text is rendered
    const ratingText = getByText('Rating');
    expect(ratingText).toBeInTheDocument();
    expect(ratingText).not.toHaveAttribute('href');

    // Check if the "/" separator is rendered
    const separator = getByText('/');
    expect(separator).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    const { getByText } = renderWithRouter(<RatingBreadCrumb />);

    const homeLink = getByText('Home');
    expect(homeLink).toHaveClass('text-red-500');
    expect(homeLink).toHaveClass('hover:text-red-700');

    const ratingText = getByText('Rating');
    expect(ratingText).toHaveClass('text-red-500');
  });
});
