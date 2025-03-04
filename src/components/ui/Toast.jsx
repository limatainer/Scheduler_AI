import React, { useState, useEffect } from 'react';
import {
  FiX,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from 'react-icons/fi';

// Toast component for notifications
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Wait for fade-out animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Icon based on toast type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />;
      case 'theme-light':
        return <FiSun className="h-5 w-5 text-orange-500" />;
      case 'theme-dark':
        return <FiMoon className="h-5 w-5 text-purple-500" />;
      default:
        return <FiInfo className="h-5 w-5 text-blue-500" />;
    }
  };

  // Background color based on toast type
  const getBgClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'theme-light':
        return 'bg-orange-50 dark:bg-orange-900/20';
      case 'theme-dark':
        return 'bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  // Text color based on toast type
  const getTextClass = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'theme-light':
        return 'text-orange-800 dark:text-orange-200';
      case 'theme-dark':
        return 'text-purple-800 dark:text-purple-200';
      default:
        return 'text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex w-72 transform items-center rounded-lg p-4 shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${getBgClass()} ${getTextClass()}`}
      role="alert"
    >
      <div className="mr-3 flex-shrink-0">{getIcon()}</div>
      <div className="mr-2 flex-1 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-transparent text-sm text-current hover:bg-gray-200 hover:text-gray-900"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose && onClose(), 300);
        }}
        aria-label="Close"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
