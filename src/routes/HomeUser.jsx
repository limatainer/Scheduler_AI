import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

import { Link } from 'react-router-dom';

import Review from '../components/Review';

import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineReviews, MdScheduleSend } from 'react-icons/md';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import Fruits from '../components/Fruits';

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

  const [selectedId, setSelectedId] = useState(null);

  const items = [
    {
      id: 1,
      title: 'See your request',
      subtitle: 'Quick view here your current schedule',
      icon: <MdScheduleSend className="text-4xl" />,
    },
    {
      id: 2,
      title: 'New request',
      subtitle: 'Make a new request',
      icon: <VscGitPullRequestNewChanges className="text-4xl" />,
    },
    {
      id: 3,
      title: 'Give us a review',
      subtitle: 'Write a review here',
      icon: <MdOutlineReviews className="text-4xl" />,
    },
  ];
  const handleOverlayClick = (e) => {
    e.stopPropagation(); // Prevent the event from propagating to parent elements
  };
  return (
    <>
      <div className="bg-yellow-50 sm:py-16 lg:py-25 pb-10">
        <div
          className="flex flex-col justify-center items-center px-4 
        py-11 mx-auto max-w-screen-xl"
        >
          <div className="max-w-xl mb-10 text-center">
            <h1 className="text-7xl font-bold ">
              Welcome, <span className="text-tertiary">User</span>
            </h1>
            <h2
              className="max-w-lg mb-6 p-4 font-sans text-3xl font-bold 
            leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
            >
              Manage you requests here.
            </h2>

            <p className="text-base text-gray-700 md:text-lg">
              You are about to get your schedules way more simplified.
            </p>
            <div>
              <p
                className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider
               text-teal-900 uppercase rounded-full bg-secondary"
              >
                Select an option to get started.
              </p>
            </div>
          </div>
        </div>
        {/* CARDS */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <div className="container relative m-auto px-6 text-gray-500 md:px-12">
              <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 hover:cursor-pointer">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    onClick={() =>
                      setSelectedId(selectedId === item.id ? null : item.id)
                    }
                    className={`flex flex-col items-center justify-center transform transition duration-500 hover:scale-110 
                    group space-y-6 border border-gray-100 rounded-3xl bg-white 
                    px-8 py-12 text-center shadow-2xl shadow-gray-600/10 ${
                      selectedId === item.id ? 'z-10' : ''
                    }`}
                  >
                    {item.icon}
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {item.title}
                    </h1>
                    <h5>{item.subtitle}</h5>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {selectedId && (
              <motion.div
                layoutId={selectedId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex 
                justify-center items-center"
                onClick={handleOverlayClick}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white rounded-xl p-8 flex flex-col items-center 
                  justify-center relative"
                >
                  {/* Content of the expanded card */}
                  <h1 className="text-2xl font-semibold mb-4">
                    Check here the schedule you have
                  </h1>
                  <p className="text-center mb-4">
                    Review and manage all requests here
                  </p>
                  <button className="button mb-4">
                    <Link to="/schedule">Manage Requests</Link>
                  </button>
                  <AiOutlineClose
                    className="absolute top-2 right-2 cursor-pointer text-gray-500
                     hover:text-gray-800"
                    onClick={() => setSelectedId(null)}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* REVIEWS */}
      <div className="text-center">
        <h1 className="text-xl font-bold m-2 p-4">Reviews</h1>
        {error && <p className="text-accent">{error}</p>}
        {isPending && <p className="text-primary">Loading...</p>}
        {data && <Review reviews={data} />}
      </div>
      {/* <div className="fruits">
        <Fruits />
      </div> */}
    </>
  );
}
