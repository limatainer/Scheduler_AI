import React from 'react';
import { Link } from 'react-router-dom';

import { IoBarbellOutline } from 'react-icons/io5';
import { GiBeard, GiHairStrands } from 'react-icons/gi';
import { MdSportsGymnastics } from 'react-icons/md';

export default function Services() {
  return (
    <section className="px-4 py-8 mt-24 sm:py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col lg:flex-row">
        <header className="max-w-xl w-full lg:w-1/2 pr-4 lg:pr-16 mx-auto mb-10 flex flex-col items-center lg:items-start">
          <h1 className="mb-6 text-5xl font-extrabold leading-none">
            Welcome to our Service Appointment page!
          </h1>
          <p className="mb-6 text-gray-900">
            Experience top-notch service crafted specifically for your needs.
            Whether you're reaching out for the first time or you're already
            familiar with us, scheduling an appointment with our specialists is
            a breeze. Explore our availability panel and effortlessly request a
            date confirmation to secure your dedicated service slot. We look
            forward to serving you with excellence!
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/signup" className="button">
              Start using
            </Link>
            <p
              className="inline-flex items-center font-semibold transition-colors 
            duration-200 text-secondary"
            >
              Simplify your life with Scheduler
            </p>
          </div>
        </header>
        <div className="grid gap-5 row-gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
          <div className="max-w-md">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary">
              <IoBarbellOutline className="text-3xl" />
            </div>
            <h6 className="mb-2 font-semibold leading-5">Health</h6>
            <p className="text-sm text-gray-700">
              Request a health service and improve your life wellness
            </p>
          </div>
          <div className="max-w-md">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary">
              <GiHairStrands className="text-3xl" />
            </div>
            <h6 className="mb-2 font-semibold leading-5">Style</h6>
            <p className="text-sm text-gray-700">
              Hair stylist and nail polisher
            </p>
          </div>
          <div className="max-w-md">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary">
              <GiBeard className="text-3xl" />
            </div>
            <h6 className="mb-2 font-semibold leading-5">Barber</h6>
            <p className="text-sm text-gray-700">Grow a beard</p>
          </div>
          <div className="max-w-md">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary">
              <MdSportsGymnastics className="text-3xl" />
            </div>
            <h6 className="mb-2 font-semibold leading-5">Exercise</h6>
            <p className="text-sm text-gray-700">Get out the couch and move</p>
          </div>
        </div>
      </div>
    </section>
  );
}
