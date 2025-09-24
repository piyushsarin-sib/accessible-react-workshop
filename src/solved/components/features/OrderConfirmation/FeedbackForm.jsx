import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import Rating from '../../common/Rating';
import FormGroup from '../../common/FormGroup';

// No longer needed as it's part of the Rating component
// Helper function to get rating text
// const getRatingText = (rating) => {
//   switch (rating) {
//     case 1: return 'Poor';
//     case 2: return 'Fair';
//     case 3: return 'Good';
//     case 4: return 'Very Good';
//     case 5: return 'Excellent';
//     default: return 'Good';
//   }
// };

/**
 * FeedbackForm component for collecting user feedback
 * Uses common components for consistent UI and accessibility
 */
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
      <div className="text-center py-4" aria-live="assertive">
        <h2 id="confirmation-title" className="text-2xl font-bold mb-4 text-center">
          Thank You!
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mb-4">Your feedback is invaluable to us. We appreciate your time.</p>
        <p className="text-sm text-gray-600 mb-6">Come back soon for more accessible shopping experiences!</p>
        <Button
          onClick={onClose}
          variant="primary"
        >
          Close
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 id="confirmation-title" className="text-2xl font-bold mb-4 text-center">
        Share Your Experience
      </h2>
      
      {/* Rating field */}
      <FormGroup
        label="How would you rate your experience?"
        htmlFor="rating"
      >
        <Rating
          value={rating}
          onChange={setRating}
          max={5}
          size="medium"
        />
      </FormGroup>
      
      {/* Comment field */}
      <FormGroup
        label="Comments or suggestions"
        htmlFor="comment"
        helpText="Your honest feedback helps us improve our accessible shopping experience."
      >
        <textarea
          id="comment"
          name="comment"
          rows={3}
          className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us what you liked or how we can improve..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </FormGroup>
      
      {/* Email field (optional) */}
      <FormGroup
        label="Email (optional)"
        htmlFor="email"
        helpText="We'll only use this to follow up on your feedback if needed."
      >
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="email"
        />
      </FormGroup>
      
      {/* Humorous note */}
      <div className="bg-blue-50 p-3 rounded-md">
        <p className="text-sm text-blue-700 italic">
          "Remember, this is all pretend, but your feedback is real and valued!"
        </p>
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <Button
          onClick={onClose}
          variant="secondary"
          className="mr-3"
        >
          Skip
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          Submit Feedback
        </Button>
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default FeedbackForm;
