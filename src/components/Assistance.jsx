import React from 'react';

export default function Assistance() {
  return (
    <div className="text-center container mx-auto my-4 rounded-sm border shadow p-2">
      <h3 className="text-2xl font-bold mb-4">
        Need assistance or found something wrong? Contact us
      </h3>
      <p className="mb-4 text-tertiary">
        Our support staff is available 24/7 for you under the contact
      </p>
      <div
        className="max-w-md mx-auto border border-yellow-50 rounded-xl p-8
         sm:flex sm:space-x-6 shadow-2xl"
      >
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src="https://source.unsplash.com/100x100/?portrait?1"
            alt=""
            className="object-cover object-center w-full h-full rounded bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4 ">
          <div>
            <h2 className="text-2xl font-semibold text-blue-500">Elph</h2>
            <span className="text-sm text-gray-400">Developer Specialist</span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                {/* Email icon path */}
              </svg>
              <span className="text-gray-400">elph@gmail.com</span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Phonenumber"
                className="w-4 h-4"
              >
                {/* Phone icon path */}
              </svg>
              <span className="text-gray-400">+351 965000000</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
