// File: CategoryPage.jsx
import React, { useState } from 'react';
import CategoryHeader from '../components/category/CategoryHeader';
import CategoryTable from '../components/category/CategoryTable';
import CategoryPagination from '../components/category/CategoryPagination';
import CategoryFormModal from '../components/category/CategoryFormModal';

const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [categories, setCategories] = useState([
    { name: 'Electronic', icon: 'Electronic', published: true },
    { name: 'Home & Lifestyle', icon: 'Home & Lifestyle', published: false },
  ]);

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

  const togglePublish = (index) => {
    const newCategories = [...categories];
    newCategories[index].published = !newCategories[index].published;
    setCategories(newCategories);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const currentItems = categories.slice(startIndex, endIndex);

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
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        <CategoryHeader onAddNew={handleAddNew} />
        <CategoryTable categories={currentItems} onEdit={handleEdit} onDelete={handleDelete} togglePublish={togglePublish} />
        <CategoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
      <CategoryFormModal isOpen={isModalOpen} onClose={closeModal} mode={modalMode} initialData={selectedCategory} />
    </div>
  );
};

export default CategoryPage;