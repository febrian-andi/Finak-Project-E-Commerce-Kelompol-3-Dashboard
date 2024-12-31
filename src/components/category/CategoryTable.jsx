import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PencilIcon from '../../assets/category/PencilIcon';
import TrashIcon from '../../assets/category/TrashIcon';
import AlertDialog from '../sweetalert/AlertDialog';
import SuccessAlert from '../sweetalert/SuccessAlert';

const CategoryTable = ({ categories, onEdit, onDelete, togglePublish }) => {
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePublishConfirm = () => {
    if (selectedCategory) {
      togglePublish(selectedCategory.id);
      setShowPublishConfirm(false);
      setSuccessMessage(`Category was successfully ${selectedCategory.published ? 'unpublished' : 'published'}`);
      setShowSuccess(true);
    }
  };

  const handleToggleClick = (category) => {
    setSelectedCategory(category);
    setShowPublishConfirm(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      onDelete(selectedCategory.id);
      setShowDeleteConfirm(false);
      setSuccessMessage('Category was successfully deleted');
      setShowSuccess(true);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4">Category Name</th>
              <th className="text-left py-4 px-4">Category Icon</th>
              <th className="text-left py-4 px-4">Published</th>
              <th className="text-left py-4 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b hover:bg-gray-50" data-testid={`category-row-${category.id}`}>
                <td className="py-4 px-4 text-gray-600" data-testid={`category-name-${category.id}`}>{category.name}</td>
                <td className="py-4 px-4 text-gray-600" data-testid={`category-icon-${category.id}`}>{category.icon}</td>
                <td className="py-4 px-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={category.published} 
                      onChange={() => handleToggleClick(category)}
                      data-testid={`toggle-publish-${category.id}`}
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 peer peer-checked:after:translate-x-6 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                        ${category.published ? 'bg-red-500' : 'bg-gray-300'}`}
                      data-testid={`publish-indicator-${category.id}`}
                    />
                  </label>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded" 
                      onClick={() => onEdit(category)}
                      data-testid={`edit-category-${category.id}`}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded" 
                      onClick={() => handleDeleteClick(category)}
                      data-testid={`delete-category-${category.id}`}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Publish Alert */}
      <AlertDialog
        isOpen={showPublishConfirm}
        onClose={() => setShowPublishConfirm(false)}
        onConfirm={handlePublishConfirm}
        title="Confirmation"
        message={`Are you sure want to ${selectedCategory?.published ? 'unpublish' : 'publish'} this category?`}
        icon="confirm"
        confirmLabel="Yes"
        cancelLabel="No"
        data-testid="publish-confirm-dialog"
      />

      {/* Delete Alert */}
      <AlertDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure want to delete this category?"
        icon="trash"
        confirmLabel="Yes"
        cancelLabel="No"
        data-testid="delete-confirm-dialog"
      />

      {/* Success Alert */}
      <SuccessAlert 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message={successMessage} 
        duration={1000} 
        data-testid="success-alert"
      />
    </>
  );
};

CategoryTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
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
