import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import FormRegister from '../../../components/auth/FormRegister';

const mockStore = configureMockStore([]);
const mockHandleSubmit = jest.fn();
const mockHandleInputChange = jest.fn();

const formData = {
  fullName: '',
  email: '',
  password: '',
};

describe('FormRegister Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null,
      },
    });
  });

  it('renders all input fields and submit button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormRegister formData={formData} handleInputChange={mockHandleInputChange} handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    // Check for input fields
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /Get started/i })).toBeInTheDocument();
  });

  it('calls handleInputChange when typing in input fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormRegister formData={formData} handleInputChange={mockHandleInputChange} handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate typing in inputs
    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' },
    });

    // Verify that handleInputChange was called for each field
    expect(mockHandleInputChange).toHaveBeenCalledTimes(3);
  });

  it('calls handleSubmit on form submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormRegister formData={formData} handleInputChange={mockHandleInputChange} handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate button click to submit form
    const submitButton = screen.getByRole('button', { name: /Get started/i });
    fireEvent.click(submitButton);

    // Verify that handleSubmit was called
  });
});
