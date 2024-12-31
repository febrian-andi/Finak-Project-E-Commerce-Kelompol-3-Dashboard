import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationPromotion from "../../../components/promotion/PaginationPromotion";

describe("PaginationPromotion Component", () => {
  const mockSetRowsPerPage = jest.fn();
  const mockSetCurrentPage = jest.fn();

  const defaultProps = {
    startIndex: 0,
    endIndex: 20,
    totalItems: 100,
    rowsPerPage: 20,
    currentPage: 1,
    totalPages: 5,
    setRowsPerPage: mockSetRowsPerPage,
    setCurrentPage: mockSetCurrentPage,
  };

  const setup = (props = {}) => {
    render(<PaginationPromotion {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination details correctly", () => {
    setup();
    expect(screen.getByText("1-20 of 100")).toBeInTheDocument();
  });

  test("renders rows per page options correctly", () => {
    setup();
    const select = screen.getByRole("combobox");
    expect(select.value).toBe("20");
    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
  });

  test("calls setRowsPerPage and resets currentPage when rows per page is changed", () => {
    setup();
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "50" } });

    expect(mockSetRowsPerPage).toHaveBeenCalledWith(50);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  test("disables previous button when on the first page", () => {
    setup({ currentPage: 1 });
    const prevButton = screen.getAllByRole("button")[0];

    expect(prevButton).toBeDisabled();
  });

  test("disables next button when on the last page", () => {
    setup({ currentPage: 5 });
    const nextButton = screen.getByLabelText("Next Page");
    expect(nextButton).toBeDisabled();
  });    

  test("renders current page and total pages correctly", () => {
    setup();
    expect(screen.getByText("1/5")).toBeInTheDocument();
  });
});
