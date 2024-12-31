import React from "react";

const LoadingSpinner = ({ color = "white", fontColor = "white" }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className={`animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-${color}`}></div>
      <span className={`text-${fontColor}`}>Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
