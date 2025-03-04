import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/ui/Toast';

// Create notification context
const NotificationContext = createContext();

// Custom hook to use notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const showNotification = useCallback(
    ({ message, type = 'info', duration = 3000 }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setNotifications((prev) => [...prev, { id, message, type, duration }]);
      return id;
    },
    []
  );

  // Remove a notification by id
  const hideNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Helper methods for common notification types
  const showSuccess = useCallback(
    (message, duration) => {
      return showNotification({ message, type: 'success', duration });
    },
    [showNotification]
  );

  const showError = useCallback(
    (message, duration) => {
      return showNotification({ message, type: 'error', duration });
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (message, duration) => {
      return showNotification({ message, type: 'info', duration });
    },
    [showNotification]
  );

  // Specific theme change notifications
  const showThemeChange = useCallback(
    (isDark) => {
      return showNotification({
        message: isDark ? 'Dark mode enabled' : 'Light mode enabled',
        type: isDark ? 'theme-dark' : 'theme-light',
        duration: 2000,
      });
    },
    [showNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        showSuccess,
        showError,
        showInfo,
        showThemeChange,
      }}
    >
      {children}
      {/* Render all active notifications */}
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
