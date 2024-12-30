import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationProduct from "../../../components/product/PaginationProduct";

describe("PaginationProduct Component", () => {
  const mockSetRowsPerPage = jest.fn();
  const mockSetCurrentPage = jest.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      totalPages: 5,
      rowsPerPage: 20,
      totalItems: 100,
      setRowsPerPage: mockSetRowsPerPage,
      setCurrentPage: mockSetCurrentPage,
    };

    return render(<PaginationProduct {...{ ...defaultProps, ...props }} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays correct pagination info", () => {
    setup();

    expect(screen.getByTestId("pagination-info")).toHaveTextContent("1-20 of 100");
  });

  it("updates rows per page and resets to page 1 when rows per page is changed", () => {
    setup();

    const rowsPerPageSelect = screen.getByTestId("rows-per-page-select");

    fireEvent.change(rowsPerPageSelect, { target: { value: "50" } });

    expect(mockSetRowsPerPage).toHaveBeenCalledWith(50);
    expect(mockSetCurrentPage).toHaveBeenCalledTimes(1);
    expect(mockSetCurrentPage).toHaveBeenNthCalledWith(1, 1);
  });

  it("navigates to the previous page when the previous button is clicked", () => {
    setup({ currentPage: 3 });

    const prevButton = screen.getByTestId("prev-page-button");

    fireEvent.click(prevButton);

  });

  it("disables the previous button on the first page", () => {
    setup({ currentPage: 1 });

    const prevButton = screen.getByTestId("prev-page-button");

    expect(prevButton).toBeDisabled();
  });

  it("navigates to the next page when the next button is clicked", () => {
    setup({ currentPage: 2 });

    const nextButton = screen.getByTestId("next-page-button");

    fireEvent.click(nextButton);

  });

  it("disables the next button on the last page", () => {
    setup({ currentPage: 5, totalPages: 5 });

    const nextButton = screen.getByTestId("next-page-button");

    expect(nextButton).toBeDisabled();
  });

  it("displays correct current page and total pages info", () => {
    setup({ currentPage: 3, totalPages: 10 });

    expect(screen.getByTestId("current-page-info")).toHaveTextContent("3/10");
  });
});
