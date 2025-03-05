import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { projectFirestore } from '../firebase/config';
import { useNotification } from '../context/NotificationContext';

const ReviewForm = ({ user, onClose }) => {
  const { showSuccess, showError } = useNotification();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      showError('Please enter a review message');
      return;
    }

    if (rating === 0) {
      showError('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the review data
      const reviewData = {
        name: user.displayName,
        message: message.trim(),
        star: rating,
        createdAt: new Date(),
        userId: user.uid,
        photoURL: user.photoURL || null,
      };

      // Add to Firestore
      await projectFirestore.collection('reviews').add(reviewData);

      // Show success message
      showSuccess('Your review has been submitted. Thank you!');

      // Reset form and close
      setMessage('');
      setRating(0);
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      showError('Failed to submit your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
        Share Your Experience
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            How would you rate our service?
          </label>
          <div className="flex justify-center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;

              return (
                <label key={index} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={32}
                    className="mx-1 transition-colors duration-200"
                    color={
                      ratingValue <= (hover || rating) ? '#FFD700' : '#e4e5e9'
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
          <p className="text-center text-sm mt-2 text-gray-500 dark:text-gray-400">
            {rating > 0
              ? `You selected ${rating} star${rating > 1 ? 's' : ''}`
              : 'Click to rate'}
          </p>
        </div>

        {/* Review Message */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Your Review
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your experience..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
