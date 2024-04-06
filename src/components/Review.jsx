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
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h1 className="font-bold text-5xl text-black text-center mb-11">
          People Love Us
        </h1>

        <div className="grid grid-cols-1 gap-8">
          {/* Firebase Reviews */}
          <div className="grid grid-cols-12 max-w-sm sm:max-w-full mx-auto bg-slate-50 rounded-md shadow-sm p-4">
            <div className="col-span-12 lg:col-span-10">
              <div className="sm:flex gap-6">
                <img
                  src="https://pagedone.io/asset/uploads/1704364459.png"
                  alt="Robert image"
                  className="w-32 h-32"
                />
                <div className="text flex flex-col justify-center items-center">
                  <p className="font-medium text-2xl leading-8 text-gray-900 mb-2">
                    {review.name}
                  </p>
                  {/* Stars */}
                  <p>rate: {review.star}</p>
                  <div className="flex lg:hidden items-center gap-2 lg:justify-between w-full mb-5">
                    <FaRegStar className="icons" />
                    <FaRegStar className="icons" />
                    <FaRegStar className="icons" />
                    <FaRegStar className="icons" />
                    <FaRegStar className="icons" />
                  </div>
                  <p className="font-normal text-base leading-7 text-gray-400 mb-4 lg:text-center">
                    {review.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                      Nov 01, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-2 max-lg:hidden flex lg:items-center flex-row lg:flex-col justify-center max-lg:pt-6">
              <div className="flex items-center gap-2 lg:justify-between w-full mb-5">
                <FaRegStar className="icons" />
                <FaRegStar className="icons" />
                <FaRegStar className="icons" />
                <FaRegStar className="icons" />
                <FaRegStar className="icons" />
              </div>
              <p className="font-medium text-lg leading-8 text-gray-400 lg:text-center whitespace-nowrap">
                Nov 01, 2023
              </p>
            </div>
          </div>
          <div className="pb-8 border-b border-gray-100 w-full"></div>
        </div>
      </div>
    </section>
  );
}
