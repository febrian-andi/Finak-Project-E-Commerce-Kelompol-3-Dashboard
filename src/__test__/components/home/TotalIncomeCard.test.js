import React from "react";
import { render, screen } from "@testing-library/react";
import TotalIncomeCard from "../../../components/home/TotalIncomeCard";

describe("TotalIncomeCard Component", () => {
  test("renders the component correctly", () => {
    render(<TotalIncomeCard />);
    
    // Check if the title is displayed
    expect(
      screen.getByText(/total earning this month/i)
    ).toBeInTheDocument();
    
    // Check if the income amount is displayed
    expect(screen.getByText(/310\$/)).toBeInTheDocument();
    
    // Check if the description is displayed
    expect(
      screen.getByText(/total income profit this month/i)
    ).toBeInTheDocument();
  });

  test("applies the correct styles", () => {
    render(<TotalIncomeCard />);
    
    const incomeAmount = screen.getByText(/310\$/);
    
    // Check the font size and color
    expect(incomeAmount).toHaveClass("text-6xl font-bold text-[#DB4444]");
  });
});
