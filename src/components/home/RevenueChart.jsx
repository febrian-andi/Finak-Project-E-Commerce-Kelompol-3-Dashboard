import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", sales: 0 },
  { month: "Feb", sales: 25 },
  { month: "Mar", sales: 30 },
  { month: "Apr", sales: 52 },
  { month: "May", sales: 38 },
  { month: "Jun", sales: 58 },
  { month: "Jul", sales: 35 },
  { month: "Aug", sales: 32 },
  { month: "Sep", sales: 20 },
  { month: "Oct", sales: 38 },
  { month: "Nov", sales: 20 },
  { month: "Des", sales: 12 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-red-500">
          Sales: {payload[0].value}M
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="w-full p-6 bg-white border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Revenue 2024</h2>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm text-gray-600">Sales</span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              horizontal={true}
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              stroke="#f0f0f0"
              tick={{ fill: "#666" }}
            />
            <YAxis
              tickFormatter={(value) => `${value}M`}
              tick={{ fill: "#666" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              tickCount={7}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#DB4444"
              strokeWidth={4}
              dot={false}
              activeDot={{ 
                r: 6, 
                onClick: (_, e) => {
                  e.stopPropagation();
                }
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;