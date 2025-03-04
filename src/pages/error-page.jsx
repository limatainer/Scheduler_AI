import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300">
            <FiAlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Oops!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sorry, an unexpected error has occurred.
          </p>
        </div>

        <div className="mb-6 rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          <p className="font-medium">Error details:</p>
          <p className="mt-1">
            {error.statusText || error.message || 'Unknown error'}
          </p>
          {error.stack && process.env.NODE_ENV !== 'production' && (
            <pre className="mt-2 overflow-auto rounded bg-gray-200 p-2 text-xs dark:bg-gray-600 dark:text-gray-300">
              {error.stack.split('\n').slice(0, 3).join('\n')}
            </pre>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-center font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-primary-700 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
          >
            <FiHome className="mr-2 h-5 w-5" />
            Back to homepage
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center font-medium text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-100 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
