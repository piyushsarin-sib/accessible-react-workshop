import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';

const InputAccessibilityPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/examples" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 accessible-focus"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Examples
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Accessible Input Elements</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Accessibility Improvements</h2>
          <p className="mb-4">
            We've enhanced the accessibility of input elements throughout the application to ensure they are usable by everyone, including people who use screen readers, keyboard navigation, or have visual impairments.
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>Added high contrast focus indicators for better keyboard navigation visibility</li>
            <li>Improved input labels with proper association and semantic markup</li>
            <li>Enhanced error messages with proper ARIA attributes and role="alert"</li>
            <li>Added clear instructions and hints with aria-describedby</li>
            <li>Made required fields clear both visually and for screen readers</li>
            <li>Improved text contrast for better readability</li>
            <li>Added consistent styles across all form elements</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Before: Input with Accessibility Issues</h2>
            
            <div className="mb-4">
              <label htmlFor="before-name" className="block mb-2">
                Name *
              </label>
              <input
                type="text"
                id="before-name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
                placeholder="Enter your name"
              />
              <p className="text-red-500 text-sm mt-1">
                Name is required
              </p>
            </div>
            
            <div className="mt-4 text-sm text-gray-700">
              <p className="font-semibold mb-1">Issues:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Focus state not clearly visible enough</li>
                <li>Required state not announced to screen readers</li>
                <li>Error message not linked to input</li>
                <li>Insufficient color contrast</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">After: Accessible Input</h2>
            
            <div className="mb-4">
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
            </div>
            
            <div className="mt-4 text-sm text-gray-700">
              <p className="font-semibold mb-1">Improvements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>High contrast focus state that works in any mode</li>
                <li>Screen reader announces required state</li>
                <li>Error linked to input with aria-describedby</li>
                <li>Error has role="alert" to announce changes</li>
                <li>Better color contrast for text</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test It Yourself</h2>
          <p className="mb-4">
            Try navigating both input examples using only your keyboard (Tab key) and notice the difference in focus visibility.
            Also, try using a screen reader to hear how the accessible version provides more context and information.
          </p>
          <p>
            For the full implementation, check out the components in the Cart Modal and Feedback Form.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default InputAccessibilityPage;
