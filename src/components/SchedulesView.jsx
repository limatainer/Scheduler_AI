import { projectFirestore } from '../firebase/config';
import { GoDot } from 'react-icons/go';
import { CiTrash } from 'react-icons/ci';
import { FiClock, FiCheck, FiEye, FiCalendar } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

export default function SchedulesView({ schedules, isAdmin }) {
  const { user } = useAuthContext();
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  if (schedules.length === 0) {
    return (
      <div className="text-center p-6 m-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-center mb-4">
          <FiCalendar className="text-4xl text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
          No schedules to display
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {isAdmin
            ? 'There are no schedule requests at the moment.'
            : "You haven't made any schedule requests yet."}
        </p>
      </div>
    );
  }

  // Find the most recent schedule
  const mostRecentSchedule = schedules.reduce((prev, current) => {
    return prev.createdAt > current.createdAt ? prev : current;
  });

  // Filter schedules for regular users (only show their own)
  const filteredSchedules = isAdmin
    ? schedules
    : schedules.filter((schedule) => user.uid === schedule.uid);

  // DELETE A SCHEDULE
  const deleteRequest = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1', // primary color
      cancelButtonColor: '#f43f5e', // accent color
      confirmButtonText: 'Yes, delete it!',
      background: document.documentElement.classList.contains('dark')
        ? '#1f2937'
        : '#ffffff',
      color: document.documentElement.classList.contains('dark')
        ? '#f3f4f6'
        : '#111827',
    }).then((result) => {
      if (result.isConfirmed) {
        projectFirestore.collection('schedule').doc(id).delete();
        setSelectedSchedule(null);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your request has been deleted.',
          icon: 'success',
          background: document.documentElement.classList.contains('dark')
            ? '#1f2937'
            : '#ffffff',
          color: document.documentElement.classList.contains('dark')
            ? '#f3f4f6'
            : '#111827',
        });
      }
    });
  };

  // View full details
  const viewDetails = (schedule) => {
    setSelectedSchedule(schedule);
  };

  // Close details modal
  const closeDetails = () => {
    setSelectedSchedule(null);
  };

  // Get status based on date
  const getStatus = (date) => {
    const now = new Date();
    const scheduleDate = new Date(date.seconds * 1000);

    if (scheduleDate < now) {
      return {
        status: 'Completed',
        icon: <FiCheck className="text-green-500" />,
        color:
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      };
    } else {
      return {
        status: 'Pending',
        icon: <FiClock className="text-amber-500" />,
        color:
          'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      };
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 p-4">
        {filteredSchedules.map((schedule) => {
          const { status, icon, color } = getStatus(schedule.date);

          return (
            <div
              key={schedule.id}
              className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg"
            >
              <div className="absolute flex items-center gap-2 top-4 right-4">
                <button
                  onClick={() => viewDetails(schedule)}
                  className="p-2 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-700"
                  title="View details"
                >
                  <FiEye className="text-xl" />
                </button>
                <button
                  onClick={() => deleteRequest(schedule.id)}
                  className="p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-700"
                  title="Delete request"
                >
                  <CiTrash className="text-xl" />
                </button>
                {schedule.id === mostRecentSchedule.id && (
                  <GoDot className="text-xl absolute -top-1 -right-1 animate-ping text-accent-600 dark:text-accent-400" />
                )}
              </div>

              <div className="mt-4 mb-6">
                <h3 className="text-xl font-semibold mb-2 pr-16 text-primary-600 dark:text-primary-400">
                  {schedule.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <FiCalendar className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(schedule.date.seconds * 1000).toLocaleString(
                      'en-US',
                      {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${color}`}
                  >
                    {icon}
                    {status}
                  </span>
                </div>
              </div>

              <div className="text-gray-700 dark:text-gray-300 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                <p className="line-clamp-2">
                  {schedule.message.length > 100
                    ? `${schedule.message.substring(0, 100)}...`
                    : schedule.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedSchedule && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex justify-center items-center p-4"
          onClick={closeDetails}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-lg w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Request Details
              </h2>
              <button
                onClick={closeDetails}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Requester
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedSchedule.name}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date & Time
                </label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {new Date(
                    selectedSchedule.date.seconds * 1000
                  ).toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Message
                </label>
                <p className="text-gray-700 dark:text-gray-300 mt-1 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  {selectedSchedule.message}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Created
                </label>
                <p className="text-gray-700 dark:text-gray-300">
                  {new Date(
                    selectedSchedule.createdAt.seconds * 1000
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button onClick={closeDetails} className="button-outline">
                Close
              </button>
              <button
                onClick={() => deleteRequest(selectedSchedule.id)}
                className="button-accent"
              >
                Delete Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
