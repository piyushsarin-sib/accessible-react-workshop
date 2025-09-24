/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

// Input Component
export const Input = () => {
  return (
    <>
      <label className="block mb-2">
        Name *
      </label>
      <input
        type="text"
        id="before-name"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        // aria-required="true"
        // required // ✅ native required attribute announces to screen readers
        placeholder="Enter your name"
      />
      <p className="text-red-500 text-sm mt-1">Name is required</p>
    </>
  );
};

// Wrapper Component
export default function BeforeInput() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Before: Input with Accessibility Issues
      </h2>

      <div className="mb-4">
        <Input />
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p className="font-semibold mb-1">Issues:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Poorly Associated Labels </li>
          <li>Insufficient color contrast</li>
          <li>Focus state not clearly visible enough</li>
          <li>Required state not announced to screen readers</li>
          <li>Error message not linked to input</li>

        </ul>
      </div>
    </div>
  );
}
