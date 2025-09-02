import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../context/CartContextCore';

const AddToCartModal = ({ product, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { openCartModal, cart, removeFromCart } = useContext(CartContext);
  
  // Check if product is already in cart and set initial quantity
  useEffect(() => {
    if (product && cart) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    }
  }, [product, cart]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      // If quantity is zero, remove item from cart
      removeFromCart(product.id);
    } else {
      onAddToCart(product, quantity);
    }
    onClose();
  };

  const handleGoToCart = () => {
    if (quantity === 0) {
      // If quantity is zero, remove item from cart
      removeFromCart(product.id);
    } else {
      onAddToCart(product, quantity);
    }
    onClose();
    openCartModal();
  };

  const handleRemoveItem = () => {
    removeFromCart(product.id);
    onClose();
  };

  if (!product) {
    return null;
  }

  // Using a more compatible approach for React modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
        tabIndex={-1}
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {product.name}
        </h2>
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold">{product.price}</span>
          
          {/* Quantity Selector with improved visibility */}
          <div className="flex items-center border-2 border-gray-400 rounded-md shadow overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span 
              className="px-6 py-2 bg-white text-xl font-semibold border-l border-r border-gray-400" 
              aria-live="polite"
              style={{ minWidth: "40px", textAlign: "center" }}
            >
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handleRemoveItem}
            className="px-4 py-2 rounded bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Remove this item from cart"
          >
            Remove Item
          </button>
          {quantity === 0 && (
            <p className="text-red-600 text-sm">Setting quantity to 0 will remove the item from cart</p>
          )}
        </div>
        <div className="flex justify-end space-x-4 mb-4">
          <button onClick={onClose} className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500">
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 rounded bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {quantity === 0 ? 'Remove from Cart' : 'Update Cart'}
          </button>
        </div>
        <div className="text-center mt-4 border-t pt-3">
          <button
            onClick={handleGoToCart}
            className="text-blue-600 hover:text-blue-800 underline text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border-0"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

AddToCartModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }),
  onAddToCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddToCartModal;
