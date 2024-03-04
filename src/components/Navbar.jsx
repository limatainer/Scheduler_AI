import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import { GrSchedulePlay } from 'react-icons/gr';
import { CiMenuBurger } from 'react-icons/ci';
import { TfiClose } from 'react-icons/tfi';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div
      className="px-4 py-6 mx-auto lg:py-8 sm:max-w-xl md:max-w-full 
    lg:max-w-screen-xl md:px-24 lg:px-8"
    >
      <div className="relative flex items-center justify-between lg:justify-center lg:space-x-16">
        <ul className="items-center hidden space-x-8 lg:flex">
          {/* If user condition */}
          {!user && (
            <>
              <li
                className="font-medium tracking-wide text-gray-700 
              transition-colors duration-200 hover:text-secondary"
              >
                <Link to="/">
                  Home
                  <GrSchedulePlay
                    className="inline-flex items-center ml-2 text-xl 
        font-bold tracking-wide text-gray-800 uppercase"
                  />
                </Link>
              </li>
              <li
                className="font-medium tracking-wide text-gray-700 
            transition-colors duration-200 hover:text-secondary"
              >
                <Link to="/login">Login</Link>
              </li>
              <li
                className="font-medium tracking-wide text-gray-700 
            transition-colors duration-200 hover:text-secondary"
              >
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li
                className="font-bold text-2xl tracking-wide text-tertiary 
            transition-colors duration-200 "
              >
                Hello, {user.displayName}
              </li>
              <li
                className="font-medium tracking-wide text-gray-700 
              transition-colors duration-200 hover:text-secondary"
              >
                <Link to="/">
                  Dashboard
                  <GrSchedulePlay
                    className="inline-flex items-center ml-2 text-xl 
        font-bold tracking-wide text-gray-800 uppercase"
                  />
                </Link>
              </li>

              <li
                className="font-medium tracking-wide text-gray-700 
            transition-colors duration-200 hover:text-secondary"
              >
                <Link to="/request">New Appointment</Link>
              </li>
              <li
                className="font-medium tracking-wide text-gray-700 
              transition-colors duration-200 hover:text-secondary"
              >
                <Link to="/schedule">My Requests</Link>
              </li>
              <li
                className="font-medium tracking-wide text-gray-700 
            transition-colors duration-200 hover:text-secondary"
              >
                <button className="button" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none 
            focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <CiMenuBurger className="w-5 text-gray-600" />
          </button>

          {/* Responsive Menu */}

          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <GrSchedulePlay
                    className="inline-flex items-center ml-2 text-xl font-bold 
                      tracking-wide text-gray-800 uppercase"
                  />
                  <button
                    aria-label="Close Menu"
                    title="Close Menu"
                    className="p-2 -mt-2 -mr-2 transition duration-200 
                      rounded hover:bg-gray-200 focus:bg-gray-200 
                      focus:outline-none focus:shadow-outline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TfiClose className="w-5 text-gray-600" />
                  </button>
                </div>

                <nav>
                  <ul className="space-y-4">
                    <li
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex items-center justify-center w-full 
                    h-12 px-6 font-medium tracking-wide transition duration-200 
                    rounded shadow-md hover:bg-secondary 
                    focus:shadow-outline focus:outline-none"
                    >
                      <Link to="/">Home</Link>
                    </li>

                    {/* If user condition */}
                    {!user && (
                      <>
                        <li
                          onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center justify-center w-full 
                    h-12 px-6 font-medium tracking-wide transition duration-200 
                    rounded shadow-md hover:bg-secondary 
                    focus:shadow-outline focus:outline-none"
                        >
                          <Link to="/login">Login</Link>
                        </li>
                        <li
                          onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center justify-center w-full 
                    h-12 px-6 font-medium tracking-wide transition duration-200 
                    rounded shadow-md hover:bg-secondary 
                    focus:shadow-outline focus:outline-none"
                        >
                          <Link to="/signup">Signup</Link>
                        </li>
                      </>
                    )}
                    {user && (
                      <>
                        <li
                          className="inline-flex items-center justify-center w-full 
                          h-12 px-6 font-medium tracking-wide transition duration-200 
                          rounded shadow-md  
                          focus:shadow-outline focus:outline-none"
                        >
                          Hello, {user.displayName}
                        </li>
                        <li
                          onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center justify-center w-full 
                    h-12 px-6 font-medium tracking-wide transition duration-200 
                    rounded shadow-md hover:bg-secondary 
                    focus:shadow-outline focus:outline-none"
                        >
                          <Link to="/schedule">Schedule</Link>
                        </li>
                        <li
                          onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center justify-center w-full 
                    h-12 px-6 font-medium tracking-wide transition duration-200 
                    rounded shadow-md hover:bg-secondary 
                    focus:shadow-outline focus:outline-none"
                        >
                          <Link to="/request">Request</Link>
                        </li>
                        <li
                          className="inline-flex items-center justify-center w-full 
                          h-12 px-6 font-medium tracking-wide transition duration-200 
                          rounded shadow-md hover:bg-secondary 
                          focus:shadow-outline focus:outline-none"
                        >
                          <button className="button" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
