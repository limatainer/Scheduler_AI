import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import Assistance from '../components/Assistance';
import { FiCalendar, FiFilter, FiPlus, FiClock, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { PageSEO } from '../components/ui/SEO';
import SchedulesView from '../components/SchedulesView';

const userID = import.meta.env.VITE_USER_ID;

export default function Schedules() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const isAdmin = user?.uid === userID;

  // Fetch schedules collection from Firestore
  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('schedule').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No schedules to load');
          setData([]);
          setFilteredData([]);
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setFilteredData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  // Apply filters when data or filter status changes
  useEffect(() => {
    if (!data) return;

    // First, filter by user if not admin
    const userSchedules = isAdmin
      ? data
      : data.filter((schedule) => user.uid === schedule.uid);

    if (filterStatus === 'all') {
      setFilteredData(userSchedules);
    } else {
      const now = new Date();
      setFilteredData(
        userSchedules.filter((schedule) => {
          const scheduleDate = new Date(schedule.date.seconds * 1000);
          const isDatePassed = scheduleDate < now;
          // Check if the schedule has a completed property
          const hasCompletedProp = 'completed' in schedule;

          if (filterStatus === 'pending') {
            // Consider as pending if date is in future OR (date is passed but marked as not completed)
            return (
              !isDatePassed ||
              (isDatePassed && hasCompletedProp && !schedule.completed)
            );
          } else {
            // Consider as completed if date is passed AND either no completed prop or completed is true
            return isDatePassed && (!hasCompletedProp || schedule.completed);
          }
        })
      );
    }
  }, [data, filterStatus, isAdmin, user]);

  // Get counts for badge displays - UPDATED to filter by user first
  const getCounts = () => {
    if (!data) return { total: 0, pending: 0, completed: 0 };

    // Filter data for current user if not admin
    const userSchedules = isAdmin
      ? data
      : data.filter((schedule) => user.uid === schedule.uid);

    const now = new Date();

    // Count pending items
    const pending = userSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date.seconds * 1000);
      const isDatePassed = scheduleDate < now;
      // If completed property exists, use it; otherwise, just check date
      if ('completed' in schedule) {
        return !isDatePassed || (isDatePassed && !schedule.completed);
      } else {
        return !isDatePassed; // Backward compatibility for items without completed prop
      }
    }).length;

    // Count completed items
    const completed = userSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date.seconds * 1000);
      const isDatePassed = scheduleDate < now;

      if ('completed' in schedule) {
        return isDatePassed && schedule.completed;
      } else {
        return isDatePassed; // Backward compatibility for items without completed prop
      }
    }).length;

    return {
      total: userSchedules.length,
      pending,
      completed,
    };
  };

  const counts = getCounts();

  // Loading state UI
  if (isPending) {
    return (
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-6"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-8"></div>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title="Schedules - Manage Your Appointments"
        description="View and manage your appointment requests and schedules"
      />

      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiCalendar className="text-primary-600 dark:text-primary-400" />
                <span>Manage Requests</span>
              </h1>

              <Link to="/request" className="button flex items-center gap-2">
                <FiPlus />
                <span>New Request</span>
              </Link>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {isAdmin
                ? 'View and manage all appointment requests from users.'
                : 'Track and manage your scheduled appointments.'}
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Requests
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {counts.total}
                    </h3>
                  </div>
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <FiCalendar size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Pending
                    </p>
                    <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {counts.pending}
                    </h3>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <FiClock size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Completed
                    </p>
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {counts.completed}
                    </h3>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <FiCheck size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-wrap items-center gap-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FiFilter />
                <span>Filter:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Requests ({counts.total})
                </button>

                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterStatus === 'pending'
                      ? 'bg-amber-500 text-white dark:bg-amber-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Pending ({counts.pending})
                </button>

                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filterStatus === 'completed'
                      ? 'bg-green-500 text-white dark:bg-green-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Completed ({counts.completed})
                </button>
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-8">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-3">{error}</span>
              </div>
            </div>
          )}

          {/* Request list */}
          {filteredData &&
            (filteredData.length === 0 ? (
              <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <FiCalendar className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No requests found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {filterStatus === 'all'
                    ? "You don't have any scheduled appointments yet."
                    : filterStatus === 'pending'
                    ? "You don't have any pending appointments."
                    : "You don't have any completed appointments."}
                </p>
                <Link to="/request" className="button">
                  Schedule an Appointment
                </Link>
              </div>
            ) : (
              <SchedulesView schedules={filteredData} isAdmin={isAdmin} />
            ))}

          {/* Assistance Section */}
          <div className="mt-12">
            <Assistance />
          </div>
        </div>
      </div>
    </>
  );
}
