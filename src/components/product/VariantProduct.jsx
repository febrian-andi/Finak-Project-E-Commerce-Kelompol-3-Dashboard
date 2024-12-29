// components/product/VariantModal.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VariantModal = ({ variants = [], onClose, onAdd }) => {
  const [variantInput, setVariantInput] = useState('');
  const [variantList, setVariantList] = useState(variants);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [optionInput, setOptionInput] = useState('');

  useEffect(() => {
    setVariantList(variants);
  }, [variants]);

  const handleAddVariant = () => {
    if (variantInput.trim()) {
      const newVariant = {
        name: variantInput.trim(),
        options: []
      };
      setVariantList([...variantList, newVariant]);
      setVariantInput('');
    }
  };

  const handleAddOption = (variantIndex) => {
    if (optionInput.trim()) {
      const updatedList = [...variantList];
      updatedList[variantIndex].options.push(optionInput.trim());
      setVariantList(updatedList);
      setOptionInput('');
    }
  };

  const handleKeyPress = (e, type, variantIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'variant') {
        handleAddVariant();
      } else if (type === 'option') {
        handleAddOption(variantIndex);
      }
    }
  };

  const removeVariant = (index) => {
    setVariantList(variantList.filter((_, i) => i !== index));
  };

  const removeOption = (variantIndex, optionIndex) => {
    const updatedList = [...variantList];
    updatedList[variantIndex].options = updatedList[variantIndex].options.filter((_, i) => i !== optionIndex);
    setVariantList(updatedList);
  };

  const handleSubmit = () => {
    if (variantList.length > 0) {
      onAdd(variantList);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl mb-6">Add Varian</h2>
        
        {/* Variant Input */}
        <div className="mb-6">
          <label className="block mb-2">Varian Name</label>
          <div className="relative">
            <input
              type="text"
              value={variantInput}
              onChange={(e) => setVariantInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'variant')}
              placeholder="Enter Varian"
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 pr-12"
            />
            <button
              onClick={handleAddVariant}
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-red-200 text-red-500 hover:bg-red-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Variant List */}
        {variantList.map((variant, variantIndex) => (
          <div 
            key={variantIndex} 
            className="bg-red-50 rounded-lg mb-2"
          >
            {/* Variant Header */}
            <div className="flex items-center justify-between p-4">
              <span className="text-base">{variant.name}</span>
              <div className="flex items-center gap-2">
                {/* Add option button */}
                <button
                  onClick={() => setSelectedVariant(variantIndex)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                {/* Delete variant button */}
                <button
                  onClick={() => removeVariant(variantIndex)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Options List */}
            {variant.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="px-4 py-3 border-t border-gray-100 flex justify-between items-center bg-white"
              >
                <span>{option}</span>
                <button
                  onClick={() => removeOption(variantIndex, optionIndex)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            ))}

            {/* Option Input - Show when variant is selected */}
            {selectedVariant === variantIndex && (
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    value={optionInput}
                    onChange={(e) => setOptionInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOption(variantIndex);
                      }
                    }}
                    placeholder="Add new option"
                    className="w-full p-2 rounded-lg bg-white border border-gray-200 pr-12"
                  />
                  <button
                    onClick={() => handleAddOption(variantIndex)}
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-red-200 text-red-500 hover:bg-red-300"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Add Varian
          </button>
        </div>
      </div>
    </div>
  );
};

VariantModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default VariantModal;