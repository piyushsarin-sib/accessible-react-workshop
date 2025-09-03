import React from 'react';

const AccessibilityGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Accessibility Guide for Input Elements</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Accessible Input Best Practices</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Clear Labels:</strong> All input fields have clear, descriptive labels directly associated with the input.
            </li>
            <li>
              <strong>Required Fields:</strong> Required fields are marked with an asterisk and include "required" in screen reader text.
            </li>
            <li>
              <strong>Error Handling:</strong> Error messages are associated with inputs using aria-describedby and are announced to screen readers.
            </li>
            <li>
              <strong>Focus Indicators:</strong> All inputs have high-contrast focus indicators to show keyboard focus.
            </li>
            <li>
              <strong>Descriptive Text:</strong> Additional descriptive text is associated with inputs using aria-describedby.
            </li>
            <li>
              <strong>Proper Contrast:</strong> Text inputs maintain proper color contrast for better readability. Black text (#000000) on white background (#FFFFFF) achieves a contrast ratio of 21:1, far exceeding the WCAG AAA requirement of 7:1.
            </li>
            <li>
              <strong>ARIA Attributes:</strong> Using aria-required, aria-invalid, and aria-describedby for screen reader users.
            </li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Example: Accessible Input Field</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="demo-name" className="block mb-2 accessible-label">
              Full Name <span className="text-red-500" aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              type="text"
              id="demo-name"
              className="w-full rounded accessible-input accessible-focus"
              aria-required="true"
              aria-describedby="name-description"
              placeholder="Enter your full name"
            />
            <p id="name-description" className="mt-1 accessible-description">
              Please enter your full name as it appears on your ID.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Label is directly associated with the input using htmlFor/id</li>
              <li>Required state is indicated both visually and for screen readers</li>
              <li>Focus state has high contrast outline for better visibility</li>
              <li>Help text is associated with the input using aria-describedby</li>
              <li>Placeholder text provides additional guidance</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <a 
                href="https://www.w3.org/WAI/ARIA/apg/patterns/forms/" 
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                WAI-ARIA Authoring Practices Guide: Forms
              </a>
            </li>
            <li>
              <a 
                href="https://www.w3.org/WAI/tutorials/forms/" 
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                W3C Web Accessibility Tutorials: Forms
              </a>
            </li>
            <li>
              <a 
                href="https://webaim.org/techniques/forms/" 
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                WebAIM: Creating Accessible Forms
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AccessibilityGuide;
