import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessAlert from '../sweetalert/SuccessAlert'; 

const StockForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    currentStock: '10',
    newStock: ''
  });

  // Determine form type based on route
  const getFormType = () => {
    if (location.pathname.includes('stock/add')) return 'add';
    if (location.pathname.includes('stock/edit')) return 'edit';
    if (location.pathname.includes('stock/detail')) return 'detail';
    return 'add';
  };

  const formType = getFormType();

  // Get form title and button text based on form type
  const getFormConfig = () => {
    switch (formType) {
      case 'edit':
        return { 
          title: 'Edit Stock',
          buttonText: 'Save',
          isReadOnly: false,
          successMessage: 'This stock was successfully updated'
        };
      case 'detail':
        return { 
          title: 'Stock Detail',
          buttonText: 'Close',
          isReadOnly: true,
          successMessage: ''
        };
      default:
        return { 
          title: 'Add Stock',
          buttonText: 'Add Stock',
          isReadOnly: false,
          successMessage: 'This stock was successfully added'
        };
    }
  };

  const { title, buttonText, isReadOnly, successMessage } = getFormConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (formType) {
        case 'add':
          // Add logic here
          console.log('Adding new stock:', formData);
          break;
        case 'edit':
          // Edit logic here
          console.log('Updating stock:', formData);
          break;
        default:
          break;
      }

      // Show success alert
      setShowSuccessAlert(true);

      // Navigate back after alert duration
      setTimeout(() => {
        navigate('/stock');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/stock');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="p-6">
          <div className="mb-4 flex items-center">
            <button 
              onClick={() => navigate('/stock')}
              className="text-xl mr-2"
            >
              ←
            </button>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center text-sm">
            <span className="text-red-500 cursor-pointer" onClick={() => navigate('/home')}>Home</span>
            <span className="text-red-500 mx-2">{'>'}</span>
            <span className="text-red-500 cursor-pointer" onClick={() => navigate('/stock')}>Stock</span>
            <span className="text-red-500 mx-2">{'>'}</span>
            <span className="text-red-500">{title}</span>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Product Section */}
              <div>
                <label className="block text-base mb-2">Product</label>
                <div className="relative">
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none"
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                    disabled={isReadOnly}
                  >
                    <option value="">Select Product</option>
                    <option value="laptop-pavilion">Laptop Pavilion - Warna Hitam</option>
                  </select>
                  {!isReadOnly && (
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* New Stock Section */}
              <div>
                <label className="block text-base mb-2">New Stock</label>
                <input
                  type="number"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                  value={formData.newStock}
                  onChange={(e) => setFormData({...formData, newStock: e.target.value})}
                  readOnly={isReadOnly}
                  placeholder="Enter New Stock"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div>
                <label className="block text-base mb-2">Current Stock</label>
                <input
                  type="number"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end gap-4 mt-8">
            {formType !== 'detail' && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
              >
                Cancel
              </button>
            )}
            <button
              type={formType === 'detail' ? 'button' : 'submit'}
              onClick={formType === 'detail' ? handleCancel : undefined}
              className={`px-6 py-2 rounded text-white ${
                formType === 'detail' 
                  ? 'bg-gray-500 hover:bg-gray-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>

      {/* Success Alert Modal */}
      <SuccessAlert 
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        message={successMessage}
        duration={2000}
      />
    </div>
  );
};

export default StockForm;