import React, { useState, useEffect } from 'react';
import {
  FiHeadphones,
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiHelpCircle,
} from 'react-icons/fi';
import { useNotification } from '../context/NotificationContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { projectFirestore } from '../firebase/config';

export default function Assistance() {
  const [activeTab, setActiveTab] = useState('contact');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { showSuccess, showError } = useNotification();
  const { user } = useAuthContext();

  // Initialize form with user data if available
  const [contactForm, setContactForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    message: '',
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setContactForm((prev) => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add to 'faq' collection in Firebase
      await projectFirestore.collection('faq').add({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
        uid: user?.uid || 'guest',
        createdAt: new Date(),
      });

      showSuccess("Your message has been sent! We'll get back to you soon.");

      // Only clear the message, keep name and email
      setContactForm((prev) => ({
        ...prev,
        message: '',
      }));
    } catch (err) {
      console.error('Error sending message:', err);
      showError('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  // FAQ data
  const faqs = [
    {
      question: 'How do I cancel my appointment?',
      answer:
        'You can cancel an appointment by navigating to your schedules page, finding the appointment you wish to cancel, and clicking the delete icon.',
    },
    {
      question: 'Can I reschedule my appointment?',
      answer:
        "To reschedule, you'll need to cancel your current appointment and create a new one with your preferred date and time.",
    },
    {
      question: 'How far in advance can I book?',
      answer:
        'You can book appointments up to 3 months in advance, subject to availability.',
    },
    {
      question: 'What happens if I miss my appointment?',
      answer:
        "If you miss your appointment without prior cancellation, it will be marked as 'Missed'. Please contact support if you need to discuss special circumstances.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
      {/* Header */}
      <div
        className="px-6 py-4 bg-primary-600 dark:bg-primary-700 text-white cursor-pointer flex justify-between items-center"
        onClick={toggleCollapsed}
      >
        <div className="flex items-center gap-3">
          <FiHeadphones className="text-2xl" />
          <h2 className="text-xl font-bold">Need assistance?</h2>
        </div>
        {isCollapsed ? (
          <FiChevronDown className="text-xl" />
        ) : (
          <FiChevronUp className="text-xl" />
        )}
      </div>

      {/* Content - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm mr-2 focus:outline-none ${
                activeTab === 'contact'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              Contact Us
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === 'faq'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              FAQs
            </button>
          </div>

          {/* Contact Tab Content */}
          {activeTab === 'contact' && (
            <div className="md:flex gap-8">
              {/* Contact Form */}
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiUser className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                        className={`block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-gray-900 
                        focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white 
                        dark:placeholder-gray-400 ${
                          user?.displayName
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'bg-gray-50 dark:bg-gray-700'
                        }`}
                        placeholder="John Doe"
                        disabled={!!user?.displayName}
                        required
                      />
                    </div>
                    {user?.displayName && (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Using your account name
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiMail className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleChange}
                        className={`block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-gray-900 
                        focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:text-white 
                        dark:placeholder-gray-400 ${
                          user?.email
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'bg-gray-50 dark:bg-gray-700'
                        }`}
                        placeholder="your.email@example.com"
                        disabled={!!user?.email}
                        required
                      />
                    </div>
                    {user?.email && (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Using your account email
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FiMessageCircle className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="md:w-1/3">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex">
                    <div className="mr-4 mt-1">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                        <FiMail className="text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        <a
                          href="mailto:support@scheduler.com"
                          className="hover:underline"
                        >
                          support@scheduler.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex">
                    <div className="mr-4 mt-1">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                        <FiPhone className="text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Phone
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        <a href="tel:+1234567890" className="hover:underline">
                          +1 (234) 567-890
                        </a>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Mon-Fri, 9am-5pm EST
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex">
                    <div className="mr-4 mt-1">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                        <FiMessageCircle className="text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Live Chat
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Our support team is available for live chat
                      </p>
                      <button className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-2 hover:underline">
                        Start a chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab Content */}
          {activeTab === 'faq' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <h4 className="flex items-center text-base font-medium text-gray-900 dark:text-white mb-2">
                      <FiHelpCircle className="text-primary-600 dark:text-primary-400 mr-2" />
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 ml-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  Can't find what you're looking for?
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="ml-1 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    Contact our support team
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
