import React, { useState } from 'react';
import TrashAlert from '../../assets/alert/TrashAlert';
import ConfirmAlert from '../../assets/alert/ConfirmAlert';
import SuccessAlert from './SuccessAlert';

const AlertDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Stock?",
  message = "Are you sure want to delete this stock?",
  icon = "trash",
  confirmLabel = "Yes",
  cancelLabel = "No"
}) => {
  // Pindahkan useState ke luar dari body komponen
  const [showSuccess, setShowSuccess] = useState(false);

  // Early return if both modals are closed
  if (!isOpen && !showSuccess) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose(); // Tutup modal konfirmasi
      setShowSuccess(true); // Tampilkan modal sukses
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  const getIcon = () => {
    if (icon === "trash") {
      return (
        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <TrashAlert />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <ConfirmAlert />
      </div>
    );
  };

  const getTextColor = () => {
    return icon === "trash" ? "text-red-500" : "text-yellow-500";
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}></div>
            
            {/* Modal */}
            <div className="relative bg-white rounded-lg p-8 max-w-sm w-full text-center">
              {getIcon()}
              
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-2`}>
                {title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 ${icon === 'trash' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-lg transition-colors`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SuccessAlert 
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        message="This stock was successfully deleted"
        duration={2000} // Optional: mengatur durasi tampilan alert
      />
    </>
  );
};

export default AlertDialog;