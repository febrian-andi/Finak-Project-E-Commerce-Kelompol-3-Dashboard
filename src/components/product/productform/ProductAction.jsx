import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductActions = ({ onSubmit, mode = 'add' }) => {
  const navigate = useNavigate();

  const getButtonText = () => {
    switch (mode) {
      case 'edit':
        return 'Save';
      case 'detail':
        return 'Back';
      default:
        return 'Add Product';
    }
  };

  return (
    <div className='flex justify-end gap-4 mt-8'>
      {mode !== 'detail' && (
        <button type='button' onClick={() => navigate('/product')} className='px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50'>
          Cancel
        </button>
      )}
      <button type={mode === 'detail' ? 'button' : 'submit'} onClick={mode === 'detail' ? () => navigate('/product') : onSubmit} className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
        {getButtonText()}
      </button>
    </div>
  );
};

export default ProductActions;
