import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const BannerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const mode = location.pathname.includes('/add') 
    ? 'add' 
    : location.pathname.includes('/edit') 
    ? 'edit' 
    : 'detail';

  const [formData, setFormData] = useState({
    name: '',
    releaseDate: '',
    endDate: '',
    targetUrl: '',
    bannerType: '',
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
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
        photo: null
      });
    }
  }, [id, mode]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
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
          photo: file
        }));
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo drop
  const handlePhotoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file
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
      photo: null
    }));
    setPhotoPreview(null);
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        // Handle add banner
        console.log('Adding banner:', formData);
      } else if (mode === 'edit') {
        // Handle edit banner
        console.log('Editing banner:', formData);
      }
      // Navigate back to banner list
      navigate('/banner');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle cancel/close
  const handleCancel = () => {
    navigate('/banner');
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        {/* Header */}
        <div className='flex items-center mb-6'>
          <button onClick={handleCancel} className='mr-2'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h1 className='text-2xl font-semibold'>
              {mode === 'add' ? 'Add Banner' : mode === 'edit' ? 'Edit Banner' : 'Detail Banner'}
            </h1>
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
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full p-3 rounded-lg bg-gray-50'
                  placeholder='Enter Banner Name'
                  readOnly={isReadOnly}
                />
              </div>

              {/* End Date */}
              <div>
                <label className='block mb-2 font-medium'>End Date</label>
                <input
                  type='date'
                  name='endDate'
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className='w-full p-3 rounded-lg bg-gray-50'
                  readOnly={isReadOnly}
                />
              </div>

              {/* Banner Type */}
              <div>
                <label className='block mb-2 font-medium'>Banner Type</label>
                <select
                  name='bannerType'
                  value={formData.bannerType}
                  onChange={handleInputChange}
                  className='w-full p-3 rounded-lg bg-gray-50'
                  disabled={isReadOnly}
                >
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
                <input
                  type='date'
                  name='releaseDate'
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className='w-full p-3 rounded-lg bg-gray-50'
                  readOnly={isReadOnly}
                />
              </div>

              {/* Target URL */}
              <div>
                <label className='block mb-2 font-medium'>Target URL</label>
                <input
                  type='text'
                  name='targetUrl'
                  value={formData.targetUrl}
                  onChange={handleInputChange}
                  className='w-full p-3 rounded-lg bg-gray-50'
                  placeholder='Enter Target URL'
                  readOnly={isReadOnly}
                />
              </div>

              {/* Banner Photo */}
              {!isReadOnly && (
                <div>
                  <label className='block mb-2 font-medium'>Banner Photo</label>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    {!photoPreview ? (
                      <div
                        className='border-2 border-dashed border-red-300 rounded-lg p-8 text-center'
                        onDrop={handlePhotoDrop}
                        onDragOver={handleDragOver}
                      >
                        <div className='flex justify-center mb-2'>
                          <svg className='w-8 h-8 text-red-500' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div className='text-gray-600'>
                          <span className='text-red-500'>Click to upload</span> or drag and drop
                        </div>
                        <div className='text-sm text-gray-500 mt-1'>SVG, PNG, JPG</div>
                        <div className='text-sm text-gray-500'>(max. 800x400px)</div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handlePhotoChange}
                          className='hidden'
                          id='photo-upload'
                        />
                      </div>
                    ) : (
                      <div className='relative'>
                        <img src={photoPreview} alt='Preview' className='w-full h-48 object-cover rounded-lg' />
                        <button
                          type='button'
                          onClick={handlePhotoDelete}
                          className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100'
                        >
                          <svg className='w-5 h-5 text-gray-600' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preview for detail mode */}
              {isReadOnly && photoPreview && (
                <div>
                  <label className='block mb-2 font-medium'>Banner Photo</label>
                  <img src={photoPreview} alt='Banner' className='w-full h-48 object-cover rounded-lg' />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {!isReadOnly && (
            <div className='flex justify-end space-x-4 mt-8'>
              <button
                type='button'
                onClick={handleCancel}
                className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
              >
                {mode === 'add' ? 'Add Banner' : 'Save'}
              </button>
            </div>
          )}

          {isReadOnly && (
            <div className='flex justify-end mt-8'>
              <button
                type='button'
                onClick={handleCancel}
                className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'
              >
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BannerForm;