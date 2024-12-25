// File: CategoryTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import PencilIcon from '../../assets/category/PencilIcon';
import TrashIcon from '../../assets/category/TrashIcon';

const CategoryTable = ({ categories, onEdit, onDelete, togglePublish }) => (
  <div className='overflow-x-auto'>
    <table className='w-full'>
      <thead>
        <tr className='border-b'>
          <th className='text-left py-4 px-4'>Category Name</th>
          <th className='text-left py-4 px-4'>Category Icon</th>
          <th className='text-left py-4 px-4'>Published</th>
          <th className='text-left py-4 px-4'>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={index} className='border-b hover:bg-gray-50'>
            <td className='py-4 px-4 text-gray-600'>{category.name}</td>
            <td className='py-4 px-4 text-gray-600'>{category.icon}</td>
            <td className='py-4 px-4'>
              <button className='relative inline-block w-12 h-6' onClick={() => togglePublish(index)}>
                <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${category.published ? 'bg-red-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1/2 -mt-2.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${category.published ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </button>
            </td>
            <td className='py-4 px-4'>
              <div className='flex space-x-2'>
                <button className='p-1 hover:bg-gray-100 rounded' onClick={() => onEdit(category)}>
                  <PencilIcon className='w-5 h-5' />
                </button>
                <button className='p-1 hover:bg-gray-100 rounded' onClick={() => onDelete(index)}>
                  <TrashIcon className='w-5 h-5' />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

CategoryTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  togglePublish: PropTypes.func.isRequired,
};

export default CategoryTable;
