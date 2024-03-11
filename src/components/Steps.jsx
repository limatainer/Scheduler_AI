import React from 'react';

import Grid from '../constant/Grid';

import { FaArrowRightLong } from 'react-icons/fa6';
import { MdScheduleSend } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { TiMessages } from 'react-icons/ti';
import { Link } from 'react-router-dom';

export default function Steps() {
  return (
    <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <header className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
          Schedule
        </p>
        <h2
          className="max-w-lg mb-6 font-sans text-3xl font-bold 
        leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
        >
          <span className="relative inline-block">
            <Grid />
            <span className="relative text-tertiary">
              Effortless and Efficient:{' '}
            </span>
          </span>{' '}
          Schedule Your Appointment in Just One Click!
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Scheduling an appointment with us is a breeze. Follow these simple
          steps:
        </p>
      </header>
      <div className="grid gap-8 row-gap-0 lg:grid-cols-3">
        <div className="relative text-center">
          <div
            className="flex items-center justify-center w-16 h-16 mx-auto 
         mb-4 rounded-full bg-secondary sm:w-20 sm:h-20"
          >
            <MdScheduleSend className="text-2xl" />
          </div>
          <h6 className="mb-2 text-2xl font-extrabold">Step 1</h6>
          <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
            Navigate to our availability panel and check what time and date best
            fits you.
          </p>
          <Link
            to="/schedule"
            className="inline-flex items-center font-semibold transition-colors 
  duration-200 text-accent hover:text-primary"
          >
            Availability
          </Link>
          <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
            <FaArrowRightLong className="text-2xl" />
          </div>
        </div>
        <div className="relative text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-secondary sm:w-20 sm:h-20">
            <TiMessages className="text-2xl" />
          </div>
          <h6 className="mb-2 text-2xl font-extrabold">Step 2</h6>
          <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
            Navigate to our request panel, select your preferred date and time,
            compose a quick message, and hit submit. Within moments, you'll
            receive a confirmation.
          </p>

          <Link
            to="/request"
            className="inline-flex items-center font-semibold transition-colors 
            duration-200 hover:text-secondary"
          >
            Request
          </Link>
          <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
            <FaArrowRightLong className="text-2xl" />
          </div>
        </div>
        <div className="relative text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-secondary sm:w-20 sm:h-20">
            <GiConfirmed className="text-2xl" />
          </div>
          <h6 className="mb-2 text-2xl font-extrabold">Step 3</h6>
          <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
            It's that easy! Almost instantly, a confirmation message will land
            in your inbox. Simplify your scheduling process with our swift and
            straightforward approach.
          </p>
        </div>
      </div>
    </section>
  );
}
