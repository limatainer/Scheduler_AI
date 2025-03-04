import React from 'react';

import Grid from './Grid';

import { FaArrowRightLong } from 'react-icons/fa6';
import { MdScheduleSend } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { TiMessages } from 'react-icons/ti';

const passos = [
  {
    id: 1,
    step: 'Step 1',
    icon: <MdScheduleSend className="text-2xl animate-pulse" />,
    description:
      'Navigate to our availability panel and check what time and date best fits you.',
    moveright: <FaArrowRightLong className="text-4xl animate-bounce" />,
  },
  {
    id: 2,
    step: 'Step 2',
    icon: <GiConfirmed className="text-2xl" />,
    description:
      'Navigate to our request panel, select your preferred date and time, compose a quick message, and hit submit. Within moments, you will receive a confirmation.',
    moveright: <FaArrowRightLong className="text-4xl animate-bounce" />,
  },
  {
    id: 3,
    step: 'Step 3',
    icon: <TiMessages className="text-2xl animate-pulse" />,
    description:
      'It is that easy! Almost instantly, a confirmation message will land in your inbox. Simplify your scheduling process with our swift and straightforward approach.',
    moveright: '',
  },
];

export default function Steps() {
  return (
    <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <header className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
          Scheduler
        </p>
        <h2
          className="max-w-lg mb-6 font-sans text-6xl font-bold 
        leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto"
        >
          <span className="relative inline-block mb-8">
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
        {passos.map((passo) => (
          <div className="relative text-center" key={passo.id}>
            <div
              className="flex items-center justify-center w-16 h-16 mx-auto 
         mb-4 rounded-full bg-secondary sm:w-20 sm:h-20"
            >
              {passo.icon}
            </div>
            <h6 className="mb-6 text-3xl font-extrabold">{passo.step}</h6>
            <p className="text-left max-w-md mb-3 text-md text-gray-900 sm:mx-auto">
              {passo.description}
            </p>

            <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
              {passo.moveright}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
