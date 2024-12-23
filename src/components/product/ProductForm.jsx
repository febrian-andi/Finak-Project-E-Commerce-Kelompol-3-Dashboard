// components/product/productform/ProductForm.jsx
import React, { useState } from 'react';
import ProductHeader from './productform/ProductHeader';
import ProductDetailsForm from './productform/ProductDetailsForm';
import ProductPhotoUploader from './productform/ProductPhotoUploader';
import ProductActions from '../product/productform/ProductAction';
import VariantModal from '../product/VariantProduct';

const ProductForm = ({ mode = 'add' }) => {
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variants, setVariants] = useState([]);

  const isReadOnly = mode === 'detail';
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    initialStock: '',
    price: '',
    description: '',
    photo: null,
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle photo changes
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
        }));
        setPhotoPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
        }));
        setPhotoPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = (index) => {
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
    if (photoPreviews.length <= 1) {
      setFormData((prev) => ({
        ...prev,
        photo: null,
      }));
    }
  };

  const handleSetDefaultPhoto = (index) => {
    const defaultPhoto = photoPreviews[index];
    const updatedPreviews = photoPreviews.filter((_, i) => i !== index);
    setPhotoPreviews([defaultPhoto, ...updatedPreviews]);
  };

  // Handle variants
  const handleVariantUpdate = (updatedVariants) => {
    setVariants(updatedVariants);
    setShowVariantModal(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, variants });
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        {/* Header */}
        <ProductHeader mode={mode} />

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Product Details */}
          <ProductDetailsForm formData={formData} handleInputChange={handleInputChange} variants={variants} setShowVariantModal={setShowVariantModal} isReadOnly={isReadOnly} />

          {/* Photo Upload - hanya tampil jika bukan mode detail */}
          {!isReadOnly && <ProductPhotoUploader photoPreviews={photoPreviews} handlePhotoChange={handlePhotoChange} handlePhotoDrop={handlePhotoDrop} handlePhotoDelete={handlePhotoDelete} handleSetDefaultPhoto={handleSetDefaultPhoto} />}

          {/* Preview foto untuk mode detail */}
          {isReadOnly && photoPreviews.length > 0 && (
            <div className='grid grid-cols-5 gap-4 mt-4'>
              {photoPreviews.map((preview, index) => (
                <div key={index} className='relative aspect-square bg-gray-50 rounded-lg overflow-hidden'>
                  <img src={preview} alt={`Preview ${index + 1}`} className='w-full h-full object-cover' />
                  {index === 0 && <div className='absolute top-2 left-2 px-2 py-1 text-xs bg-purple-500 text-white rounded'>Default</div>}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <ProductActions onSubmit={handleSubmit} mode={mode} />
        </form>
      </div>

      {/* Variant Modal */}
      {showVariantModal && <VariantModal variants={variants} onClose={() => setShowVariantModal(false)} onAdd={handleVariantUpdate} />}
    </div>
  );
};

export default ProductForm;
