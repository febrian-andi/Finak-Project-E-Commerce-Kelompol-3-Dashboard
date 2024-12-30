import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import ProductHeader from '../../../../components/product/productform/ProductHeader';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ProductHeader Component', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (mode = 'add') => {
    render(
      <BrowserRouter>
        <ProductHeader mode={mode} />
      </BrowserRouter>
    );
  };

  it('should render the correct title for add mode', () => {
    renderComponent('add');
  });

  it('should render the correct title for edit mode', () => {
    renderComponent('edit');
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });

  it('should render the correct title for detail mode', () => {
    renderComponent('detail');
    expect(screen.getByText('Detail Product')).toBeInTheDocument();
  });

  it('should navigate back when the back button is clicked', () => {
    renderComponent('add');
    const backButton = screen.getByText('<');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should navigate to home when Home breadcrumb is clicked', () => {
    renderComponent('add');
    const homeBreadcrumb = screen.getByText('Home');
    fireEvent.click(homeBreadcrumb);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to product list when Product breadcrumb is clicked', () => {
    renderComponent('add');
    const productBreadcrumb = screen.getByText('Product');
    fireEvent.click(productBreadcrumb);
    expect(mockNavigate).toHaveBeenCalledWith('/product');
  });

  it('should render the correct breadcrumb for add mode', () => {
    renderComponent('add');
  });

  it('should render the correct breadcrumb for edit mode', () => {
    renderComponent('edit');
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });

  it('should render the correct breadcrumb for detail mode', () => {
    renderComponent('detail');
    expect(screen.getByText('Detail Product')).toBeInTheDocument();
  });
});
