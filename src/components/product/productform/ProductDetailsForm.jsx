import React from 'react';

const ProductDetailsForm = ({ formData, handleInputChange, variants, setShowVariantModal, isReadOnly }) => (
  <div className='space-y-6'>
    <div className='grid grid-cols-2 gap-8'>
      <div>
        <div className='mb-6'>
          <label className='block mb-2'>Product Name</label>
          <input type='text' name='name' value={formData.name} onChange={handleInputChange} readOnly={isReadOnly} placeholder='Enter Product Name' className='w-full p-3 border rounded-lg bg-gray-50' />
        </div>
        <div className='mb-6'>
          <label className='block mb-2'>SKU Product</label>
          <input type='text' name='sku' value={formData.sku} readOnly={isReadOnly} onChange={handleInputChange} placeholder='Enter SKU Product' className='w-full p-3 border rounded-lg bg-gray-50' />
        </div>
        <div className='mb-6'>
          <label className='block mb-2'>Initial Product Stock</label>
          <input type='number' name='initialStock' readOnly={isReadOnly} value={formData.initialStock} onChange={handleInputChange} placeholder='Enter Initial Product Stock' className='w-full p-3 border rounded-lg bg-gray-50' />
        </div>
      </div>
      <div>
        <div className='mb-6'>
          <label className='block mb-2'>Product Category</label>
          <select name='category' value={formData.category} readOnly={isReadOnly} onChange={handleInputChange} className='w-full px-4 py-3 bg-gray-50 rounded-xl appearance-none focus:outline-none'>
            <option value=''>Select Product Category</option>
            <option value='electronic'>Electronic</option>
            <option value='accessories'>Accessories</option>
          </select>
        </div>
        <div className='mb-6'>
          <label className='block mb-2'>Product Variant</label>
          <div className='flex items-center gap-2'>
            {variants.map((variant, index) => (
              <div key={index} className='px-4 py-3 bg-gray-50 rounded-xl flex-grow text-gray-700'>
                {variant.name}
              </div>
            ))}
            {!isReadOnly && (
              <button type='button' onClick={() => setShowVariantModal(true)} className='flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-500 hover:bg-red-200 flex-shrink-0'>
                +
              </button>
            )}
          </div>
        </div>
        <div className='mb-6'>
          <label className='block mb-2'>Price</label>
          <input type='number' name='price' value={formData.price} readOnly={isReadOnly} onChange={handleInputChange} placeholder='Enter Price' className='w-full p-3 border rounded-lg bg-gray-50' />
        </div>
      </div>
    </div>

    {/* Description Section */}
    <div>
      <label className='block mb-2'>Description</label>
      <div className={`bg-gray-50 rounded-lg ${!isReadOnly ? 'p-2' : ''}`}>
        {/* Text Area */}
        <textarea name='description' value={formData.description} onChange={handleInputChange} readOnly={isReadOnly} placeholder='Enter Description' className='w-full p-3 bg-transparent min-h-[200px] focus:outline-none' />
      </div>
    </div>
  </div>
);

export default ProductDetailsForm;
