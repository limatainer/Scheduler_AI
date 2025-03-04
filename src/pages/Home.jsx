import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiHeart,
  FiScissors,
  FiUser,
  FiActivity,
} from 'react-icons/fi';
import { PageSEO } from '../components/ui/SEO';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Home = () => {
  const services = [
    {
      icon: FiHeart,
      title: 'Health',
      description: 'Request a health service and improve your life wellness',
    },
    {
      icon: FiUser,
      title: 'Style',
      description: 'Hair stylist and nail polisher',
    },
    {
      icon: FiScissors,
      title: 'Barber',
      description: 'Grow a beard',
    },
    {
      icon: FiActivity,
      title: 'Exercise',
      description: 'Get off the couch and move',
    },
  ];

  return (
    <>
      <PageSEO
        title="Scheduler - Book Your Service Appointments"
        description="Schedule and manage appointments for health, style, barber, and exercise services with our easy-to-use platform."
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
              Welcome to our Service Appointment page!
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Simplify your life with Scheduler
            </p>
            <div>
              <Link to="/signup" className="button inline-flex items-center">
                Start using
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
