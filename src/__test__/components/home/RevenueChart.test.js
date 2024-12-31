import React from "react";
import { render, screen } from "@testing-library/react";
import RevenueChart from "../../../components/home/RevenueChart";

// Mock Recharts' ResponsiveContainer and dependent components
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  LineChart: ({ children }) => <div>{children}</div>,
  Line: () => <div>Line</div>,
  CartesianGrid: () => <div>Grid</div>,
  XAxis: () => <div>X-Axis</div>,
  YAxis: () => <div>Y-Axis</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

describe("RevenueChart Component", () => {
  test("renders the title and legend", () => {
    render(<RevenueChart />);

    // Check if the title is displayed
    expect(screen.getByText(/Revenue 2024/i)).toBeInTheDocument();

    // Check if the legend is displayed
    expect(screen.getByText(/Sales/i)).toBeInTheDocument();
  });

  test("renders chart components correctly", () => {
    render(<RevenueChart />);

    // Check if the grid, X-axis, and Y-axis are rendered
    expect(screen.getByText(/Grid/i)).toBeInTheDocument();
    expect(screen.getByText(/X-Axis/i)).toBeInTheDocument();
    expect(screen.getByText(/Y-Axis/i)).toBeInTheDocument();

    // Check if the line is rendered
    expect(screen.getByText(/Line/i)).toBeInTheDocument();

    // Check if the tooltip is rendered
    expect(screen.getByText(/Tooltip/i)).toBeInTheDocument();
  });
});