import React from "react";
import StatusOrder from "./StatusOrder";

const DetailOrdersModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const {
    customer_name = "John Doe",
    address = "Jl. Raya Bogor No.1, Bandung, Jawa Barat",
    payment_method = "Gopay",
    status_order = "created",
    products = [
      {
        name: "T-Shirt",
        amount: 1,
        price: 100,
        total_price: 1 * 100,
      },
      {
        name: "Pants",
        amount: 1,
        price: 80,
        total_price: 1 * 80,
      },
      {
        name: "Shoes",
        amount: 1,
        price: 200,
        total_price: 1 * 200,
      },
    ],
    sub_total = [100, 80, 200].reduce((acc, curr) => acc + curr, 0),
  } = order || {};

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">Detail Order</h2>
          <div>
            <StatusOrder status_order={status_order} />
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          {/* Customer Info */}
          <div className="mb-4">
            <h3 className="text-lg font-bold">Customer</h3>
            <p className="text-gray-600">Name: {customer_name}</p>
            <p className="text-gray-600">Address: {address}</p>
          </div>

          {/* Order Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Order Info</h3>
            <p className="text-gray-600">Payment Method: {payment_method}</p>
            <p className="text-gray-600">Status: {status_order}</p>
          </div>

          {/* Products List */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Products</h3>
            <ul className="divide-y divide-gray-200">
              {products?.map((product, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>
                    {product.name} (x{product.amount})
                  </span>
                  <span>${product.total_price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center border-t pt-2">
            <span className="text-lg font-semibold text-gray-700">
              Subtotal
            </span>
            <span className="text-lg font-semibold text-gray-900">
              ${sub_total}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-4 py-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailOrdersModal;
