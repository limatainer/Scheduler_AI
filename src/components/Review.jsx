import React, { useState, useEffect } from 'react';
import {
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

export default function Review({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentPage = Math.floor(currentIndex / reviewsPerPage);

  // Format date helper function
  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';

    // Check if timestamp is a Firebase Timestamp
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      return new Date(timestamp.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    // Handle regular date strings or timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Create star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    const ratingValue = Number(rating) || 0;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingValue ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  // Handle navigation
  const goToNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + reviewsPerPage) % reviews.length
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - reviewsPerPage < 0
        ? Math.max(
            0,
            reviews.length - (reviews.length % reviewsPerPage || reviewsPerPage)
          )
        : prevIndex - reviewsPerPage
    );
  };

  // Pagination component
  const Pagination = () => {
    return (
      <div className="flex items-center justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              setAutoplay(false);
              setCurrentIndex(i * reviewsPerPage);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentPage === i ? 'bg-primary-600 w-6' : 'bg-gray-300'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    );
  };

  // Auto-rotate effect
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, reviews]);

  // Stop autoplay when user interacts
  const handleUserInteraction = () => {
    setAutoplay(false);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        No reviews available at the moment.
      </div>
    );
  }

  // Get current reviews to display
  const currentReviews = reviews.slice(
    currentIndex,
    Math.min(currentIndex + reviewsPerPage, reviews.length)
  );

  return (
    <section className="py-12 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="font-bold text-3xl md:text-4xl text-gray-900 dark:text-white text-center mb-8">
          What Our Clients Say
        </h2>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentReviews.map((review, idx) => (
            <div
              key={review.id || idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700"
              onClick={handleUserInteraction}
            >
              <div className="flex items-start mb-4">
                <img
                  src={
                    review.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      review.name || 'User'
                    )}&background=random`
                  }
                  alt={`${review.name || 'User'}'s profile`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {review.name || 'Anonymous User'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.createdAt || review.date)}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <StarRating rating={review.star || review.rating || 0} />
              </div>

              <p className="text-gray-700 dark:text-gray-300 line-clamp-4 mb-2">
                {review.message ||
                  review.text ||
                  review.content ||
                  'No review content.'}
              </p>

              {(review.message || review.text || review.content || '').length >
                150 && (
                <button
                  className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                  onClick={handleUserInteraction}
                >
                  Read more
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {reviews.length > reviewsPerPage && (
          <>
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => {
                  handleUserInteraction();
                  goToPrev();
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous reviews"
              >
                <FaChevronLeft />
              </button>

              <Pagination />

              <button
                onClick={() => {
                  handleUserInteraction();
                  goToNext();
                }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next reviews"
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
