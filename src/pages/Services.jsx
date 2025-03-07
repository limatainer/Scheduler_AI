import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  FiHeart,
  FiUser,
  FiScissors,
  FiActivity,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiStar,
  FiArrowRight,
  FiChevronLeft,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
} from 'react-icons/fi';
import { PageSEO } from '../components/ui/SEO';
import { motion } from 'framer-motion';

// Service data with more details
const servicesData = {
  health: {
    icon: FiHeart,
    title: 'Health Services',
    description:
      'Professional health services to improve your wellness and quality of life',
    longDescription:
      'Our comprehensive health services are designed to support your overall wellbeing. From nutritional counseling to wellness check-ups, our certified professionals provide personalized care that addresses your specific health needs.',
    benefits: [
      'Personalized health assessments',
      'Nutritional guidance and meal planning',
      'Stress management techniques',
      'Preventive health screenings',
      'Chronic condition management',
    ],
    pricing: [
      { name: 'Initial Consultation', price: '$75', duration: '60 min' },
      { name: 'Follow-up Session', price: '$50', duration: '30 min' },
      {
        name: 'Comprehensive Health Assessment',
        price: '$150',
        duration: '90 min',
      },
      { name: 'Specialized Treatment', price: '$100', duration: '45 min' },
    ],
    professionals: [
      { name: 'Dr. Sarah Johnson', specialty: 'Nutritionist', rating: 4.9 },
      { name: 'Michael Carter', specialty: 'Wellness Coach', rating: 4.8 },
      { name: 'Dr. Emily Richards', specialty: 'Health Advisor', rating: 4.7 },
    ],
    faqs: [
      {
        question: 'How often should I schedule health consultations?',
        answer:
          'For preventive care, we recommend quarterly check-ins. If you are addressing specific health concerns, your practitioner will recommend a personalized schedule.',
      },
      {
        question: 'Do you accept health insurance?',
        answer:
          'Yes, we work with most major insurance providers. We recommend contacting your insurance company to verify coverage before your appointment.',
      },
      {
        question: 'What should I bring to my first appointment?',
        answer:
          'Please bring your ID, insurance card, a list of current medications, and any recent lab results or medical records relevant to your visit.',
      },
    ],
  },
  style: {
    icon: FiUser,
    title: 'Style Services',
    description:
      'Expert hair styling and nail care from certified professionals',
    longDescription:
      'Transform your look with our premium style services. Our skilled stylists stay current with the latest trends and techniques to deliver personalized services that enhance your natural beauty and express your unique style.',
    benefits: [
      'Personalized style consultation',
      'Premium products and tools',
      'Latest techniques and trends',
      'Relaxing, professional environment',
      'Detailed aftercare instructions',
    ],
    pricing: [
      { name: "Women's Haircut & Style", price: '$60+', duration: '60 min' },
      { name: "Men's Haircut", price: '$35+', duration: '30 min' },
      { name: 'Hair Coloring', price: '$80+', duration: '90-120 min' },
      { name: 'Blowout & Styling', price: '$45', duration: '45 min' },
      { name: 'Manicure', price: '$30', duration: '30 min' },
      { name: 'Pedicure', price: '$45', duration: '45 min' },
    ],
    professionals: [
      { name: 'Jessica Rivera', specialty: 'Hair Stylist', rating: 4.9 },
      { name: 'Alex Kim', specialty: 'Color Specialist', rating: 4.8 },
      { name: 'Taylor Morgan', specialty: 'Nail Artist', rating: 4.9 },
    ],
    faqs: [
      {
        question: 'How far in advance should I book my appointment?',
        answer:
          'We recommend booking at least one week in advance for standard services and 2-3 weeks for special occasions or complex color treatments.',
      },
      {
        question: 'Do you offer consultations before major style changes?',
        answer:
          'Yes, we offer complimentary 15-minute consultations before significant changes like major haircuts or first-time color services.',
      },
      {
        question: 'What if I need to reschedule my appointment?',
        answer:
          'We require 24 hours notice for rescheduling or cancellation to avoid a cancellation fee. You can easily reschedule through our app or website.',
      },
    ],
  },
  barber: {
    icon: FiScissors,
    title: 'Barber Services',
    description: 'Premium beard grooming and haircuts for the modern gentleman',
    longDescription:
      'Experience traditional barbering with a modern twist. Our skilled barbers provide precision cuts, beard sculpting, and grooming services in a relaxed, welcoming environment designed specifically for mens needs.',
    benefits: [
      'Precision haircuts and styling',
      'Expert beard trimming and shaping',
      'Hot towel straight razor shaves',
      'Scalp treatments and massages',
      'Complimentary style consultation',
    ],
    pricing: [
      { name: 'Classic Haircut', price: '$35', duration: '30 min' },
      { name: 'Haircut & Beard Trim', price: '$45', duration: '45 min' },
      { name: 'Luxury Shave', price: '$40', duration: '30 min' },
      { name: 'Head Shave', price: '$30', duration: '30 min' },
      { name: 'Gray Blending', price: '$35+', duration: '30 min' },
    ],
    professionals: [
      { name: 'James Wilson', specialty: 'Classic Cuts', rating: 4.9 },
      { name: 'Robert Chen', specialty: 'Beard Specialist', rating: 4.8 },
      { name: 'Marcus Johnson', specialty: 'Fades & Designs', rating: 5.0 },
    ],
    faqs: [
      {
        question: 'How often should I get a haircut?',
        answer:
          'For most styles, we recommend every 3-4 weeks to maintain shape. Shorter styles might need maintenance every 2-3 weeks, while longer styles can go 6-8 weeks between cuts.',
      },
      {
        question: 'Do you offer any loyalty programs?',
        answer:
          'Yes, we have a loyalty program where every 10th service is 50% off. We also offer a monthly membership with discounted services and priority booking.',
      },
      {
        question: 'What products do you use and sell?',
        answer:
          "We use premium men's grooming products and offer a curated selection for purchase so you can maintain your style at home. Our barbers can recommend specific products for your hair type and style.",
      },
    ],
  },
  exercise: {
    icon: FiActivity,
    title: 'Exercise Services',
    description:
      'Personalized fitness sessions to help you achieve your health goals',
    longDescription:
      'Achieve your fitness goals with our personalized exercise services. Our certified fitness trainers design customized workout plans that accommodate your fitness level, preferences, and specific goals – whether you are looking to lose weight, build strength, or improve overall fitness.',
    benefits: [
      'Customized workout programs',
      'Form correction and technique guidance',
      'Nutritional advice to complement training',
      'Progress tracking and adjustments',
      'Motivation and accountability support',
    ],
    pricing: [
      { name: 'Initial Fitness Assessment', price: '$75', duration: '60 min' },
      {
        name: 'Personal Training (1 session)',
        price: '$65',
        duration: '60 min',
      },
      {
        name: 'Personal Training (10 sessions)',
        price: '$550',
        duration: '60 min each',
      },
      {
        name: 'Partner Training (per person)',
        price: '$45',
        duration: '60 min',
      },
      { name: 'Small Group Session', price: '$30', duration: '60 min' },
    ],
    professionals: [
      { name: 'David Torres', specialty: 'Strength Training', rating: 4.9 },
      { name: 'Sophia Lee', specialty: 'Cardio & HIIT', rating: 4.8 },
      { name: 'Jason Mitchell', specialty: 'Sports Performance', rating: 4.7 },
    ],
    faqs: [
      {
        question: 'How many sessions per week do you recommend?',
        answer:
          'For most clients, we recommend 2-3 training sessions per week, with additional self-directed workouts. Your trainer will provide a specific recommendation based on your goals and current fitness level.',
      },
      {
        question: 'What should I wear to my training session?',
        answer:
          'Comfortable athletic clothing and supportive shoes appropriate for your activity. Bring a water bottle and small towel. If you have specific equipment needs, your trainer will advise you before your session.',
      },
      {
        question: 'Do I need to be in shape before starting?',
        answer:
          'Not at all! Our programs are designed for all fitness levels, from beginners to advanced athletes. We will meet you where you are and help you progress safely and effectively.',
      },
    ],
  },
};

// Main component for single service page
const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);

  // Make sure we have valid service data
  if (!serviceId || !servicesData[serviceId]) {
    return <Navigate to="/services" />;
  }

  const service = servicesData[serviceId];
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

  // Otherwise, show all services
  const allServices = Object.entries(servicesData).map(([id, service]) => ({
    id,
    ...service,
  }));

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
