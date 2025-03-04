import React, { useEffect, useMemo, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const Calendar = () => {
  // State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch schedule data from Firestore
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsPending(true);

      try {
        const snapshot = await projectFirestore.collection('schedule').get();

        if (snapshot.empty) {
          setError('No schedules to load');
        } else {
          const results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setData(results);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchSchedule();
  }, []);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Memoized values for better performance
  const daysInMonth = useMemo(
    () =>
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate(),
    [currentMonth]
  );

  const firstDayOfMonth = useMemo(
    () =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(),
    [currentMonth]
  );

  const emptySlots = useMemo(
    () => Array.from({ length: firstDayOfMonth }, (_, i) => i),
    [firstDayOfMonth]
  );

  // Check if a date is taken
  const isDateTaken = useMemo(() => {
    if (!data) return () => false;

    const formattedDates = data.map((schedule) =>
      new Date(schedule.date.seconds * 1000).toLocaleDateString()
    );

    return (day) => {
      const formattedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      ).toLocaleDateString();

      return formattedDates.includes(formattedDate);
    };
  }, [data, currentMonth]);

  // Check if a date is today
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is in the past
  const isPastDate = (day) => {
    const today = new Date();
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    // Reset time component for accurate comparison
    today.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  // Handle day button click
  const handleDayClick = (day) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    console.log(
      clickedDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    );
  };

  return (
    <div className="md:w-1/2 max-w-xs mx-auto md:max-w-full md:mx-0 md:self-start">
      {/* Calendar header with navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4 text-center">
          {error}
        </div>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="text-primary-600 dark:text-primary-400 mb-4 text-center">
          Loading calendar data...
        </div>
      )}

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headings */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-1"
          >
            {day}
          </div>
        ))}

        {/* Empty slots for days before the 1st of the month */}
        {emptySlots.map((slot) => (
          <div key={`empty-${slot}`} className="text-center text-gray-400 p-2">
            {''}
          </div>
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isTakenDate = isDateTaken(day);
          const isTodayDate = isToday(day);
          const isPast = isPastDate(day);

          let dayClasses = 'text-center p-2 rounded-md transition-colors';

          if (isTakenDate) {
            dayClasses +=
              ' bg-accent-500 text-white dark:bg-accent-600 cursor-not-allowed';
          } else if (isPast) {
            dayClasses +=
              ' bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed';
          } else if (isTodayDate) {
            dayClasses +=
              ' bg-secondary-500 text-white dark:bg-secondary-600 hover:bg-secondary-600 dark:hover:bg-secondary-700 cursor-pointer';
          } else {
            dayClasses +=
              ' bg-primary-100 text-gray-800 dark:bg-primary-900 dark:text-gray-200 hover:bg-primary-200 dark:hover:bg-primary-800 cursor-pointer';
          }

          return (
            <div key={day} className={dayClasses}>
              <button
                onClick={() => handleDayClick(day)}
                disabled={isTakenDate || isPast}
                className="w-full h-full font-medium focus:outline-none"
                aria-label={`${currentMonth.toLocaleString('default', {
                  month: 'long',
                })} ${day}, ${currentMonth.getFullYear()}`}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-accent-500 dark:bg-accent-600 mr-2"></div>
          <span>Unavailable - Already booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-secondary-500 dark:bg-secondary-600 mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-primary-100 dark:bg-primary-900 mr-2"></div>
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
