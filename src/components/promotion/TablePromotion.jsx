import React from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../../assets/promotion/EyeIcon";
import PenIcon from "../../assets/promotion/PenIcon";
import TrashIcon from "../../assets/promotion/TrashIcon";

const TablePromotion = ({ currentItems }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Promotion Name</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Start Date</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">End Date</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Promotion Type</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Description</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Status</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Published</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="px-6 py-4 text-xs">{item.name}</td>
              <td className="px-6 py-4 text-xs">{item.start_date}</td>
              <td className="px-6 py-4 text-xs">{item.end_date}</td>
              <td className="px-6 py-4 text-xs">{item.type}</td>
              <td className="px-6 py-4 text-xs">{item.description}</td>
              <td className="px-6 py-4 text-xs">
                {item.status === true ? (
                  <span className="bg-green-700 text-sm text-white font-medium rounded-full py-2 px-3">
                    Active
                  </span>
                ) : (
                  <span className="bg-gray-500 text-white font-medium rounded-full py-2 px-3">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-xs">
                <div className="flex justify-center items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={item.published}/>
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#DB4444]"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 text-xs">
                <div className="flex gap-2">
                  <Link
                    to={`/promotion/detail`}
                    className="hover:bg-gray-100 p-1 rounded-md"
                  >
                    <EyeIcon />
                  </Link>
                  <Link
                    to={`/promotion/edit`}
                    className="hover:bg-gray-100 p-1 rounded-md"
                  >
                    <PenIcon />
                  </Link>
                  <Link className="hover:bg-gray-100 p-1 rounded-md">
                    <TrashIcon />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePromotion;
