import React from "react";

// Input Component
export const Input = () => {
  return (
    <>
      <label htmlFor="after-name" className="block mb-2 accessible-label">
        Name <span className="text-red-500" aria-hidden="true">*</span>
        <span className="sr-only">(required)</span>
      </label>
      <input
        type="text"
        id="after-name"
        className="w-full rounded accessible-input accessible-focus"
        aria-required="true"
        aria-invalid="true"
        aria-describedby="after-name-error"
        placeholder="Enter your name"
        defaultValue="John Doe"
      />
      <p id="after-name-error" className="accessible-error-text" role="alert">
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
