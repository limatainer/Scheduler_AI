import React from 'react';

export default function Stats() {
  return (
    <section
      className="bg-gray-50 px-4 py-8 mx-auto sm:max-w-xl md:max-w-full 
    lg:max-w-screen-xl md:px-16 lg:px-8 lg:py-5"
    >
      <div className="grid row-gap-8 sm:grid-cols-3">
        <div className="text-center">
          <h6 className="text-5xl font-bold text-gray-800">3</h6>
          <p className="font-bold">Reviews</p>
        </div>
        <div className="text-center">
          <h6 className="text-5xl font-bold text-gray-800">245</h6>
          <p className="font-bold">Schedules</p>
        </div>
        <div className="text-center">
          <h6 className="text-5xl font-bold text-gray-800">20</h6>
          <p className="font-bold">Users</p>
        </div>
      </div>
    </section>
  );
}
