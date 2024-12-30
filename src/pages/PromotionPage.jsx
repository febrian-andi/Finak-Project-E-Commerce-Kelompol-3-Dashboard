import React, { useState } from "react";
import HeaderPromotion from "../components/promotion/HeaderPromotion";
import PaginationPromotion from "../components/promotion/PaginationPromotion";
import TablePromotion from "../components/promotion/TablePromotion";
import { useFetchData } from "../hooks/useFetchData";
import LoadingSpinner from "../components/LoadingSpinner";

const PromotionPage = () => {
  // const [promotion] = useState(generateSampleData());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { data, isLoading, error } = useFetchData("promotions");

  // Generate sample data
  // function generateSampleData() {
  //   const items = [];
  //   const promotionData = [
  //     {
  //       name: "Promo Akhir Tahun",
  //       start_date: "11/11/2024",
  //       end_date: "20/11/2024",
  //       type: "Direct Discount",
  //       description: "Potongan 20% dengan pembelian diatas 100rb",
  //       status: true,
  //       published: true,
  //     },
  //     {
  //       name: "Cuci Gudang",
  //       start_date: "01/01/2024",
  //       end_date: "10/01/2024",
  //       type: "Voucher Code",
  //       description: "Potongan 25% dengan pembelian diatas 150rb",
  //       status: true,
  //       published: true,
  //     },
  //     {
  //       name: "Spesial Kemerdekaan",
  //       start_date: "11/11/2024",
  //       end_date: "20/11/2024",
  //       type: "Direct Discount",
  //       description: "Potongan 20% dengan pembelian diatas 100rb",
  //       status: false,
  //       published: false,
  //     },
  //     {
  //       name: "Hari Kartini",
  //       start_date: "21/11/2024",
  //       end_date: "30/11/2024",
  //       type: "Direct Discount",
  //       description: "Potongan 30% dengan pembelian diatas 100rb",
  //       status: true,
  //       published: false,
  //     },
  //   ];

  //   for (let i = 1; i <= 27; i++) {
  //     const promotion =
  //       promotionData[Math.floor(Math.random() * promotionData.length)];
  //     items.push({
  //       id: i,
  //       name: promotion.name,
  //       start_date: promotion.start_date,
  //       end_date: promotion.end_date,
  //       type: promotion.type,
  //       description: promotion.description,
  //       status: promotion.status,
  //       published: promotion.published,
  //     });
  //   }
  //   return items;
  // }

  // const totalItems = promotion.length;
  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  // const currentItems = promotion.slice(startIndex, endIndex);
  const currentItems = data?.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <HeaderPromotion
          title="Promotion"
          breadcrumbs={["Home", "Promotion"]}
        />
        <div className="mb-6 flex-1 max-w-xs">
          <select className="w-full appearance-none border border-gray-200 rounded-md px-3 py-2">
            <option value="">Select Filter</option>
            <option value="name">Name</option>
            <option value="variant">Variant</option>
          </select>
        </div>
        {isLoading && <LoadingSpinner color="#DB4444"/>}
        {error && <p className="text-red-500 text-center">An error has occured</p>}
        {data && data.length === 0 && !isLoading && <p className="text-center">No data available</p>}
        {data && data.length > 0 && !isLoading && (
          <TablePromotion promotions={currentItems} />
        )}
        <PaginationPromotion
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PromotionPage;
