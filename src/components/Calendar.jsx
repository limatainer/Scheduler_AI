import React, { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';
export default function Calendar() {
  // CALENDAR
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  //THIS USER EFFECT IS TO DISPLAY THE REVIEWS COLLECTION FROM FIRESTORE
  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('schedule').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No schedules to load');
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            // console.log(doc)
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
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
  // AFTER LOADED IT WILL PASS DATA TO SCHEDULELIST COMPONENT AS SCHEDULES

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // Get the first day of the month
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Create an array of days in the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Create an array of empty slots for days before the first day of the month
  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const isDateTaken = (day) => {
    if (!data) return false;
    const formattedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toLocaleDateString();
    return data.some(
      (schedule) =>
        new Date(schedule.date.seconds * 1000).toLocaleDateString() ===
        formattedDate
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
        {days.map((day) => (
          <div
            key={day}
            className={`text-center text-sm font-medium rounded-md ${
              isDateTaken(day)
                ? 'bg-accent text-white' // Change to red color for taken dates
                : day === new Date().getDate()
                ? 'bg-secondary text-white'
                : 'bg-primary'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
