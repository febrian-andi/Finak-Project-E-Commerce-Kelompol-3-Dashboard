import { render, screen } from "@testing-library/react";
import SummaryCard from "../../../components/home/SummaryCard";

describe("SummaryCard Component", () => {
  test("renders the title 'Summary'", () => {
    render(<SummaryCard />);
    const titleElement = screen.getByText(/summary/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders all summary cards", () => {
    render(<SummaryCard />);
    const cardTitles = ["Users", "Orders", "Sales", "Items"];
    cardTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("renders correct count values", () => {
    render(<SummaryCard />);
    const counts = ["35K", "40", "345$", "68"];
    counts.forEach((count) => {
      expect(screen.getByText(count)).toBeInTheDocument();
    });
  });
});
