import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryFormModal from '../../../components/category/CategoryFormModal';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  mode: 'add',
  initialData: null,
  onSubmit: jest.fn(),
};

describe('CategoryFormModal Component', () => {
  it('renders the modal correctly when open', () => {
    render(<CategoryFormModal {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Add Category' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Category Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Category Icon')).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with empty fields', () => {
    render(<CategoryFormModal {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: 'Add Category' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Category name is required')).toBeInTheDocument();
    expect(screen.getByText('Category icon is required')).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<CategoryFormModal {...defaultProps} onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText('Enter Category Name');
    fireEvent.change(nameInput, { target: { value: 'Test Category' } });

    const fileInput = screen.getByLabelText('Upload Category Icon');
    const file = new File(['icon'], 'icon.png', { type: 'image/png' });

    const submitButton = screen.getByRole('button', { name: 'Add Category' });
    fireEvent.click(submitButton);

    
  });

  it('handles file removal correctly', () => {
    const editProps = {
      ...defaultProps,
      mode: 'edit',
      initialData: { name: 'Existing Category', icon: 'existing-icon.png' },
    };
    render(<CategoryFormModal {...editProps} />);

    const removeButton = screen.getByRole('button', { name: 'Remove file' });
    fireEvent.click(removeButton);

    expect(screen.queryByText('Current Icon')).not.toBeInTheDocument();
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(<CategoryFormModal {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
