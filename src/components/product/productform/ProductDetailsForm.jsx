import React from 'react';
import PropTypes from 'prop-types';

const ProductDetailsForm = ({ formData, handleInputChange, variants, setShowVariantModal, isReadOnly, mode }) => {
  const displayData = mode === 'add' ? {
    name: '',
    category: '',
    sku: '',
    initialStock: '',
    price: '',
    description: '',
  } : {
    name: 'Laptop Pavilion',
    category: 'electronic',
    sku: 'HP-LPTP-ZB14-i5-256GB',
    initialStock: '10',
    price: '250',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 gap-8'>
        <div>
          <div className='mb-6'>
            <label className='block mb-2'>Product Name</label>
            <input 
              type='text' 
              name='name' 
              value={mode === 'add' ? formData.name : displayData.name} 
              onChange={handleInputChange} 
              readOnly={isReadOnly} 
              placeholder='Enter Product Name' 
              className='w-full p-3 border rounded-lg bg-gray-50' 
            />
          </div>
          <div className='mb-6'>
            <label className='block mb-2'>SKU Product</label>
            <input 
              type='text' 
              name='sku' 
              value={mode === 'add' ? formData.sku : displayData.sku} 
              readOnly={isReadOnly} 
              onChange={handleInputChange} 
              placeholder='Enter SKU Product' 
              className='w-full p-3 border rounded-lg bg-gray-50' 
            />
          </div>
          <div className='mb-6'>
            <label className='block mb-2'>Initial Product Stock</label>
            <input 
              type='number' 
              name='initialStock' 
              readOnly={isReadOnly} 
              value={mode === 'add' ? formData.initialStock : displayData.initialStock} 
              onChange={handleInputChange} 
              placeholder='Enter Initial Product Stock' 
              className='w-full p-3 border rounded-lg bg-gray-50' 
            />
          </div>
        </div>
        <div>
          <div className='mb-6'>
            <label className='block mb-2'>Product Category</label>
            <select 
              name='category' 
              value={mode === 'add' ? formData.category : displayData.category} 
              readOnly={isReadOnly} 
              onChange={handleInputChange} 
              className='w-full px-4 py-3 bg-gray-50 rounded-xl appearance-none focus:outline-none'
            >
              <option value=''>Select Product Category</option>
              <option value='electronic'>Electronic</option>
              <option value='accessories'>Accessories</option>
            </select>
          </div>
          <div className='mb-6'>
            <label className='block mb-2'>Product Variant</label>
            <div className='flex items-center gap-2'>
              {variants.length === 0 ? (
                <button 
                  type='button' 
                  onClick={() => setShowVariantModal(true)} 
                  className='flex items-center gap-2 px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 w-full'
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.75 0.375C1.2332 0.375 0 1.6082 0 3.125V16.875C0 18.3918 1.2332 19.625 2.75 19.625H16.5C18.0168 19.625 19.25 18.3918 19.25 16.875V3.125C19.25 1.6082 18.0168 0.375 16.5 0.375H2.75ZM8.59375 13.7812V11.0312H5.84375C5.27227 11.0312 4.8125 10.5715 4.8125 10C4.8125 9.42852 5.27227 8.96875 5.84375 8.96875H8.59375V6.21875C8.59375 5.64727 9.05352 5.1875 9.625 5.1875C10.1965 5.1875 10.6562 5.64727 10.6562 6.21875V8.96875H13.4062C13.9777 8.96875 14.4375 9.42852 14.4375 10C14.4375 10.5715 13.9777 11.0312 13.4062 11.0312H10.6562V13.7812C10.6562 14.3527 10.1965 14.8125 9.625 14.8125C9.05352 14.8125 8.59375 14.3527 8.59375 13.7812Z" fill="#DB4444"/>
                  </svg>
                  Add New Product Variant
                </button>
              ) : (
                <>
                  {variants.map((variant, index) => (
                    <div key={index} className='px-4 py-3 bg-gray-50 rounded-xl flex-grow text-gray-700'>
                      {variant.name}
                    </div>
                  ))}
                  {!isReadOnly && (
                    <button 
                      type='button' 
                      onClick={() => setShowVariantModal(true)} 
                      className='flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-500 hover:bg-red-200 flex-shrink-0'
                    >
                      +
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className='mb-6'>
            <label className='block mb-2'>Price</label>
            <input 
              type='number' 
              name='price' 
              value={mode === 'add' ? formData.price : displayData.price} 
              readOnly={isReadOnly} 
              onChange={handleInputChange} 
              placeholder='Enter Price' 
              className='w-full p-3 border rounded-lg bg-gray-50' 
            />
          </div>
        </div>
      </div>

      <div>
        <label className='block mb-2'>Description</label>
        <div className={`bg-gray-50 rounded-lg ${!isReadOnly ? 'p-2' : ''}`}>
          <textarea 
            name='description' 
            value={mode === 'add' ? formData.description : displayData.description} 
            onChange={handleInputChange} 
            readOnly={isReadOnly} 
            placeholder='Enter Description' 
            className='w-full p-3 bg-transparent min-h-[200px] focus:outline-none' 
          />
        </div>
      </div>
    </div>
  );
};

ProductDetailsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
  setShowVariantModal: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
  mode: PropTypes.string,
};

export default ProductDetailsForm;