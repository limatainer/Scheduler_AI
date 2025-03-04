import React from 'react';

export default function Assistance() {
  return (
    <div className="text-center container mx-auto my-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6 bg-white dark:bg-gray-800">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Need assistance or found something wrong? Contact us
      </h3>
      <p className="mb-6 text-primary-600 dark:text-primary-400">
        Our support staff is available 24/7 for you under the contact
      </p>
      <div
        className="max-w-md mx-auto rounded-xl p-6 sm:flex sm:space-x-6 
        shadow-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
      >
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src="https://source.unsplash.com/100x100/?portrait?1"
            alt="Support specialist"
            className="object-cover object-center w-full h-full rounded-full bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-primary-600 dark:text-primary-400">
              Elph
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Developer Specialist
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4 text-gray-600 dark:text-gray-400"
                fill="currentColor"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                elph@gmail.com
              </span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Phone number"
                className="w-4 h-4 text-gray-600 dark:text-gray-400"
                fill="currentColor"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">
                +351 965000000
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
