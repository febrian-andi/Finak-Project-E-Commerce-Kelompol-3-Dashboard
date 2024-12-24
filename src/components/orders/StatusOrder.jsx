import React from "react";

const StatusOrder = ({ status_order }) => {
  if (status_order === "created") {
    return (
      <span className="bg-[#DF7B00] text-white font-medium rounded py-1 px-2">
        Created
      </span>
    );
  } else if (status_order === "process") {
    return (
      <span className="bg-[#2794EB] text-white font-medium rounded py-1 px-2">
        Process
      </span>
    );
  } else if (status_order === "completed") {
    return (
      <span className="bg-[#198754] text-white font-medium rounded py-1 px-2">
        Completed
      </span>
    );
  } else if (status_order === "cancelled") {
    return (
      <span className="bg-[#DC3741] text-white font-medium rounded py-1 px-2">
        Cancelled
      </span>
    );
  } else {
    return (
      <span className="bg-gray-500 text-white font-medium rounded py-1 px-2">
        Unknown
      </span>
    );
  }
};

export default StatusOrder;