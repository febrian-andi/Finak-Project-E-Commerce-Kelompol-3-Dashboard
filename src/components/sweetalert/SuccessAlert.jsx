import React, { useEffect } from 'react';
import SuccessAlertIcon from '../../assets/alert/SuccessAlertIcon';

const SuccessAlert = ({
  isOpen,
  onClose,
  message = 'This banner was successfully updated',
  duration = 3000
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center'>
        {/* Overlay with fade animation */}
        <div 
          className='fixed inset-0 bg-black transition-opacity duration-500 ease-in-out'
          style={{
            opacity: isOpen ? 0.4 : 0,
          }}
          onClick={onClose}
        ></div>

        {/* Modal with enhanced animations */}
        <div 
          className='relative bg-white rounded-xl w-[700px] py-12 text-center transition-all duration-500 ease-[cubic-bezier(0.68, -0.55, 0.265, 1.55)]'
          style={{
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
            opacity: isOpen ? 1 : 0,
            animation: isOpen ? 'modalEnter 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards' : 'none'
          }}
        >
          {/* Success Icon with enhanced bounce animation */}
          <div 
            className='w-24 h-20 mx-auto mb-14'
            style={{
              animation: isOpen ? 'iconBounceEnhanced 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards' : 'none',
              opacity: 0
            }}
          >
            <SuccessAlertIcon className="w-full h-full" />
          </div>

          {/* Message with smooth fade up animation */}
          <p 
            className='text-[#424242] text-2xl font-medium'
            style={{
              animation: isOpen ? 'messageSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards' : 'none',
              opacity: 0
            }}
          >
            {message}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalEnter {
          0% {
            transform: scale(0.6) translateY(20px);
            opacity: 0;
          }
          50% {
            transform: scale(1.02) translateY(-3px);
            opacity: 0.85;
          }
          75% {
            transform: scale(0.98) translateY(2px);
            opacity: 0.95;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes iconBounceEnhanced {
          0% {
            transform: scale(0.3) rotate(-45deg);
            opacity: 0;
          }
          40% {
            transform: scale(1.2) rotate(5deg);
            opacity: 0.7;
          }
          60% {
            transform: scale(0.9) rotate(-3deg);
            opacity: 0.9;
          }
          80% {
            transform: scale(1.1) rotate(2deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }

        @keyframes messageSlide {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          60% {
            transform: translateY(-5px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessAlert;