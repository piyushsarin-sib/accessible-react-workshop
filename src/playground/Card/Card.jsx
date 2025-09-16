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
      {/* FIXED ISSUE 3: added alt text */}
      <img
        alt="Wireless Headphones"
        className="w-full h-32 object-cover mb-3 rounded"
        src="/headphone.jpeg"
      />

      {/* FIXED ISSUE 2 & 5: Semantic heading + price tied with product */}
      <h3 className="text-lg font-semibold line-clamp-1">
        Wireless Headphones
        <span className="ml-2 text-blue-700 font-normal text-sm">(Rs 500)</span>
      </h3>

      {/* FIXED ISSUE 4: Meaningful description */}
      <p className="mb-2 text-sm line-clamp-2 h-10 overflow-hidden">
        Comfortable over-ear headphones with noise cancellation.
      </p>

      {/* FIXED ISSUE 1: Use semantic button */}
      <button
        onClick={handleAddToCart}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 text-sm w-full"
        aria-label="Add Wireless Headphones to cart"
      >
        Add to Cart
      </button>
    </li>
  );
};

const CardWrapper = () => {
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100%",
        gap: "20px",
      }}
    >
      <Card />
      <Card />
    </ul>
  );
};

export default CardWrapper;
