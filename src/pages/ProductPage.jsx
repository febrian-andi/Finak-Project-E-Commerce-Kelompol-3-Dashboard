import React, { useState } from 'react';
import HeaderProduct from '../components/product/HeaderProduct';
import TableProduct from '../components/product/TableProduct';
import PaginationProduct from '../components/product/PaginationProduct';

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Move products to state so we can update them
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'HP Pavilion 14-DV0514TX',
      sku: 'HP-LPTP-ZB14-i5-256GB',
      stock: 12,
      category: 'Electronic',
      price: '$960',
      published: false,
    },
    {
      id: 2,
      name: 'Lenovo ThinkPad X1 Carbon',
      sku: 'LNV-LPTP-X1-i7-512GB',
      stock: 8,
      category: 'Electronic',
      price: '$1299',
      published: true,
    },
    {
      id: 3,
      name: 'Dell XPS 13',
      sku: 'DLL-LPTP-XPS13-i7-1TB',
      stock: 15,
      category: 'Electronic',
      price: '$1499',
      published: true,
    },
    {
      id: 4,
      name: 'Logitech MX Master 3',
      sku: 'LOG-MS-MX3-BLK',
      stock: 25,
      category: 'Accessories',
      price: '$99',
      published: true,
    },
    {
      id: 5,
      name: 'Razer BlackWidow V3',
      sku: 'RZR-KB-BW3-RGB',
      stock: 20,
      category: 'Accessories',
      price: '$139',
      published: true,
    },
    {
      id: 6,
      name: 'MacBook Pro M1',
      sku: 'APL-LPTP-M1-512GB',
      stock: 10,
      category: 'Electronic',
      price: '$1299',
      published: false,
    },
  ]);

  // Handler for toggling publish status
  const handleTogglePublish = (productId, newStatus) => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, published: newStatus } : product)));
  };

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const currentItems = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-sm'>
        <HeaderProduct />
        <TableProduct products={currentItems} onTogglePublish={handleTogglePublish} />
        <PaginationProduct currentPage={currentPage} totalPages={totalPages} rowsPerPage={rowsPerPage} totalItems={totalItems} setRowsPerPage={setRowsPerPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProductPage;
