import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import filterIcon from '../../assets/product/filterIcon.svg';
import eyeIcon from '../../assets/product/eye.svg';
import pencilIcon from '../../assets/product/pencil.svg';
import trashIcon from '../../assets/product/trash.svg';
import AlertDialog from '../sweetalert/AlertDialog';
import SuccessAlert from '../sweetalert/SuccessAlert';
import PropTypes from 'prop-types';

const TableProduct = ({ products = [], onTogglePublish, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const headerMapping = {
    'Product Name': 'name',
    'SKU Product': 'sku',
    'Stock Product': 'stock',
    'Category': 'category',
    'Price': 'price',
    'Published': 'published',
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

    if (sortConfig.key === 'price') {
      aValue = parseFloat(aValue.replace('$', ''));
      bValue = parseFloat(bValue.replace('$', ''));
    }

    if (sortConfig.key === 'stock') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Handler untuk publish/unpublish
  const handlePublishConfirm = () => {
    if (selectedProduct) {
      onTogglePublish(selectedProduct.id, !selectedProduct.published);
      setShowPublishConfirm(false);
      setSuccessMessage(`This product was successfully ${selectedProduct.published ? 'unpublished' : 'published'}`);
      setShowSuccess(true);
    }
  };

  // Handler untuk click toggle
  const handleToggleClick = (product) => {
    setSelectedProduct(product);
    setShowPublishConfirm(true);
  };

  // Handler untuk click delete
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      const success = await onDelete(selectedProduct.id);
      if (success) {
        setShowDeleteConfirm(false);
        setSuccessMessage('This product was successfully deleted');
        setShowSuccess(true);
      }
    }
  };

  const headers = ['Product Name', 'SKU Product', 'Stock Product', 'Category', 'Price', 'Published', 'Action'];

  return (
    <>
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
                    <input type='checkbox' className='sr-only peer' checked={product.published} onChange={() => handleToggleClick(product)} />
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
                    <button onClick={() => handleDeleteClick(product)} className='hover:bg-gray-100 p-2 rounded-md' title='Delete Product'>
                      <img src={trashIcon} alt='delete' className='w-5 h-5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog
        isOpen={showPublishConfirm}
        onClose={() => setShowPublishConfirm(false)}
        onConfirm={handlePublishConfirm}
        title='Confirmation'
        message={`Are you sure want to ${selectedProduct?.published ? 'unpublish' : 'publish'} this product?`}
        icon='confirm'
        confirmLabel='Yes'
        cancelLabel='No'
      />

      <AlertDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title='Delete Product'
        message='Are you sure want to delete this product?'
        icon='trash'
        confirmLabel='Yes'
        cancelLabel='No'
      />

      <SuccessAlert isOpen={showSuccess} onClose={() => setShowSuccess(false)} message={successMessage} duration={1000} />
    </>
  );
};


TableProduct.propTypes = {
  products: PropTypes.array,
  onTogglePublish: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TableProduct;
