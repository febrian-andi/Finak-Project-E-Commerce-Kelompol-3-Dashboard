// File: pages/CategoryPage.jsx
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
    { id: 1, name: 'Electronic', icon: 'Electronic', published: true },
    { id: 2, name: 'Home & Lifestyle', icon: 'Home & Lifestyle', published: false },
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

  const handleSubmit = (formData) => {
    if (modalMode === 'add') {
      // Add new category
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          ...formData
        }
      ]);
    } else if (modalMode === 'edit' && selectedCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    }
  };

  const handleDelete = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const togglePublish = (categoryId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, published: !cat.published }
        : cat
    ));
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

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg p-6 shadow'>
        <CategoryHeader onAddNew={handleAddNew} />
        
        <CategoryTable 
          categories={currentItems} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          togglePublish={togglePublish} 
        />
        
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
          setCurrentPage={setCurrentPage}
        />
      </div>

      <CategoryFormModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        mode={modalMode} 
        initialData={selectedCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CategoryPage;