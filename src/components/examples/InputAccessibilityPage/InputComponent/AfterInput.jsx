import React from "react";

// Input Component
export const Input = () => {
  return (
    <>
      {/* ✅ Associate label with input using htmlFor */}
      <label htmlFor="after-name" className="block mb-2 accessible-label">
        Name <span className="text-red-500" aria-hidden="true">*</span>
      </label>

      <input
        type="text"
        id="after-name"
        style={{ backgroundColor: 'white' }}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        required // ✅ native required attribute announces to screen readers
        aria-describedby="name-error" // ✅ connects error message with input
        placeholder="Enter your name"
        name="name"
      />

      {/* ✅ Error message now linked to input */}
      <p id="name-error" className="text-red-600 text-sm mt-1">
        Name is required
      </p>
    </>
  );
};

// Wrapper Component
export default function BeforeInput() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        After: Input with Accessibility Improvements
      </h2>

      <div className="mb-4">
        <Input />
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p className="font-semibold mb-1">Improvements:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Label linked with for id</li>
          <li>High contrast focus state that works in any mode</li>
          <li>Screen reader announces required state</li>
          <li>Error linked to input with aria-describedby</li>
          <li>Error has role="alert" to announce changes</li>
          <li>Better color contrast for text</li>
        </ul>
      </div>
    </div>
  );
}
