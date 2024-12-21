import React, { useState } from "react";
import HeaderOrders from "../components/orders/HeaderOrders";
import TableOrders from "../components/orders/TableOrders";
// import PaginationOrders from "../components/orders/PaginationOrders";

const OrdersPage = () => {
  const [promotion] = useState(generateSampleData());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Generate sample data
  function generateSampleData() {
    const statusOrder = ["created", "process", "completed", "cancelled"];
    const paymentMethod = ["Debit Online", "Credit Card", "Gopay"];
    const items = [];
  
    for (let i = 1; i <= 27; i++) {
      const ordersData = {
        id: `EL-${String(i).padStart(3, "0")}`,
        customer_name: `Customer ${i}`,
        user_name: `user_${i}`,
        address: `Jl. Raya No. ${i}, Bandung, Jawa Barat`,
        payment_method: paymentMethod[Math.floor(Math.random() * paymentMethod.length)],
        products: [
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
        sub_total: [100, 80, 200].reduce((acc, curr) => acc + curr, 0),
        status_order: statusOrder[Math.floor(Math.random() * statusOrder.length)],
      };
  
      items.push(ordersData);
    }
  
    return items;
  }

  const totalItems = promotion.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = promotion.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <HeaderOrders title="Promotion" breadcrumbs={["Home", "Promotion"]} />
        <TableOrders currentItems={currentItems} />
        {/* <PaginationPromotion
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>
    </div>
  );
};

export default OrdersPage;
