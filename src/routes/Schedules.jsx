import { useState, useEffect } from 'react';

import { projectFirestore } from '../firebase/config';

import { useAuthContext } from '../hooks/useAuthContext';

import Admin from '../components/Admin';
import ScheduleList from '../components/ScheduleList';

import Skeleton from '../components/Skeleton';

export default function Schedules() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  //THIS USER EFFECT IS TO DISPLAY THE REVIEWS COLLECTION FROM FIRESTORE
  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('schedule').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No schedules to load');
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
  // AFTER LOADED IT WILL PASS DATA TO SCHEDULELIST COMPONENT AS SCHEDULES
  return (
    <>
      <div className="container mx-auto shadow m-2 p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Manage all your requests here
        </h1>
        <p className="text-center m-4 p-2">
          Check your current sessions available and new requests.
        </p>
      </div>
      {/* Logic to display the schedules from firebase based on the user vs admin user */}
      {error && <p className="error text-center p-2 m-2">{error}</p>}
      {isPending && <Skeleton />}
      {user.uid === 'e3vSvKVNjANFfBVxX318pqzbrT63' && data && (
        <Admin schedules={data} />
      )}
      {!(user.uid === 'e3vSvKVNjANFfBVxX318pqzbrT63') && data && (
        <ScheduleList schedules={data} />
      )}

      {/* Assistance Session */}
      <div className="text-center container mx-auto my-4 rounded-sm border shadow p-2">
        <h3 className="text-2xl font-bold mb-4">
          Need assistance or found something wrong? Contact us
        </h3>
        <p className="mb-4 text-tertiary">
          Our support staff is available 24/7 for you under the contact
        </p>
        <div
          className="max-w-md mx-auto border border-yellow-50 rounded-xl p-8
         sm:flex sm:space-x-6 shadow-2xl"
        >
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <img
              src="https://source.unsplash.com/100x100/?portrait?1"
              alt=""
              className="object-cover object-center w-full h-full rounded bg-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4 ">
            <div>
              <h2 className="text-2xl font-semibold text-blue-500">Elph</h2>
              <span className="text-sm text-gray-400">
                Developer Specialist
              </span>
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  {/* Email icon path */}
                </svg>
                <span className="text-gray-400">elph@gmail.com</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Phonenumber"
                  className="w-4 h-4"
                >
                  {/* Phone icon path */}
                </svg>
                <span className="text-gray-400">+351 965000000</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
