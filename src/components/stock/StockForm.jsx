import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SuccessAlert from '../sweetalert/SuccessAlert';
import BackIcon from '../../assets/stock/BackIcon';
import PropsTypes from 'prop-types';

const StockForm = ({ stocks = [], onAdd, onUpdate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    product: '',
    currentStock: '10',
    newStock: '',
  });

  // Product options for select with normalized values
  const productOptions = [
    {
      value: 'laptop-hp-black',
      label: 'Laptop HP - Warna Hitam',
      normalizedName: 'laptop hp',
      normalizedVariant: 'warna hitam',
    },
    {
      value: 'laptop-hp-silver',
      label: 'Laptop HP - Warna Silver',
      normalizedName: 'laptop hp',
      normalizedVariant: 'warna silver',
    },
    {
      value: 'laptop-lenovo-black',
      label: 'Laptop Lenovo - Warna Hitam',
      normalizedName: 'laptop lenovo',
      normalizedVariant: 'warna hitam',
    },
    {
      value: 'laptop-lenovo-silver',
      label: 'Laptop Lenovo - Warna Silver',
      normalizedName: 'laptop lenovo',
      normalizedVariant: 'warna silver',
    },
    {
      value: 'mouse-logitech-black',
      label: 'Mouse Logitech - Warna Hitam',
      normalizedName: 'mouse logitech',
      normalizedVariant: 'warna hitam',
    },
    {
      value: 'keyboard-razer-rgb',
      label: 'Keyboard Razer - Warna RGB',
      normalizedName: 'keyboard razer',
      normalizedVariant: 'warna rgb',
    },
  ];

  const getFormType = () => {
    if (location.pathname.includes('stock/add')) return 'add';
    if (location.pathname.includes('stock/edit')) return 'edit';
    if (location.pathname.includes('stock/detail')) return 'detail';
    return 'add';
  };

  const formType = getFormType();

  const getFormConfig = () => {
    switch (formType) {
      case 'edit':
        return {
          title: 'Edit Stock',
          buttonText: 'Save',
          isReadOnly: false,
          successMessage: 'This stock was successfully updated',
        };
      case 'detail':
        return {
          title: 'Stock Detail',
          buttonText: 'Close',
          isReadOnly: true,
          successMessage: '',
        };
      default:
        return {
          title: 'Add Stock',
          buttonText: 'Add Stock',
          isReadOnly: false,
          successMessage: 'This stock was successfully added',
        };
    }
  };

  const { title, buttonText, isReadOnly, successMessage } = getFormConfig();

  // Load existing stock data if editing or viewing details
  useEffect(() => {
    if (id && stocks && (formType === 'edit' || formType === 'detail')) {
      const existingStock = stocks.find((stock) => stock.id === parseInt(id));
      if (existingStock) {
        const normalizedStockName = existingStock.name.toLowerCase();
        const normalizedStockVariant = existingStock.variant.toLowerCase();

        // Find matching product option
        const selectedProduct = productOptions.find((option) => {
          const nameMatch = normalizedStockName === option.normalizedName;
          const variantMatch = normalizedStockVariant.includes(option.normalizedVariant.split(' ').pop()); // Match only color part
          return nameMatch && variantMatch;
        });

        console.log('Matching:', {
          stockName: normalizedStockName,
          stockVariant: normalizedStockVariant,
          selectedProduct,
        });

        if (selectedProduct) {
          setFormData({
            product: selectedProduct.value,
            currentStock: existingStock.quantity.toString(),
            newStock: existingStock.quantity.toString(),
          });
        }
      }
    }
  }, [id, stocks, formType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedProduct = productOptions.find((option) => option.value === formData.product);
      if (!selectedProduct) {
        console.error('No product selected');
        return;
      }

      const stockData = {
        name: selectedProduct.label.split(' - ')[0],
        variant: selectedProduct.label.split(' - ')[1],
        quantity: parseInt(formData.newStock || formData.currentStock),
        date: new Date(),
      };

      if (formType === 'add') {
        onAdd && onAdd(stockData);
      } else if (formType === 'edit') {
        onUpdate && onUpdate({ ...stockData, id: parseInt(id) });
      }

      setShowSuccessAlert(true);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-sm'>
        {/* Header Section */}
        <div className='p-6'>
          <div className='mb-4 flex items-center'>
            <button onClick={() => navigate('/stock')} className='text-xl mr-2'>
              <BackIcon />
            </button>
            <h1 className='text-xl font-semibold'>{title}</h1>
          </div>

          {/* Breadcrumb */}
          <div className='flex items-center text-sm'>
            <span className='text-red-500 cursor-pointer' onClick={() => navigate('/home')}>
              Home
            </span>
            <span className='text-red-500 mx-2'>{'>'}</span>
            <span className='text-red-500 cursor-pointer' onClick={() => navigate('/stock')}>
              Stock
            </span>
            <span className='text-red-500 mx-2'>{'>'}</span>
            <span className='text-red-500'>{title}</span>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className='p-6 border-t border-gray-100'>
          <div className='grid grid-cols-2 gap-8'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Product Section */}
              <div>
                <label className='block text-base mb-2'>Product</label>
                <div className='relative'>
                  <select name='product' className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none' value={formData.product} onChange={handleInputChange} disabled={isReadOnly} required>
                    <option value=''>Select Product</option>
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {!isReadOnly && (
                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                      <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* New Stock Section */}
              <div>
                <label className='block text-base mb-2'>New Stock</label>
                <input
                  type='number'
                  name='newStock'
                  className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none'
                  value={formData.newStock}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  placeholder='Enter New Stock'
                  min='0'
                  required={!isReadOnly}
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div>
                <label className='block text-base mb-2'>Current Stock</label>
                <input type='number' name='currentStock' className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none' value={formData.currentStock} onChange={handleInputChange} readOnly />
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className='flex justify-end gap-4 mt-8'>
            {formType !== 'detail' && (
              <button type='button' onClick={handleCancel} className='px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50'>
                Cancel
              </button>
            )}
            <button
              type={formType === 'detail' ? 'button' : 'submit'}
              onClick={formType === 'detail' ? handleCancel : undefined}
              className={`px-6 py-2 rounded text-white ${formType === 'detail' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>

      {/* Success Alert Modal */}
      <SuccessAlert isOpen={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} message={successMessage} duration={2000} />
    </div>
  );
};

StockForm.propTypes = {
  id: PropsTypes.string,
  stocks: PropsTypes.array,
  onAdd: PropsTypes.func,
  onUpdate: PropsTypes.func,
};

export default StockForm;
