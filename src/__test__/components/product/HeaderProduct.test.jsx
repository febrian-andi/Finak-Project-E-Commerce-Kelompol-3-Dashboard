import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderProduct from '../../../components/product/HeaderProduct';

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HeaderProduct Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockNavigate.mockClear();
  });

  it('navigates to home when Home breadcrumb is clicked', async () => {
    render(
      <MemoryRouter>
        <HeaderProduct />
      </MemoryRouter>
    );

    const homeBreadcrumb = screen.getByTestId('breadcrumb-home');

    await act(async () => {
      fireEvent.click(homeBreadcrumb);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('navigates to add product page when Add New Product button is clicked', async () => {
    render(
      <MemoryRouter>
        <HeaderProduct />
      </MemoryRouter>
    );

    const addProductButton = screen.getByTestId('add-product-button');

    await act(async () => {
      fireEvent.click(addProductButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/product/add');
  });
});
