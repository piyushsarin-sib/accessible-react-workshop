/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

export const Card = () => {
  const handleAddToCart = () => {
    alert("Added to cart");
  };

  return (
    <li
      className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500"
      style={{ width: "600px" }}
    >
      {/* ISSUE 1: No alt text or misleading alt */}
      <img
        alt="" 
        className="w-full h-32 object-cover mb-3 rounded"
        src="/headphone.jpeg"
      />

      {/* ISSUE 2: Heading order not semantic */}
      <p className="text-lg font-semibold line-clamp-1">Wireless Headphones</p>

      {/* ISSUE 3: Description too short and vague */}
      <span className="mb-2 text-sm line-clamp-1 h-5 overflow-hidden">
        Great headphones
      </span>

      {/* ISSUE 4: Price not associated with product */}
      <div className="block font-bold mb-2 text-blue-700">Rs 500</div>

      {/* ISSUE 5: Non-semantic clickable div */}
      <div
        onClick={handleAddToCart}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 text-sm w-full"
        aria-label="Add Wireless Headphones to cart"
      >
        Add to Cart
      </div>
    </li>
  );
};

const CardWrapper = () => {
  return (
    <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", width: "100%", gap: "20px" }}>
      <Card />
      <Card />
    </ul>
  );
};

export default CardWrapper;