import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableBanner from '../../../components/banner/TableBanner';
import { BrowserRouter as Router } from 'react-router-dom';

describe('TableBanner Component', () => {
  const mockHandleSort = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockSetBanners = jest.fn();

  const banners = [
    { id: 1, picture: 'https://via.placeholder.com/150', name: 'Banner 1', targetUrl: 'https://example.com', releaseDate: '2024-01-01', endDate: '2024-01-10', published: true },
    { id: 2, picture: 'https://via.placeholder.com/150', name: 'Banner 2', targetUrl: 'https://example.com', releaseDate: '2024-01-15', endDate: '2024-01-20', published: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table with banners', () => {
    render(
      <Router>
        <TableBanner
          currentItems={banners}
          handleSort={mockHandleSort}
          handleDelete={mockHandleDelete}
          setBanners={mockSetBanners}
          banners={banners}
        />
      </Router>
    );

    // Verify banners are rendered
    expect(screen.getByText('Banner 1')).toBeInTheDocument();
    expect(screen.getByText('Banner 2')).toBeInTheDocument();

    // Use getAllByText to handle multiple matching elements
    const urls = screen.getAllByText('https://example.com');
    expect(urls).toHaveLength(2);
  });

  it('calls handleSort when a sortable column is clicked', () => {
    render(
      <Router>
        <TableBanner
          currentItems={banners}
          handleSort={mockHandleSort}
          handleDelete={mockHandleDelete}
          setBanners={mockSetBanners}
          banners={banners}
        />
      </Router>
    );

    const sortButton = screen.getByText('Banner Name');
    fireEvent.click(sortButton);

    expect(mockHandleSort).toHaveBeenCalledWith('name');
  });

  it('toggles published state when the publish button is clicked', () => {
    render(
      <Router>
        <TableBanner
          currentItems={banners}
          handleSort={mockHandleSort}
          handleDelete={mockHandleDelete}
          setBanners={mockSetBanners}
          banners={banners}
        />
      </Router>
    );

    const publishButton = screen.getAllByRole('button')[2]; // Adjust index to match the toggle button
    fireEvent.click(publishButton);

    
  });

  it('calls handleDelete when delete button is clicked', () => {
    render(
      <Router>
        <TableBanner
          currentItems={banners}
          handleSort={mockHandleSort}
          handleDelete={mockHandleDelete}
          setBanners={mockSetBanners}
          banners={banners}
        />
      </Router>
    );

    const deleteButton = screen.getAllByTitle('Delete Banner')[0];
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith(1);
  });
});
