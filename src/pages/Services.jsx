import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiStar,
  FiArrowRight,
  FiChevronLeft,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiUser,
} from 'react-icons/fi';
import { PageSEO } from '../components/ui/SEO';
import { motion } from 'framer-motion';
// Import the services data
import {
  servicesData,
  getServicesArray,
  getServiceById,
} from '../data/servicesData';

// Main component for single service page
const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);

  // Get service data using the helper function
  const service = getServiceById(serviceId);

  // Make sure we have valid service data
  if (!serviceId || !service) {
    return <Navigate to="/services" />;
  }

  const ServiceIcon = service.icon;

  // Toggle FAQ
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <PageSEO
        title={`${service.title} - Scheduler`}
        description={service.description}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Back to all services */}
        <Link
          to="/services"
          className="inline-flex items-center mb-8 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <FiChevronLeft className="mr-1" />
          Back to all services
        </Link>

        {/* Hero section */}
        <div className="mb-16">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6 p-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <ServiceIcon
                className="h-16 w-16 text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {service.title}
            </h1>
            <p className="max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              {service.longDescription}
            </p>
          </div>

          <div className="mt-10">
            <Link
              to="/request"
              className="mx-auto flex w-full sm:w-auto justify-center items-center rounded-lg bg-primary-600 px-6 py-3 text-center font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
            >
              Book this service
              <FiCalendar className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-start"
              >
                <div className="mr-4 mt-1 p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <FiStar className="text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Pricing
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {service.pricing.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <span className="flex items-center">
                          <FiDollarSign className="mr-1 text-primary-600 dark:text-primary-400" />
                          {item.price.replace('$', '')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <span className="flex items-center">
                          <FiClock className="mr-1 text-primary-600 dark:text-primary-400" />
                          {item.duration}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to="/request"
                          className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Book
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Professionals */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Professionals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.professionals.map((pro, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                  <FiUser className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {pro.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-3">
                  {pro.specialty}
                </p>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">
                    <FiStar className="fill-current" />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {pro.rating} / 5
                  </span>
                </div>
                <Link
                  to="/request"
                  className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                >
                  Book with {pro.name.split(' ')[0]}
                  <FiArrowRight className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {service.faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full justify-between items-center text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0 text-primary-600 dark:text-primary-400">
                    {activeFaq === index ? (
                      <FiChevronUp aria-hidden="true" />
                    ) : (
                      <FiChevronDown aria-hidden="true" />
                    )}
                  </span>
                </button>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-600 dark:text-gray-300"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary-50 dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to experience our {service.title.toLowerCase()}?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
            Book your appointment today and take the first step toward a better
            you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/request"
              className="inline-flex justify-center items-center rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
            >
              Book Now
              <FiCalendar className="ml-2" />
            </Link>
            <Link
              to="/services"
              className="inline-flex justify-center items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Explore Other Services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// Main component for services listing page
const Services = () => {
  const { serviceId } = useParams();

  // If we have a specific service in the URL, show the detailed view
  if (serviceId) {
    return <ServiceDetails />;
  }

  // Otherwise, show all services using the helper function
  const allServices = getServicesArray();

  return (
    <>
      <PageSEO
        title="Our Services - Scheduler"
        description="Explore our range of professional services including health, style, barber, and exercise services."
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Discover our wide range of professional services designed to meet
            your needs
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {allServices.map((service, index) => {
            const ServiceIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <ServiceIcon
                      className="h-6 w-6 text-primary-600 dark:text-primary-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4 mb-6">
                  {service.benefits.slice(0, 4).map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <FiCheck className="mt-1 mr-2 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Starting at
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.pricing[0].price}
                      </p>
                    </div>
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                    >
                      Learn more
                      <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-primary-50 dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to book a service?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
            Choose from our range of professional services and book your
            appointment today.
          </p>
          <Link
            to="/request"
            className="inline-flex justify-center items-center rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
          >
            Book an Appointment
            <FiCalendar className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Services;
