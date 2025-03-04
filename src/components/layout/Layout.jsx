import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import {
  FiCalendar,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiPlusCircle,
  FiUser,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const Layout = ({ children }) => {
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items that change based on auth state
  const navItems = user
    ? [
        {
          to: '/homeuser',
          label: 'Home',
          icon: <FiHome className="h-5 w-5" />,
        },
        {
          to: '/schedule',
          label: 'Schedules',
          icon: <FiCalendar className="h-5 w-5" />,
        },
        {
          to: '/request',
          label: 'Request',
          icon: <FiPlusCircle className="h-5 w-5" />,
        },
      ]
    : [
        { to: '/', label: 'Home', icon: <FiHome className="h-5 w-5" /> },
        { to: '/login', label: 'Login', icon: <FiLogIn className="h-5 w-5" /> },
        {
          to: '/signup',
          label: 'Signup',
          icon: <FiUser className="h-5 w-5" />,
        },
      ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">
              Scheduler
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center space-x-1 font-medium transition-colors ${
                      location.pathname === item.to
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}

              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </li>
              )}

              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden">
            <ul className="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
              {navItems.map((item) => (
                <li key={item.to} className="py-2">
                  <Link
                    to={item.to}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                      location.pathname === item.to
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}

              {user && (
                <li className="py-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white py-6 shadow-inner dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Scheduler App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
