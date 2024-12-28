import React, { useState, useRef } from 'react';
import TrashIcon from '../../assets/category/TrashIcon';
import PropTypes from 'prop-types';

const CategoryFormModal = ({ isOpen, onClose, mode = 'add', initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    icon: initialData?.icon || null,
  });
  const [errors, setErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (file) => {
    if (file) {
      const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg'];
      if (validTypes.includes(file.type)) {
        setUploadedFile({
          name: file.name,
          preview: URL.createObjectURL(file),
        });
        setErrors({ ...errors, icon: null });
      } else {
        setErrors({ ...errors, icon: 'Please upload SVG, PNG, or JPG file' });
      }
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFormData({ ...formData, icon: null });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-2xl w-full mx-4'>
        <h2 className='text-2xl font-semibold mb-8'>{mode === 'add' ? 'Add Category' : mode === 'edit' ? 'Edit Category' : 'View Category'}</h2>

        <form className='space-y-6'>
          {/* Category Name Field */}
          <div>
            <label className='block text-xl mb-2'>Category Name</label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-4 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
              placeholder='Enter Category Name'
              disabled={mode === 'view'}
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
          </div>

          {/* Category Icon Upload */}
          <div>
            <label className='block text-xl mb-2'>Category Icon</label>
            <div className={`relative ${!uploadedFile ? 'mb-4' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              {/* Upload Area */}
              <div
                onClick={handleClick}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                  ${isDragging ? 'border-red-500 bg-red-50' : 'border-red-200'}
                  ${errors.icon ? 'border-red-500' : ''}
                `}>
                <div className='flex flex-col items-center'>
                  <svg className='w-8 h-8 text-red-500 mb-2' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                  <div>
                    <span className='text-red-500'>Click to upload</span>
                    <span className='text-gray-700'> or drag and drop</span>
                  </div>
                  <div className='text-gray-900 font-medium mt-1'>SVG, PNG, JPG</div>
                  <div className='text-gray-500'>(max, 800x400px)</div>
                </div>
                <input ref={fileInputRef} type='file' className='hidden' onChange={handleFileInputChange} accept='.svg,.png,.jpg,.jpeg' disabled={mode === 'view'} />
              </div>

              {/* File Preview */}
              {uploadedFile && (
                <div className='mt-4 flex items-center justify-between p-3 border rounded-lg border-red-500'>
                  <div className='flex items-center'>
                    <div className='bg-red-50 p-2 rounded'>
                      <img src={uploadedFile.preview} alt='Preview' className='w-6 h-6 object-cover' />
                    </div>
                    <span className='ml-3 text-gray-700'>{uploadedFile.name}</span>
                  </div>
                  {mode !== 'view' && (
                    <button type='button' onClick={removeFile} className='text-red-500 hover:text-red-700'>
                      <TrashIcon className='w-5 h-5' />
                    </button>
                  )}
                </div>
              )}
            </div>
            {errors.icon && <p className='text-red-500 text-sm mt-1'>{errors.icon}</p>}
          </div>

          {/* Form Actions */}
          <div className='flex justify-end space-x-4 mt-8'>
            <button type='button' onClick={onClose} className='px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50'>
              Cancel
            </button>
            {mode !== 'view' && (
              <button type='submit' className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                {mode === 'edit' ? 'Save' : 'Add Category'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

CategoryFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit', 'view']),
  initialData: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
};

export default CategoryFormModal;
