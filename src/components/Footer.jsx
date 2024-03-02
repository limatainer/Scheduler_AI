import React from 'react';
import { GrSchedules } from 'react-icons/gr';

export default function Footer() {
  return (
    <footer className=" bg-secondary text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">Mail: thefactory@fact.com</p>
          <p>Europe based online store</p>
        </div>
        <GrSchedules className="text-3xl" />
        <div className="text-center md:text-right">
          <p className="text-lg font-semibold">Opening Hours</p>
          <p>
            Mon-Fri
            <br />
            Sat - until 8 pm
            <br />
            Sun - until 3 pm
          </p>
        </div>
      </div>
    </footer>
  );
}
