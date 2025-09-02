import React, { useState } from 'react';

const AccessibilityWorkshopPage = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Prescription Glasses',
      category: 'vision',
      price: 89.99,
      description: 'High-quality prescription glasses with anti-reflective coating',
      image: '👓',
      inStock: true
    },
    {
      id: 2,
      name: 'Mobility Stickers',
      category: 'mobility',
      price: 12.99,
      description: 'Reflective stickers for mobility aids and wheelchairs',
      image: '🦽',
      inStock: true
    },
    {
      id: 3,
      name: 'Braille Labels',
      category: 'vision',
      price: 24.99,
      description: 'Self-adhesive braille labels for home organization',
      image: '🔤',
      inStock: false
    },
    {
      id: 4,
      name: 'Hearing Aid Batteries',
      category: 'hearing',
      price: 8.99,
      description: 'Long-lasting hearing aid batteries, pack of 6',
      image: '🔋',
      inStock: true
    },
    {
      id: 5,
      name: 'Accessible Door Handle',
      category: 'mobility',
      price: 45.99,
      description: 'Easy-grip door handle for limited mobility',
      image: '🚪',
      inStock: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vision', name: 'Vision Aids' },
    { id: 'mobility', name: 'Mobility Aids' },
    { id: 'hearing', name: 'Hearing Aids' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    // Missing feedback for screen readers
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    // Missing feedback for screen readers
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    // Missing focus management
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    // Missing focus management
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Missing skip link */}
      
      {/* Header with navigation issues */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Accessibility Store</h1>
            <div className="flex items-center space-x-4">
              {/* Missing proper button semantics */}
              <div 
                className="relative cursor-pointer"
                onClick={() => {/* Missing keyboard support */}}
              >
                <span className="text-lg">🛒</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and filters section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Missing label for search input */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            
            {/* Missing proper select semantics */}
            <div className="relative">
              <div 
                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
                onClick={() => {/* Missing keyboard support */}}
              >
                {categories.find(cat => cat.id === selectedCategory)?.name || 'All Products'}
              </div>
              {/* Missing dropdown implementation */}
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openProductModal(product)}
                // Missing keyboard support and proper semantics
              >
                <div className="text-4xl mb-4">{product.image}</div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                {/* Missing proper button semantics */}
                <div 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cart section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span>${item.price}</span>
                    {/* Missing proper button semantics */}
                    <span 
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Product modal with accessibility issues */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
              {/* Missing proper button semantics */}
              <span 
                className="text-2xl cursor-pointer"
                onClick={closeModal}
              >
                ×
              </span>
            </div>
            <div className="text-6xl mb-4 text-center">{selectedProduct.image}</div>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">${selectedProduct.price}</span>
              <span className={`px-3 py-1 rounded ${
                selectedProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            {/* Missing proper button semantics */}
            <div 
              className="w-full px-4 py-3 bg-blue-600 text-white rounded text-center cursor-pointer"
              onClick={() => {
                addToCart(selectedProduct);
                closeModal();
              }}
            >
              Add to Cart
            </div>
          </div>
        </div>
      )}

      {/* Missing ARIA live regions for dynamic content */}
      
      {/* Missing focus management */}
    </div>
  );
};

export default AccessibilityWorkshopPage;
