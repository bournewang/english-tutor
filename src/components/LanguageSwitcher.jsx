import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button 
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button 
        className={`px-2 py-1 rounded ${i18n.language === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        onClick={() => changeLanguage('zh')}
      >
        中文
      </button>
      {/* Add more language options as needed */}
    </div>
  );
};

export default LanguageSwitcher;