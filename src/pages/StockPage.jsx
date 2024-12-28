import React, { useState } from 'react';
import PaginationStock from '../components/stock/PaginationStock';
import TableStock from '../components/stock/TableStock';
import ControlsStock from '../components/stock/ControlsStock';
import HeaderStock from '../components/stock/HeaderStock';
import '../components/stock/stock.css';

const StockPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [stocks] = useState(generateSampleData());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');

  // Generate sample data
  function generateSampleData() {
    const items = [];
    const products = [
      { name: 'Laptop HP', variants: ['Hitam', 'Silver', 'Gold'] },
      { name: 'Laptop Lenovo', variants: ['Silver', 'Grey', 'Black'] },
      { name: 'Mouse Logitech', variants: ['Merah', 'Hitam', 'Putih'] },
      { name: 'Keyboard Razer', variants: ['Hijau', 'Hitam', 'RGB'] },
    ];

    for (let i = 1; i <= 27; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      items.push({
        id: i,
        name: product.name,
        variant: `Warna : ${product.variants[Math.floor(Math.random() * product.variants.length)]}`,
        quantity: Math.floor(Math.random() * 10) + 1,
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      });
    }
    return items;
  }

  // Filter logic with date
  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || stock.variant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || stock.date.toISOString().split('T')[0] === selectedDate;
    return matchesSearch && matchesDate;
  });

  const totalItems = filteredStocks.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = filteredStocks.slice(startIndex, endIndex);

  const handleAddStock = () => {
    console.log('Add New Stock button clicked!');
    // Tambahkan logika untuk menambahkan stok baru
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        {/* Header */}
        <HeaderStock title='Stock' breadcrumbs={['Home', 'Stock']} onAddStock={handleAddStock} />
        {/* Controls */}
        <ControlsStock showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} selectedDate={selectedDate} setSelectedDate={setSelectedDate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} totalItems={totalItems} />
        {/* Table */}
        <TableStock currentItems={currentItems} />
        {/* Pagination */}
        <PaginationStock startIndex={startIndex} endIndex={endIndex} totalItems={totalItems} rowsPerPage={rowsPerPage} currentPage={currentPage} totalPages={totalPages} setRowsPerPage={setRowsPerPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default StockPage;
