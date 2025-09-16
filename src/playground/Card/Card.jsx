/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

export const Card = () => {

  const handleAddToCart = () => {
    alert("Added to cart");
  };

  return (
      <li className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500" style={{ maxWidth: "500px" }}>
        <img
          alt="Black wireless over-ear headphones"
          className="w-full h-32 object-cover mb-3 rounded"
          src="/headphone.jpeg"
      />
      <h3 className="text-lg font-semibold line-clamp-1">Wireless Headphones</h3>
      <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">
        Comfortable over-ear headphones with noise cancellation.
      </p>
      <span className="block font-bold mb-2 text-blue-700">Rs 500</span>
      <div onClick={handleAddToCart}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 text-sm w-full"
        aria-label="Add Wireless Headphones to cart"
        type="button"
      >
        Add to Cart
      </div>
    </li>)
};

const CardWrapper = () => {
  return (
    <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <Card />
    </ul>
  );
};

export default CardWrapper;