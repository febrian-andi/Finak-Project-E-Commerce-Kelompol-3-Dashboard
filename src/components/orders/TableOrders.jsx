import React, { useState } from "react";
import CheckCircleIcon from "../../assets/orders/CheckCircleIcon";
import XCircleIcon from "../../assets/orders/XCircleIcon";
import DetailOrdersModal from "./DetailOrdersModal";
import StatusOrder from "./StatusOrder";
import filterIcon from "../../assets/product/filterIcon.svg";
import EyeIcon from "../../assets/promotion/EyeIcon";

const TableOrders = ({ orders }) => {
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedAction, setSelectedAction] = useState(null);

  const headerMapping = {
    "User Name": "name",
    "Address": "address",
    "Payment Method": "payment_method",
    "Amount": "sub_total",
    "Status Order": "status_order",
  };

  const handleSort = (header) => {
    const key = headerMapping[header];
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedOrder = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "price") {
      aValue = parseFloat(aValue.replace("$", ""));
      bValue = parseFloat(bValue.replace("$", ""));
    }

    if (sortConfig.key === "stock") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleOnClick = (order, action) => {
    setSelectedOrder(order);
    setSelectedAction(action);
    setIsOpenDetailModal(true);
  };

  const headers = [...Object.keys(headerMapping), "Action"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((header) => (
              <th
                key={header}
                className="text-left px-6 py-4 whitespace-nowrap"
              >
                <div
                  className="flex items-center gap-1"
                  onClick={() => header !== "Action" && handleSort(header)}
                >
                  <span className={header !== "Action" ? "cursor-pointer" : ""}>
                    {header}
                  </span>
                  {header !== "Action" && (
                    <img
                      src={filterIcon}
                      alt="filter"
                      className={`inline-block ml-1 cursor-pointer transition-transform duration-200 ${
                        sortConfig.key === headerMapping[header] &&
                        sortConfig.direction === "desc"
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedOrder.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="px-6 py-4 text-xs">{item.customer.username}</td>
              <td className="px-6 py-4 text-xs">{item.customer.address}</td>
              <td className="px-6 py-4 text-xs">{item.payment_method}</td>
              <td className="px-6 py-4 text-xs">{item.sub_total}</td>
              <td className="px-6 py-4 text-xs">
                <StatusOrder status_order={item.status_order} />
              </td>
              <td className="px-6 py-4">
                {item.status_order === "completed" || item.status_order === "cancelled" ? (
                  <button onClick={() => handleOnClick(item, "detail")}>
                    <EyeIcon />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => handleOnClick(item, "approve")}>
                      <CheckCircleIcon />
                    </button>
                    <button onClick={() => handleOnClick(item, "reject")}>
                      <XCircleIcon />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDetailModal && (
        <DetailOrdersModal
          order={selectedOrder}
          action={selectedAction}
          isOpen={isOpenDetailModal}
          onClose={() => setIsOpenDetailModal(false)}
        />
      )}
    </div>
  );
};

export default TableOrders;
