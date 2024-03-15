import { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

import { useFirestore } from '../hooks/useFirestore';

import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Swal from 'sweetalert2';

export default function Calendaru() {
  const { user } = useAuthContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState('');
  const { addDocument, response } = useFirestore('schedule');

  // CALENDAR
  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const minTime = new Date().setHours(7, 0); // 7:00 AM
  const maxTime = new Date().setHours(20, 0); // 8:00 PM

  //NAVIGATE
  const navigate = useNavigate();

  // SUBMIT TO FIRESTORE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDocument({
        uid: user.uid,
        name: user.displayName,
        message,
        date: selectedDate,
      });

      // Provide feedback to the user upon successful submission
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful!',
        text: 'Your request has been submitted.',
      });

      // Clear form fields
      setMessage('');
      setSelectedDate(null);
      // Navigate to schedule list
      navigate('/schedule');
    } catch (error) {
      // Handle errors
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };

  //CALENDAR FUNCTIONS
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
    <>
      <div className="container mx-auto shadow m-2 p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Select a date from the calendar.
        </h1>
        <p className="text-center m-4 p-2">
          The dates in yellow indicates that will require approval.
        </p>
        <p className="text-center m-4 p-2">
          The dates in red indicates that all slots are already full.
        </p>
      </div>
      <section className="py-6 px-8 rounded-md shadow-md md:flex md:justify-center md:gap-8">
        {/* Calendar */}
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
        {/* Request Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xs mx-auto md:max-w-full md:mx-0 md:ml-8 md:self-start mt-4"
        >
          <label className="block mb-4">
            {/* <span className="mb-1">Pick a date </span> */}
            <DatePicker
              placeholderText=" Pick a date "
              showIcon
              isClearable
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={today}
              maxDate={endOfYear}
              minTime={minTime}
              maxTime={maxTime}
              className="w-full rounded-md shadow-sm focus:ring focus:ring-tertiary focus:ring-opacity-50 border-2 border-tertiary text-gray-800 placeholder-gray-400 p-2"
            />
          </label>
          <label className="block mb-4">
            <span className="text-tertiary mb-1 block">
              Send a personalized message:
            </span>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
              rows="3"
              className="w-full rounded-md shadow-sm focus:ring focus:ring-tertiary focus:ring-opacity-50 border-2 border-tertiary text-gray-800 placeholder-gray-400 p-2"
              placeholder="Type your message here..."
            ></textarea>
          </label>

          {response.isPending && <p>Loading...</p>}
          {response.error && <p className="text-accent">{response.error}</p>}

          <button type="submit" className="button self-center">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
