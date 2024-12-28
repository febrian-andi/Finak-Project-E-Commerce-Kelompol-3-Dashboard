import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../sweetalert/AlertDialog';
import PencilIcon from '../../assets/stock/PencilIcon';
import TrashIcon from '../../assets/stock/TrashIcon';
import EyeIcon from '../../assets/stock/EyeIcon';
import PropsTypes from 'prop-types';


const TableStock = ({ 
  currentItems, 
  onDelete,
  searchQuery = '',
  selectedDate = '',
  onViewDetail
}) => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <span>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <span key={index} className="bg-yellow-200">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem && !isDeleting) {
      setIsDeleting(true);
      try {
        await onDelete(selectedItem.id);
        setIsAlertOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleViewDetail = (item) => {
    navigate(`/stock/detail/${item.id}`);
    if (onViewDetail) {
      onViewDetail(item);
    }
  };

  const handleEdit = (item) => {
    navigate(`/stock/edit/${item.id}`);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!currentItems || currentItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items found</p>
        {searchQuery && (
          <p className="text-sm text-gray-400 mt-2">
            No results found for "{searchQuery}"
          </p>
        )}
        {selectedDate && (
          <p className="text-sm text-gray-400 mt-2">
            No items found for date {selectedDate}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left px-6 py-4 bg-gray-50">Product Name</th>
              <th className="text-left px-6 py-4 bg-gray-50">Varian Product</th>
              <th className="text-left px-6 py-4 bg-gray-50">Quantity</th>
              <th className="text-left px-6 py-4 bg-gray-50">Last Updated</th>
              <th className="text-left px-6 py-4 bg-gray-50">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr 
                key={item.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  {highlightText(item.name, searchQuery)}
                </td>
                <td className="px-6 py-4">
                  {highlightText(item.variant, searchQuery)}
                </td>
                <td className="px-6 py-4">
                  <span 
                    className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-sm
                      ${item.quantity > 10 
                        ? ' text-green-800' 
                        : item.quantity > 5 
                        ? ' text-yellow-800' 
                        : ' text-red-800'
                      }`
                    }
                  >
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {formatDate(item.date)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                      onClick={() => handleViewDetail(item)}
                      title="View Details"
                    >
                      <EyeIcon />
                    </button>
                    <button 
                      className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                      onClick={() => handleEdit(item)}
                      title="Edit Stock"
                      disabled={isDeleting}
                    >
                      <PencilIcon />
                    </button>
                    <button 
                      className="hover:bg-gray-100 p-2 rounded-md transition-colors"
                      onClick={() => handleDelete(item)}
                      title="Delete Stock"
                      disabled={isDeleting}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog 
        isOpen={isAlertOpen} 
        onClose={() => !isDeleting && setIsAlertOpen(false)} 
        onConfirm={handleConfirmDelete}
        title="Delete Stock?"
        message={`Are you sure want to delete "${selectedItem?.name} - ${selectedItem?.variant}"?`}
        icon="trash"
        disabled={isDeleting}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />
    </>
  );
};

TableStock.propTypes = {
  currentItems: PropsTypes.array.isRequired,
  onDelete: PropsTypes.func.isRequired,
  searchQuery: PropsTypes.string,
  selectedDate: PropsTypes.string,
  onViewDetail: PropsTypes.func,
};

export default TableStock;