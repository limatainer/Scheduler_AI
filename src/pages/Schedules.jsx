import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
import Admin from '../components/Admin';
import ScheduleList from '../components/ScheduleList';
import Skeleton from '../components/common/Skeleton';
import Assistance from '../components/Assistance';

const userID = import.meta.env.VITE_USER_ID;

export default function Schedules() {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // THIS USER EFFECT IS TO DISPLAY THE SCHEDULES COLLECTION FROM FIRESTORE
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
      <div className="container mx-auto mt-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Manage all your requests here
        </h1>
        <p className="text-center m-4 p-2 text-gray-600 dark:text-gray-300">
          Check your current sessions available and new requests.
        </p>
      </div>

      {/* Logic to display the schedules from firebase based on the user vs admin user */}
      {error && (
        <div className="mt-6 text-center p-4 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {isPending && (
        <div className="flex justify-center">
          <Skeleton />
        </div>
      )}

      <div className="mt-6">
        {user?.uid === userID && data && <Admin schedules={data} />}
        {!(user?.uid === userID) && data && <ScheduleList schedules={data} />}
      </div>

      {/* Assistance Section */}
      <Assistance />
    </>
  );
}
