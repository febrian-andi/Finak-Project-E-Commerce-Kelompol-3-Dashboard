import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductHeader = ({ mode = 'add' }) => {
  const navigate = useNavigate();

  const getTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Edit Product';
      case 'detail':
        return 'Detail Product';
      default:
        return 'Add Product';
    }
  };

  return (
    <div className='mb-6'>
      <div className='flex items-center gap-2'>
        <button onClick={() => navigate(-1)} className='text-xl'>
          ←
        </button>
        <h1 className='text-xl font-semibold'>{getTitle()}</h1>
      </div>
      <div className='flex items-center text-sm mt-1'>
        <span className='text-red-500 cursor-pointer' onClick={() => navigate('/home')}>
          Home
        </span>
        <span className='text-red-500 mx-2'>{'>'}</span>
        <span className='text-red-500 cursor-pointer' onClick={() => navigate('/product')}>
          Product
        </span>
        <span className='text-red-500 mx-2'>{'>'}</span>
        <span className='text-red-500'>Add Product</span>
      </div>
    </div>
  );
};

export default ProductHeader;
