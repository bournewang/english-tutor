import React from 'react';
import Layout from './Layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About English AI Tutor
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing language learning through artificial intelligence and personalized education
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="flex items-center">
            <img
              src="/images/learning.png"
              alt="Our Mission"
              className="rounded-lg shadow-lg object-cover h-96 w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-6">
              We believe that everyone deserves access to high-quality English education. 
              Our mission is to break down language barriers and create opportunities for 
              learners worldwide through innovative AI-powered technology.
            </p>
            <p className="text-gray-600 text-lg">
              By combining advanced artificial intelligence with proven language learning 
              methodologies, we provide a personalized learning experience that adapts to 
              each student's needs and pace.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20  from-blue-50 to-white p-12 rounded-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of technology to create better learning experiences.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making quality education available to everyone, regardless of their location or background.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                Delivering excellence in education through rigorous content and advanced technology.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className=" from-blue-50 to-white p-12 rounded-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Founder',
                image: '/images/team/sarah.jpg',
                bio: 'Former educator with 15 years of experience in EdTech'
              },
              {
                name: 'Michael Chen',
                role: 'Chief Technology Officer',
                image: '/images/team/michael.jpg',
                bio: 'AI specialist with a focus on natural language processing'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Head of Education',
                image: '/images/team/emma.jpg',
                bio: 'Curriculum developer with expertise in ESL education'
              }
            ].map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-100">
                {/* <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                /> */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About; 