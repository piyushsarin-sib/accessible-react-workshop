import React from "react";
import { Link } from "react-router-dom";

export default function ExamplePage() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" style={{ width: "100%", minHeight: "60vh" }} >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Let's make some Components Accessible:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Link
          to="/examples/bad-button"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Bad Button</h2>
        </Link>
        <Link
          to="/examples/bad-modal"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Bad Modal</h2>
        </Link>
      </div>
    </div>
  );
}
