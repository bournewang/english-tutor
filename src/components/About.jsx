import React from 'react';
import Layout from './Layout';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission & Vision Section - Redesigned */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column: Image with strict size controls */}
            <div className="flex items-center justify-center h-[350px]">
              <img
                src="/images/ai-learning.jpg"
                alt={t('about.mission.imageAlt')}
                className="rounded-xl shadow-2xl object-cover w-[80%] h-full"
              />
            </div>
            
            {/* Right Column: Mission Text */}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{t('about.mission.title')}</h2>
              <p className="text-gray-600 text-lg">
                {t('about.mission.description1')}
              </p>
              <p className="text-gray-600 text-lg">
                {t('about.mission.description2')}
              </p>
            </div>
          </div>

          {/* Affordability Section - New Layout */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  {t('about.mission.affordability.title')}
                </h3>
                <div className="hidden lg:block">
                  <svg className="w-24 h-24 text-blue-500 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
              <div className="lg:col-span-2">
                <p className="text-lg text-blue-900 leading-relaxed">
                  {t('about.mission.affordability.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20 bg-gradient-to-br from-blue-50 to-white p-12 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                titleKey: "about.values.innovation.title",
                descriptionKey: "about.values.innovation.description"
              },
              {
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                titleKey: "about.values.personalization.title",
                descriptionKey: "about.values.personalization.description"
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                titleKey: "about.values.excellence.title",
                descriptionKey: "about.values.excellence.description"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{t(value.titleKey)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(value.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="bg-gradient-to-br from-blue-50 to-white p-12 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                nameKey: 'about.team.sarah.name',
                roleKey: 'about.team.sarah.role',
                bioKey: 'about.team.sarah.bio'
              },
              {
                nameKey: 'about.team.michael.name',
                roleKey: 'about.team.michael.role',
                bioKey: 'about.team.michael.bio'
              },
              {
                nameKey: 'about.team.emma.name',
                roleKey: 'about.team.emma.role',
                bioKey: 'about.team.emma.bio'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t(member.nameKey)}</h3>
                <p className="text-blue-600 font-medium mb-4">{t(member.roleKey)}</p>
                <p className="text-gray-600 leading-relaxed">{t(member.bioKey)}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default About; 