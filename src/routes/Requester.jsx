import { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

import { useFirestore } from '../hooks/useFirestore';

import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Swal from 'sweetalert2';
import Calendar from '../components/Calendar';

export default function Requester() {
  const { user } = useAuthContext();

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
        <Calendar />
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
