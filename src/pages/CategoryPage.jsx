import React, { useState } from 'react';
import pencilIcon from '../assets/category/pencil.svg';
import trashIcon from '../assets/category/trash.svg';
import CategoryFormModal from '../components/category/CategoryFormModal';

const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Sample data
  const [categories, setCategories] = useState([
    { name: 'Electronic', icon: 'Electronic', published: true },
    { name: 'Home & Lifestyle', icon: 'Home & Lifestyle', published: false },
    { name: 'Home & Lifestyle', icon: 'Home & Lifestyle', published: false },
    { name: 'Home & Lifestyle', icon: 'Home & Lifestyle', published: false },
  ]);

  // Modal handlers
  const handleAddNew = () => {
    setModalMode('add');
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setModalMode('edit');
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Pagination calculations
  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = categories.slice(startIndex, endIndex);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg p-6 shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Category</h1>
            <div className="text-sm text-gray-500">
              <span className="text-red-500">Home</span> / Category
            </div>
          </div>
          <button 
            onClick={handleAddNew} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Add New Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">
                  Category Name
                  <button className="ml-1 text-gray-400">↓</button>
                </th>
                <th className="text-left py-4 px-4">
                  Category Icon
                  <button className="ml-1 text-gray-400">↓</button>
                </th>
                <th className="text-left py-4 px-4">
                  Published
                  <button className="ml-1 text-gray-400">↓</button>
                </th>
                <th className="text-left py-4 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((category, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-600">{category.name}</td>
                  <td className="py-4 px-4 text-gray-600">{category.icon}</td>
                  <td className="py-4 px-4">
                    <button 
                      className="relative inline-block w-12 h-6"
                      onClick={() => {
                        const newCategories = [...categories];
                        newCategories[index].published = !newCategories[index].published;
                        setCategories(newCategories);
                      }}
                    >
                      <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${
                        category.published ? 'bg-red-500' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-1/2 -mt-2.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                          category.published ? 'right-0.5' : 'left-0.5'
                        }`} />
                      </div>
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => handleEdit(category)}
                      >
                        <img src={pencilIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => handleDelete(index)}
                      >
                        <img src={trashIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-gray-600">
            {`${startIndex + 1}-${endIndex} of ${totalItems}`}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
              <select 
                className="border rounded p-1"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-1 rounded hover:bg-gray-100 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="px-2">{`${currentPage}/${totalPages}`}</span>
              <button 
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-1 rounded hover:bg-gray-100 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        initialData={selectedCategory}
      />
    </div>
  );
};

export default CategoryPage;
