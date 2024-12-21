import React from "react";
import SummaryCard from "../components/home/SummaryCard";
import TotalIncomeCard from "../components/home/TotalIncomeCard";
import BestItemCard from "../components/home/BestItemCard";
import RevenueChart from "../components/home/RevenueCart";

const HomePage = () => {
  return (
    <div className="w-full bg-primaryBackground p-6 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full">
          <SummaryCard />
        </div>
        <TotalIncomeCard />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full">
          <RevenueChart />
        </div>
        <BestItemCard />
      </div>
    </div>
  );
};

export default HomePage;
