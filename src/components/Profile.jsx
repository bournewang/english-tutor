import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext'; // Ensure this is correctly imported
import { updateUser } from '../api/user'; // Ensure this is correctly imported
import DashboardLayout from './DashboardLayout';
import { useTranslation } from 'react-i18next'; 
const ProfilePage = () => {
  const { t } = useTranslation(); 
  const userContext = useUser(); // Call useUser at the top level
  const { user, setUser } = userContext;
//   const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    english_level: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name,
        gender: user.gender,
        age: user.age,
        english_level: user.english_level,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setUser(formData);
      setEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

//   define the gender options, M for male, F for female
// should show label Male/Female while the value is M/F
const genderOptions = [
    { label: t('profile.gender_options.M'), value: 'M' },
    { label: t('profile.gender_options.F'), value: 'F' },
];

const englishLevelOptions = [
    { label: t('profile.english_level_options.A1'), value: 'A1' },
    { label: t('profile.english_level_options.A2'), value: 'A2' },
    { label: t('profile.english_level_options.B1'), value: 'B1' },
    { label: t('profile.english_level_options.B2'), value: 'B2' },
    { label: t('profile.english_level_options.C1'), value: 'C1' },
    { label: t('profile.english_level_options.C2'), value: 'C2' },
];

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{t('profile.title')}</h1>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            {!editing ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                  <span className="w-32 text-sm font-medium text-gray-500">{t('profile.email')}</span>
                  <span className="mt-1 sm:mt-0 text-gray-900">{user.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                  <span className="w-32 text-sm font-medium text-gray-500">{t('profile.name')}</span>
                  <span className="mt-1 sm:mt-0 text-gray-900">{user.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                  <span className="w-32 text-sm font-medium text-gray-500">{t('profile.gender')}</span>
                  <span className="mt-1 sm:mt-0 text-gray-900">{user.gender === 'M' ? 'Male' : 'Female'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100">
                  <span className="w-32 text-sm font-medium text-gray-500">{t('profile.age')}</span>
                  <span className="mt-1 sm:mt-0 text-gray-900">{user.age}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center py-3">
                  <span className="w-32 text-sm font-medium text-gray-500">{t('profile.english_level')}</span>
                  <span className="mt-1 sm:mt-0 text-gray-900">{user.english_level}</span>
                </div>
                <div className="pt-4">
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setEditing(true)}
                  >
                    {t('common.edit')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.gender')}</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('common.select')}</option>
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.age')}</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.english_level')}</label>
                  <select
                    name="english_level"
                    value={formData.english_level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('common.select')}</option>
                    {englishLevelOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    {t('common.save')}
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => setEditing(false)}
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 