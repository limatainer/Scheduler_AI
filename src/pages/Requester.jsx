import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Calendar from '../components/Calendar';

export default function Requester() {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState('');
  const { addDocument, response } = useFirestore('schedule');
  const navigate = useNavigate();

  // Calendar date constraints
  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const minTime = new Date().setHours(7, 0); // 7:00 AM
  const maxTime = new Date().setHours(20, 0); // 8:00 PM

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!selectedDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Date Required',
        text: 'Please select a date for your appointment.',
        background: document.documentElement.classList.contains('dark')
          ? '#1f2937'
          : '#ffffff',
        color: document.documentElement.classList.contains('dark')
          ? '#f3f4f6'
          : '#111827',
      });
      return;
    }

    if (!message.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Message Required',
        text: 'Please enter a message with your request.',
        background: document.documentElement.classList.contains('dark')
          ? '#1f2937'
          : '#ffffff',
        color: document.documentElement.classList.contains('dark')
          ? '#f3f4f6'
          : '#111827',
      });
      return;
    }

    try {
      // Add document to Firestore
      await addDocument({
        uid: user.uid,
        name: user.displayName,
        message,
        date: selectedDate,
        createdAt: new Date(), // Add timestamp for sorting
      });

      // Provide feedback to the user upon successful submission
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful!',
        text: 'Your request has been submitted.',
        background: document.documentElement.classList.contains('dark')
          ? '#1f2937'
          : '#ffffff',
        color: document.documentElement.classList.contains('dark')
          ? '#f3f4f6'
          : '#111827',
      });

      // Clear form fields
      setMessage('');
      setSelectedDate(null);

      // Navigate to schedule list
      navigate('/schedule');
    } catch (error) {
      console.error('Error submitting request:', error);

      // Handle errors
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        background: document.documentElement.classList.contains('dark')
          ? '#1f2937'
          : '#ffffff',
        color: document.documentElement.classList.contains('dark')
          ? '#f3f4f6'
          : '#111827',
      });
    }
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700 mt-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Select a date from the calendar
        </h1>
        <p className="text-center m-4 p-2 text-gray-600 dark:text-gray-300">
          The dates in yellow indicates that will require approval.
        </p>
        <p className="text-center m-4 p-2 text-gray-600 dark:text-gray-300">
          The dates in red indicates that all slots are already full.
        </p>
      </div>

      <section className="py-6 px-4 md:px-8 rounded-lg bg-white dark:bg-gray-800 dark:border dark:border-gray-700 shadow-md md:flex md:justify-center md:gap-8 container mx-auto">
        {/* Calendar */}
        <Calendar />

        {/* Request Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xs mx-auto md:max-w-full md:mx-0 md:ml-8 md:self-start mt-4"
        >
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pick a date and time
            </label>
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
              className="w-full rounded-lg shadow-sm focus:ring focus:ring-primary-500 focus:border-primary-500 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-2.5"
              calendarClassName="!bg-white dark:!bg-gray-800 !border-gray-300 dark:!border-gray-600 !text-gray-900 dark:!text-white"
              dayClassName={(date) =>
                'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Send a personalized message:
            </label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
              rows="4"
              className="w-full rounded-lg shadow-sm focus:ring focus:ring-primary-500 focus:border-primary-500 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-2.5"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          {response.isPending && (
            <div className="mb-4 text-primary-600 dark:text-primary-400">
              Submitting request...
            </div>
          )}

          {response.error && (
            <div className="mb-4 text-red-600 dark:text-red-400">
              {response.error}
            </div>
          )}

          <button
            type="submit"
            className="button w-full"
            disabled={response.isPending}
          >
            {response.isPending ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </section>
    </>
  );
}
