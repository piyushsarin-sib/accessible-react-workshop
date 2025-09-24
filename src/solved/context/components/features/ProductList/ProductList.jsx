import React from "react";
import PropTypes from "prop-types";
import Button from "../../common/Button";
import Collection from "../../../../../lib/Collections/Collection";

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8" aria-live="polite">
        <p className="text-lg text-gray-600">No products match your search criteria.</p>
        <p className="mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      {/* Results count for screen readers */}
      <div className="sr-only" aria-live="polite">
        {products.length} {products.length === 1 ? "product" : "products"} found
      </div>
      {/* COLLECTIONSSSSSSSSSS START */}
      <Collection
        as="ul"
        itemAs="li"
        // className="horizontal-cards"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        // itemClassName="card-item"
        itemClassName="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
        pattern="grid"
        ariaLabel="Product cards"
        items={products}
      >
        {(product) => (
          <>
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-32 object-cover mb-3 rounded"
            />
            <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
            <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">{product.description}</p>
            <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
            <Button
              onClick={() => onAddToCart(product)}
              className="w-full px-3 py-1.5 text-sm"
              ariaLabel={`Add ${product.name} to cart`}
              variant="primary"
            >
              Add to Cart
            </Button>
          </>
        )}
      </Collection>
      {/* COLLECTIONSSSSSSSSSS END */}
      {/* TODO: Remove below ul */}
      {/* <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
          >
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-32 object-cover mb-3 rounded"
            />
            <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
            <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">{product.description}</p>
            <span className="block font-bold mb-2 text-blue-700">{product.price}</span>
            <Button
              onClick={() => onAddToCart(product)}
              className="w-full px-3 py-1.5 text-sm"
              ariaLabel={`Add ${product.name} to cart`}
              variant="primary"
            >
              Add to Cart
            </Button>
          </li>
        ))}
      </ul> */}
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
