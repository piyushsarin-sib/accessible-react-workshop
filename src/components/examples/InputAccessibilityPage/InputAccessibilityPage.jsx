import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import { AfterInput, BeforeInput} from './InputComponent';

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
          
         <BeforeInput/>
          
         {/* <AfterInput/> */}
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test It Yourself</h2>
          <p className="mb-4">
            Try navigating using your keyboard (Tab key) and notice the difference.
            Also, try using a screen reader to hear how the accessible version provides more context and information.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default InputAccessibilityPage;
