import React from 'react';
import { GrSchedules } from 'react-icons/gr';

export default function Footer() {
  return (
    <footer className="mt-72 bg-secondary text-white p-2 w-screen">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">Mail: limas.code@gmail.com</p>
          <p>Time saving in just one click</p>
        </div>
        <GrSchedules className="text-3xl text-primary shadow-md animate-pulse" />
        <div className="text-center md:text-right">
          <p className="text-lg font-semibold">Open from</p>
          <p>
            Mon-Fri- until 6 pm
            <br />
            Sat - until 1 pm
          </p>
        </div>
      </div>
    </footer>
  );
}
