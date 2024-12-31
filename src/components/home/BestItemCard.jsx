import React from "react";
import BoxIcon from "../../assets/home/BoxIcon";
import ArrowRightIcon from "../../assets/home/ArrowRightIcon";

const BestItemCard = () => {
  const bestItem = [
    {
      id: 1,
      name: "Lamp",
      category: "Electronics",
      icon: BoxIcon,
    },
    {
      id: 2,
      name: "Car Toy",
      category: "Toys",
      icon: BoxIcon,
    },
    {
      id: 3,
      name: "Shoes",
      category: "Fashion",
    },
  ];
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md text-center space-y-4 w-full lg:w-[300px]">
      <h1 className="text-xl font-medium">Best Item Sales</h1>
      <div className="space-y-4">
        {bestItem.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-black text-white flex items-center justify-center p-2 rounded-lg w-10 h-10">
                <BoxIcon color="white" />
              </div>
              <div>
                <h2 className="text-md font-bold text-start">{item.name}</h2>
                <p className="text-gray-400 text-start">{item.category}</p>
              </div>
            </div>
            <div>
              <ArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestItemCard;
