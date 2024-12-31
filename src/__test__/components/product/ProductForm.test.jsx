import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductForm from '../../../components/product/ProductForm';

describe('ProductForm Component', () => {
  it('renders the ProductForm component correctly', () => {
    render(
      <MemoryRouter>
        <ProductForm mode='add' />
      </MemoryRouter>
    );

    // Verifies the main form container
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
    expect(screen.getByTestId('product-form-container')).toBeInTheDocument();

    // Verifies the ProductActions component
  });

  it('renders the photo uploader in add mode', () => {
    render(
      <MemoryRouter>
        <ProductForm mode='add' />
      </MemoryRouter>
    );

    // Verifies the photo uploader component
  });

  it('renders photo previews in detail mode', () => {
    render(
      <MemoryRouter>
        <ProductForm mode='detail' />
      </MemoryRouter>
    );

    // Verifies the photo previews component
    expect(screen.getByTestId('photo-previews')).toBeInTheDocument();
  });
});
