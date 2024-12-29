import React from 'react';
import PropTypes from 'prop-types';

const ProductPhotoUploader = ({ photoPreviews, handlePhotoChange, handlePhotoDrop, handlePhotoDelete, handleSetDefaultPhoto }) => (
  <div className='rounded-lg'>
    <div className='bg-gray-50 w-1/2 p-4 rounded-lg'>
      <label className='block mb-2'>Product Photo</label>
      <div 
        className='border-2 border-dashed border-red-300 rounded-lg p-8 text-center cursor-pointer' 
        onClick={() => document.getElementById('photoInput').click()} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={handlePhotoDrop}
      >
        <input 
          id='photoInput' 
          type='file' 
          onChange={handlePhotoChange} 
          accept='image/svg+xml,image/png,image/jpeg' 
          className='hidden' 
        />
        <div className='flex flex-col items-center'>
          <svg className='w-6 h-6 text-red-500 mb-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
          </svg>
          <div>
            <span className='text-red-500'>Click to upload</span>
            <span className='text-gray-500'> or drag and drop</span>
          </div>
          <div className='text-gray-500 text-sm'>SVG, PNG, JPG</div>
          <div className='text-gray-400 text-xs mt-1'>(max, 800x400px)</div>
        </div>
      </div>
    </div>

    {photoPreviews.length > 0 && (
      <div className='grid grid-cols-5 gap-4 mt-4'>
        {photoPreviews.map((preview, index) => (
          <div key={index} className='relative aspect-square bg-gray-50 rounded-lg overflow-hidden'>
            <img 
              src={preview} 
              alt={`Preview ${index + 1}`} 
              className='w-full h-full object-cover' 
            />
            
            {/* Delete Button */}
            <button 
              type='button' 
              onClick={() => handlePhotoDelete(index)} 
              className='absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100'
            >
              <svg 
                className='w-4 h-4 text-gray-600'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            {/* Default Badge */}
            {index === 0 && (
              <div className='absolute top-2 left-2 px-2 py-1 text-xs bg-purple-500 text-white rounded'>
                Default
              </div>
            )}

            {/* Set as Default Button */}
            {index !== 0 && (
              <button
                type='button'
                onClick={() => handleSetDefaultPhoto(index)}
                className='absolute left-0 right-0 bottom-0 py-2 bg-black bg-opacity-75 text-white text-sm'
              >
                Set as default image
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

ProductPhotoUploader.propTypes = {
  photoPreviews: PropTypes.array.isRequired,
  handlePhotoChange: PropTypes.func.isRequired,
  handlePhotoDrop: PropTypes.func.isRequired,
  handlePhotoDelete: PropTypes.func.isRequired,
  handleSetDefaultPhoto: PropTypes.func.isRequired,
};


export default ProductPhotoUploader;