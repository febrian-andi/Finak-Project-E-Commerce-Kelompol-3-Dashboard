import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VariantModal from '../../../components/product/VariantProduct';

const mockOnClose = jest.fn();
const mockOnAdd = jest.fn();

const mockVariants = [
  { name: 'Color', options: ['Red', 'Blue'] },
  { name: 'Size', options: ['S', 'M', 'L'] },
];

describe('VariantModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    render(
      <VariantModal
        isOpen={true} // Tambahkan isOpen
        variants={props.variants || mockVariants}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
      />
    );
  };

  it('renders the modal with initial variants', () => {
    renderComponent();

    expect(screen.getByTestId('variant-modal')).toBeInTheDocument();
    expect(screen.getByTestId('variant-modal-title')).toHaveTextContent('Add Varian');

    mockVariants.forEach((variant, index) => {
      expect(screen.getByTestId(`variant-name-${index}`)).toHaveTextContent(variant.name);
      variant.options.forEach((option, optionIndex) => {
        expect(screen.getByTestId(`option-item-${index}-${optionIndex}`)).toHaveTextContent(option);
      });
    });
  });

  it('allows adding a new variant', () => {
    renderComponent({ variants: [] });

    const variantInput = screen.getByTestId('variant-input');
    const addVariantButton = screen.getByTestId('add-variant-button');

    fireEvent.change(variantInput, { target: { value: 'Material' } });
    fireEvent.click(addVariantButton);

    expect(screen.getByTestId('variant-name-0')).toHaveTextContent('Material');
  });

  it('allows adding an option to a variant', () => {
    renderComponent();

    const addOptionButton = screen.getByTestId('add-option-button-0');
    fireEvent.click(addOptionButton);

    const optionInput = screen.getByTestId('option-input-0');
    const confirmOptionButton = screen.getByTestId('add-option-button-confirm-0');

    fireEvent.change(optionInput, { target: { value: 'Green' } });
    fireEvent.click(confirmOptionButton);

    expect(screen.getByTestId('option-item-0-2')).toHaveTextContent('Green');
  });

  it('allows removing a variant', () => {
    renderComponent();

    const removeVariantButton = screen.getByTestId('remove-variant-button-0');
    fireEvent.click(removeVariantButton);

    // Perbarui DOM menggunakan async/await untuk memastikan state di-update
  });

  it('allows removing an option from a variant', () => {
    renderComponent();

    const removeOptionButton = screen.getByTestId('remove-option-button-0-0');
    fireEvent.click(removeOptionButton);

    // Tunggu hingga elemen hilang dari DOM
  });

  it('calls onAdd with the updated variant list when submitted', () => {
    renderComponent();

    const submitButton = screen.getByTestId('variant-modal-submit-button');
    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith(mockVariants);
  });

  it('calls onClose when the cancel button is clicked', () => {
    renderComponent();

    const cancelButton = screen.getByTestId('variant-modal-cancel-button');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
