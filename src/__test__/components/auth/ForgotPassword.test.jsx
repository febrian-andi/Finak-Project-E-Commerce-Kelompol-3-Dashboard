import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import FormForgotPassword from "../../../components/auth/FormForgotPassword";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("FormForgotPassword Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders the email input field and submit button", () => {
    render(
      <MemoryRouter>
        <FormForgotPassword />
      </MemoryRouter>
    );

    // Check if input and button are rendered
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Email/i })).toBeInTheDocument();
  });

  it("updates the email input value on change", () => {
    render(
      <MemoryRouter>
        <FormForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);

    // Simulate typing in the email input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("navigates to the verify-otp page on form submission", () => {
    render(
      <MemoryRouter>
        <FormForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const submitButton = screen.getByRole("button", { name: /Send Email/i });

    // Simulate typing email and form submission
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    // Check if navigate was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith(
      "/verify-otp?email=test%40example.com"
    );
  });
});
