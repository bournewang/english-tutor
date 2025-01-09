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
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-green-500 text-white' : 'bg-blue-300 text-black'}`}
        onClick={() => changeLanguage('en')}
      >
        {/* make the text the emoji align horizontally */}
        <span className="text-xl">🇬🇧</span>
        English
      </button>
      <button 
        className={`px-2 py-1 rounded ${i18n.language === 'zh' ? 'bg-green-500 text-white' : 'bg-blue-300 text-black'}`}
        onClick={() => changeLanguage('zh')}
      >
        
        {/* show chinese flag emoji */}
        <span className="text-xl">🇨🇳</span>
        中文
      </button>
      {/* Add more language options as needed */}
    </div>
  );
};

export default LanguageSwitcher;