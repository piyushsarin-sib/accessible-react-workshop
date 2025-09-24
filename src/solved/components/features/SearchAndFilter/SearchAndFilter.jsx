import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import SimpleMenuExample from "./FilterMenu";

/* eslint-disable no-unused-vars */

// Categories derived from the product list for filtering
const categories = [
  { id: "all", name: "All Products" },
  { id: "hearing", name: "Hearing Assistance" },
  { id: "vision", name: "Visual Assistance" },
  { id: "mobility", name: "Mobility Aids" },
  { id: "sensory", name: "Sensory Tools" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "under1000", name: "Under ₹1,000" },
  { id: "1000-5000", name: "₹1,000 - ₹5,000" },
  { id: "above5000", name: "Above ₹5,000" },
];

const SearchAndFilter = ({ onSearchChange, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const searchInputRef = useRef(null);

  // Handle click outside to close filter dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Debounce search to prevent excessive filtering while typing
    const timeoutId = setTimeout(() => {
      onSearchChange(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle category filter change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onFilterChange({ category: categoryId, price: selectedPrice });
  };

  // Handle price filter change
  const handlePriceChange = (priceId) => {
    setSelectedPrice(priceId);
    onFilterChange({ category: selectedCategory, price: priceId });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPrice("all");
    onSearchChange("");
    onFilterChange({ category: "all", price: "all" });

    // Focus back on search input for better keyboard navigation
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Toggle filter dropdown
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mb-8">
      <h2 id="search-filter-heading" className="sr-only">
        Search and Filter Options
      </h2>

      {/* Main search and filter container */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input with accessible label */}
        <div className="relative flex-grow">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <span
              className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="search"
              id="product-search"
              name="product-search"
              className="block w-full pl-12 pr-10 py-3 border border-gray-300 rounded-md shadow-sm accessible-input accessible-focus"
              placeholder="Search for products"
              value={searchQuery}
              onChange={handleSearchChange}
              ref={searchInputRef}
              aria-describedby="search-description"
            />
            {searchQuery && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            )}
          </div>
          <div id="search-description" className="sr-only">
            Type to search for products by name or description
          </div>
        </div>

        {/* Filter dropdown button */}
        <div className="relative" ref={filterRef}>
          <button
            type="button"
            onClick={toggleFilters}
            className="w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 accessible-focus"
            aria-expanded={isFilterOpen}
            aria-controls="filter-dropdown"
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
              <svg
                className={`ml-2 h-5 w-5 transform ${isFilterOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {/* Filter dropdown panel */}
          {isFilterOpen && (
            <>
              <section
                id="filter-dropdown"
                className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                aria-labelledby="filter-heading"
              >
                <div className="p-4">
                  <h3 id="filter-heading" className="font-medium text-gray-900 mb-4">
                    Filter Products
                  </h3>

                  <SimpleMenuExample />

                  {/* Category filter */}
                  {/* <fieldset className="mb-4">
                    <legend className="text-sm font-semibold text-gray-900 mb-2">Category</legend>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`category-${category.id}`}
                            name="category"
                            type="radio"
                            checked={selectedCategory === category.id}
                            onChange={() => handleCategoryChange(category.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 accessible-focus"
                            aria-describedby={`category-${category.id}-description`}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="ml-3 text-sm text-gray-900 font-medium"
                          >
                            {category.name}
                          </label>
                          <span id={`category-${category.id}-description`} className="sr-only">
                            Filter products by {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </fieldset> */}

                  {/* Price range filter */}
                  {/* <fieldset className="mb-4">
                    <legend className="text-sm font-semibold text-gray-900 mb-2">
                      Price Range
                    </legend>
                    <div className="space-y-2">
                      {priceRanges.map((price) => (
                        <div key={price.id} className="flex items-center">
                          <input
                            id={`price-${price.id}`}
                            name="price"
                            type="radio"
                            checked={selectedPrice === price.id}
                            onChange={() => handlePriceChange(price.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 accessible-focus"
                            aria-describedby={`price-${price.id}-description`}
                          />
                          <label
                            htmlFor={`price-${price.id}`}
                            className="ml-3 text-sm text-gray-900 font-medium"
                          >
                            {price.name}
                          </label>
                          <span id={`price-${price.id}-description`} className="sr-only">
                            Filter products by price range {price.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </fieldset> */}

                  {/* Action buttons */}
                  {/* <div className="flex justify-end pt-2 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 accessible-focus"
                    >
                      Clear all filters
                    </button>
                  </div> */}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Clear search button - only show when there is text */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearFilters}
            className="md:hidden px-4 py-2 bg-gray-100 text-gray-900 rounded-md text-sm hover:bg-gray-200 accessible-focus font-medium"
            aria-label="Clear search and filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Active filters display */}
      {(selectedCategory !== "all" || selectedPrice !== "all" || searchQuery) && (
        <div className="mt-4 flex flex-wrap items-center gap-2" aria-live="polite">
          <span className="text-sm text-gray-600">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
              Search: {searchQuery}
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  onSearchChange("");
                }}
                className="ml-1 inline-flex text-blue-700 accessible-focus"
                aria-label={`Remove search filter: ${searchQuery}`}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </span>
          )}

          {selectedCategory !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
              Category: {categories.find((c) => c.id === selectedCategory)?.name}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  onFilterChange({ category: "all", price: selectedPrice });
                }}
                className="ml-1 inline-flex text-blue-700 accessible-focus"
                aria-label={`Remove category filter: ${
                  categories.find((c) => c.id === selectedCategory)?.name
                }`}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </span>
          )}

          {selectedPrice !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
              Price: {priceRanges.find((p) => p.id === selectedPrice)?.name}
              <button
                type="button"
                onClick={() => {
                  setSelectedPrice("all");
                  onFilterChange({ category: selectedCategory, price: "all" });
                }}
                className="ml-1 inline-flex text-blue-700 accessible-focus"
                aria-label={`Remove price filter: ${
                  priceRanges.find((p) => p.id === selectedPrice)?.name
                }`}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-blue-700 hover:text-blue-900 accessible-focus ml-auto font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

SearchAndFilter.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchAndFilter;
