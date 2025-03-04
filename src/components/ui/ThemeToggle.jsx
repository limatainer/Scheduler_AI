import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';

const ThemeToggle = ({ className = '' }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { showThemeChange } = useNotification();

  const handleToggle = () => {
    // Toggle theme
    toggleDarkMode();

    // Show notification after a small delay to ensure the theme has changed
    setTimeout(() => {
      showThemeChange(!darkMode);
    }, 50);
  };

  return (
    <button
      onClick={handleToggle}
      className={`rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-yellow-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 ${className}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="h-5 w-5" />
      ) : (
        <FiMoon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
