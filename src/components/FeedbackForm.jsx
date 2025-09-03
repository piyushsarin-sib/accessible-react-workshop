import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Helper function to get rating text
const getRatingText = (rating) => {
  switch (rating) {
    case 1: return 'Poor';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Very Good';
    case 5: return 'Excellent';
    default: return 'Good';
  }
};

const FeedbackForm = ({ onClose }) => {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to a server
    console.log('Feedback submitted:', { rating, comment, email });
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="text-center py-4" aria-live="polite">
        <h2 id="confirmation-title" className="text-2xl font-bold mb-4 text-center">
          Thank You!
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mb-4">Your feedback is invaluable to us. We appreciate your time.</p>
        <p className="text-sm text-gray-600 mb-6">Come back soon for more accessible shopping experiences!</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 id="confirmation-title" className="text-2xl font-bold mb-4 text-center">
        Share Your Experience
      </h2>
      
      {/* Rating field */}
      <div>
        <label 
          htmlFor="rating" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          How would you rate your experience?
        </label>
        <div className="flex items-center" role="radiogroup" aria-labelledby="rating-group">
          <span id="rating-group" className="sr-only">Select a rating from 1 to 5 stars</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`h-8 w-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              aria-label={`${star} star${star !== 1 ? 's' : ''}`}
              aria-pressed={rating === star}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600" aria-hidden="true">
            {getRatingText(rating)}
          </span>
          <input 
            type="hidden" 
            id="rating" 
            name="rating" 
            value={rating} 
            aria-label="Rating value"
          />
        </div>
      </div>
      
      {/* Comment field */}
      <div>
        <label 
          htmlFor="comment" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comments or suggestions
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Tell us what you liked or how we can improve..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-describedby="comment-description"
        />
        <p id="comment-description" className="mt-1 text-sm text-gray-500">
          Your honest feedback helps us improve our accessible shopping experience.
        </p>
      </div>
      
      {/* Email field (optional) */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-description"
        />
        <p id="email-description" className="mt-1 text-sm text-gray-500">
          We'll only use this to follow up on your feedback if needed.
        </p>
      </div>
      
      {/* Humorous note */}
      <div className="bg-blue-50 p-3 rounded-md">
        <p className="text-sm text-blue-700 italic">
          "Remember, this is all pretend, but your feedback is real and valued!"
        </p>
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Skip
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default FeedbackForm;
