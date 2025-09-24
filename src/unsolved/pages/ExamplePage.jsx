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
          to="/examples/input-accessibility"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Input Accessibility</h2>
          <p className="text-gray-600 mt-2">Enhanced form fields with proper accessibility</p>
        </Link>
                  <Link
          to="/examples/modal-accessibility"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Modal Accessibility</h2>
          <p className="text-gray-600 mt-2">Improved modal dialogs with accessibility features</p>
        </Link>
                       <Link
          to="/examples/menu-accessibility"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Menu Accessibility</h2>
          <p className="text-gray-600 mt-2">Improved menu components with accessibility features</p>
        </Link>

             <Link
          to="/examples/command-palette-accessibility"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Command Palette Accessibility</h2>
          <p className="text-gray-600 mt-2">Enhanced command palette components with proper accessibility</p>
        </Link>
                     <Link
          to="/examples/carousal-accessibility"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Carousal Accessibility</h2>
          <p className="text-gray-600 mt-2">Enhanced carousal components with proper accessibility</p>
        </Link>
        <Link
          to="/examples/e-commerce"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-700">Accessible eCommerce</h2>
          <p className="text-gray-600 mt-2">E-commerce page with accessibility issues to fix</p>
        </Link>
      </div>
    </div>
  );
}
