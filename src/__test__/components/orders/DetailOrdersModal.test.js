import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DetailOrdersModal from '../../../components/orders/DetailOrdersModal'; // Adjust the import path if necessary
import '@testing-library/jest-dom';

// Mock hooks and components
jest.mock("../../../hooks/useFetchData", () => ({
  useFetchData: jest.fn(() => ({
    refetch: jest.fn(),
  })),
}));

jest.mock("../../../hooks/useUpdateData", () => ({
  useUpdateData: jest.fn(() => ({
    updateData: jest.fn(),
    isLoading: false,
    error: null,
  })),
}));

jest.mock("../../../components/LoadingSpinner", () => () => <div>Loading...</div>);

describe('DetailOrdersModal', () => {
  const mockOrder = {
    id: 1,
    customer: { name: "John Doe", address: "123 Main St" },
    payment_method: "Credit Card",
    status_order: "created",
    products: [
      { name: "T-Shirt", amount: 1, price: 100, total_price: 100 },
      { name: "Shoes", amount: 1, price: 200, total_price: 200 },
    ],
    sub_total: 300,
  };

  const mockOnClose = jest.fn();

  test('should render the modal when isOpen is true', () => {
    render(<DetailOrdersModal isOpen={true} onClose={mockOnClose} order={mockOrder} action="accept" />);
    expect(screen.getByText("Detail Order")).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test('should not render the modal when isOpen is false', () => {
    render(<DetailOrdersModal isOpen={false} onClose={mockOnClose} order={mockOrder} action="accept" />);
    expect(screen.queryByText("Detail Order")).not.toBeInTheDocument();
  });
});
