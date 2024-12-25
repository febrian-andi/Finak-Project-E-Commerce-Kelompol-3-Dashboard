// File: CategoryHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';

const CategoryHeader = ({ onAddNew }) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-2xl font-semibold">Category</h1>
      <div className="text-sm text-gray-500">
        <span className="text-red-500">Home</span> / Category
      </div>
    </div>
    <button 
      onClick={onAddNew} 
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Add New Category
    </button>
  </div>
);

CategoryHeader.propTypes = {
  onAddNew: PropTypes.func.isRequired,
};

export default CategoryHeader;