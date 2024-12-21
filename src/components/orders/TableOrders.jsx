import React, { useState } from "react";
import CheckCircleIcon from "../../assets/orders/CheckCircleIcon";
import XCircleIcon from "../../assets/orders/XCircleIcon";
import DetailOrdersModal from "./DetailOrdersModal";
import StatusOrder from "./StatusOrder";

const TableOrders = ({ currentItems }) => {
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  const handleOnClick = () => {
    setIsOpenDetailModal(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">
              User Name
            </th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Address</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">
              Payment Method
            </th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Amount</th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">
              Status Order
            </th>
            <th className="text-left text-sm px-6 py-4 bg-gray-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="px-6 py-4 text-xs">{item.user_name}</td>
              <td className="px-6 py-4 text-xs">{item.address}</td>
              <td className="px-6 py-4 text-xs">{item.payment_method}</td>
              <td className="px-6 py-4 text-xs">{item.sub_total}</td>
              <td className="px-6 py-4 text-xs">
                <StatusOrder status_order={item.status_order} />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button onClick={handleOnClick}>
                    <CheckCircleIcon />
                  </button>
                  <button onClick={handleOnClick}>
                    <XCircleIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDetailModal && (
        <DetailOrdersModal
          isOpen={isOpenDetailModal}
          onClose={() => setIsOpenDetailModal(false)}
        />
      )}
    </div>
  );
};

export default TableOrders;
