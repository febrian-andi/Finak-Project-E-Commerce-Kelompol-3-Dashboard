// # 1. File: components/category/CategoryFormModal.jsx

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrashIconCategoryForm from '../../assets/category/TrashIconCategoryForm';
import PhotoPreview from '../../assets/category/PhotoPreview';
import DOMPurify from 'dompurify';

const CategoryFormModal = ({ isOpen, onClose, mode = 'add', initialData = null, onSubmit }) => {
  // Set formData berdasarkan mode
  const [formData, setFormData] = useState({
    name: mode === 'edit' ? initialData?.name : '',
    icon: mode === 'edit' ? initialData?.icon : null,
  });

  // Set uploadedFile berdasarkan mode
  const [uploadedFile, setUploadedFile] = useState(
    mode === 'edit' && initialData?.icon
      ? {
          name: 'Current Icon',
          preview: initialData.icon,
        }
      : null
  );

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Reset state ketika modal ditutup
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        icon: null,
      });
      setUploadedFile(null);
      setErrors({});
    }
  }, [isOpen]);

  // Update form data ketika mode atau initialData berubah
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        name: initialData.name || '',
        icon: initialData.icon || null,
      });

      if (initialData.icon) {
        setUploadedFile({
          name: 'Current Icon',
          preview: initialData.icon,
        });
      }
    }
  }, [mode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    if (!uploadedFile && mode === 'add') {
      newErrors.icon = 'Category icon is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit data
    const submitData = {
      ...formData,
      icon: uploadedFile?.preview || null,
    };

    onSubmit(submitData);
    onClose();
  };

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
        setFormData((prev) => ({ ...prev, icon: file }));
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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' aria-modal='true' role='dialog'>
      <div className='bg-white rounded-lg p-6 max-w-2xl w-full mx-4'>
        <h2 className='text-2xl font-semibold mb-8' role='heading' aria-level='1'>
          {mode === 'add' ? 'Add Category' : mode === 'edit' ? 'Edit Category' : 'View Category'}
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6' role='form'>
          {/* Category Name Field */}
          <div>
            <label htmlFor='category-name' className='block text-xl mb-2'>
              Category Name
            </label>
            <input
              id='category-name'
              type='text'
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: DOMPurify.sanitize(e.target.value) });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              className={`w-full p-4 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
              placeholder='Enter Category Name'
              disabled={mode === 'view'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id='name-error' className='text-red-500 text-sm mt-1'>{errors.name}</p>}
          </div>

          {/* Category Icon Upload */}
          <div>
            <label htmlFor='category-icon' className='block text-xl mb-2'>Category Icon</label>
            <div
              id='category-icon'
              className={`relative ${!uploadedFile ? 'mb-4' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role='button'
              tabIndex={0}
              onClick={handleClick}
              aria-describedby={errors.icon ? 'icon-error' : undefined}
            >
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                  ${isDragging ? 'border-red-500 bg-red-50' : 'border-red-200'}
                  ${errors.icon ? 'border-red-500' : ''}
                `}
              >
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
                <input
                  ref={fileInputRef}
                  type='file'
                  className='hidden'
                  onChange={handleFileInputChange}
                  accept='.svg,.png,.jpg,.jpeg'
                  disabled={mode === 'view'}
                  aria-label='Upload Category Icon'
                />
              </div>

              {/* File Preview */}
              {uploadedFile && (
                <div className='mt-4 flex items-center justify-between p-3 border rounded-lg border-red-500'>
                  <div className='flex items-center'>
                    <PhotoPreview />
                    <span className='ml-3 text-gray-700'>{uploadedFile.name}</span>
                  </div>
                  {mode !== 'view' && (
                    <button type='button'  aria-label="Remove file" onClick={removeFile} className='text-red-500 hover:text-red-700'>
                      <TrashIconCategoryForm />
                    </button>
                  )}
                </div>
              )}
            </div>
            {errors.icon && <p id='icon-error' className='text-red-500 text-sm mt-1'>{errors.icon}</p>}
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
  onSubmit: PropTypes.func.isRequired,
};

export default CategoryFormModal;