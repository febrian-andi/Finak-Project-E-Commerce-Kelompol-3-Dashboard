import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductActions = ({ onSave, mode = 'add' }) => { // Tambah prop onSave
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

  const handleClick = () => {
    if (mode === 'detail') {
      navigate('/product');
    } else {
      onSave(); // Panggil fungsi onSave untuk submit
    }
  };

  return (
    <div className='flex justify-end gap-4 mt-8'>
      {mode !== 'detail' && (
        <button 
          type='button' 
          onClick={() => navigate('/product')} 
          className='px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50'
        >
          Cancel
        </button>
      )}
      <button 
        type='button'  // Ubah jadi type button
        onClick={handleClick}
        className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600'
      >
        {getButtonText()}
      </button>
    </div>
  );
};

ProductActions.propTypes = {
  onSave: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit', 'detail']),
};

export default ProductActions;