import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate, useSearchParams } from "react-router-dom";
import FormOTP from "../../../components/auth/FormOTP ";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("FormOTP Component", () => {
  const mockNavigate = jest.fn();
  const mockSearchParams = new URLSearchParams({ email: "test@example.com" });

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useSearchParams.mockReturnValue([mockSearchParams]);
  });

  it("renders OTP input fields and submit button", () => {
    render(
      <MemoryRouter>
        <FormOTP />
      </MemoryRouter>
    );

    // Check for OTP input fields
    const otpInputs = screen.getAllByRole("textbox");
    expect(otpInputs).toHaveLength(4);

    // Check for submit button
    expect(screen.getByRole("button", { name: /Verify OTP/i })).toBeInTheDocument();
  });

  it("updates OTP input fields on typing", () => {
    render(
      <MemoryRouter>
        <FormOTP />
      </MemoryRouter>
    );

    const otpInputs = screen.getAllByRole("textbox");

    // Simulate typing in OTP inputs
    fireEvent.change(otpInputs[0], { target: { value: "1" } });
    fireEvent.change(otpInputs[1], { target: { value: "2" } });
    fireEvent.change(otpInputs[2], { target: { value: "3" } });
    fireEvent.change(otpInputs[3], { target: { value: "4" } });

    // Verify the values in OTP inputs
    expect(otpInputs[0].value).toBe("1");
    expect(otpInputs[1].value).toBe("2");
    expect(otpInputs[2].value).toBe("3");
    expect(otpInputs[3].value).toBe("4");
  });

  it("navigates to reset password page on form submission", () => {
    render(
      <MemoryRouter>
        <FormOTP />
      </MemoryRouter>
    );

    const otpInputs = screen.getAllByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /Verify OTP/i });

    // Simulate typing in OTP inputs
    fireEvent.change(otpInputs[0], { target: { value: "1" } });
    fireEvent.change(otpInputs[1], { target: { value: "2" } });
    fireEvent.change(otpInputs[2], { target: { value: "3" } });
    fireEvent.change(otpInputs[3], { target: { value: "4" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Check if navigate was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith("/reset-password");
  });
});
