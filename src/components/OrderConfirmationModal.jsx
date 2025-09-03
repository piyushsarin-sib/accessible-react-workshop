import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FeedbackForm from './FeedbackForm';

const OrderConfirmationModal = ({ onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Automatically transition from animation to feedback form after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <dialog 
        open
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative animate-fadeIn border-none m-0"
        tabIndex={-1}
        aria-labelledby="confirmation-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 accessible-focus rounded-full p-1"
          aria-label="Close confirmation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {showAnimation ? (
          /* Animation section */
          <div className="flex flex-col items-center justify-center py-8" aria-live="polite">
            <h2 id="confirmation-title" className="text-2xl font-bold mb-6 text-center">
              Processing Your Order
            </h2>
            
            {/* Shipping animation */}
            <div className="relative w-full h-32 mb-6">
              <div className="absolute left-0 animate-moveRight">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            
            <p className="text-lg text-center text-gray-700 animate-pulse">
              Preparing your items...
            </p>
          </div>
        ) : (
          /* Confirmation and feedback section */
          <div aria-live="polite">
            {!showFeedback ? (
              <>
                <h2 id="confirmation-title" className="text-2xl font-bold mb-4 text-center">
                  Order Confirmed!
                </h2>
                
                <div className="flex justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Just kidding!</strong> This is a dummy order. Your items won't actually be shipped because this is just a workshop demo.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="mb-4 text-gray-700">But we'd love to hear about your experience!</p>
                  <button
                    onClick={() => setShowFeedback(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 accessible-focus"
                  >
                    Share Your Feedback
                  </button>
                </div>
              </>
            ) : (
              <FeedbackForm onClose={onClose} />
            )}
          </div>
        )}
      </dialog>
    </div>
  );
};

OrderConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default OrderConfirmationModal;
