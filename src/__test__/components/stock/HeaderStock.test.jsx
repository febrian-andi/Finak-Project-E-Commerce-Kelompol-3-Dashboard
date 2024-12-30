import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import HeaderStock from '../../../components/stock/HeaderStock';

describe('HeaderStock Component', () => {
  const defaultProps = {
    title: 'Stock Management',
    breadcrumbs: ['Dashboard', 'Stock'],
    onAddStock: jest.fn(),
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders the title correctly', () => {
    renderWithRouter(<HeaderStock {...defaultProps} />);
    expect(screen.getByText('Stock Management')).toBeInTheDocument();
  });

  it('renders breadcrumbs correctly', () => {
    renderWithRouter(<HeaderStock {...defaultProps} />);

    // Check breadcrumb items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Stock')).toBeInTheDocument();

    // Check the separator
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(1);
  });

  it('renders the Add New Stock button with correct text and link', () => {
    renderWithRouter(<HeaderStock {...defaultProps} />);

    const button = screen.getByRole('link', { name: /add new stock/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/stock/add');
  });

  it('calls onAddStock when the Add New Stock button is clicked', () => {
    renderWithRouter(<HeaderStock {...defaultProps} />);

    const button = screen.getByRole('link', { name: /add new stock/i });
    fireEvent.click(button);

    expect(defaultProps.onAddStock).toHaveBeenCalled();
  });

  it('handles empty breadcrumbs gracefully', () => {
    renderWithRouter(<HeaderStock {...defaultProps} breadcrumbs={[]} />);

    // Breadcrumb section should not render separators or items
    expect(screen.queryByText('>')).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = renderWithRouter(<HeaderStock {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
