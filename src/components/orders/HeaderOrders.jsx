import React from "react";

const HeaderOrders = ({ title, breadcrumbs, handleDownload }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">{title}</h1>
        <div className="flex items-center text-sm space-x-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <span className="text-red-500">{breadcrumb}</span>
              {index < breadcrumbs.length - 1 && <span className="text-red-500">{">"}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <button onClick={handleDownload} className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded">
        Download All
      </button>
    </div>
  );
};

export default HeaderOrders;