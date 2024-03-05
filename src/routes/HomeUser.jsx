import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

import Review from '../components/Review';
import { Link } from 'react-router-dom';

export default function HomeUser() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  //THIS USER EFFECT IS TO DISPLAY THE REVIEWS COLLECTION FROM FIRESTORE
  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('reviews').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No reviews to load');
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            // console.log(doc)
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);
  // AFTER LOADED IT WILL PASS DATA TO REVIEW COMPONENT AS REVIEWS
  return (
    <>
      <div className="bg-indigo-50 sm:py-16 lg:py-25 pb-10">
        <div className="flex flex-col justify-center items-center px-4 py-11 mx-auto max-w-screen-xl">
          <div className="max-w-xl mb-10 text-center">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              Welcome to Scheduler dashboard.
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              You are about to get your schedules way more simplified.
            </p>
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-secondary">
                Select an option to get started.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <div className="container relative m-auto px-6 text-gray-500 md:px-12">
              <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 hover:cursor-pointer">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="transform transition duration-500 hover:scale-110 group space-y-6 border border-gray-100 rounded-3xl bg-white px-8 py-12 text-center shadow-2xl shadow-gray-600/10"
                  >
                    {/* Replace the src attribute with your actual image source */}
                    <img
                      className="animate__animated animate__jello mx-auto w-24"
                      src="PLACE"
                      alt={`illustration-${index}`}
                      loading="lazy"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800">
                      PLACE
                    </h1>
                    <button className="button">
                      <Link to="/request">Começar</Link>
                    </button>
                    <a
                      href="#"
                      className="relative mx-auto flex h-10 w-10 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-100 before:transition before:duration-300 group-hover:before:scale-125"
                    >
                      {/* Replace the src attribute with your actual image source */}
                      <img
                        className="text-primary"
                        src="PLACE"
                        alt={`right-arrow-${index}`}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {error && <p className="text-accent">{error}</p>}
        {isPending && <p className="text-primary">Loading...</p>}
        {data && <Review reviews={data} />}
      </div>
    </>
  );
}
