import React, { useState } from 'react';
import TrashAlert from '../../assets/alert/TrashAlert';
import ConfirmAlert from '../../assets/alert/ConfirmAlert';
import SuccessAlert from './SuccessAlert';

const AlertDialog = ({ isOpen, onClose, onConfirm, title = 'Delete Stock?', message = 'Are you sure want to delete this stock?', icon = 'trash', confirmLabel = 'Yes', cancelLabel = 'No' }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen && !showSuccess) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
      setShowSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  const getIcon = () => {
    if (icon === 'trash') {
      return (
        <div className='w-12 h-12 flex items-center justify-center mx-auto mb-4'>
          <TrashAlert />
        </div>
      );
    }
    return (
      <div className='w-12 h-12 flex items-center justify-center mx-auto mb-4'>
        <ConfirmAlert />
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex min-h-screen items-center justify-center p-4'>
            {/* Overlay */}
            <div className='fixed inset-0 bg-black bg-opacity-30' onClick={onClose}></div>

            {/* Modal */}
            <div className='relative bg-white rounded-lg p-8 max-w-sm w-full text-center'>
              {getIcon()}

              <h3 className='text-xl font-semibold text-red-500 mb-2'>{title}</h3>

              <p className='text-[#424242] text-lg mb-8'>{message}</p>

              <div className='flex justify-center gap-4'>
                <button onClick={onClose} className='px-16 py-2.5 border border-red-500 rounded-lg text-red-500 hover:bg-red-50 transition-colors'>
                  {cancelLabel}
                </button>
                <button onClick={handleConfirm} className='px-16 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'>
                  {confirmLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SuccessAlert isOpen={showSuccess} onClose={handleSuccessClose} message={`This banner was successfully ${icon === 'trash' ? 'deleted' : icon === 'confirm' ? 'unpublished' : 'updated'}`} duration={2000} />
    </>
  );
};

export default AlertDialog;
