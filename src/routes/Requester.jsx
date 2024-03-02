import { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

import { useFirestore } from '../hooks/useFirestore';

import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { FaMapLocationDot, FaWhatsapp } from 'react-icons/fa6';
import { IoMdMailUnread } from 'react-icons/io';

import Swal from 'sweetalert2';

export default function Requester() {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState('');
  const { addDocument, response } = useFirestore('schedule');

  const navigate = useNavigate();
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <section className="mt-2 py-6   p-8 rounded-md shadow-md">
      <main className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Make a request here</h1>
        <p className="text-lg mb-4">
          It's simple and easy. You will receive a confirmation message
          instantly.
        </p>
        <p>
          Please make sure to fill all the fields and accept our terms in order
          for us to be able to communicate with you.
        </p>
      </main>
      <div
        className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 
      md:grid-cols-2 md:divide-x"
      >
        {/* Address information on the left */}
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
          <div className="space-y-4">
            <p className="flex items-center">
              <FaMapLocationDot className="mr-2" />
              <span>Fake address, 9999 City</span>
            </p>
            <p className="flex items-center">
              <FaWhatsapp className="mr-2" />
              <span>123456789</span>
            </p>
            <p className="flex items-center">
              <IoMdMailUnread className="mr-2" />
              <span>contact@business.com</span>
            </p>
          </div>
        </div>

        {/* Form starts here */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
        >
          <label className="block">
            <span className="mb-1 mr-1">Date</span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri "
            />
          </label>
          <label className="block">
            <span className="mb-1">Message</span>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
              rows="3"
              className="block w-full rounded-md focus:ring focus:ri focus:ri "
            ></textarea>
          </label>

          {response.isPending && <p>Loading...</p>}
          {response.error && <p className="text-red-500">{response.error}</p>}

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
