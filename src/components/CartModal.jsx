import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContextCore';

const CartModal = () => {
  const context = useContext(CartContext);
  const [formErrors, setFormErrors] = useState({});
  
  // If context is undefined, don't render anything
  if (!context) {
    console.warn('CartContext is undefined in CartModal');
    return null;
  }
  
  const { 
    cart, 
    totalItems, 
    totalPrice, 
    isCartModalOpen, 
    closeCartModal, 
    updateCartItemQuantity, 
    removeFromCart,
    customerInfo,
    updateCustomerInfo,
    placeOrder
  } = context;

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCustomerInfo({ [name]: value });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerInfo.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      placeOrder();
    }
  };

  if (!isCartModalOpen) {
    console.log('Cart modal is closed, isCartModalOpen:', isCartModalOpen);
    return null;
  }
  
  console.log('Cart modal is open, isCartModalOpen:', isCartModalOpen);

  // Using a more compatible approach for React modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <dialog 
        className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative m-0 border-none"
        aria-labelledby="cart-modal-title"
        open
      >
        <h2 id="cart-modal-title" className="text-2xl font-bold mb-4">
          Your Cart ({totalItems} items)
        </h2>
        
        {cart.length === 0 ? (
          <p className="my-8 text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <div className="mb-6">
              <ul className="divide-y">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                    <div className="flex items-center ml-4">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 border rounded-l-md accessible-focus"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span 
                        className="px-4 py-1 border-t border-b" 
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 border rounded-r-md accessible-focus"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 accessible-focus rounded-md px-2"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <p className="text-xl font-bold">
                  Total: Rs {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 accessible-label">
                    Name <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className={`w-full rounded accessible-input accessible-focus ${
                      formErrors.name ? 'accessible-input-error' : ''
                    }`}
                    aria-required="true"
                    aria-invalid={formErrors.name ? 'true' : 'false'}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="accessible-error-text" role="alert">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 accessible-label">
                    Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className={`w-full rounded accessible-input accessible-focus ${
                      formErrors.phone ? 'accessible-input-error' : ''
                    }`}
                    aria-required="true"
                    aria-invalid={formErrors.phone ? 'true' : 'false'}
                    aria-describedby={formErrors.phone ? 'phone-error' : 'phone-hint'}
                    inputMode="numeric" 
                    pattern="[0-9]{10}"
                  />
                  <p id="phone-hint" className="accessible-description">
                    Please enter a 10-digit phone number
                  </p>
                  {formErrors.phone && (
                    <p id="phone-error" className="accessible-error-text" role="alert">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button 
            onClick={closeCartModal} 
            className="px-4 py-2 rounded border accessible-focus"
          >
            Close
          </button>
          {cart.length > 0 && (
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 rounded bg-blue-600 text-white accessible-focus"
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default CartModal;
