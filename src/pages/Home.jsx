import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiHeart,
  FiScissors,
  FiUser,
  FiActivity,
  FiCalendar,
  FiCheck,
} from 'react-icons/fi';
import { PageSEO } from '../components/ui/SEO';
import { projectFirestore } from '../firebase/config';
import Review from '../components/Review';

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <Link
        to={`/services/${title.toLowerCase()}`}
        className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      >
        Learn more
        <FiArrowRight className="ml-1" aria-hidden="true" />
      </Link>
    </motion.div>
  );
};

// Pricing card component
const PricingCard = ({ title, price, yearlyPrice, features, isPro, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex flex-col rounded-lg ${
        isPro
          ? 'border-primary-200 bg-primary-50 shadow-lg dark:border-primary-800 dark:bg-gray-800'
          : 'bg-white dark:bg-gray-800'
      } border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700`}
    >
      <h3
        className={`mb-2 text-xl font-bold ${
          isPro
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h3>
      <div className="mb-6">
        <div className="flex items-end">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">/month</span>
        </div>
        {yearlyPrice && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ${yearlyPrice}/year (10% discount)
          </p>
        )}
      </div>
      <div className="flex-grow">
        <ul className="mb-6 space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <FiCheck
                className={`mr-2 mt-1 ${
                  isPro
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-green-600 dark:text-green-400'
                }`}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        to="/signup"
        className={`flex w-full items-center justify-center rounded-lg px-4 py-2 transition-colors ${
          isPro
            ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        } mt-4`}
      >
        Get Started <FiArrowRight className="ml-2" />
      </Link>
    </motion.div>
  );
};

const Home = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const [reviewsData, setReviewsData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reviews from Firestore
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection('reviews').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No reviews to load');
          setReviewsData([]);
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setReviewsData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsub();
  }, []);

  const handleToggleBilling = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const services = [
    {
      icon: FiHeart,
      title: 'Health',
      description:
        'Professional health services to improve your wellness and quality of life',
    },
    {
      icon: FiUser,
      title: 'Style',
      description:
        'Expert hair styling and nail care from certified professionals',
    },
    {
      icon: FiScissors,
      title: 'Barber',
      description:
        'Premium beard grooming and haircuts for the modern gentleman',
    },
    {
      icon: FiActivity,
      title: 'Exercise',
      description:
        'Personalized fitness sessions to help you achieve your health goals',
    },
  ];

  return (
    <>
      <PageSEO
        title="Scheduler - Book Your Service Appointments"
        description="Schedule and manage appointments for health, style, barber, and exercise services with our easy-to-use platform."
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-600 dark:bg-primary-900 dark:text-primary-300">
              Simplify Your Scheduling
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Book Services{' '}
              <span className="text-primary-600 dark:text-primary-400">
                Effortlessly
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Save time and reduce stress with our intuitive appointment
              scheduling platform. Book professionals in just a few clicks.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Get Started
                <FiArrowRight className="ml-2" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Browse Services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary-100 dark:bg-primary-900"></div>
            <div className="relative z-10 overflow-hidden rounded-lg">
              <div className="aspect-h-3 aspect-w-4 ">
                {/* Replace with actual image */}
                <div className="flex h-full items-center justify-center text-secondary-500 dark:text-tertiary">
                  <FiCalendar className="h-16 w-16" aria-hidden="true" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Choose from our wide range of professional services designed to
              meet your needs
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                index={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that works best for your scheduling needs
            </p>

            {/* Billing toggle */}
            <div className="mt-8 flex items-center justify-center">
              <span
                className={`mr-3 ${
                  billingCycle === 'monthly'
                    ? 'font-medium text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Monthly
              </span>
              <button
                onClick={handleToggleBilling}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-primary-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly'
                      ? 'translate-x-7'
                      : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`ml-3 ${
                  billingCycle === 'yearly'
                    ? 'font-medium text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Yearly{' '}
                <span className="font-medium text-green-500 dark:text-green-400">
                  Save 10%
                </span>
              </span>
            </div>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <PricingCard
              title="Free"
              price="0"
              features={[
                'Basic appointment booking',
                'Up to 15 appointments per month',
                'Email notifications',
                'Cancel/reschedule appointments',
                'Standard support',
              ]}
              isPro={false}
              delay={0.1}
            />
            <PricingCard
              title="Pro"
              price={billingCycle === 'monthly' ? '5' : '4.5'}
              yearlyPrice={billingCycle === 'yearly' ? '54' : null}
              features={[
                'Unlimited appointments',
                'Priority scheduling',
                'SMS notifications',
                'Recurring appointments',
                'Premium support',
                'Custom branding options',
                'Client history & notes',
              ]}
              isPro={true}
              delay={0.2}
            />
          </div>

          {/* FAQ or additional info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Have questions about our pricing?
              <Link
                to="/contact"
                className="ml-1 text-primary-600 hover:underline dark:text-primary-400"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Book your appointment in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Choose a Service',
                description:
                  'Browse through our services and select the one that meets your needs',
              },
              {
                step: '2',
                title: 'Select a Time',
                description:
                  'Pick a convenient date and time from the available slots',
              },
              {
                step: '3',
                title: 'Confirm Booking',
                description:
                  'Complete your booking and receive instant confirmation',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real Reviews Section using your existing Review component */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Read real feedback from our community
            </p>
          </div>

          {/* Show loading message while fetching */}
          {isPending && (
            <div className="text-center p-4 m-4 text-primary-600 dark:text-primary-400">
              Loading reviews...
            </div>
          )}

          {/* Show error if any */}
          {error && (
            <div className="text-center p-4 m-4 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Use your existing Review component when data is loaded */}
          {reviewsData && <Review reviews={reviewsData} />}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-primary-50 p-8 text-center dark:bg-gray-800"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Join thousands of satisfied users who have simplified their
            scheduling process
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            Create Your Account
            <FiArrowRight className="ml-2" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
