import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

import Review from '../components/Review';

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
      <h1>Welcome back user</h1>
      <p>Action tools</p>

      <div className="text-center">
        {error && <p className="text-accent">{error}</p>}
        {isPending && <p className="text-primary">Loading...</p>}
        {data && <Review reviews={data} />}
      </div>
    </>
  );
}
