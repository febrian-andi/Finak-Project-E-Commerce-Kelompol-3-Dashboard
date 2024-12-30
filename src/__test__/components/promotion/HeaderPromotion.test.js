import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderPromotion from "../../../components/promotion/HeaderPromotion";

describe("HeaderPromotion Component", () => {
  const title = "Promotion Page";
  const breadcrumbs = ["Home", "Promotions", "Current Promotion"];

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("renders the title correctly", () => {
    renderWithRouter(<HeaderPromotion title={title} breadcrumbs={breadcrumbs} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("renders the breadcrumbs correctly", () => {
    renderWithRouter(<HeaderPromotion title={title} breadcrumbs={breadcrumbs} />);

    // Check if each breadcrumb is rendered
    breadcrumbs.forEach((breadcrumb) => {
      expect(screen.getByText(breadcrumb)).toBeInTheDocument();
    });

    // Check if '>' separator is rendered between breadcrumbs
    const separators = screen.getAllByText(">");
    expect(separators.length).toBe(breadcrumbs.length - 1);
  });

  test("renders the 'Add New Promotion' button with correct link", () => {
    renderWithRouter(<HeaderPromotion title={title} breadcrumbs={breadcrumbs} />);

    const button = screen.getByRole("link", { name: /Add New Promotion/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/promotion/add");
  });
});
