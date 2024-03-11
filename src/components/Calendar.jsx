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

  // Memoized values
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
    <div className="md:w-1/2 max-w-xs mx-auto md:max-w-full md:mx-0 md:ml-8 md:self-start">
      <div className="m-4">
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm text-gray-600">
            {day}
          </div>
        ))}
        {emptySlots.map((slot) => (
          <div key={`empty-${slot}`} className="text-center text-gray-400">
            {''}
          </div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`text-center text-xl font-medium rounded-sm ${
              isDateTaken(day)
                ? 'bg-accent text-white cursor-not-allowed' // Change to red color for taken dates
                : day === new Date().getDate()
                ? 'bg-secondary text-white '
                : 'bg-primary hover:bg-slate-400 hover:cursor-pointer'
            }`}
          >
            <button
              onClick={() => handleDayClick(day)}
              disabled={isDateTaken(day)}
            >
              {day}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
