import React from 'react';

import { FaRegStar } from 'react-icons/fa';

const getRandomAvatarUrl = () => {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/100/100/?random=${randomId}`;
};
export default function Review({ reviews }) {
  if (reviews.length === 0) {
    return <div className="error">No reviews to load...</div>;
  }

  return (
    <div className="recipe-list">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-accent "
        >
          <div className="flex justify-between p-4">
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
                <span className="text-xs text-tertiary">Approved service</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-primary">
              <FaRegStar />
              <span className="text-xl font-bold">{review.star}</span>
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm text-gray-400">
            <p>{review.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
