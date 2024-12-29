import React, { useState } from 'react';
import ConfirmAlert from '../../assets/alert/ConfirmAlert';
import SuccessAlert from './SuccessAlert';

const PublishAlert = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  initialMessage,
  successMessage
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
      setShowSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    }
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
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <ConfirmAlert />
              </div>
              
              <h3 className="text-xl font-semibold text-red-500 mb-2">
                Confirmation
              </h3>
              
              <p className="text-[#424242] text-lg mb-8">
                {initialMessage}
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-16 py-2.5 border border-red-500 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                  No
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-16 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SuccessAlert 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
        duration={2000}
      />
    </>
  );
};

export default PublishAlert;