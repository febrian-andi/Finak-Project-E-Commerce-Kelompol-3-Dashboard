import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductActions from '../../../../components/product/productform/ProductAction';  

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ProductActions Component', () => {
  it('renders correctly in add mode', () => {
    renderWithRouter(<ProductActions onSave={jest.fn()} mode="add" />);

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  it('renders correctly in edit mode', () => {
    renderWithRouter(<ProductActions onSave={jest.fn()} mode="edit" />);

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders correctly in detail mode', () => {
    renderWithRouter(<ProductActions onSave={jest.fn()} mode="detail" />);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('calls navigate when Cancel button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    renderWithRouter(<ProductActions onSave={jest.fn()} mode="add" />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

  });

  it('calls onSave when Add Product button is clicked in add mode', () => {
    const mockOnSave = jest.fn();
    renderWithRouter(<ProductActions onSave={mockOnSave} mode="add" />);

    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('calls onSave when Save button is clicked in edit mode', () => {
    const mockOnSave = jest.fn();
    renderWithRouter(<ProductActions onSave={mockOnSave} mode="edit" />);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });

  it('navigates to /product when Back button is clicked in detail mode', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    renderWithRouter(<ProductActions onSave={jest.fn()} mode="detail" />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

  });
});
