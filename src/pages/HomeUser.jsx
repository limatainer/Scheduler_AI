import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { PageSEO } from '../components/ui/SEO';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { MdOutlineReviews, MdScheduleSend } from 'react-icons/md';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotification } from '../context/NotificationContext';

export default function HomeUser() {
  const { user } = useAuthContext();
  const { showInfo } = useNotification();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

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

  const [selectedId, setSelectedId] = useState(null);

  //options items
  const items = [
    {
      id: 1,
      title: 'See your requests',
      subtitle: 'Quick view here your current schedule',
      icon: (
        <MdScheduleSend className="text-4xl text-primary-600 dark:text-primary-400" />
      ),
      link: '/schedule',
    },
    {
      id: 2,
      title: 'Add request',
      subtitle: 'Set up a new schedule request',
      icon: (
        <VscGitPullRequestNewChanges className="text-4xl text-primary-600 dark:text-primary-400" />
      ),
      link: '/request',
    },
    {
      id: 3,
      title: 'Give us a review',
      subtitle: 'Write a review here',
      icon: (
        <MdOutlineReviews className="text-4xl text-primary-600 dark:text-primary-400" />
      ),
      link: '/reviews',
    },
  ];

  // framer motion
  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  const openCard = (item) => {
    setSelectedId(item.id);
    showInfo(`Opening ${item.title}`);
  };

  // Check if the user has already submitted a review
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (!user || !data) return;

    // Check if the current user has already submitted a review
    const userReview = data.find((review) => review.userId === user.uid);
    setHasReviewed(!!userReview);
  }, [user, data]);

  return (
    <>
      <PageSEO
        title="Dashboard - Scheduler"
        description="Manage your appointments and schedules"
      />

      <div className="bg-gray-50 dark:bg-gray-900 sm:py-12 lg:py-20 pb-10">
        <div className="flex flex-col justify-center items-center px-4 py-8 mx-auto max-w-screen-xl">
          <div className="max-w-xl mb-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome,{' '}
              <span className="text-primary-600 dark:text-primary-400">
                {user.displayName}
              </span>
            </h1>
            <h2 className="max-w-lg mb-6 font-sans text-2xl font-bold leading-tight tracking-tight text-gray-800 dark:text-gray-200 sm:text-3xl md:mx-auto">
              Manage your requests here.
            </h2>

            <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg">
              You are about to get your schedules way more simplified.
            </p>
            <div>
              <p className="inline-block px-3 py-px my-4 text-xs font-semibold tracking-wider text-gray-700 dark:text-gray-300 uppercase rounded-full bg-primary-100 dark:bg-primary-900">
                Select an option to get started.
              </p>
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <div className="container relative m-auto px-6 text-gray-500 dark:text-gray-400 md:px-12">
              <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 hover:cursor-pointer">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`card-${item.id}`}
                    onClick={() => openCard(item)}
                    className={`flex flex-col items-center justify-center transform transition duration-500 hover:scale-105 
                    group space-y-6 border border-gray-200 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800
                    px-8 py-12 text-center shadow-lg hover:shadow-xl ${
                      selectedId === item.id ? 'z-10' : ''
                    }`}
                  >
                    {item.icon}
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.subtitle}
                    </p>
                    {item.id === 3 && hasReviewed && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                        Thank you for your review!
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedId && (
              <motion.div
                layoutId={`card-${selectedId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex 
                justify-center items-center"
                onClick={() => setSelectedId(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={handleOverlayClick}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center 
                  justify-center relative max-w-md w-full mx-4"
                >
                  {/* Content of the expanded card */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {items.find((item) => item.id === selectedId)?.title}
                  </h3>

                  {/* Show form for review, otherwise show regular content */}
                  {selectedId === 3 ? (
                    hasReviewed ? (
                      <div className="text-center mb-6">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          You've already submitted a review. Thank you for your
                          feedback!
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          If you'd like to update your review, please contact
                          support.
                        </p>
                      </div>
                    ) : (
                      <ReviewForm
                        user={user}
                        onClose={() => setSelectedId(null)}
                      />
                    )
                  ) : (
                    <>
                      <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
                        {items.find((item) => item.id === selectedId)?.subtitle}
                      </p>
                      <Link
                        to={items.find((item) => item.id === selectedId)?.link}
                        className="button w-full flex justify-center"
                      >
                        Proceed
                      </Link>
                    </>
                  )}

                  <button
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    onClick={() => setSelectedId(null)}
                    aria-label="Close modal"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="py-10 px-4 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Reviews
        </h2>
        {error && (
          <p className="text-accent-600 dark:text-accent-400 text-center">
            {error}
          </p>
        )}
        {isPending && (
          <p className="text-primary-600 dark:text-primary-400 text-center">
            Loading...
          </p>
        )}
        {data && <Review reviews={data} />}
      </div>
    </>
  );
}
