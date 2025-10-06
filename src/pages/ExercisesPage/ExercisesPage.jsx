import React from "react";
import { Link } from "react-router-dom";

export default function ExamplePage() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }} >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Let's do some hands-on Accessibility:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Link
          to="/examples/e-commerce"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Accessible eCommerce</h2>
          <p className="text-gray-600 mt-2">E-commerce page with accessibility issues to fix</p>
        </Link>
        <Link
          to="/playground/card"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Card Accessibility</h2>
          <p className="text-gray-600 mt-2">Enhanced card components with proper accessibility</p>
        </Link>
        <Link
          to="/playground/product-grid"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Product Grid Accessibility</h2>
          <p className="text-gray-600 mt-2">Improved product grid layout with accessibility in mind</p>
        </Link>
        <Link
          to="/playground/nested-collection-with-titles"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Nested Collection Accessibility</h2>
          <p className="text-gray-600 mt-2">Improved nested collection layout with accessibility in mind</p>
        </Link>
        <Link
          to="/playground/filter-menu"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Filter Menu Accessibility</h2>
          <p className="text-gray-600 mt-2">Improved filter menu layout with accessibility in mind</p>
        </Link>
        <Link
          to="/playground/edge-cases"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Edge Cases Accessibility</h2>
          <p className="text-gray-600 mt-2">Improved handling of edge cases with accessibility in mind</p>
        </Link>
      </div>
    </div>
  );
}
