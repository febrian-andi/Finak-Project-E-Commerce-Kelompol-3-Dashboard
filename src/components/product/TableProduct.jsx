import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import filterIcon from '../../assets/product/filterIcon.svg';
import eyeIcon from '../../assets/product/eye.svg';
import pencilIcon from '../../assets/product/pencil.svg';
import trashIcon from '../../assets/product/trash.svg';

const TableProduct = ({ products, onTogglePublish }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  // Mapping header ke property name
  const headerMapping = {
    'Product Name': 'name',
    'SKU Product': 'sku',
    'Stock Product': 'stock',
    'Category': 'category',
    'Price': 'price',
    'Published': 'published',
  };

  // Handler untuk toggle publish/unpublish
  const handleToggle = (productId, currentStatus) => {
    onTogglePublish(productId, !currentStatus);
  };

  // Handler untuk sorting
  const handleSort = (header) => {
    const key = headerMapping[header];
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  // Function untuk melakukan sorting data
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Khusus untuk harga, hapus simbol $ dan convert ke number
    if (sortConfig.key === 'price') {
      aValue = parseFloat(aValue.replace('$', ''));
      bValue = parseFloat(bValue.replace('$', ''));
    }

    // Khusus untuk stock, pastikan dibandingkan sebagai number
    if (sortConfig.key === 'stock') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    // Untuk string, ubah ke lowercase untuk sorting yang tidak case-sensitive
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    // Bandingkan nilai
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const headers = ['Product Name', 'SKU Product', 'Stock Product', 'Category', 'Price', 'Published', 'Action'];

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-50'>
            {headers.map((header) => (
              <th key={header} className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center gap-1' onClick={() => header !== 'Action' && handleSort(header)}>
                  <span className={header !== 'Action' ? 'cursor-pointer' : ''}>{header}</span>
                  {header !== 'Action' && (
                    <img
                      src={filterIcon}
                      alt='filter'
                      className={`inline-block ml-1 cursor-pointer transition-transform duration-200 ${sortConfig.key === headerMapping[header] && sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} className='border-b border-gray-100'>
              <td className='px-6 py-4 whitespace-nowrap'>{product.name}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{product.sku}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{product.stock}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{product.category}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{product.price}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' checked={product.published} onChange={() => handleToggle(product.id, product.published)} />
                  <div
                    className={`w-12 h-6 rounded-full p-1 peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      product.published ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                  />
                </label>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex gap-2'>
                  <Link to={`/product/detail/${product.id}`} className='hover:bg-gray-100 p-2 rounded-md' title='View Detail'>
                    <img src={eyeIcon} alt='view' className='w-5 h-5' />
                  </Link>
                  <Link to={`/product/edit/${product.id}`} className='hover:bg-gray-100 p-2 rounded-md' title='Edit Product'>
                    <img src={pencilIcon} alt='edit' className='w-5 h-5' />
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure want to delete this product?')) {
                        // Handle delete
                        console.log('Delete product:', product.id);
                      }
                    }}
                    className='hover:bg-gray-100 p-2 rounded-md'
                    title='Delete Product'>
                    <img src={trashIcon} alt='delete' className='w-5 h-5' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
