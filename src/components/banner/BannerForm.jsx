import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TrashIconBannerForm from '../../assets/banner/TrashIconBannerForm';
import PhotoPreview from '../../assets/banner/PhotoPreview';
import UploadBannerIcon from '../../assets/banner/UploadBannerIcon';
import SuccessAlert from '../sweetalert/SuccessAlert';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const BannerForm = ({ banners = [], selectedBanner, onAdd, onUpdate }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const mode = location.pathname.includes('/add') ? 'add' : location.pathname.includes('/edit') ? 'edit' : 'detail';

  // console.log(banners);

  const [formData, setFormData] = useState({
    name: '',
    releaseDate: '',
    endDate: '',
    targetUrl: '',
    bannerType: '',
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const isReadOnly = mode === 'detail';

  // Fetch data if in edit or detail mode
  useEffect(() => {
    if (id && (mode === 'edit' || mode === 'detail')) {
      // Fetch banner data using the id
      // For now using mock data
      setFormData({
        name: 'Sample Banner',
        releaseDate: '2024-02-11',
        endDate: '2024-03-11',
        targetUrl: 'www.example.com',
        bannerType: 'main',
        photo: null,
      });
    }
  }, [id, mode]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: DOMPurify.sanitize(value),
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
        }));
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo delete
  const handlePhotoDelete = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
    setPhotoPreview(null);
  };

  // Handle cancel/close
  const handleCancel = () => {
    navigate('/banner');
  };

  // Fungsi untuk mendapatkan konfigurasi form berdasarkan mode
  const getFormConfig = () => {
    switch (mode) {
      case 'edit':
        return {
          successMessage: 'This banner was successfully updated',
        };
      case 'add':
        return {
          successMessage: 'This banner was successfully added',
        };
      default:
        return {
          successMessage: '',
        };
    }
  };

  const { successMessage } = getFormConfig();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        // Handle add banner
        onAdd && onAdd(formData);
      } else if (mode === 'edit') {
        // Handle edit banner
        onUpdate && onUpdate({ ...formData, id: parseInt(id) });
      }

      // Tampilkan alert sukses
      setShowSuccessAlert(true);

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate('/banner');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        {/* Header */}
        <div className='flex items-center mb-6'>
          <button onClick={handleCancel} className='mr-2'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M19 12H5M12 19l-7-7 7-7' />
            </svg>
          </button>
          <div>
            <h1 className='text-2xl font-semibold'>{mode === 'add' ? 'Add Banner' : mode === 'edit' ? 'Edit Banner' : 'Detail Banner'}</h1>
            <div className='text-sm text-gray-500'>
              <span className='text-red-500'>Home</span> / Banner Management / {mode === 'add' ? 'Add Banner' : mode === 'edit' ? 'Edit Banner' : 'Detail Banner'}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Banner Name */}
              <div>
                <label className='block mb-2 font-medium'>Banner Name</label>
                <input type='text' name='name' value={formData.name} onChange={handleInputChange} className='w-full p-3 rounded-lg bg-gray-50' placeholder='Enter Banner Name' readOnly={isReadOnly} required />
              </div>

              {/* End Date */}
              <div>
                <label className='block mb-2 font-medium'>End Date</label>
                <input type='date' placeholder name='endDate' value={formData.endDate} onChange={handleInputChange} className='w-full p-3 rounded-lg bg-gray-50' readOnly={isReadOnly} required />
              </div>

              {/* Banner Type */}
              <div>
                <label className='block mb-2 font-medium'>Banner Type</label>
                <select name='bannerType' value={formData.bannerType} onChange={handleInputChange} className='w-full p-3 rounded-lg bg-gray-50' disabled={isReadOnly} required>
                  <option value=''>Select Banner Type</option>
                  <option value='main'>Main Banner</option>
                  <option value='side'>Side Banner</option>
                  <option value='popup'>Pop-up Banner</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              {/* Release Date */}
              <div>
                <label className='block mb-2 font-medium'>Release Date</label>
                <input type='date' name='releaseDate' value={formData.releaseDate} onChange={handleInputChange} className='w-full p-3 rounded-lg bg-gray-50' readOnly={isReadOnly} required />
              </div>

              {/* Target URL */}
              <div>
                <label className='block mb-2 font-medium'>Target URL</label>
                <input type='text' name='targetUrl' value={formData.targetUrl} onChange={handleInputChange} className='w-full p-3 rounded-lg bg-gray-50' placeholder='Enter Target URL' readOnly={isReadOnly} required />
              </div>

              {/* Banner Photo */}
              <div className='space-y-2'>
                <label className='block mb-2 font-medium'>Banner Photo</label>

                {!isReadOnly ? (
                  // Form upload untuk mode add/edit
                  <div className='bg-gray-50 rounded-lg'>
                    {/* Upload Area */}
                    <div className='border-2 border-dashed border-red-300 rounded-lg p-8 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <UploadBannerIcon />
                        <div>
                          <span className='text-red-500 cursor-pointer' onClick={() => document.getElementById('photo-upload').click()}>
                            Click to upload
                          </span>
                          <span className='text-gray-600'> or drag and drop</span>
                        </div>
                        <div className='text-sm text-gray-500'>SVG, PNG, JPG</div>
                        <div className='text-sm text-gray-500'>(max. 800x400px)</div>
                        <input type='file' id='photo-upload' className='hidden' accept='image/svg+xml,image/png,image/jpeg' onChange={handlePhotoChange} required />
                      </div>
                    </div>

                    {/* File Preview untuk mode add/edit */}
                    {formData.photo && (
                      <div className='mt-2 border border-red-400 rounded-lg p-3 flex items-center justify-between bg-white'>
                        <div className='flex items-center'>
                          <PhotoPreview />

                          <span className='text-red-500 ml-1'>{formData.photo.name}</span>
                        </div>
                        <button type='button' onClick={handlePhotoDelete} className='text-gray-500 hover:text-gray-700'>
                          <TrashIconBannerForm />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Tampilan untuk mode detail
                  <div className='border border-red-400 rounded-lg p-3 flex items-center bg-white'>
                    <div className='flex items-center'>
                      <PhotoPreview />
                      <span className='text-red-500 ml-1'>{formData.photo ? formData.photo.name : 'Banner-Promo.jpg'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {!isReadOnly && (
            <div className='flex justify-end space-x-4 mt-8'>
              <button type='button' onClick={handleCancel} className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'>
                Cancel
              </button>
              <button type='submit' className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                {mode === 'add' ? 'Add Banner' : 'Save'}
              </button>
            </div>
          )}

          {isReadOnly && (
            <div className='flex justify-end mt-8'>
              <button type='button' onClick={handleCancel} className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>
                Close
              </button>
            </div>
          )}
        </form>
      </div>
      <SuccessAlert isOpen={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} message={successMessage} duration={2000} />
    </div>
  );
};

BannerForm.propTypes = {
  mode: PropTypes.string,
  id: PropTypes.string,
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default BannerForm;
