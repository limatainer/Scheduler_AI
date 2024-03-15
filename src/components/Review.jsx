import React, { useState, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';

const getRandomAvatarUrl = () => {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/100/100/?random=${randomId}`;
};

export default function Review({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    return <div className="error">No reviews to load...</div>;
  }

  const review = reviews[currentIndex];

  return (
    <div
      key={review.id}
      className="container flex flex-col w-full max-w-lg p-6 
      mx-auto bg-white border border-primary rounded-md shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div>
            <img
              src={getRandomAvatarUrl()}
              alt="Avatar"
              className="object-cover w-12 h-12 rounded-full bg-gray-500"
            />
          </div>
          <div>
            <h4 className="font-bold">{review.name}</h4>
            <span className="text-xs text-gray-600">Approved service</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-primary">
          <FaRegStar />
          <span className="text-xl font-bold">{review.star}</span>
        </div>
      </div>
      <div className="text-sm text-gray-800">
        <p>{review.message}</p>
      </div>
    </div>
  );
}
