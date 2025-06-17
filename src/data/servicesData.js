// src/data/servicesData.js
import { FiHeart, FiUser, FiScissors, FiActivity } from 'react-icons/fi';

export const servicesData = {
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

// Export a function to get all services as an array
export const getServicesArray = () => {
  return Object.entries(servicesData).map(([id, service]) => ({
    id,
    ...service,
  }));
};

// Export a function to get a single service by ID
export const getServiceById = (serviceId) => {
  return servicesData[serviceId] || null;
};
