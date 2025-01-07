import React, { useState } from 'react';
import Layout from './Layout';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does AI tutoring work?",
      answer: "Our AI tutoring system uses advanced natural language processing to engage in real-time conversations with students. It adapts to your learning style, provides personalized feedback, and helps you practice English in a natural, conversational way."
    },
    {
      question: "What levels of English proficiency do you support?",
      answer: "We support all levels from beginner (A1) to advanced (C2). Our AI system automatically adjusts its language complexity and teaching style to match your current level and helps you progress gradually."
    },
    {
      question: "How much does it cost?",
      answer: "We offer various subscription plans starting from $9.99/month. Each plan includes unlimited conversations with our AI tutor, progress tracking, and access to learning materials. Check our pricing page for detailed information."
    },
    {
      question: "Can I try it before subscribing?",
      answer: "Yes! We offer a free trial period where you can experience our AI tutoring system and evaluate if it's right for you. No credit card is required for the trial."
    },
    {
      question: "What topics can I practice?",
      answer: "You can practice a wide range of topics including everyday conversation, business English, academic English, IELTS/TOEFL preparation, and specific industry vocabulary. Our AI tutor can adapt to any topic you're interested in."
    },
    {
      question: "Is the AI available 24/7?",
      answer: "Yes, our AI tutor is available 24/7, allowing you to practice English at any time that suits your schedule, from anywhere in the world."
    },
    {
      question: "How do you track progress?",
      answer: "We provide detailed analytics of your learning journey, including vocabulary growth, grammar improvement, speaking confidence, and overall proficiency level. You can view your progress in your dashboard."
    },
    {
      question: "Can I practice speaking and pronunciation?",
      answer: "Yes, our AI system can analyze your pronunciation and provide real-time feedback to help you improve your speaking skills. You can practice through voice conversations with the AI tutor."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our AI English tutoring service
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-lg shadow-md border border-blue-100"
              >
                <button
                  className="w-full text-left px-6 py-4 focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <span className="ml-6 flex-shrink-0">
                      <svg
                        className={`w-6 h-6 transform ${
                          openIndex === index ? 'rotate-180' : ''
                        } transition-transform duration-200 ease-in-out`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ; 