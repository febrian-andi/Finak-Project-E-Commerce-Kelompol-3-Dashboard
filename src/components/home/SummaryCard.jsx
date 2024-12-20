import React from "react";
import UsersIcon from "../../assets/home/UsersIcon";
import CursorIcon from "../../assets/home/CursorIcon";
import SalesIcon from "../../assets/home/SalesIcon";
import BoxIcon from "../../assets/home/BoxIcon";

const SummaryCard = () => {
  const summaryData = [
    {
      title: "Users",
      icon: <UsersIcon color="white" />,
      count: "35K",
    },
    {
      title: "Orders",
      icon: <CursorIcon color="white" />,
      count: "40",
    },
    {
      title: "Sales",
      icon: <SalesIcon color="white" />,
      count: "345$",
    },
    {
      title: "Items",
      icon: <BoxIcon color="white" height="18" width="18" />,
      count: "68",
    },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 space-y-4">
      <h1 className="text-xl font-medium">Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {summaryData.map((data, index) => (
          <div key={index} className="p-4 shadow border rounded-lg space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-black text-white flex items-center justify-center rounded-lg w-8 h-8">
                {data.icon}
              </div>
              <p>{data.title}</p>
            </div>
            <p className="text-5xl font-bold">{data.count}</p>
            <div className="flex">
              <div className="h-1 bg-[#DB4444] rounded-l w-1/2"></div>
              <div className="h-1 bg-[#DE8F8F7A] rounded-r w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
