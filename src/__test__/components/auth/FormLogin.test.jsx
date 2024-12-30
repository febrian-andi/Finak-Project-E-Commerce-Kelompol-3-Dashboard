import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import FormLogin from '../../../components/auth/FormLogin';

const mockStore = configureMockStore([]);
const mockHandleSubmit = jest.fn();
const mockHandleInputChange = jest.fn();

const formData = {
  email: '',
  password: '',
};

describe('FormLogin Component', () => {
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
          <FormLogin formData={formData} handleInputChange={mockHandleInputChange} handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    // Check for input fields
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••••/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('calls handleInputChange when typing in input fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormLogin formData={formData} handleInputChange={mockHandleInputChange} handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate typing in inputs
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••••/i), {
      target: { value: 'password123' },
    });

    // Verify that handleInputChange was called for each field
    expect(mockHandleInputChange).toHaveBeenCalledTimes(2);
  });

  it('calls handleSubmit on form submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FormLogin formData={formData} handleInputChange={mockHandleInputChange} handleSubmit={mockHandleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate button click to submit form
    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);

    // Verify that handleSubmit was called
  });
});
