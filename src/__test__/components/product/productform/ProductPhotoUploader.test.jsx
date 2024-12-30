import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductPhotoUploader from '../../../../components/product/productform/ProductPhotoUploader';

describe('ProductPhotoUploader Component', () => {
  const mockHandlePhotoChange = jest.fn();
  const mockHandlePhotoDrop = jest.fn();
  const mockHandlePhotoDelete = jest.fn();
  const mockHandleSetDefaultPhoto = jest.fn();

  const mockPhotoPreviews = [
    'http://example.com/photo1.jpg',
    'http://example.com/photo2.jpg',
  ];

  const setup = (photoPreviews = []) => {
    render(
      <ProductPhotoUploader
        photoPreviews={photoPreviews}
        handlePhotoChange={mockHandlePhotoChange}
        handlePhotoDrop={mockHandlePhotoDrop}
        handlePhotoDelete={mockHandlePhotoDelete}
        handleSetDefaultPhoto={mockHandleSetDefaultPhoto}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload instructions', () => {
    setup();
    expect(screen.getByText('Click to upload')).toBeInTheDocument();
    expect(screen.getByText('or drag and drop')).toBeInTheDocument();
    expect(screen.getByText('(max, 800x400px)')).toBeInTheDocument();
  });


  it('calls handlePhotoDrop when a file is dropped', () => {
    setup();

    const dropZone = screen.getByText('Click to upload').parentElement;
    fireEvent.drop(dropZone, {
      dataTransfer: { files: [new File(['image content'], 'photo.jpg', { type: 'image/jpeg' })] },
    });

    expect(mockHandlePhotoDrop).toHaveBeenCalledTimes(1);
  });

  it('renders photo previews correctly', () => {
    setup(mockPhotoPreviews);

    mockPhotoPreviews.forEach((photo, index) => {
      const img = screen.getByAltText(`Preview ${index + 1}`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', photo);
    });
  });

  it('calls handlePhotoDelete when the delete button is clicked', () => {
    setup(mockPhotoPreviews);

    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[0]);

    expect(mockHandlePhotoDelete).toHaveBeenCalledWith(0);
  });

  it('calls handleSetDefaultPhoto when "Set as default image" button is clicked', () => {
    setup(mockPhotoPreviews);

    const setDefaultButtons = screen.getAllByText('Set as default image');
    fireEvent.click(setDefaultButtons[0]);

    expect(mockHandleSetDefaultPhoto).toHaveBeenCalledWith(1);
  });
});
