import React, { useState } from 'react';

const AccessibilityDemoPage = () => {
  const [showFixedVersion, setShowFixedVersion] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip link - This is what participants will add */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Accessibility Demo</h1>
            <button
              onClick={() => setShowFixedVersion(!showFixedVersion)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {showFixedVersion ? 'Show Broken Version' : 'Show Fixed Version'}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {showFixedVersion ? '✅ Fixed Version' : '❌ Broken Version'}
          </h2>

          {!showFixedVersion ? (
            /* BROKEN VERSION - What participants start with */
            <div className="space-y-8">
              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Search Products</h3>
                <div className="flex gap-4">
                  {/* Missing label - accessibility issue */}
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  {/* Missing proper button semantics - accessibility issue */}
                  <div className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white">
                    All Categories
                  </div>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  ❌ Issue: Search input has no label, dropdown is not keyboard accessible
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Product Card</h3>
                <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <div className="text-4xl mb-2">👓</div>
                  <h4 className="font-semibold">Prescription Glasses</h4>
                  <p className="text-gray-600">High-quality prescription glasses</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">$89.99</span>
                    {/* Missing proper button semantics - accessibility issue */}
                    <div className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                      Add to Cart
                    </div>
                  </div>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  ❌ Issue: Product card and button use div instead of proper semantics
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Cart (2 items)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Prescription Glasses</span>
                      <div className="flex items-center gap-4">
                        <span>$89.99</span>
                        {/* Missing proper button semantics - accessibility issue */}
                        <span className="text-red-500 cursor-pointer">Remove</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Mobility Stickers</span>
                      <div className="flex items-center gap-4">
                        <span>$12.99</span>
                        <span className="text-red-500 cursor-pointer">Remove</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>$102.98</span>
                    </div>
                    <button className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  ❌ Issue: Remove buttons use span instead of button elements
                </p>
              </section>
            </div>
          ) : (
            /* FIXED VERSION - What participants will achieve */
            <div className="space-y-8">
              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Search Products</h3>
                <div className="flex gap-4">
                  {/* Fixed: Proper label */}
                  <div className="flex-1">
                    <label htmlFor="search-input" className="sr-only">
                      Search products
                    </label>
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {/* Fixed: Proper button semantics */}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    All Categories
                  </button>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  ✅ Fixed: Search input has proper label, dropdown uses button element
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Product Card</h3>
                <div className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="text-4xl mb-2">👓</div>
                  <h4 className="font-semibold">Prescription Glasses</h4>
                  <p className="text-gray-600">High-quality prescription glasses</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">$89.99</span>
                    {/* Fixed: Proper button semantics */}
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  ✅ Fixed: Product card uses proper button element with focus styles
                </p>
              </section>

              <section className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Cart (2 items)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Prescription Glasses</span>
                      <div className="flex items-center gap-4">
                        <span>$89.99</span>
                        {/* Fixed: Proper button semantics */}
                        <button className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 px-2 py-1 rounded">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Mobility Stickers</span>
                      <div className="flex items-center gap-4">
                        <span>$12.99</span>
                        <button className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 px-2 py-1 rounded">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>$102.98</span>
                    </div>
                    <button className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  ✅ Fixed: Remove buttons use proper button elements with focus styles
                </p>
              </section>
            </div>
          )}

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Workshop Instructions</h3>
            <div className="space-y-3 text-blue-700">
              <p>🎯 <strong>Goal:</strong> Transform the broken version into the fixed version by implementing accessibility best practices.</p>
              <p>🔧 <strong>Tasks:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Add proper labels to form inputs</li>
                <li>Convert clickable divs to proper button elements</li>
                <li>Implement keyboard navigation support</li>
                <li>Add focus management and visible focus indicators</li>
                <li>Include ARIA live regions for dynamic content</li>
                <li>Test with keyboard-only navigation</li>
                <li>Test with screen readers</li>
              </ul>
              <p>📖 <strong>Reference:</strong> Check the <code>WORKSHOP_GUIDE.md</code> file for detailed step-by-step instructions.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessibilityDemoPage;
