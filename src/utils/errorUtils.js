/**
 * Error handling utilities for consistent error handling across the application
 */

// Map Firebase auth error codes to user-friendly messages
export const getAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':
      'Password is too weak. Please use a stronger password.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/account-exists-with-different-credential':
      'An account already exists with the same email but different sign-in credentials.',
    'auth/invalid-credential': 'The authentication credential is invalid.',
    'auth/operation-not-allowed': 'This operation is not allowed.',
    'auth/requires-recent-login':
      'Please sign in again to complete this action.',
    'auth/too-many-requests':
      'Too many unsuccessful login attempts. Please try again later.',
    'auth/network-request-failed':
      'Network error. Please check your internet connection.',
    'auth/popup-closed-by-user':
      'Sign-in popup was closed before completing the sign-in.',
    'auth/cancelled-popup-request': 'Sign-in popup request was cancelled.',
    'auth/popup-blocked': 'Sign-in popup was blocked by the browser.',
    'auth/unauthorized-domain':
      'This domain is not authorized for OAuth operations.',
    'auth/invalid-action-code':
      'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
  };

  return (
    errorMessages[errorCode] ||
    'An unexpected authentication error occurred. Please try again.'
  );
};

// Map Firebase Firestore error codes to user-friendly messages
export const getFirestoreErrorMessage = (errorCode) => {
  const errorMessages = {
    'permission-denied': 'You do not have permission to access this resource.',
    'not-found': 'The requested document was not found.',
    'already-exists': 'The document already exists.',
    'resource-exhausted': 'Quota exceeded. Please try again later.',
    'failed-precondition':
      'Operation was rejected because the system is not in a state required for the operation.',
    aborted: 'The operation was aborted.',
    'out-of-range': 'Operation was attempted past the valid range.',
    unimplemented: 'Operation is not implemented or not supported.',
    internal: 'Internal server error. Please try again later.',
    unavailable:
      'The service is currently unavailable. Please try again later.',
    'data-loss': 'Unrecoverable data loss or corruption.',
    unauthenticated: 'Your session has expired. Please sign in again.',
  };

  return (
    errorMessages[errorCode] ||
    'An unexpected database error occurred. Please try again.'
  );
};

// General error handler for API requests
export const handleApiError = (error) => {
  console.error('API Error:', error);

  // Check if it's a network error
  if (!navigator.onLine) {
    return {
      type: 'network',
      message:
        'No internet connection. Please check your network settings and try again.',
    };
  }

  // Check if it's a timeout error
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return {
      type: 'timeout',
      message: 'The request timed out. Please try again later.',
    };
  }

  // Handle Axios errors
  if (error.response) {
    // Server responded with a status code outside of 2xx range
    switch (error.response.status) {
      case 400:
        return {
          type: 'validation',
          message:
            error.response.data?.message ||
            'The server could not process your request. Please check your inputs.',
          details: error.response.data?.errors || [],
        };
      case 401:
        return {
          type: 'auth',
          message: 'Your session has expired. Please sign in again.',
        };
      case 403:
        return {
          type: 'permission',
          message: 'You do not have permission to perform this action.',
        };
      case 404:
        return {
          type: 'not-found',
          message: 'The requested resource was not found.',
        };
      case 429:
        return {
          type: 'rate-limit',
          message: 'Too many requests. Please try again later.',
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: 'server',
          message: 'A server error occurred. Please try again later.',
        };
      default:
        return {
          type: 'unknown',
          message:
            error.response.data?.message ||
            'An unexpected error occurred. Please try again.',
        };
    }
  }

  // Default error message
  return {
    type: 'unknown',
    message: error.message || 'An unexpected error occurred. Please try again.',
  };
};

// Log errors to analytics or monitoring service
export const logError = (error, context = {}) => {
  console.error('Error:', error, 'Context:', context);

  // Here you would integrate with error monitoring services like Sentry
  // Example: Sentry.captureException(error, { extra: context });
};

// Retry a function with exponential backoff
export const retry = async (fn, maxRetries = 3, initialDelay = 1000) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      retries++;

      if (retries >= maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const delay =
        initialDelay * Math.pow(2, retries - 1) + Math.random() * 1000;

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Debounce function to limit how often a function can be called
export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Create a validator object for form validation
export const createValidator = (schema) => {
  return {
    validate: (data) => {
      try {
        const validatedData = schema.validateSync(data, { abortEarly: false });
        return { isValid: true, data: validatedData, errors: {} };
      } catch (error) {
        const errors = {};

        if (error.inner) {
          error.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
        }

        return { isValid: false, data, errors };
      }
    },
  };
};
