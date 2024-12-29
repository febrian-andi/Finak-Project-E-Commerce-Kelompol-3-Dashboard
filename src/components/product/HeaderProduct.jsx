import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderProduct = () => {
  const navigate = useNavigate();

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='text-2xl font-semibold mb-1'>Product</h1>
          <div className='flex items-center text-sm space-x-2'>
            <span className='text-red-500 cursor-pointer' onClick={() => navigate('/home')}>
              Home
            </span>
            <span className='text-red-500'>{'>'}</span>
            <span className='text-red-500'>Product</span>
          </div>
        </div>
        <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded' onClick={() => navigate('/product/add')}>
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default HeaderProduct;
