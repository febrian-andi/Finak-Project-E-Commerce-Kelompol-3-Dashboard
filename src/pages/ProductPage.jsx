import React, { useState } from 'react';
import HeaderProduct from '../components/product/HeaderProduct';
import TableProduct from '../components/product/TableProduct';
import PaginationProduct from '../components/product/PaginationProduct';
import ProductForm from '../components/product/ProductForm';

const dummyProducts = [
  {
    id: 1,
    name: 'HP Pavilion 14-DV0514TX',
    sku: 'HP-LPTP-ZB14-i5-256GB',
    stock: 12,
    category: 'Electronic',
    price: '960',
    description: 'High performance laptop featuring Intel Core i5 processor, 8GB RAM, 256GB SSD storage, and NVIDIA GeForce MX450 graphics. Perfect for productivity and light gaming.',
    published: false,
    variants: [
      { id: 1, name: 'Core i5/8GB/256GB', price: '960', stock: 8 },
      { id: 2, name: 'Core i7/16GB/512GB', price: '1160', stock: 4 }
    ],
    images: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ]
  },
  {
    id: 2,
    name: 'Lenovo ThinkPad X1 Carbon',
    sku: 'LNV-LPTP-X1-i7-512GB',
    stock: 8,
    category: 'Electronic',
    price: '1299',
    description: 'Premium business laptop with Intel Core i7, 16GB RAM, 512GB NVMe SSD. Features a 14-inch 4K display and legendary ThinkPad keyboard.',
    published: true,
    variants: [
      { id: 1, name: 'Core i7/16GB/512GB', price: '1299', stock: 5 },
      { id: 2, name: 'Core i7/32GB/1TB', price: '1599', stock: 3 }
    ],
    images: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ]
  },
  {
    id: 3,
    name: 'Dell XPS 13',
    sku: 'DLL-LPTP-XPS13-i7-1TB',
    stock: 15,
    category: 'Electronic',
    price: '1499',
    description: 'Flagship ultrabook featuring InfinityEdge display, 11th Gen Intel Core i7, 16GB RAM, and 1TB SSD.',
    published: true,
    variants: [
      { id: 1, name: 'Silver/16GB/1TB', price: '1499', stock: 10 },
      { id: 2, name: 'Black/32GB/2TB', price: '1899', stock: 5 }
    ],
    images: [
      '/api/placeholder/400/300'
    ]
  }
];

const ProductPage = () => {
  // State management
  const [products, setProducts] = useState(dummyProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [currentMode, setCurrentMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handlers for product management
  const handleTogglePublish = (productId, newStatus) => {
    setProducts(products.map((product) => 
      product.id === productId ? { ...product, published: newStatus } : product
    ));
  };

  const handleDelete = async (productId) => {
    try {
      setProducts((prevProducts) => 
        prevProducts.filter((product) => product.id !== productId)
      );
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  const handleAddProduct = () => {
    setCurrentMode('add');
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setCurrentMode('edit');
    setSelectedProduct({
      ...product,
      initialStock: product.stock,
    });
    setShowForm(true);
  };

  const handleViewProduct = (product) => {
    setCurrentMode('detail');
    setSelectedProduct({
      ...product,
      initialStock: product.stock,
    });
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = (formData) => {
    if (currentMode === 'add') {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
        stock: parseInt(formData.initialStock),
        published: false,
      };
      setProducts([...products, newProduct]);
    } else if (currentMode === 'edit') {
      setProducts(products.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              ...formData,
              stock: parseInt(formData.initialStock),
            }
          : product
      ));
    }
    setShowForm(false);
  };

  // Calculate pagination
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const currentItems = products.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Conditional rendering
  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProductForm
          mode={currentMode}
          initialData={selectedProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <HeaderProduct onAddClick={handleAddProduct} />
        <TableProduct
          products={currentItems}
          onTogglePublish={handleTogglePublish}
          onDelete={handleDelete}
          onEdit={handleEditProduct}
          onView={handleViewProduct}
        />
        <PaginationProduct
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalItems}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductPage;