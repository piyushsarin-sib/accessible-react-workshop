import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContextCore';
import AddToCartModal from '../components/AddToCartModal';
import AccessibilityCarousel from '../components/AccessibilityCarousel';
import SearchAndFilter from '../components/SearchAndFilter';
import CartModal from '../components/CartModal';

// Add category property to each product
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Comfortable over-ear headphones with noise cancellation.',
    image: '/headphone.jpeg',
    alt: 'Black wireless over-ear headphones',
    price: 'Rs 500',
    category: 'hearing',
    priceValue: 500,
  },
  {
    id: 2,
    name: 'Braille Keyboard',
    description: 'Keyboard with Braille for visually impaired users.',
    image: '/brailkeyboard.jpeg',
    alt: 'Braille keyboard with raised dots on keys',
    price: 'Rs 45000',
    category: 'vision',
    priceValue: 45000,
  },
  {
    id: 3,
    name: 'Wheelchair',
    description: 'Lightweight, foldable wheelchair for easy mobility.',
    image: '/wheelchair.jpeg',
    alt: 'Lightweight foldable wheelchair',
    price: 'Rs 2500',
    category: 'mobility',
    priceValue: 2500,
  },
  {
    id: 4,
    name: 'Smart Cane (Obstacle Detector)',
    description: 'Uses sensors to detect obstacles and provides alerts via vibrations.',
    image: '/ObstacleDetector.jpeg',
    alt: 'Smart cane with obstacle detection sensors',
    price: 'Rs 3000',
    category: 'vision',
    priceValue: 3000,
  },
  {
    id: 5,
    name: 'Behind-The-Ear (BTE) Digital Hearing Aid',
    description: 'An entry-level hearing aid that is powerful and durable.',
    image: '/behind_the_ear.jpeg',
    alt: 'Behind-the-ear digital hearing aid',
    price: 'Rs 8000–25000',
    category: 'hearing',
    priceValue: 8000,
  },
  {
    id: 6,
    name: 'Sensory Toy Kit for Autism/ADHD',
    description: 'A kit of sensory toys designed for children with Autism or ADHD.',
    image: '/SensoryToyKitforAutism.jpeg',
    alt: 'Sensory toy kit for Autism and ADHD',
    price: 'Rs 1500',
    category: 'sensory',
    priceValue: 1500,
  },
  {
    id: 7,
    name: 'Vibrating Alarm Clock',
    description: 'An alarm clock designed for deaf or hard-of-hearing individuals that uses vibrations to wake them up.',
    image: '/alarmClock.jpeg',
    alt: 'Vibrating alarm clock for deaf or hard-of-hearing',
    price: 'Rs 2000',
    category: 'hearing',
    priceValue: 2000,
  },
  {
    id: 8,
    name: 'Orthopedic Shoes (Diabetic-friendly)',
    description: 'Footwear designed to protect and comfort sensitive feet, with non-binding, soft soles.',
    image: '/shoes.jpeg',
    alt: 'Pair of orthopedic diabetic-friendly shoes',
    price: 'Rs 1000–3000 per pair',
    category: 'mobility',
    priceValue: 1000,
  },
];

const ProductListingPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ category: 'all', price: 'all' });
  const { addToCart } = useContext(CartContext);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  // Handle search input changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter products based on search and filters
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      
      // Price filter
      let matchesPrice = true;
      if (filters.price !== 'all') {
        switch(filters.price) {
          case 'under1000':
            matchesPrice = product.priceValue < 1000;
            break;
          case '1000-5000':
            matchesPrice = product.priceValue >= 1000 && product.priceValue <= 5000;
            break;
          case 'above5000':
            matchesPrice = product.priceValue > 5000;
            break;
          // No default needed as matchesPrice is already true
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, filters]);

  return (
    <>
      <main className="container mx-auto px-4" aria-labelledby="products-heading">
        <h1 id="products-heading" className="text-3xl font-bold my-8">
          Building Accessible Experiences
        </h1>
        
        {/* Accessibility Carousel */}
        <AccessibilityCarousel />
        
        <h2 className="text-2xl font-bold mb-4">
          Accessible Products
        </h2>
        <p className="mb-6">
          Explore our accessible products designed for everyone, including people with disabilities.
        </p>
        
        {/* Search and Filter Component */}
        <SearchAndFilter 
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />
        
        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8" aria-live="polite">
            <p className="text-lg text-gray-600">No products match your search criteria.</p>
            <p className="mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
        
        {/* Results count for screen readers */}
        {filteredProducts.length > 0 && (
          <div className="sr-only" aria-live="polite">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </div>
        )}
        
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
            >
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-32 object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-semibold line-clamp-1">
                {product.name}
              </h3>
              <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">{product.description}</p>
              <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
              <button
                onClick={() => handleOpenModal(product)}
                className="bg-blue-600 text-white w-full px-3 py-1.5 rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </main>
      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={handleCloseModal}
        />
      )}
      <CartModal />
    </>
  );
};

export default ProductListingPage;
