import React from 'react';
import DashboardLayout from './DashboardLayout';
import { useTranslation } from 'react-i18next';

const Billing = () => {
  const { t } = useTranslation();
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-2">
      <h2 className="text-2xl font-bold mb-4">{t('billing.title')}</h2>
      <p>{t('billing.subtitle')}</p>
      {/* Add billing components here */}
      </div>
    </DashboardLayout>
  );
};

export default Billing; 