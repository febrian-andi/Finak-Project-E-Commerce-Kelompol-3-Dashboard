import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductHeader from './productform/ProductHeader';
import ProductDetailsForm from './productform/ProductDetailsForm';
import ProductPhotoUploader from './productform/ProductPhotoUploader';
import ProductActions from '../product/productform/ProductAction';
import VariantModal from '../product/VariantProduct';
import SuccessAlert from '../sweetalert/SuccessAlert';

const ProductForm = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variants, setVariants] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Load dummy data untuk mode edit dan detail
  useEffect(() => {
    if (mode === 'edit' || mode === 'detail') {
      // Dummy data untuk gambar
      const dummyImages = [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=320&fit=crop',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=320&fit=crop',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=320&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=320&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=320&fit=crop',
      ];

      setFormData({
        name: 'Laptop Pavilion',
        category: 'electronic',
        sku: 'HP-LPTP-ZB14-i5-256GB',
        initialStock: '10',
        price: '250',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photo: dummyImages[1],
      });

      setVariants([
        { name: 'Warna', options: ['Hitam', 'Silver'] },
        { name: 'Size', options: ['13 inch', '14 inch'] },
      ]);

      setPhotoPreviews(dummyImages);
    }
  }, [mode]);

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

  const handleSave = async () => {
    try {
      console.log({ ...formData, variants });
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/product');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <ProductHeader mode={mode} />

        <div className='space-y-6'>
          <ProductDetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            variants={variants}
            setShowVariantModal={setShowVariantModal}
            isReadOnly={isReadOnly}
            mode={mode} // Tambahin ini
          />

          {!isReadOnly && <ProductPhotoUploader photoPreviews={photoPreviews} handlePhotoChange={handlePhotoChange} handlePhotoDrop={handlePhotoDrop} handlePhotoDelete={handlePhotoDelete} handleSetDefaultPhoto={handleSetDefaultPhoto} />}

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

          <ProductActions mode={mode} onSave={handleSave} />
        </div>
      </div>

      {showVariantModal && <VariantModal variants={variants} onClose={() => setShowVariantModal(false)} onAdd={handleVariantUpdate} />}

      <SuccessAlert isOpen={showSuccess} onClose={() => setShowSuccess(false)} message={`This product was successfully ${mode === 'edit' ? 'updated' : 'added'}`} duration={2000} />
    </div>
  );
};

ProductForm.propTypes = {
  mode: PropTypes.oneOf(['add', 'edit', 'detail']),
};

export default ProductForm;
