import { useState, useEffect } from 'react';

import { projectFirestore } from '../firebase/config';

import { useAuthContext } from '../hooks/useAuthContext';

import Admin from '../components/Admin';
import ScheduleList from '../components/ScheduleList';

import Skeleton from '../components/Skeleton';
import Assistance from '../components/Assistance';
const userID = import.meta.env.VITE_USER_ID;
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
      <div className="container mx-auto shadow mt-32 p-4">
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
      {user.uid === userID && data && <Admin schedules={data} />}
      {!(user.uid === userID) && data && <ScheduleList schedules={data} />}

      {/* Assistance Session */}
      <Assistance />
    </>
  );
}
